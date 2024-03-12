import { useTranslation } from 'next-i18next';
import Alert from '@/components/ui/alert';
import { useAtom } from 'jotai';
import { useOtpLogin, useSendOtpCode, loginsetdata } from '@/framework/user';
import { optAtom } from '@/components/otp/atom';
import { useModalAction } from '@/components/ui/modal/modal.context';
import Logo from '@/components/ui/logo';
import PhoneNumberForm from '@/components/otp/phone-number-form';
import OtpCodeForm from '@/components/otp/code-verify-form';
import OtpRegisterForm from '@/components/otp/otp-register-form';

import React, { useState, useEffect } from 'react';
import Script from 'next/script'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

function OtpLogin() {
  const { t } = useTranslation('common');
  const [otpState,setotpState] = useAtom(optAtom);
  const [otpverification,setotpverification] = useState();
  const router = useRouter();

  const {
    mutate: sendOtpCode,
    isLoading,
    serverError,
    setServerError,
  } = useSendOtpCode();

  const {
    mutate: otpLogin,
    isLoading: otpLoginLoading,
    serverError: optLoginError,
  } = useOtpLogin();

  useEffect(() => {
    setTimeout(() => {
      const firebaseConfig = {
        apiKey: "AIzaSyAjYKDoihsJImj70bSBAGfsUOLjpqoWptg",
        authDomain: "foodecomerce-14b6c.firebaseapp.com",
        projectId: "foodecomerce-14b6c",
        storageBucket: "foodecomerce-14b6c.appspot.com",
        messagingSenderId: "303436745611",
        appId: "1:303436745611:web:876716e4836cb23955fd8e",
        measurementId: "G-KVMY79NBVM"
      };
      firebase.initializeApp(firebaseConfig);
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container',{'size': 'invisible'});
      recaptchaVerifier.render();
    }, 1000);
  },[]);

  function sendOTP(number) {
    firebase.auth().signInWithPhoneNumber(number, window.recaptchaVerifier).then(function (confirmationResult) {
      window.confirmationResult = confirmationResult;
      setotpverification(confirmationResult)

      fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT}?query=mutation AddtocartProduct {customeotpverification(input: { number: "${number}" }){isContactExist}}`, {method: 'GET'})
        .then(response => response.json())
        .then(result => {
          if (result.data.customeotpverification.isContactExist) {
            setotpState({...otpState,step:'OtpForm',isContactExist:true,otpId: confirmationResult.verificationId,phoneNumber: number});
          }else{
            setotpState({...otpState,step:'RegisterForm',isContactExist:false,otpId: confirmationResult.verificationId,phoneNumber: number});
          }
        }).catch(error => toast.error('Something Went Wrong'));

    }).catch(function (error) {
      toast.error(error.message);
    });
  }

  function onSendCodeSubmission({ phone_number }: { phone_number: string }) {
    sendOTP('+'+phone_number)
    // sendOtpCode({
    //   phone_number: `+${phone_number}`,
    // });
  }

  function onOtpLoginSubmission(values: any) {
    
    otpverification.confirm(values.code).then(function (result:any) {
      
      if (otpState.isContactExist) {
        fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT}?query=mutation Rcustomeotpverification {rcustomeotpverification(input: { number: "${otpState.phoneNumber}" }) {token,permissions,role}}`, {method: 'GET'})
          .then(response => response.json())
          .then(aresult => {
            
            console.log(aresult);
            const returnuser = loginsetdata(aresult.data.rcustomeotpverification)
            if (returnuser) {router.reload();}

          }).catch(error => toast.error('Something Went Wrong'));
      }else{
        fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT}?query=mutation Rcustomeotpverification {rcustomeotpverification(input: { email: "${values.email}", name:"${values.name}", number: "${otpState.phoneNumber}" }) {token,permissions,role}}`, {method: 'GET'})
          .then(response => response.json())
          .then(aresult => {

            console.log(aresult);
            const returnuser = loginsetdata(aresult.data.rcustomeotpverification)
            if (returnuser) {router.reload();}

          }).catch(error => toast.error('Something Went Wrong'));
      }
    }).catch(function (error:any) {
      toast.error(error.message);
    });

    // otpLogin({
    //   ...values,
    // });
  }

  return (
    <div className="mt-4">
      <Script src="https://www.gstatic.com/firebasejs/6.0.2/firebase.js"/>
      <div id="recaptcha-container" className="hidden"></div>
      {otpState.step === 'PhoneNumber' && (
        <>
          <Alert
            variant="error"
            message={serverError && t(serverError)}
            className="mb-4"
            closeable={true}
            onClose={() => setServerError(null)}
          />
          <div className="flex items-center">
            <PhoneNumberForm
              onSubmit={onSendCodeSubmission}
              isLoading={isLoading}
              view="login"
            />
          </div>
        </>
      )}
      {otpState.step === 'OtpForm' && (
        <OtpCodeForm
          isLoading={otpLoginLoading}
          onSubmit={onOtpLoginSubmission}
        />
      )}
      {otpState.step === 'RegisterForm' && (
        <OtpRegisterForm
          loading={otpLoginLoading}
          onSubmit={onOtpLoginSubmission}
        />
      )}
    </div>
  );
}

export default function OtpLoginView() {
  const { t } = useTranslation('common');
  const { openModal } = useModalAction();

  return (
    <div className="flex h-screen w-screen flex-col justify-center bg-light px-5 py-6 sm:p-8 md:h-auto md:max-w-md md:rounded-xl">
      <div className="flex justify-center">
        <Logo />
      </div>
      <p className="mt-4 mb-7 text-center text-sm leading-relaxed text-body sm:mt-5 sm:mb-10 md:text-base">
        {t('otp-login-helper')}
      </p>
      <OtpLogin />
      <div className="relative mt-9 mb-7 flex flex-col items-center justify-center text-sm text-heading sm:mt-11 sm:mb-8">
        <hr className="w-full" />
        <span className="absolute -top-2.5 bg-light px-2 ltr:left-2/4 ltr:-ml-4 rtl:right-2/4 rtl:-mr-4">
          {t('text-or')}
        </span>
      </div>
      <div className="text-center text-sm text-body sm:text-base">
        {t('text-back-to')}{' '}
        <button
          onClick={() => openModal('LOGIN_VIEW')}
          className="font-semibold text-accent underline transition-colors duration-200 hover:text-accent-hover hover:no-underline focus:text-accent-hover focus:no-underline focus:outline-0 ltr:ml-1 rtl:mr-1"
        >
          {t('text-login')}
        </button>
      </div>
    </div>
  );
}

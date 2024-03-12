
import { Form } from '@/components/ui/form/form';
import Button from '@/components/ui/button';
import {
  useModalAction, useModalState,
} from '@/components/ui/modal/modal.context';
import Input from '@/components/ui/input';
import { useTranslation } from 'next-i18next';
import Description from '@/components/ui/description';
import { Attachment } from '__generated__/__types__';
import { useProductAddtocartMutation } from '@/graphql/orders.graphql';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TextArea from '@/components/ui/text-area';
import React from 'react';
import { useCustomersQuery } from '@/graphql/customers.graphql';

type FormValues = {
  title: any;
  description: any;
  image: any;
};
const CustomerBanView = () => {
  const { t } = useTranslation();
  const { closeModal } = useModalAction();
  const { query } = useRouter();
  const [imageData, setImageData] = useState()
  const { data: notificationDetailViewId } = useModalState();
  const [orderData, setOrderData] = useState<any>([])
  const [token, setToken] = useState();


  function onSubmit({ title, description, image }: FormValues) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "key=AAAARqY9S4s:APA91bHqt6u_b3Z_jf_1MjT4Y2TFTlw6Fa3gPRpEr48oPluFmqCDlp-TgeQQMICNnrj7WClcp1i-W13wh47CIb5uBGDEWDNMrlCvLL6j2QDB8jokDAFEi-9vHc-y3Kiy0s1n_lS-4B6c");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "to": token,
      "notification": {
        "title": title,
        "body": description,
        "image": image
      },
      "data":{
        "url":`https://knockknock.mx/products/${query.slug}`
      }
    });

    var requestOptions:any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    closeModal();
  }
  const [productAddtocart, { data }] = useProductAddtocartMutation({});
  useEffect(() => {
    productAddtocart({
      variables: {
        id: query.userSlug
      },
    });
  }, [])

  useEffect(() => {
    fetch(`/backend/user/token/${query.userSlug}`, {method: 'GET'})
      .then(response => response.json())
      .then(result => {
        setToken(result.notification_token)
      })
      .catch(error => console.log('error', error));
  },[])

  const wishlistdetailid = data?.productAddtocart?.wishlist?.filter((item) => {
    item?.id
    return item?.id === notificationDetailViewId
  });

  const OrderDetailID = data?.productAddtocart?.order?.filter((item: any) => {
    item?.id
    return item.id === notificationDetailViewId

  }, [])

  useEffect(() => {
    wishlistdetailid?.map((item: any) => {
      var imageFormatt = JSON.parse(item.image)
      setImageData(imageFormatt.original);
    })
    OrderDetailID?.map((item: any) => {
      setOrderData(item)
    })
    orderData.products?.map((item: any) => {
      setImageData(item.image.original)
    })
  }, [wishlistdetailid, OrderDetailID])

  return (
    <Form<FormValues>
      onSubmit={onSubmit} >
      {({ register, formState: { errors } }) => (
        <div className="p-5 bg-light flex flex-col m-auto max-w-sm w-full rounded sm:w-[24rem]">
          <p className='text-center text-lg'>Notification</p>
          <Input
            label={'Title'}
            {...register('title')}
            // "
            variant="outline"
            className="mb-4"
          />
          <TextArea
            label={'Description'}
            {...register('description')}
            variant="outline"
            className="mb-4"
          />
          <Input
            label={'Image'}
            {...register('image')}
            variant="outline"
            className="mb-5"
            defaultValue={imageData}
          />
          <div className='flex justify-center'>
            <Button className='bg-[red] hover:bg-[red]' onClick={closeModal}>Cancel</Button>
            <Button className='mx-5'>Submit</Button>
          </div>
        </div>
      )}
    </Form>
  );
};

export default CustomerBanView;

// import Button from '@/components/ui/button';
// import Input from '@/components/ui/input';
// import PasswordInput from '@/components/ui/password-input';
// import { useAddStaffMutation, useShopQuery } from '@/graphql/shops.graphql';
// import { useForm } from 'react-hook-form';
// import { getErrorMessage } from '@/utils/form-error';
// import Card from '@/components/common/card';
// import Description from '@/components/ui/description';
// import { useRouter } from 'next/router';
// import { useTranslation } from 'next-i18next';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { passwordRules } from '@/utils/constants';
// import StickyFooterPanel from '@/components/ui/sticky-footer-panel';

// type FormValues = {
//   name: string;
//   email: string;
//   password: string;
// };
// const staffFormSchema = yup.object().shape({
//   name: yup.string().required('form:error-name-required'),
//   email: yup
//     .string()
//     .email('form:error-email-format')
//     .required('form:error-email-required'),
//   password: yup
//     .string()
//     .required('form:error-password-required')
//     .matches(passwordRules, {
//       message:
//         'Please create a stronger password. hint: Min 8 characters, 1 Upper case letter, 1 Lower case letter, 1 Numeric digit.',
//     }),
// });
// const AddStaffForm = () => {
//   const router = useRouter();
//   const {
//     query: { shop },
//   } = router;
//   const { data: shopData } = useShopQuery({
//     variables: {
//       slug: shop as string,
//     },
//   });
//   const shopId = shopData?.shop?.id!;
//   const {
//     register,
//     handleSubmit,
//     setError,

//     formState: { errors },
//   } = useForm<FormValues>({
//     //@ts-ignore
//     resolver: yupResolver(staffFormSchema),
//   });
//   const [addStaff, { loading }] = useAddStaffMutation({
//     onCompleted: () => {
//       router.push(`/${router.query.shop}/staffs`);
//     },
//     onError: (error) => {
//       const serverErrors = getErrorMessage(error);
//       Object.keys(serverErrors?.validation).forEach((field: any) => {
//         setError(field.split('.')[1], {
//           type: 'manual',
//           message: serverErrors?.validation[field][0],
//         });
//       });
//     },
//   });
//   const { t } = useTranslation();

//   function onSubmit({ name, email, password }: FormValues) {
//     addStaff({
//       variables: {
//         input: {
//           name,
//           email,
//           password,
//           shop_id: shopId,
//         },
//       },
//     });
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} noValidate>
//       <div className="my-5 flex flex-wrap sm:my-8">
//         <Description
//           title={t('form:form-title-information')}
//           details={t('form:form-description-staff-info')}
//           className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
//         />

//         <Card className="w-full sm:w-8/12 md:w-2/3">
//           <Input
//             label={t('form:input-label-name')}
//             {...register('name')}
//             type="text"
//             variant="outline"
//             className="mb-4"
//             error={t(errors.name?.message!)}
//             required
//           />
//           <Input
//             label={t('form:input-label-email')}
//             {...register('email')}
//             type="email"
//             variant="outline"
//             className="mb-4"
//             error={t(errors.email?.message!)}
//             required
//           />
//           <PasswordInput
//             label={t('form:input-label-password')}
//             {...register('password')}
//             error={t(errors.password?.message!)}
//             variant="outline"
//             className="mb-4"
//             required
//           />
//         </Card>
//       </div>

//       <StickyFooterPanel>
//         <div className="text-end">
//           <Button loading={loading} disabled={loading}>
//             {t('form:button-label-add-staff')}
//           </Button>
//         </div>
//       </StickyFooterPanel>
//     </form>
//   );
// };

// export default AddStaffForm;

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import PasswordInput from '@/components/ui/password-input';
import { useAddStaffMutation, useShopQuery, useUpdateStaffMutation } from '@/graphql/shops.graphql';
import { Controller, useForm } from 'react-hook-form';
import { getErrorMessage } from '@/utils/form-error';
import Card from '@/components/common/card';
import Description from '@/components/ui/description';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { passwordRules } from '@/utils/constants';
import StickyFooterPanel from '@/components/ui/sticky-footer-panel';
import Label from '../ui/label';
import FileInput from '../ui/file-input';
import Radio from '../ui/radio/radio';
import { DatePicker } from '../ui/date-picker';
import { Permission } from '__generated__/__types__';
import { useState } from 'react';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

type IProps = {
  initialValues?: Permission | null;
};

type FormValues = {
  name: string;
  email: string;
  password: string;
  lastname: string;
  dob: string;
  photo: string;
  phone: string;
  emergencynumber: string;
  salary: string;
  joindate: string;
  jobtype: string;
};


const jobTypeValue = [
  {
    label: 'Part Time',
    value: 'Part-Time',
  },
  {
    label: 'Full Time',
    value: 'Full-Time',
  },
];

const staffFormSchema = yup.object().shape({
  name: yup.string().required('form:error-name-required'),
  email: yup
    .string()
    .email('form:error-email-format')
    .required('form:error-email-required'),
  password: yup
    .string()
    .required('form:error-password-required')
    .matches(passwordRules, {
      message:
        'Please create a stronger password. hint: Min 8 characters, 1 Upper case letter, 1 Lower case letter, 1 Numeric digit.',
    }),
});
const AddStaffForm = (props: any) => {

  // const staffValue: any = initialValues.initialValues;
  // let staff: any = {};

  // staffValue?.forEach((user: any) => {
  //   staff = user;
  // });
  console.log("initialValues", props.initialValues);

  // const userData = staff;


  const router = useRouter();
  const {
    query: { shop },
  } = router;
  const { data: shopData } = useShopQuery({
    variables: {
      slug: shop as string,
    },
  });
  const shopId = shopData?.shop?.id!;
  const {
    register,
    handleSubmit,
    setError,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    //@ts-ignore
    resolver: yupResolver(staffFormSchema),
    // defaultValues: {
    //   ...props.initialValues,
    //   name: props.initialValues.name
    // }
  });

  const [addStaff, { loading }] = useAddStaffMutation({
    onCompleted: () => {
      router.push(`/${router.query.shop}/staffs`);
    },
    onError: (error) => {
      const serverErrors = getErrorMessage(error);
      Object.keys(serverErrors?.validation).forEach((field: any) => {
        setError(field.split('.')[1], {
          type: 'manual',
          message: serverErrors?.validation[field][0],
        });
      });
    },
  });

  const [updateStaff, { loading: update }] = useUpdateStaffMutation({
    onCompleted: () => {
      router.push(`/${router.query.shop}/staffs`);
    },
    onError: (error) => {
      const serverErrors = getErrorMessage(error);
      Object.keys(serverErrors?.validation).forEach((field: any) => {
        setError(field.split('.')[1], {
          type: 'manual',
          message: serverErrors?.validation[field][0],
        });
      });
    },
  })

  const { t } = useTranslation();

  async function onSubmit(values: FormValues) {
    let StaffData = JSON.stringify(values);

    try {
      const inputData = {
        name: values.name,
        email: values.email,
        password: values.password,
        shop_id: shopId,
        details: StaffData
      }
      const seconInput = {
        shop_id: shopId,
        name: values.name,
        details: StaffData
      }

      if (
        !props.initialValues) {
        await addStaff({
          variables: {
            input: {
              ...inputData,
            },
          },
        });
        toast.success(t('common:create-success'));
      } else {
        const { data } = await updateStaff({
          variables: {
            input: {
              id: props.initialValues.id,
              ...seconInput,
            },
          },
        });

        if (data) {
          toast.success(t('common:successfully-updated'));
        }

      }
    } catch (error) {
      getErrorMessage(error);
    }


    // addStaff({
    //   variables: {
    //     input: {
    //       name: values.name,
    //       email: values.email,
    //       password: values.password,
    //       shop_id: shopId,
    //       details: StaffData
    //     },
    //   },
    // });
  }
  const [birth_date] = watch(['dob']);
  const [join_date] = watch(['joindate']);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:form-title-information')}
          details={t('form:form-description-staff-info')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={'FirstName'}
            {...register('name')}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.name?.message!)}
            defaultValue={props.initialValues?.name}
            required
          />
          <Input
            label="Last Name:"
            {...register('lastname')}
            type="text"
            variant="outline"
            className="mb-4"
            defaultValue={props?.initialValues?.details?.lastname}
            required
          />
          <Input
            label={t('form:input-label-email')}
            {...register('email')}
            type="email"
            variant="outline"
            className="mb-4"
            error={t(errors.email?.message!)}
            defaultValue={props?.initialValues?.email}
            required
          />
          <PasswordInput
            label={t('form:input-label-password')}
            {...register('password')}
            error={t(errors.password?.message!)}
            variant="outline"
            className="mb-4"
            required
            defaultValue={props?.initialValues?.password}

          />

          <div className='mb-3'>
            <Label>Date of Birth:</Label>
            <Controller
              control={control}
              name="dob"
              render={({ field: { onChange, onBlur, value } }) => {

                const defultDate = dayjs(props?.initialValues?.details?.dob).toDate();
                return (
                  //@ts-ignore
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={defultDate}
                    selectsEnd
                    startDate={birth_date}
                    className="border border-border-base"

                  // selected={props?.initialValues?.details?.dob
                  // }

                  />)
              }}
            />
          </div>

          <div className="mb-5">
            <Label>Photo</Label>
            <FileInput name="photo" control={control} />
          </div>
          <Input
            label="Phone:"
            {...register('phone')}
            type="text"
            variant="outline"
            className="mb-4"
            defaultValue={props?.initialValues?.details?.phone}


          />
          <Input
            label="Emergency Number:"
            {...register('emergencynumber')}
            type="text"
            variant="outline"
            className="mb-4"
            defaultValue={props?.initialValues?.details?.emergencynumber}



          />
          <div>
            <Label>Job Type:</Label>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {jobTypeValue?.map((item, index) => {
                console.log("item", item);

                return (
                  <Radio
                    key={`product-card-${index}`}
                    {...register('jobtype')}
                    label={t(item.label)}
                    value={item.value}
                    id={`product-card-${index}`}
                    defaultValue={props?.initialValues?.details?.jobtype}

                  />
                );
              })}
            </div>
          </div>
          <Input
            label="Salary"
            {...register('salary')}
            type="text"
            variant="outline"
            className="mb-4"
            defaultValue={props?.initialValues?.details?.salary}


            required
          />
          <div className='mb-3'>
            <Label>Join Date:</Label>
            <Controller
              control={control}
              name="joindate"
              render={({ field: { onChange, onBlur, value } }) => {
                const defultDate = dayjs(props?.initialValues?.details?.joindate).toDate();

                return (
                  //@ts-ignore
                  <DatePicker
                    {...register('joindate')}
                    dateFormat="dd/MM/yyyy"
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={defultDate}
                    selectsEnd
                    startDate={join_date}
                    className="border border-border-base"
                    defaultValue={props?.initialValues?.details?.joindate}

                  />
                )
              }}
            />
          </div>
        </Card>
      </div>

      <StickyFooterPanel>
        <div className="text-end">
          <Button loading={loading} disabled={loading}>
            {props.initialValues
              ? 'Update Staff'
              : 'Add Staff'}
          </Button>
        </div>
      </StickyFooterPanel>
    </form>
  );
};

export default AddStaffForm;



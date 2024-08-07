import * as yup from 'yup';

export const flashSaleValidationSchema = yup.object().shape({
  title: yup.string().required('form:error-title-required'),
  description: yup
    .string()
    .required('form:error-flash-sale-description-required'),
  start_date: yup.date().required('form:error-active-date-required'),
  type: yup.string().required('Campaign type is required.').nullable(),
  rate: yup.number().when('type', {
    is: (data: string) => data === 'percentage',
    then: () =>
      yup
        .number()
        .min(1, 'You can offered minimum 1%.')
        .max(99, 'You can offered maximum 99%.')
        .transform((value) => (isNaN(value) ? undefined : value))
        .positive('form:error-must-number')
        .required('form:error-rate-required'),

    otherwise: () =>
      yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .nullable(),
  }),
  sale_builder: yup.object().shape({
    data_type: yup
      .string()
      .required('form:error-products-filter-option-required')
      .nullable(),
  }),
  products: yup
    .array()
    .required('form:error-select-single-products-required')
    .min(1, 'form:error-product-one-required'),
  end_date: yup
    .date()
    .required('form:error-expire-date-required')
    .min(yup.ref('start_date'), 'form:error-expire-and-active-date'),
});

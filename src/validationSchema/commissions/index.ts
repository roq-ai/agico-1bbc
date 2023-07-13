import * as yup from 'yup';

export const commissionValidationSchema = yup.object().shape({
  rate: yup.number().integer().required(),
  barber_id: yup.string().nullable(),
});

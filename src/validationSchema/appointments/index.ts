import * as yup from 'yup';

export const appointmentValidationSchema = yup.object().shape({
  date: yup.date().required(),
  time: yup.date().required(),
  barber_id: yup.string().nullable(),
  business_id: yup.string().nullable(),
});

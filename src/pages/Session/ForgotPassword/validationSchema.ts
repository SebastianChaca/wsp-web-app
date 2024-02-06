import * as Yup from 'yup';

export const validationSchema = Yup.object({
  email: Yup.string()
    .email('El correo no tiene un formato válido')
    .required('Requerido'),
});

import * as Yup from 'yup';

export const validationSchema = Yup.object({
  email: Yup.string()
    .email('El correo no tiene un formato válido')
    .required('Requerido'),
  name: Yup.string().required('Requerido'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one lowercase letter, one uppercase letter, and one number'
    )
    .required('Password is required'),
});

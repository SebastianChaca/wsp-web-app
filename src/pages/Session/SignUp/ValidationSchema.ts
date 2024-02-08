import * as Yup from 'yup';

export const validationSchema = Yup.object({
  email: Yup.string()
    .email('El correo no tiene un formato válido')
    .required('Requerido'),
  name: Yup.string()
    .required('Requerido')
    .min(3, 'Name must contain at least 3 letters'),
  password: Yup.string()

    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
      'Password must contain at least one lowercase letter, one uppercase letter, and one number'
    )
    .required('Password is required'),
});

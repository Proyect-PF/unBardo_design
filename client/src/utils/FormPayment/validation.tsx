import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  area_code: Yup.string()
    .required('Código de área es requerido')
    .min(2, 'Debe tener al menos 2 caracteres'),
  street_name: Yup.string()
    .required('Direccion es requerida')
    .min(2, 'Debe tener al menos 2 caracter'),
  street_number: Yup.string()
    .required('El numero es requerido')
    .min(1, 'Debe tener al menos 1 caracter'),
  number: Yup.string()
    .required('Número es requerido')
    .min(6, 'Debe tener al menos 6 caracteres'),
  zip_code: Yup.string()
    .required('Código postal es requerido')
    .min(4, 'Debe tener al menos 4 caracteres'),
});

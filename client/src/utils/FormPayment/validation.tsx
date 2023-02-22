import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  street_name: Yup.string()
    .required('Direccion es requerida')
    .min(2, 'Debe tener al menos 2 caracter'),
  street_number: Yup.string()
    .required('El numero es requerido')
    .min(1, 'Debe tener al menos 1 caracter')
    .matches(/^[0-9]+$/, 'El telefono solo puede contener números')
    .test(
      'no-letters-or-hyphens',
      'El teléfono no puede contener letras ni guiones',
      (value) => !/[-a-zA-Z]/.test(value)
    ),
  zip_code: Yup.string()
    .required('Código postal es requerido')
    .max(4, 'Debe tener al maximo 4 caracteres')
    .matches(
      /^[a-zA-Z0-9]+$/,
      'El código postal solo puede contener letras y números'
    ),
  area_code: Yup.string()
    .required('Código de área es requerido')
    .min(2, 'Debe tener al menos 2 caracteres')
    .matches(/^[0-9]+$/, 'El telefono solo puede contener números')
    .test(
      'no-letters-or-hyphens',
      'El teléfono no puede contener letras ni guiones',
      (value) => !/[-a-zA-Z]/.test(value)
    ),
  number: Yup.string()
    .required('Número es requerido')
    .min(6, 'Debe tener al menos 6 caracteres')
    .matches(/^[0-9]+$/, 'El telefono solo puede contener números')
    .test(
      'no-letters-or-hyphens',
      'El teléfono no puede contener letras ni guiones',
      (value) => !/[-a-zA-Z]/.test(value)
    ),
});

import * as Yup from 'yup';

const isFile = (value: any): value is File => {
  return value instanceof File;
};

export const validationCreateSchema = Yup.object().shape({
  name: Yup.string()
    .required('Nombre es requerido')
    .matches(
      /^[A-Za-z\s]+$/,
      'El nombre sólo puede contener letras y espacios'
    ),
  description: Yup.string()
    .max(300, 'La descripción no puede contener más de 256 caracteres')
    .required('La descripción es obligatoria'),
  price: Yup.number()
    .moreThan(0, 'El precio debe ser mayor a cero')
    .typeError('El precio debe ser un número válido')
    .required('El precio es obligatorio'),
  promotional_price: Yup.number()
    .min(0, 'El precio no puede ser menor que cero')
    .typeError('El precio debe ser un número válido')
    .required('El precio es obligatorio'),
  S: Yup.string()
    .min(0, 'El valor debe ser mayor o igual a cero')
    .matches(/^[0-9]+$/, 'Solo se permiten números')
    .required('El valor es obligatorio'),
  M: Yup.string()
    .min(0, 'El valor debe ser mayor o igual a cero')
    .matches(/^[0-9]+$/, 'Solo se permiten números')
    .required('El valor es obligatorio'),
  L: Yup.string()
    .min(0, 'El valor debe ser mayor o igual a cero')
    .matches(/^[0-9]+$/, 'Solo se permiten números')
    .required('El valor es obligatorio'),
});

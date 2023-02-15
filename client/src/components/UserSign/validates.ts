interface ValuesLogin {
    email: string
    password?: string
}


interface ValuesRegister {
    fullname?: string
    email: string
    password?: string
}
interface ValuesUnsubscribe {
  email: string
}

export const validateRegister = (values: ValuesRegister) => {
    let errors: any = {};
    if (!values.fullname) {
      errors.fullname = "Ingrese su nombre";
    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.fullname)) {
      errors.fullname = "Su nombre no puede contener numeros";
    }

    if (!values.email) {
      errors.email = "Ingrese un email";
    } else if (
      !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
        values.email
      )
    ) {
      errors.email = "Ingrese un email valido";
    }
    
    if (!values.password) errors.password = "Ingrese una contraseña";
    return errors;
}

export const validateLogin = (values: ValuesLogin) => {
    let errors: any = {};
    if (!values.email) {
      errors.email = "Ingrese un email";
    } else if (
      !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
        values.email
      )
    ) {
      errors.email = "Ingrese un email valido";
    }
    if (!values.password) errors.password = "Ingrese una contraseña";
    return errors;
}

export const validateUnsubscribe = (values:ValuesUnsubscribe)=>{
  let errors:any = {};
  if (!values.email) {
    errors.email = "Ingrese un email";
  } else if (
    !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
      values.email
    )
  ) {
    errors.email = "Ingrese un email valido";
  }
  return errors
}
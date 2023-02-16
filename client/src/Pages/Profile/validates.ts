interface ValuesPassword{
    password: string
    repeatpassword: string
}

interface ValuesFullName{
  fullname: string
}

export const validatePassword = (values: ValuesPassword) => {
    let errors: any = {};
    
    if(values.password.length < 6) {
      errors.password = "Necesitas almenos 6 caracteres";
    }
    if (!values.password) {
        errors.password = "Ingrese una nueva contraseña";
    }


    if (!values.repeatpassword) {
      errors.repeatpassword = "Vuelva a ingresar la nueva contraseña";
    } else if (values.repeatpassword !== values.password) {
      errors.repeatpassword = "Las Contraseñas no coinciden";
    }

    return errors;
}

export const validateFullName = (values: ValuesFullName) => {
  let errors: any = {};
  
  if(values.fullname.length < 6) {
    errors.fullname = "Necesitas almenos 6 caracteres";
  }
  if (!values.fullname) {
      errors.fullname = "Ingrese el nuevo nombre";
  } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.fullname)) {
    errors.fullname = "Su nombre no puede contener numeros";
  }

  return errors;
}
import { Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../state";
import Button from "../Buttons/Button/Button";
import Input from "../Inputs/Input";
import { bindActionCreators } from "redux";
import { useNavigate } from "react-router-dom";

export const Register = (): JSX.Element => {
  return (
    <Formik
      initialValues={{
        nameRg: "",
        emailRg: "",
        pwRg: "",
      }}
      validate={(values) => {
        let errors: any = {};
        if (!values.nameRg) {
          errors.nameRg = "Ingrese su nombre";
        } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.nameRg)) {
          errors.nameRg = "Su nombre no puede contener numeros";
        }
        if (!values.emailRg) {
          errors.emailRg = "Ingrese un email";
        } else if (
          !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
            values.emailRg
          )
        ) {
          errors.emailRg = "Ingrese un email valido";
        }
        if (!values.pwRg) errors.pwRg = "Ingrese una contraseña";
        return errors;
      }}
      onSubmit={(values) => {}}
    >
      {({ values, handleSubmit, handleChange, handleBlur, errors }) => (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mx-8 my-4">
          <div>
            <label htmlFor="nameRg">Nombre y Apellido</label>
            <Input
              type="text"
              id="nameRg"
              name="nameRg"
              placeholder=""
              value={values.nameRg}
              onChange={handleChange}
              className=" font-poppins"
              onBlur={handleBlur}
            />

            {errors.nameRg && <p className="text-red-600 ">{errors.nameRg}</p>}
          </div>
          <div>
            <label htmlFor="emailRg">email</label>
            <Input
              type="text"
              id="emailRg"
              name="emailRg"
              placeholder=""
              value={values.emailRg}
              onChange={handleChange}
              className=" font-poppins"
              onBlur={handleBlur}
            />

            {errors.emailRg && (
              <p className="text-red-600 ">{errors.emailRg}</p>
            )}
          </div>
          <div>
            <label htmlFor="passwordRg">Contraseña</label>
            <Input
              type="password"
              id="pwRg"
              name="pwRg"
              placeholder=""
              value={values.pwRg}
              onChange={handleChange}
              className=" font-poppins"
              onBlur={handleBlur}
            />
            {errors.pwRg && <p className="text-red-600 ">{errors.pwRg}</p>}
          </div>
          <Button
            className={"justify-center"}
            text="Registrarme"
            name="Register"
            onClick={handleSubmit}
            disabled={false}
            type="button"
          />
        </form>
      )}
    </Formik>
  );
};

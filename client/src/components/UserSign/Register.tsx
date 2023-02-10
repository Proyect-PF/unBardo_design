import { Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../state";
import Button from "../Buttons/Button/Button";
import Input from "../Inputs/Input";
import { bindActionCreators } from "redux";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../../state/action-creators";
import { UserRegister } from "../../state/types";

export const Register = (): JSX.Element => {
  const initialvalues: UserRegister = {
    fullname: "",
    email: "",
    password: "",
    role: undefined
  }
  return (
    <Formik
      initialValues={initialvalues}
      validate={(values) => {
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
      }}
      onSubmit={(values) => {
        userRegister(values)
      }}
    >
      {({ values, handleSubmit, handleChange, handleBlur, errors }) => (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mx-8 my-4">
          <div>
            <label htmlFor="fullname">Nombre y Apellido</label>
            <Input
              type="text"
              id="fullname"
              name="fullname"
              placeholder=""
              value={values.fullname}
              onChange={handleChange}
              className=" font-poppins"
              onBlur={handleBlur}
            />

            {errors.fullname && <p className="text-red-600 ">{errors.fullname}</p>}
          </div>
          <div>
            <label htmlFor="email">email</label>
            <Input
              type="text"
              id="email"
              name="email"
              placeholder=""
              value={values.email}
              onChange={handleChange}
              className=" font-poppins"
              onBlur={handleBlur}
            />

            {errors.email && (
              <p className="text-red-600 ">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="passwordRg">Contraseña</label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder=""
              value={values.password}
              onChange={handleChange}
              className=" font-poppins"
              onBlur={handleBlur}
            />
            {errors.password && <p className="text-red-600 ">{errors.password}</p>}
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

import { Formik } from "formik";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../state";
import Button from "../Buttons/Button/Button";
import Input from "../Inputs/Input";
import { bindActionCreators } from "redux";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../../state/action-creators";
import { UserRegister } from "../../state/types";
import { validateRegister } from "./validates";

export const Register = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userLogin } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const initialvalues: UserRegister = {
    fullname: "",
    email: "",
    password: "",
    role: undefined,
  };
  return (
    <div>
      <Formik
        initialValues={initialvalues}
        validate={validateRegister}
        onSubmit={(values) => {
          const registerLogin = () => {
            userLogin({
              email: values.email,
              password: values.password
            }, navigate)
          }
          userRegister(values, registerLogin);
        }}
      >
        {({ values, handleSubmit, handleChange, handleBlur, errors }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 mx-8 my-4"
          >
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

              {errors.fullname && (
                <p className="text-red-600 ">{errors.fullname}</p>
              )}
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

              {errors.email && <p className="text-red-600 ">{errors.email}</p>}
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
              {errors.password && (
                <p className="text-red-600 ">{errors.password}</p>
              )}
            </div>
            <Button
              className={"justify-center"}
              text="Registrarme"
              name="Register"
              onClick={handleSubmit}
              disabled={Object.values(values).some(e => e === "") || Object.values(errors).some(e => e !== "")}
              type="button"
            />
          </form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

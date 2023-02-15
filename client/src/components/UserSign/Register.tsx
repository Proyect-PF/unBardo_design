import { Formik } from "formik";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../state";
import Button from "../Buttons/Button/Button";
import Input from "../Inputs/Input";
import { bindActionCreators } from "redux";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../../state/action-creators";
import { validateRegister } from "./validates";
import { User } from "../../types/types";
import GoogleLogin from "react-google-login";

import { useEffect } from "react";
import { gapi } from "gapi-script";

export const Register = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clientId =
    "293388938502-lj848n06hnrn6diupdhfc2orotv1virp.apps.googleusercontent.com";
  const initialvalues: User = {
    fullname: "",
    email: "",
    password: "",
  };

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientId,
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  const onSubmit = (values: User) => {
    const registerLogin = () => {
      userLogin(
        {
          email: values.email,
          password: values.password,
        },
        navigate
      );
    };
      userRegister(registerLogin, values);

  };

  const onSuccess = (res:any) => {
    const {profileObj} = res
    const newuserGoogle: User = {
      email: profileObj.email,
      fullname: profileObj.name,
      google_id: res.googleId,
    };
    const registerLogin = () => {
      userLogin(
        {
          email: newuserGoogle.email,
          password: newuserGoogle.password,
          google_id: res.googleId,
        },
        navigate
      );
    };
      userRegister(registerLogin, newuserGoogle);
  };
  const onFailure = (fail: any) => {
    //TODO Se setea un alert!! AGUS SETEALA
    console.error(fail);
  };

  const { userLogin } = bindActionCreators(actionCreators, dispatch);

  return (
    <div>
      <Formik
        initialValues={initialvalues}
        validate={validateRegister}
        onSubmit={onSubmit}
      >
        {({ values, handleSubmit, handleChange, handleBlur, errors, setFieldValue }) => (
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
              disabled={
                Object.values(values).some((e) => e === "") ||
                Object.values(errors).some((e) => e !== "")
              }
              type="button"
            />
            <GoogleLogin
              className={""}
              clientId={clientId}
              buttonText="Register with google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}

            />
          </form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

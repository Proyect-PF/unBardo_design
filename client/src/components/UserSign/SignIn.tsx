import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import Button from "../Buttons/Button/Button";
import Input from "../Inputs/Input";
import { validateLogin } from "./validates";
import { User } from "../../types/types";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";






type Decoded = {
  aud:string
  azp:string
  email:string
  email_verified:boolean
  exp:number
  family_name:string
  given_name:string
  iat:number
  iss:string
  jti:string
  name:string
  nbf:number
  picture:string
  sub:string
  }




export const LogIn = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLogin } = bindActionCreators(actionCreators, dispatch);

  const initialValues: User = {
    email: "",
    password: "",
  };


  const onSuccess = (res: any) => {
    let token = res.credential;
    let decoded:Decoded = jwt_decode(token);
    console.log(decoded)

    const logUser: User = {
      email: decoded.email.toLowerCase(),
      google_id: decoded.aud,
    };
    userLogin(logUser, navigate);
  };
  return (
    <div className="flex justify-center">
      <Formik
        initialValues={initialValues}
        validate={validateLogin}
        onSubmit={(values) => {
          userLogin(values, navigate);
        }}
      >
        {({ values, handleSubmit, handleChange, handleBlur, errors }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 mx-8 my-4 sm:w-1/2"
          >
            <div>
              <label htmlFor="email">Email</label>
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
              <label htmlFor="passwordLogIn">Contraseña</label>
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
              text="Iniciar sesion"
              name="LogIn"
              onClick={handleSubmit}
              disabled={false}
              type="button"
            />
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={onSuccess}
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

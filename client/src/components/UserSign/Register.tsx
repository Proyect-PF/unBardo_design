import { Formik } from "formik";

import { useDispatch } from "react-redux";
import { actionCreators } from "../../state";
import Button from "../Buttons/Button/Button";
import Input from "../Inputs/Input";
import { bindActionCreators } from "redux";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../../state/action-creators";
import { validateRegister } from "./validates";
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
export const Register = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialvalues: User = {
    fullname: "",
    email: "",
    password: "",
  };



  const onSubmit = (values: User) => {
    const registerLogin = () => {
      userLogin(
        {
          email: values.email.toLowerCase(),
          password: values.password,
        },
        navigate
      );
    };
    userRegister(registerLogin, values);
  };

  const onSuccess = (res: any) => {
    let token = res.credential;
    let decoded:Decoded = jwt_decode(token);
    console.log(decoded)


/**
 * 110165801043846069695
 * 110165801043846069695
 * 110165801043846069695
 * aud: "293388938502-lj848n06hnrn6diupdhfc2orotv1virp.apps.googleusercontent.com"
azp: "293388938502-lj848n06hnrn6diupdhfc2orotv1virp.apps.googleusercontent.com"
email: "joaquincarrera145@gmail.com"
email_verified: true
exp: 1677134407
family_name: "Carrera"
given_name: "Joaquin"
iat: 1677130807
iss: "https://accounts.google.com"
jti: "7cc784d2b2e22a73b1e4d8e17e743b3aebf2b260"
name: "Joaquin Carrera"
nbf: 1677130507
picture: "https://lh3.googleusercontent.com/a/AEdFTp53edNKSTzz0lDrvDzm6Z7JHmr3yD4s0aL-9tiw=s96-c"
sub: "100617954593025264373"
 */

    const newuserGoogle: User = {
      email: decoded.email,
      fullname: decoded.name,
      google_id: decoded.aud,
    };
    const registerLogin = () => {
      userLogin(
        {
          email: newuserGoogle.email.toLowerCase(),
          password: newuserGoogle.password,
          google_id: decoded.aud,
        },
        navigate
      );
    };
    userRegister(registerLogin, newuserGoogle);
  };
  const onFailure = () => {
    //TODO Se setea un alert!! AGUS SETEALA
    console.error("fail");
  };

  const { userLogin } = bindActionCreators(actionCreators, dispatch);

  return (
    <div className="flex justify-center">
      <Formik
        initialValues={initialvalues}
        validate={validateRegister}
        onSubmit={onSubmit}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          handleBlur,
          errors,
          setFieldValue,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 mx-8 my-4 sm:w-1/2"
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
            <div className="flex justify-center">
              <GoogleLogin

                onSuccess={onSuccess}
                onError={onFailure}
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

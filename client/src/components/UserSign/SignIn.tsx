import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../state";
import Button from "../Buttons/Button/Button";
import Input from "../Inputs/Input";
import { bindActionCreators } from "redux";
import { useNavigate } from "react-router-dom";

export const LogIn = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminLog } = bindActionCreators(actionCreators, dispatch);
  return (
    <Formik
      initialValues={{
        emailLogIn: "",
        pwLogIn: "",
      }}
      validate={(values) => {
        let errors: any = {};
        if (!values.emailLogIn) {
          errors.emailLogIn = "Ingrese un email";
        } else if (
          !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
            values.emailLogIn
          )
        ) {
          errors.emailLogIn = "Ingrese un email valido";
        }
        if (!values.pwLogIn) errors.pwLogIn = "Ingrese una contraseña";
        return errors;
      }}
      onSubmit={(values) => {
        if (
          values.emailLogIn === "admin@admin.com" &&
          values.pwLogIn === "admin"
        ) {
          adminLog();
          navigate("/");
        } else {
          alert("credenciales invalidas");
        }
      }}
    >
      {({ values, handleSubmit, handleChange, handleBlur, errors }) => (
        <form onSubmit={handleSubmit} className="mx-8 my-4 flex flex-col gap-6">
          <div>
            <label htmlFor="emailLogIn">email</label>
            <Input
              type="text"
              id="emailLogIn"
              name="emailLogIn"
              placeholder=""
              value={values.emailLogIn}
              onChange={handleChange}
              className=" font-poppins"
              onBlur={handleBlur}
            />

            {errors.emailLogIn && (
              <p className=" text-red-600">{errors.emailLogIn}</p>
            )}
          </div>
          <div>
            <label htmlFor="passwordLogIn">Contraseña</label>
            <Input
              type="password"
              id="pwLogIn"
              name="pwLogIn"
              placeholder=""
              value={values.pwLogIn}
              onChange={handleChange}
              className=" font-poppins"
              onBlur={handleBlur}
            />
            {errors.pwLogIn && (
              <p className=" text-red-600">{errors.pwLogIn}</p>
            )}
          </div>
          <Button
            text="Iniciar sesion"
            name="LogIn"
            onClick={handleSubmit}
            disabled={false}
            type="button"
          />
        </form>
      )}
    </Formik>
  );
};

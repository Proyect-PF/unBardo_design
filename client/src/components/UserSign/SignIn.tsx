import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../state";
import Button from "../Buttons/Button/Button";
import Input from "../Inputs/Input";
import { bindActionCreators } from "redux";
import { useNavigate } from "react-router-dom";
import { UserLog } from "../../state/types";
import { userLog } from "../../state/action-creators";

export const LogIn = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminLog } = bindActionCreators(actionCreators, dispatch);
  const initialValues:UserLog = {
    email: "",
    password: "",
  }
  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
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
      }}
      onSubmit={(values) => {
          userLog(values)
          adminLog();
          navigate("/");
 
      }}
    >
      {({ values, handleSubmit, handleChange, handleBlur, errors }) => (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mx-8 my-4">
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
        </form>
      )}
    </Formik>
  );
};

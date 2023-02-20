import React, { useState } from "react";
import { Formik } from "formik";
import Button from "../../../components/Buttons/Button/Button";
import Input from "../../../components/Inputs/Input";
import { Props } from "../Profile";
import { validatePassword } from "../validates";
import { useSelector } from "react-redux";
import { State } from "../../../state/reducers";
import axios from "axios";
import Swal from "sweetalert2";
import { baseURL, PORT } from "../../../utils/url&port";
import Toast from "../../../components/Toast";

const EditPassword = ({setPanel}: Props) => {
  const [passType, setPassType] = useState("password");
  const [typeInput, setTypeInput] = useState("Mostrar Contraseñas");
  const { userId } = useSelector((state: State) => state.user);
    
    const initialvalues = {
        password: "",
        repeatpassword: "",
    };

    const handleClick = () => {
      passType === "password"? setPassType("text"): setPassType("password")
      typeInput === "Mostrar Contraseñas"? setTypeInput("Ocultar Contraseñas"): setTypeInput("Mostrar Contraseñas")
    }

  return (
    <div>
      <Button 
            type="button"
            text="Volver al perfil"
            name="back"
            onClick={() => {
            setPanel("info");
            }}
            disabled={false}
            className="justify-end pr-12"
            />
      <Formik
        initialValues={initialvalues}
        validate={validatePassword}
        onSubmit={(values) => {
          Swal.fire({
            title: "<p class='mt-4 text-4xl font-bold font-rift text-black'>¿Estas Seguro?</p>",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: "#376B7E",
            cancelButtonColor: "#e5e7eb",
            cancelButtonText: "<p class='font-rift text-lg text-black'>Cancelar</p>",
            confirmButtonText: "<p class='font-rift text-lg'>Estoy seguro</p>",
            html: 
            '<p class="font-poppins font-medium text-black italic" >¿Seguro que quieres cambiar tu contraseña?</p>',
          }).then((result) => {
            if (result.isConfirmed) {
              axios.put(`${baseURL}/users/${userId}`, {password: values.password})
              .then((response) => {
                Toast.fire({
                  icon: 'success',
                  title:
                    "<p class='font-bold font-rift text-black'>Tu contraseña se actualizó correctamente</p>",
                });
              })
              .catch((error) => {
                Toast.fire({
                  icon: "error",
                  title:
                    "<p class='font-bold font-rift text-black'>No se pudo actualizar tu contraseña</p>",
                });
              })
              setPanel("info")
            }
          })
        }}
      >
        {({ values, handleSubmit, handleChange, handleBlur, errors }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 mx-8 my-4"
          >
            <div>
              <label htmlFor="passwordRg">Nueva Contraseña</label>
              <Input
                type={passType}
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
            <div>
              <label htmlFor="passwordRg">Repetir Contraseña</label>
              <Input
                type={passType}
                id="repeatpassword"
                name="repeatpassword"
                placeholder=""
                value={values.repeatpassword}
                onChange={handleChange}
                className=" font-poppins"
                onBlur={handleBlur}
              />
              {errors.repeatpassword && (
                <p className="text-red-600 ">{errors.repeatpassword}</p>
              )}
            </div>
            <div className="flex justify-center">
              <div>
                <p onClick={handleClick} className="text-center font-semibold underline underline-offset-2 hover:cursor-pointer">{typeInput}</p>
              </div>
            </div>
            <Button
              className={"justify-center"}
              text="Actualizar Contraseña"
              name="update"
              onClick={handleSubmit}
              disabled={
                Object.values(values).some((e) => e === "") ||
                Object.values(errors).some((e) => e !== "")
              }
              type="button"
            />
          </form>
        )}
      </Formik>
    </div>
    )
}

export default EditPassword;
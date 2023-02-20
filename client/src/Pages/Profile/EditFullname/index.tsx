import axios from "axios";
import { Formik } from "formik";
import Swal from "sweetalert2";
import Button from "../../../components/Buttons/Button/Button";
import Input from "../../../components/Inputs/Input";
import { Props } from "../Profile";
import { validateFullName } from "../validates";
import { useSelector } from "react-redux";
import { State } from "../../../state/reducers";
import { baseURL, PORT } from "../../../utils/url&port";
import Toast from "../../../components/Toast";

const EditFullName = ({setPanel}: Props) => {
    const { userId } = useSelector((state: State) => state.user);
    
    const initialvalues = {
        fullname: "",
    };

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
        validate={validateFullName}
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
                `<p class="font-poppins font-medium text-black italic" >¿Seguro que quieres cambiar tu nombre a "${values.fullname}" ?</p>`,
                //text: 'Necesitas iniciar sesión para poder agregar productos a la bolsa de compra',
              }).then((result) => {
                if (result.isConfirmed) {
                  axios.put(`${baseURL}/users/${userId}`, {fullname: values.fullname})
                  .then((response) => {
                    Toast.fire({
                      icon: 'success',
                      title:
                        "<p class='font-bold font-rift text-black'>Tu nombre se actualizó correctamente</p>",
                    });
                    window.location.reload()
                  })
                  .catch((error) => {
                    Toast.fire({
                      icon: "error",
                      title:
                        "<p class='font-bold font-rift text-black'>No se pudo actualizar tu nombre</p>",
                    });
                    setPanel("info")
                  })
                  
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
              <label>Nuevo Nombre</label>
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
            <Button
              className={"justify-center"}
              text="Actualizar Nombre"
              name="update"
              onClick={handleSubmit}
              disabled={values.fullname === "" || !!errors.fullname}
              type="button"
            />
          </form>
        )}
      </Formik>
    </div>
    )
}

export default EditFullName;

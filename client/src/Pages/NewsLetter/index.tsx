import { Formik } from "formik";
import Swal from "sweetalert2";
import Button from "../../components/Buttons/Button/Button";
import Input from "../../components/Inputs/Input";
import { validateUnsubscribe } from "../../components/UserSign/validates";
import rmv from "../../assets/svg/user-remove.svg";
import axios from "axios";
import { baseURL, PORT } from "../../utils/url&port";
import Toast from "../../components/Toast";

const Newsletter = () => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "bg-white border-black rounded-none",
      cancelButton: "btn btn-danger",
    },
  });

  return (
    <div>
      <Formik
        initialValues={{ email: "" }}
        validate={validateUnsubscribe}
        onSubmit={(values) => {
          swalWithBootstrapButtons
            .fire({
              title:
                '<p class="mt-4 text-4xl font-bold font-rift text-black">¿Estás seguro?</p>',
              html: '<p class="font-poppins font-medium text-black italic" >Desuscribiendote no estaras al tanto de nuestras promociones</p>',
              showCancelButton: true,
              showConfirmButton: true,
              confirmButtonColor: "#e5e7eb",
              cancelButtonColor: "#000",
              confirmButtonText:
                '<p class="font-rift text-lg text-black">Si</p>',
              cancelButtonText: '<p class="font-rift text-lg">No</p>',
              focusConfirm: false,
            })
            .then((result) => {
              axios
                .put(`${baseURL}/users/newsletter/subscription`, {
                  email: values.email,
                  newsletter: "false",
                })
                .then(() =>
                  Toast.fire({
                    icon: "success",
                    title: "Te has desuscripto con exito",
                  })
                )
                .catch((e) =>
                  Toast.fire({
                    icon: "error",
                    title: "Hubo un fallo en el proceso...",
                  })
                );
            });
        }}
      >
        {({ values, handleSubmit, handleChange, handleBlur, errors }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 mx-8 my-8 text-center"
          >
            <p className="text-3xl">
              Estas a punto de desuscribirte de nuestro Newsletter
            </p>
            <p className="text-2xl"> Te echaremos de menos!</p>
            <p className="text-lg">
              Ingrese su email para desuscribirse de nuestro newsletter:
            </p>
            <div>
              <Input
                type="text"
                id="email"
                name="email"
                placeholder=""
                value={values.email}
                onChange={handleChange}
                className="max-w-2xl font-poppins"
                onBlur={handleBlur}
              />
              {errors.email && <p className="text-red-600 ">{errors.email}</p>}
            </div>
            <Button
              className={"justify-center"}
              text="Desuscribirme"
              name="Unsubscribe"
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
  );
};

export default Newsletter;

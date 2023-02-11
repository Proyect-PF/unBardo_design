import { Formik } from "formik";
import Button from "../../components/Buttons/Button/Button";
import Input from "../../components/Inputs/Input";

const EmailCreation = () => {
  return (
    <div>
      <Formik
        initialValues={{
          subject: "",
          body: "",
        }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          resetForm();
        }}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          handleBlur,
          errors,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 mx-12">
            <div className="flex flex-col gap-2">
              <label className="text-xl">Subject:</label>
              <Input
                type="text"
                id="subject"
                name="subject"
                placeholder=""
                value={values.subject}
                onChange={handleChange}
                className="font-mono "
                onBlur={handleBlur}
              />
              {errors.subject && (
                <p className="text-red-600 ">{errors.subject}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xl">Cuerpo:</label>
              <textarea
                id="body"
                name="body"
                placeholder=""
                value={values.body}
                onChange={handleChange}
                className="w-full h-40 pl-3 font-mono border border-gray-300 rounded-md text-align: first bg-gray-50"
                onBlur={handleBlur}
              />
              {errors.body && <p className="text-red-600 ">{errors.body}</p>}
            </div>
            <Button
              text="Enviar"
              name="createEmil"
              onClick={handleSubmit}
              disabled={false}
              type="button"
              className={"justify-center"}
            />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default EmailCreation;

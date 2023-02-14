import { useNavigate } from "react-router-dom";
import Button from "../../components/Buttons/Button/Button";

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col text-center">
      <div className="mx-12 mt-8 ">
        <p className="font-semibold text-8xl">404</p>
        <p className="mt-8 text-2xl font-medium">
          Oops! No pudimos encontrar la página que estabas buscando.
        </p>
      </div>
      <Button
        text="Volver a la tienda"
        name="404button"
        onClick={() => navigate("/")}
        disabled={false}
        type="button"
        className="justify-center mt-8"
      />
    </div>
  );
};

export default Page404;

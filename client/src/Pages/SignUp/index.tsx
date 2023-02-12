import { useNavigate } from "react-router-dom";
import Button from "../../components/Buttons/Button/Button";
import { Register } from "../../components/UserSign";

const RegisterPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Register />
      <div className="border-b-2" />
      <Button
        type="button"
        text="Iniciar sesion"
        name="loginRedirect"
        onClick={() => navigate("/account/login")}
        disabled={false}
        className="justify-center"
      />
    </div>
  );
};

export default RegisterPage;

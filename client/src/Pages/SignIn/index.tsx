import { useNavigate } from "react-router-dom";
import Button from "../../components/Buttons/Button/Button";
import { LogIn } from "../../components/UserSign";

const LogInPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <LogIn />
      <div className="border-b-2" />
      <Button
        type="button"
        text="Registrarse"
        name="registerRedirect"
        onClick={() => navigate("/account/register")}
        disabled={false}
        className="justify-center"
      />
    </div>
  );
};

export default LogInPage;

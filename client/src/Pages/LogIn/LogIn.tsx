import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import Button from "../../components/Buttons/Button/Button";
import Input from "../../components/Inputs/Input";
import { actionCreators } from "../../state";

const LogIn = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminLog } = bindActionCreators(actionCreators, dispatch);

  const [credentials, setCredentials] = useState({ user: "", pw: "" });
  const admin = { user: "admin", pw: "admin" };

  const handleChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, user: event.target.value });
  };

  const handleChangePw = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, pw: event.target.value });
  };

  const handleClick = () => {
    if (credentials.user === admin.user && credentials.pw === admin.pw) {
      adminLog();
      navigate("/");
    } else {
      alert("credenciales invalidas");
    }
  };

  return (
    <div className="flex flex-col gap-8 mx-6 my-3">
      <div>
        <p className="text-2xl font-medium">Usuario:</p>
        <Input
          id="userLogin"
          type="text"
          placeholder="..."
          value={credentials.user}
          name="userLogin"
          onChange={handleChangeUser}
          className=" font-poppins"
        />
      </div>
      <div>
        <p className="text-2xl font-medium">Contraseña:</p>
        <Input
          id="password"
          type="password"
          value={credentials.pw}
          placeholder="..."
          name="passwordLogin"
          onChange={handleChangePw}
          className="font-poppins"
        />
      </div>
      <Button
        name="LogIn"
        text="Iniciar Sesion"
        onClick={handleClick}
        disabled={false}
      />
    </div>
  );
};

export default LogIn;

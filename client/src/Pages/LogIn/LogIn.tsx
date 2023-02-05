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
    console.log(credentials);
    console.log(admin);
    if (credentials.user === admin.user && credentials.pw === admin.pw) {
      adminLog();
      navigate("/");
    } else {
      alert("credenciales invalidas");
    }
  };

  return (
    <div>
      <p>Usuario:</p>
      <Input
        id="userLogin"
        type="text"
        placeholder="User..."
        value={credentials.user}
        name="userLogin"
        onChange={handleChangeUser}
        className=""
      />
      <p>Contraseña:</p>
      <Input
        id="password"
        type="password"
        value={credentials.pw}
        placeholder="Password..."
        name="passwordLogin"
        onChange={handleChangePw}
        className=""
      />
      <Button name="LogIn" text="Iniciar Sesion" onClick={handleClick} />
    </div>
  );
};

export default LogIn;

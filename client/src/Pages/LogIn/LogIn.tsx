import React, { useState } from "react";
import Button from "../../components/Buttons/Button/Button";
import Input from "../../components/Inputs/Input";

const LogIn = (): JSX.Element => {
  const [credentials, setCredentials] = useState({ user: "", pw: "" });

  const handleChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, user: event.target.value });
  };

  const handleChangePw = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, pw: event.target.value });
  };

  const handleClick = () => {
    console.log(credentials);
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

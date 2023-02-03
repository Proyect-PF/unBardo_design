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
        type="text"
        placeholder="User..."
        name="userLogin"
        onChange={handleChangeUser}
      />
      <p>Contraseña:</p>
      <Input
        type="password"
        placeholder="Password..."
        name="passwordLogin"
        onChange={handleChangePw}
      />
      <Button name="LogIn" text="Iniciar Sesion" onClick={handleClick} />
    </div>
  );
};

export default LogIn;

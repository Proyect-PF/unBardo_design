import React, { useState } from "react";
import Input from "../../components/Inputs/Input";

const LogIn = (): JSX.Element => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
  };

  const handleChangePw = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="User..."
        name="userLogin"
        onChange={handleChangeUser}
      />
      <Input
        type="password"
        placeholder="Password..."
        name="passwordLogin"
        onChange={handleChangePw}
      />
    </div>
  );
};

export default LogIn;

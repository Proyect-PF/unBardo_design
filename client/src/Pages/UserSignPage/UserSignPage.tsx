import { LogIn, Register } from "../../components/UserSign";

const UserSignPage = () => {
  return (
    <div>
      <LogIn />
      <div className="border-b-2" />
      <Register />
    </div>
  );
};

export default UserSignPage;

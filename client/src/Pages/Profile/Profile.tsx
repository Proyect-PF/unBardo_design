import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { State } from "../../state/reducers";
import EditPassword from "./EditPassword";
import Info from "./Info/info";
import EditFullName from "./EditFullname";
import UserOrders from "./UserOrders";
import OrderDetail from "./OrderDetail";
import { baseURL, PORT } from "../../utils/url&port";

export interface Props {
  setPanel: React.Dispatch<React.SetStateAction<string>>
}

const Profile = (): JSX.Element => {
  const [panel, setPanel] = useState("info");
  const [detailId, setDetailId] = useState(0)
  const { userId } = useSelector((state: State) => state.user);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios.get(`${baseURL}/users/${userId}`)
    .then((response) => {
      let data = response.data;
      setFullName(data.fullname)
      setEmail(data.email)
    })
  }, [userId])

  return (
    <div>
      {panel === "info" && <Info setPanel={setPanel} email={email} fullName={fullName} />}
      {panel === "editpassword" && <EditPassword setPanel={setPanel} />}
      {panel === "editfullname" && <EditFullName setPanel={setPanel} />}
      {panel === "userorders" && <UserOrders setPanel={setPanel} setDetailId={setDetailId} userId={userId} fullname={fullName} email={email} />}
      {panel === "orderdetail" && <OrderDetail setPanel={setPanel} detailId={detailId} />}
    </div>
  );
};

export default Profile;

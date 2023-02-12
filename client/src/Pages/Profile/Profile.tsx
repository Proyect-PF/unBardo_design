import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import arrow from "../../assets/svg/come-back.svg";
import { State } from "../../state/reducers";

const Profile = (): JSX.Element => {
  const [panel, setPanel] = useState("info");
  const dispatch = useDispatch();
  const { userId, userToken, userInfo, userType } = useSelector(
    (state: State) => state.user
  );
  const [show, setShow] = useState({
    data: false,
    orders: false,
    favs: false,
    settings: false,
  });

  //AL: loading state for loading implementation (done)
  //AL: size / amount state retrieve the selection for future add to cart implementation

  useEffect(() => {
    // Tomamos las ordenes del usuario

  }, []);

  function Product () {
    return (
      <>

      </>
    )
  }

  function Orders() {
    return (
      <>
      <div className="flex items-center justify-around w-full text-center border-t">
        <p className="w-16 border-black">ID Compra</p>
        <p className="w-20 ">Productos</p>
        <p className="w-40 ">Fecha</p>
        <p className="w-24 ">Status</p>
      </div>
      </>
    );
  }

  function InformationPanel() {
    return (
      <>
        <p>Information</p>
      </>
    );
  }

  return (
    <div className="flex flex-col justify-between">
      <div className="flex w-2/12 gap-8 py-12 text-2xl font-bold border-b">
        <button onClick={() => setPanel("info")}>Mi info</button>
        <button onClick={() => setPanel("orders")}>Mis ordenes</button>
        </div>
        <div className="w-full ">
          {panel === "orders" && <Orders />}
          {panel === "info" && <InformationPanel />}
        </div>
      </div>
  );
};

export default Profile;

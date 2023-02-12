import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastClassName } from "react-toastify";
import { bindActionCreators } from "redux";
import arrow from "../../assets/svg/come-back.svg";
import { State } from "../../state/reducers";
const Profile = (): JSX.Element => {

  return (
    <div className="flex flex-col justify-between">
      <p>Perfil</p>
      </div>
  );
};

export default Profile;

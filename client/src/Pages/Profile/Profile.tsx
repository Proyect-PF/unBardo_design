import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { State } from "../../state/reducers";

const Profile = (): JSX.Element => {
  const dispatch = useDispatch();

  const { userId, userToken, userInfo, userType} = useSelector((state: State) => state.user);
  //AL: loading state for loading implementation (done)
  //AL: size / amount state retrieve the selection for future add to cart implementation


  useEffect(() => {
  }, []);




  return (
    <div>
      <h1>Tu nombre: {userInfo}</h1>
      <h1>Tu id: {userId}</h1>
      <h1>Tu rol: {userType}</h1>
      <h1>Tu token: {userToken}</h1>
    </div>
  );
};

export default Profile;
import React from "react";
import CoffeeMap from "./CoffeeMap/CoffeeMap";
import MainHeader from "../../components/Header/MainHeader";

function MainPage(props) {
  return (
    <>
      <MainHeader
        isLoggedIn={props.isAuthenticated}
        onLogout={props.onLogout}
      />
      <CoffeeMap />
    </>
  );
}

export default MainPage;

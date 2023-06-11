import React from "react";
import Navigation from "./Navigation";
import BaseLink from "../UI/Buttons/BaseLink";
import styles from "../../styles/Header/Header.module.scss";

const MainHeader = (props) => {
  return (
    <header className={styles["main-header"]}>
      <BaseLink
        className={styles.main}
        text="Coffee Shop"
        to="/coffee-shop-app/main"
      />

      <Navigation isLoggedIn={props.isLoggedIn} onLogout={props.onLogout} />
    </header>
  );
};

export default MainHeader;

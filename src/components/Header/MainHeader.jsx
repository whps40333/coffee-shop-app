import React from "react";
import Navigation from "./Navigation";

import styles from "../../styles/Header/Header.module.scss";

const MainHeader = (props) => {
  return (
    <header className={styles["main-header"]}>
      <a className={styles.main} href="main">
        Coffee Shop
      </a>
      <Navigation isLoggedIn={props.isLoggedIn} onLogout={props.onLogout} />
    </header>
  );
};

export default MainHeader;

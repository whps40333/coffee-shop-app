import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import styles from "../../styles/Header/Navigation.module.scss";
import BaseLink from "../UI/Buttons/BaseLink";

const Navigation = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <nav className={styles.nav}>
      <ul>
        {authCtx.isLoggedIn && (
          <li>
            <BaseLink text="使用者功能" to="/coffee-shop-app/User" />
          </li>
        )}
        {authCtx.isLoggedIn && (
          <li>
            <BaseLink text="店家清單" to="/coffee-shop-app/main" />
          </li>
        )}

        {authCtx.isLoggedIn && (
          <li>
            <button onClick={authCtx.onLogout}>登出</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;

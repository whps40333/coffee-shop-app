import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import styles from "../../styles/Header/Navigation.module.scss";

const Navigation = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <nav className={styles.nav}>
      <ul>
        {authCtx.isLoggedIn && (
          <li>
            <a href="user">使用者功能</a>
          </li>
        )}
        {authCtx.isLoggedIn && (
          <li>
            <a href="main">店家清單</a>
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

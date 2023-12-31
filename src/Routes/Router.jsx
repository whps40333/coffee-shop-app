import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import LoginPage from "../Pages/LoginPage";
import MainPage from "../Pages/MainPage/MainPage.jsx";
import RegisterPage from "../Pages/RegisterPage";
import AuthContext from "../store/auth-context";
import UserLayout from "../Pages/UserPage/UserLayout";

function Router() {
  const authCtx = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/coffee-shop-app/"
        element={
          authCtx.isLoggedIn ? (
            <MainPage
              isAuthenticated={authCtx.isLoggedIn}
              onLogout={authCtx.onLogout}
            />
          ) : (
            <LoginPage onLogin={authCtx.onLogin} />
          )
        }
      />
      <Route
        path="/coffee-shop-app/register"
        element={!authCtx.isLoggedIn && <RegisterPage />}
      />

      <Route
        path="/coffee-shop-app/user/*"
        element={
          authCtx.isLoggedIn && (
            <Routes>
              <Route
                path="/"
                element={
                  <UserLayout
                    isAuthenticated={authCtx.isLoggedIn}
                    onLogout={authCtx.onLogout}
                  />
                }
              />
            </Routes>
          )
        }
      />
    </Routes>
  );
}

export default Router;

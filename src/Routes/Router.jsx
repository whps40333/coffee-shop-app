import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import LoginPage from "../Pages/LoginPage";
import MainPage from "../Pages/MainPage/MainPage.jsx";
import RegisterPage from "../Pages/RegisterPage";
import AuthContext from "../store/auth-context";
import UserLayout from "../Pages/UserPage/UserLayout";
import NotFoundPage from "../Pages/NotFoundPage";

function Router() {
  const authCtx = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/coffee-shop-app/"
        element={!authCtx.isLoggedIn && <LoginPage onLogin={authCtx.onLogin} />}
      />
      <Route
        path="/coffee-shop-app/main"
        element={
          authCtx.isLoggedIn && (
            <MainPage
              isAuthenticated={authCtx.isLoggedIn}
              onLogout={authCtx.onLogout}
            />
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
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;

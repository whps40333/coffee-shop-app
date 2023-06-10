import Router from "./Routes/Router";
import "./App.css";
import { AuthContextProvider } from "./store/auth-context";
import { HashRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </HashRouter>
    </div>
  );
}

export default App;

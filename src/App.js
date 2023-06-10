import { BrowserRouter } from "react-router-dom";
import Router from "./Routes/Router";
import "./App.css";
import { AuthContextProvider } from "./store/auth-context";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

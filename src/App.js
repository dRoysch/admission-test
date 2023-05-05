import Routes from "./Routes";
import "./App.css";
import { Outlet } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Routes />
      <Outlet />
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter } from "react-router-dom";
import Approutes from "./router/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <Approutes />
    </BrowserRouter>
  );
}

export default App;

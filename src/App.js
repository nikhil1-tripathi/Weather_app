import logo from "./logo.svg";
// import "./App.css";
import Home from "./Pages/Home";
import HooksDemo, { IpLookUp } from "./detectLocation/Location";
import Loader from "./Loader/Loader";

function App() {
  return (
    <div className="App">
      {/* <Loader /> */}
      <Home />
      <IpLookUp />
    </div>
  );
}

export default App;

//

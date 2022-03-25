import React, {useState} from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";


function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div>
  
    <p>{!data ? "Loading..." : data}</p>

    <Routes>
       <Route path="/" element={<LoginPage />} />
       <Route path="/signup" element={<SignupPage />} />
    </Routes>
    </div>


    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>{!data ? "Loading..." : data}</p>
    //   </header>
    // </div>


  );
}

export default App;
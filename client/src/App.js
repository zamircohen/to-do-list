import React from "react";
import "./App.css";
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Route, Routes } from "react-router-dom";
// import { Preview } from "./components/Preview";
// import {useState} from "react"

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import TodoPage from "./pages/TodoPage";
import SearchPage from "./pages/SearchPage";


function App() {

  // const [files, setFiles] = useState([])

  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  return (
    <div>
      <ToastContainer/>
      {/* <Preview /> */}
    {/* <p>{!data ? "Loading..." : data}</p> */}

    <Routes>
       <Route path="/" element={<LoginPage />} />
       <Route path="/signup" element={<SignupPage />} />
       <Route path="/mypage" element={<MyPage />} />
       <Route path="/todo/:id" element={<TodoPage />} />
       <Route path="/search" element={<SearchPage />} />
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
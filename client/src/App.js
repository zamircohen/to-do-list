import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import TodoPage from "./pages/TodoPage";


function App() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  return (
    <div>
  
    {/* <p>{!data ? "Loading..." : data}</p> */}

    <Routes>
       <Route path="/" element={<LoginPage />} />
       <Route path="/signup" element={<SignupPage />} />
       <Route path="/mypage" element={<MyPage />} />
       <Route path="/todo/:id" element={<TodoPage />} />
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
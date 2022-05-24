import Home from "./container/Home";
import { Routes, Route,  } from "react-router-dom";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import EnterCode from "./EnterCode";
import ChangePassword from "./ChangePassword";
function App() {
  return (
    <div className="App">
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/Login" element={<Login />} />
       <Route path="/ForgotPassword" element={<ForgotPassword />} />
       <Route path="/EnterCode" element={<EnterCode />} />
       <Route path="/ChangePassword" element={<ChangePassword />} />
  
       <Route path="/category/:categoryId" element={<Home />} />
     </Routes>
     
     </div>
  );
  
}

export default App;

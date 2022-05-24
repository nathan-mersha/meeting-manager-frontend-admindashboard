import Home from "./container/Home";
import { Routes, Route,  } from "react-router-dom";
import Login from "./Login";
function App() {
  return (
    <div className="App">
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/Login" element={<Login />} />
       <Route path="/category/:categoryId" element={<Home />} />
     </Routes>
     
     </div>
  );
}

export default App;

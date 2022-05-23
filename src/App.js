import Home from "./container/Home";
import { Routes, Route,  } from "react-router-dom";
function App() {
  return (
    <div className="App">
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/category/:categoryId" element={<Home />} />
     </Routes>
     
     </div>
  );
}

export default App;

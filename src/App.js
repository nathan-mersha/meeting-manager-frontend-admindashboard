

import Home from "./container/Home";
import { Routes, Route,  } from "react-router-dom";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import EnterCode from "./EnterCode";
import ChangePassword from "./ChangePassword";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "./atoms/modalAtom";
import { getDataState } from "./atoms/postAtom";
import { AnimatePresence } from "framer-motion";
import Modal from "./components/modal/Model";

function App() {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [postState, setPostState] = useRecoilState(getDataState);
  return (
    <div className="App">
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/Login" element={<Login />} />
       <Route path="/ForgotPassword" element={<ForgotPassword />} />
       <Route path="/EnterCode" element={<EnterCode />} />
       <Route path="/ChangePassword" element={<ChangePassword />} />
  
       <Route path="/:categoryId" element={<Home />} />
     </Routes>
     <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => {
              setModalType("user");
              //setPostState({});
              setModalOpen(false);
            
            }} type={modalType} />
          )}
        </AnimatePresence>
     </div>
  );
  
}

export default App;

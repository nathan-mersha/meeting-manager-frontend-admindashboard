import { motion } from "framer-motion";
import Backdrop from "./Backdrop";

import { useRecoilValue } from "recoil";

import { getDataState, handleDataState } from "../../atoms/postAtom";
import UserInfo from "../UserInfo";


const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const gifYouUp = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
  },
};

const Modal = ({ handleClose, type }) => {
  //   const { data: session } = useSession();
  const post = useRecoilValue(getDataState);
  const update = useRecoilValue(handleDataState);

  return (
    <Backdrop onClick={handleClose}>
      {type === "dropIn" && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="rounded-xl flex flex-col justify-center bg-white "
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* <div className="flex items-center justify-between border-b border-white/75 px-4 py-2.5">
            <h4 className="text-xl">Detail</h4>X
            {/* <IconButton onClick={handleClose}>
              <CloseRoundedIcon className="h-7 w-7 dark:text-white/75" />
            </IconButton> 
          </div>*/}
{/* 
          <AddNewOrder
            handleClose={handleClose}
            updateData={post}
            update={update}
          /> */}
        <div></div>

        </motion.div>
      )}

      {type === "driverAssign" && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="rounded-xl flex flex-col justify-center bg-white"
          variants={gifYouUp}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* <DriverOrder handleClose={handleClose} order={post} />\ */}
        <div></div>

        </motion.div>
      )}
      {type === "driver" && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="rounded-xl flex flex-col justify-center bg-white"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* <AddDriver handleClose={handleClose} /> */}
        <div></div>
        </motion.div>
      )}

      {type === "driverInfo" && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="rounded-xl flex flex-col justify-center bg-white"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <UserInfo handleClose={handleClose} driverId={post} />
        </motion.div>
      )}
    </Backdrop>
  );
};

export default Modal;

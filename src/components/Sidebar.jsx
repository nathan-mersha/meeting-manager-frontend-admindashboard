import { NavLink, Link, useParams } from "react-router-dom";
import { MdDashboard} from "react-icons/md";
import { FiUserCheck} from "react-icons/fi";
import { BsCalendarCheck} from "react-icons/bs";
import { BsCodeSlash} from "react-icons/bs";
import { FaFingerprint} from "react-icons/fa";
import { MdCardMembership} from "react-icons/md";
import { FaLanguage} from "react-icons/fa";
import { FaUsers} from "react-icons/fa";
import { FaUserEdit} from "react-icons/fa";
import NavItem from "./NavItem";
import useAuth from "../hooks/useAuth";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-white  transition-all duration-200 ease-in-out capitalize ";
const isActiveStyle =
  "flex items-center pl-5 gap-3 text-blue-500   font-extrabold border-r-2 border-white  transition-all duration-200 ease-in-out capitalize";

const Sidebar = ({ closeToggle }) => {
  const { categoryId } = useParams();
  const { logout} = useAuth();

  const handelCloseSidebar = () => {
    if (closeToggle) {
      closeToggle(false);
    }
  };

  return (
    <div className="flex flex-col justify-between  bg-blue-500  h-full overflow-y-scroll min-w-250 scrollbar-hide">
      <div className="flex flex-col">
        <div
          className="flex px-5 gap-2 my-6 w-190 items-center"
          onClick={() => handelCloseSidebar}
        >
          <span className="flex w-full text-2xl font-serif items-center justify-center">
            Logo
          </span>
        </div>
        <Link
          to={`/`}
          onClick={handelCloseSidebar}
          className="flex my-4 ml-2 mb-5 gap-2 p-2 items-center "
        >
          <img
            src="https://th.bing.com/th/id/R.0cfe3cb86925753834d56c792931315c?rik=GA0RqPxgQyA0KA&pid=ImgRaw&r=0"
            alt="user"
            className="w-10 h-10 rounded-full"
          />
          <p className="text-white">michael andom</p>

          <div onClick={()=> { logout();}}>
            <h4 className=" text-xs underline text-white">Logout</h4>
          </div>
        </Link>
        <div className="flex flex-col gap-5">
          <NavItem
            to={"/"}
            handelCloseSidebar={handelCloseSidebar}
            isActiveStyle={isActiveStyle}
            isNotActiveStyle={isNotActiveStyle}
            categoryId={categoryId}
            className={
              !categoryId
                ? "bg-white rounded-tl-lg rounded-bl-lg p-2 w-full"
                : ""
            }
            title={"Dashboard"}
            icon={<MdDashboard className="text-white" />}
          />

          <NavItem
            to={"/category/ArrangeUser"}
            handelCloseSidebar={handelCloseSidebar}
            isActiveStyle={isActiveStyle}
            isNotActiveStyle={isNotActiveStyle}
            categoryId={categoryId}
            title={"Arrange User"}
            className={
              categoryId === "ArrangeUser"
                ? "bg-white rounded-tl-lg rounded-bl-lg p-2 w-full"
                : ""
            }
            icon={<FiUserCheck className="text-white" />}
          />

          <NavItem
            to={"/category/NationalCalendars"}
            handelCloseSidebar={handelCloseSidebar}
            isActiveStyle={isActiveStyle}
            isNotActiveStyle={isNotActiveStyle}
            categoryId={categoryId}
            title={"National Calendars"}
            className={
              categoryId === "NationalCalendars"
                ? "bg-white rounded-tl-lg rounded-bl-lg p-2 w-full"
                : ""
            }
            icon={<BsCalendarCheck className="text-white" />}
          />
          <NavItem
            to={"/category/PromoCode"}
            handelCloseSidebar={handelCloseSidebar}
            isActiveStyle={isActiveStyle}
            isNotActiveStyle={isNotActiveStyle}
            categoryId={categoryId}
            title={"Promo code"}
            className={
              categoryId === "PromoCode"
                ? "bg-white rounded-tl-lg rounded-bl-lg p-2 w-full"
                : ""
            }
            icon={<BsCodeSlash className="text-white" />}
          />

          <NavItem
            to={"/category/MembershipLevels"}
            handelCloseSidebar={handelCloseSidebar}
            isActiveStyle={isActiveStyle}
            isNotActiveStyle={isNotActiveStyle}
            categoryId={categoryId}
            title={"Membership Levels"}
            className={
              categoryId === "MembershipLevels"
                ? "bg-white rounded-tl-lg rounded-bl-lg p-2 w-full"
                : ""
            }
            icon={<MdCardMembership className="text-white" />}
          />

          <NavItem
            to={"/category/PlatformLanguages"}
            handelCloseSidebar={handelCloseSidebar}
            isActiveStyle={isActiveStyle}
            isNotActiveStyle={isNotActiveStyle}
            categoryId={categoryId}
            title={"Platform Languages"}
            className={
              categoryId === "PlatformLanguages"
                ? "bg-white rounded-tl-lg rounded-bl-lg p-2 w-full"
                : ""
            }
            icon={<FaLanguage className="text-white" />}
          />
          <NavItem
            to={"/category/UserAgreements"}
            handelCloseSidebar={handelCloseSidebar}
            isActiveStyle={isActiveStyle}
            isNotActiveStyle={isNotActiveStyle}
            categoryId={categoryId}
            title={"User Agreements"}
            className={
              categoryId === "UserAgreements"
                ? "bg-white rounded-tl-lg rounded-bl-lg p-2 w-full"
                : ""
            }
            icon={<FaFingerprint className="text-white" />}
          />

          <NavItem
            to={"/category/SystemUsers"}
            handelCloseSidebar={handelCloseSidebar}
            isActiveStyle={isActiveStyle}
            isNotActiveStyle={isNotActiveStyle}
            categoryId={categoryId}
            title={"System Users"}
            className={
              categoryId === "SystemUsers"
                ? "bg-white rounded-tl-lg rounded-bl-lg p-2 w-full"
                : ""
            }
            icon={<FaUsers className="text-white" />}
          />

          <NavItem
            to={"/category/MyAccount"}
            handelCloseSidebar={handelCloseSidebar}
            isActiveStyle={isActiveStyle}
            isNotActiveStyle={isNotActiveStyle}
            categoryId={categoryId}
            title={"My Account"}
            className={
              categoryId === "MyAccount"
                ? "bg-white rounded-tl-lg rounded-bl-lg p-2 w-full"
                : ""
            }
            icon={<FaUserEdit className="text-white" />}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

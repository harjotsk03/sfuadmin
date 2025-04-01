import {
  FaChartLine,
  FaDatabase,
  FaSearch,
  FaChevronDown,
  FaCog,
  FaChevronRight,
} from "react-icons/fa";
import { IoSettingsOutline, IoRefreshOutline } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { RiFileList3Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import logo from "../assets/sfursLogo.png";
import defaultProfile from "../assets/defaultProfile.jpg";
import { useState } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    {
      name: "Dashboard",
      icon: <FaChartLine />,
      path: "/",
    },
    {
      name: "People",
      icon: <FaCircleUser />,
      path: "/people",
    },
    {
      name: "Open Roles",
      icon: <RiFileList3Fill size={18} />,
      path: "/open-roles",
    },
    {
      name: "Site Data",
      icon: <FaDatabase size={16} />,
      path: "/site-data",
    },
  ];
  return (
    <>
      {/* Mobile black overlay */}
      {isOpen && (
        <div
          className="lg:block fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile sidebar button */}
      <div className="hidden max-lg:flex w-12 min-h-screen bg-white px-1 py-4 flex-col items-center">
        <img src={logo} alt="logo" className="w-8 h-auto mb-2" />
        <button
          onClick={() => setIsOpen(true)}
          className="text-gray-500 bg-stone-100 rounded-lg p-1"
        >
          <FaChevronRight size={16} />
        </button>
      </div>

      {/* Main sidebar content */}
      <div
        className={`
        fixed lg:relative top-0 left-0 lg:left-auto
        w-10/12 lg:w-80 min-h-screen h-full bg-white flex-none px-4 py-4 flex flex-col
        transform transition-transform duration-700 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        z-30
      `}
      >
        {/* Mobile close button */}
        <button
          className="lg:hidden absolute top-5 right-4 text-gray-500 hover:text-red-500 bg-stone-100 rounded-lg p-1"
          onClick={() => setIsOpen(false)}
        >
          <FaChevronDown className="rotate-90" size={16} />
        </button>
        <div className="flex flex-row items-center gap-0 mb-4">
          <img src={logo} alt="logo" className="w-11 h-11" />
          <h1 className="text-base poppins-semibold">SFU Robot Soccer</h1>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-stone-100 text-sm outline-none poppins-regular"
          />
          <FaSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={14}
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            {options.map((option) => (
              <button
                key={option.path}
                onClick={() => {
                  navigate(option.path);
                }}
                className={`flex flex-row items-center gap-3 px-4 py-2.5 rounded-lg lg:hover:cursor-pointer ${
                  option.path === window.location.pathname
                    ? "bg-red-500 bg-opacity-20 hover:bg-opacity-30 transition-all duration-500 ease-in-out"
                    : "bg-transparent hover:bg-stone-100 transition-all duration-500 ease-in-out"
                }`}
              >
                <span
                  className={`${
                    option.path === window.location.pathname
                      ? "text-red-500"
                      : "text-gray-500"
                  } poppins-regular text-base`}
                >
                  {option.icon}
                </span>
                <span
                  className={`${
                    option.path === window.location.pathname
                      ? "text-red-500"
                      : "text-gray-500"
                  } poppins-regular text-sm`}
                >
                  {option.name}
                </span>
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <button className="flex flex-row items-center gap-3 px-4 py-2.5 rounded-lg lg:hover:cursor-pointer hover:bg-stone-100 transition-all duration-500 ease-in-out">
              <IoRefreshOutline className="text-gray-500" size={14} />
              <p className="text-gray-500 poppins-regular text-xs">
                Refresh Website
              </p>
            </button>
            <button className="flex flex-row items-center gap-3 px-4 py-2.5 rounded-lg lg:hover:cursor-pointer hover:bg-stone-100 transition-all duration-500 ease-in-out">
              <IoSettingsOutline className="text-gray-500" size={14} />
              <p className="text-gray-500 poppins-regular text-xs">Settings</p>
            </button>
            <div className="w-full h-[1px] bg-stone-200 rounded-full"></div>
            <div className="flex flex-row items-center gap-3">
              <button className="w-full flex flex-row items-center gap-3 px-4 py-2.5 rounded-lg lg:hover:cursor-pointer hover:bg-stone-100 transition-all duration-500 ease-in-out">
                <img
                  src={defaultProfile}
                  alt="profile"
                  className="w-8 h-8 rounded-xl"
                />
                <div className="flex flex-col text-left">
                  <p className="poppins-medium text-sm">SFU RS Admin</p>
                  <p className="poppins-regular text-xs text-gray-500">
                    sfurs@sfu.ca
                  </p>
                </div>
                <FaChevronDown className="text-gray-500 ml-auto" size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between py-5 font-medium"
    >
      <img className="w-16" src={assets.logo} alt="" />
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink
          to="/"
          className="flex flex-col items-center gap-1 hover:text-blue-500"
          exact
        >
          <motion.p whileHover={{ scale: 1.1 }}>Home</motion.p>
          <motion.hr
            className="w-2/4 border-none h-[1.5px] bg-blue-500 hidden"
            whileHover={{ width: "100%", opacity: 1 }}
          />
        </NavLink>
        {["About", "Contact", "Collection"].map((item, index) => (
          <NavLink
            key={index}
            to={`/${item.toLowerCase()}`}
            className="flex flex-col items-center gap-1 hover:text-blue-500"
          >
            <motion.p whileHover={{ scale: 1.1 }}>{item}</motion.p>
            <motion.hr
              className="w-2/4 border-none h-[1.5px] bg-blue-500 hidden"
              whileHover={{ width: "100%", opacity: 1 }}
            />
          </NavLink>
        ))}
      </ul>
      <div className="flex items-center gap-6">
        <img src={assets.search_icon} className="w-5 cursor-pointer" alt="" />
        <div className="group relative">
          <img
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt=""
          />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-200 text-black rounded"
            >
              <p className="cursor-pointer hover:text-blue-500">My Profile</p>
              <p className="cursor-pointer hover:text-blue-500">Orders</p>
              <p className="cursor-pointer hover:text-blue-500">Logout</p>
            </motion.div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-5 text-center leading-4 bg-blue-500 text-white rounded-full text-[8px]">
            10
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>

      {/* Sidebar Menu for Small Screens */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 right-0 bottom-0 w-3/4 bg-white shadow-lg"
          >
            <div className="flex flex-col text-gray-600">
              <div
                onClick={() => setVisible(false)}
                className="flex items-center gap-4 p-3 cursor-pointer"
              >
                <img
                  src={assets.dropdown_icon}
                  className="h-4 rotate-180"
                  alt=""
                />
                <p>Back</p>
              </div>
              <NavLink
                to="/"
                className="py-2 pl-6 border"
                onClick={() => setVisible(false)}
              >
                Home
              </NavLink>
              {["Collection", "About", "Contact"].map((item, index) => (
                <NavLink
                  key={index}
                  to={`/${item.toLowerCase()}`}
                  className="py-2 pl-6 border"
                  onClick={() => setVisible(false)}
                >
                  {item}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;

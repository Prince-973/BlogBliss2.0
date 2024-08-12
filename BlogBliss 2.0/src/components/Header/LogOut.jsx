import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogOut() {
  const dispatch = useDispatch();
  const logouthndler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        console.log("Error in Logout Page logouthandler", error);
      });
  };
  return (
    <button className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
      Logout
    </button>
  );
}

export default LogOut;

import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
// import Header from "../../components/header/header.component";
import BottomBar from "../../components/bottomBar/bottomBar.component";

const MainLayout = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    } else {
      if (pathname === "/") {
        navigate("/foundItems");
      } else {
        navigate(pathname);
      }
    }
  }, [isLoggedIn]);

  return (
    <div>
      <div className="mt-5 px-5 w-screen">
        <Outlet />
      </div>
      <BottomBar />
    </div>
  );
};

export default MainLayout;

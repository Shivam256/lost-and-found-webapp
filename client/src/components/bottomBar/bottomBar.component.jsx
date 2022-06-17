import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const BottomBar = () => {
  return (
    <div className="w-screen h-20 fixed bottom-0 flex justify-around items-center bg-white z-50">
      <Link to="/foundItems">
        <Icon icon="akar-icons:light-bulb" fontSize="2em" color="#6C63FF" />
      </Link>
      <Link to="/foundItems">
        <Icon
          icon="ant-design:question-circle-outlined"
          fontSize="2em"
          color="#6C63FF"
        />
      </Link>
      <Link to="postFoundItem">
        <Icon icon="carbon:add-alt" fontSize="2em" color="#6C63FF" />
      </Link>
      <Link to="/foundItems">
        <Icon icon="akar-icons:chat-bubble" fontSize="2em" color="#6C63FF" />
      </Link>
      <Link to="/profile">
        <Icon icon="carbon:user-avatar" fontSize="2em" color="#6C63FF" />
      </Link>
    </div>
  );
};

export default BottomBar;

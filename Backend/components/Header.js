import React, { useState } from "react";
import { RiBarChartHorizontalFill } from "react-icons/ri";
import { GoScreenFull } from "react-icons/go";
import { BiExitFullscreen } from "react-icons/bi";
import { IoNotifications } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import LoginLayout from "./LoginLayout";

export default function Header({ handleAsideOpen }) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullScreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullScreen(false);
      });
    }
  };

  return (
    <LoginLayout>
      <div>
        <header className="header flex flex-sb">
          <div className="logo flex gap-2">
            <h1>ADMIN</h1>
            <div
              className="headerham flex flex-center"
              onClick={handleAsideOpen}
            >
              <RiBarChartHorizontalFill />
            </div>
          </div>
          <div className="rightnav flex gap-2">
            <div onClick={toggleFullScreen}>
              {isFullScreen ? <BiExitFullscreen /> : <GoScreenFull />}
            </div>
            <div className="notification">
              <IoNotifications />
            </div>
            <div className="profilenav">
              <FaRegUser />
            </div>
          </div>
        </header>
      </div>
    </LoginLayout>
  );
}

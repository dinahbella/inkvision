import React from "react";
import { RiAccountCircle2Fill, RiSettings2Fill } from "react-icons/ri";

export default function Settings() {
  return (
    <div className="settingspage">
      <div className="titledashboard flex flex-sb">
        <div>
          <h2>
            Admin <span>Settings</span>
          </h2>
          <h3>ADMIN PANEL</h3>
        </div>
        <div className="breadcrumb">
          <RiSettings2Fill /> <span>/</span> <span>Settings</span>
        </div>
      </div>
      <div className="profilesettings">
        <div className="leftprofile_details flex">
          <img src="/fav.jpg" alt="Profile" />
          <div className="w-100">
            <div className="flex flex-sb flex-left mt-2">
              <h4>My Profile:</h4>
              <h4>
                Dinah Bella <br /> Web Developer
              </h4>
            </div>
            <div className="flex flex-sb mt-2">
              <input type="text" defaultValue={"12345678901"} />
            </div>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                defaultValue={"hello@gmail.com"}
              />
            </div>
            <div className="flex flex-center w-100 mt-2">
              <button className="btn">Update</button>
            </div>
          </div>
        </div>
        <div className="leftprofile_details1 flex mt-2">
          <div className="w-100">
            <h2 className="flex flex-sb">
              My Account <RiAccountCircle2Fill />
            </h2>
            <hr />
            <div className="flex flex-sb mt-2">
              <h4>
                Active Account <br /> <span>Email</span>
              </h4>
              <button className="btn">Log Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

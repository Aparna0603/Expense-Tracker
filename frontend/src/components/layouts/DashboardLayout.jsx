import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./NavBar"; 
import SideMenu from "./SideMenu"; 

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  console.log("user in DashboardLayout:", user);

  return (
    <div>
      <Navbar activeMenu={activeMenu} />
      <div className="flex">
        {/* Remove all screen-size hiding temporarily */}
        <SideMenu activeMenu={activeMenu} />
        <div className="grow mx-5">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;

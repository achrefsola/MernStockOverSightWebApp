import React from "react";
import noImage from "../img/No_Image_Available.jpg";

import {
  FaEnvelope,
  FaBell,
  FaLayerGroup,
  FaAngleRight,
  FaSignOutAlt

 
} from "react-icons/fa";
import { FaGear  } from "react-icons/fa6";
import "../styles/navbar.css";
import { useManager } from "./ManagerContext";
import { NavLink } from "react-router-dom";
import logo from "../mainlogo.svg"
import {UpdateUserInfo} from '../components/UpdateManagerInfo'
export default function Navbar() {
  const {ManagerData,handleManagerLogout} =useManager() ;



  if (ManagerData){
    
    

  return (
    <nav className="navbar">
  <NavLink className="navbar-brand" to="/">
    <img src={logo} alt="Logo" className="logo-image" />
  </NavLink>
  
  
  <div className="nav-items">
  <div>
  <span className="profile-username">
              <span className="op-7">Hi&nbsp;</span>
              <span className="fw-bold">{ManagerData.firstName}</span>
              </span>
  </div>
 
    {/* Dropdown for Profile */}
    <div className="nav-item dropdown">
      {/* Profile Picture to trigger dropdown */}
      <div className="profile-pic" data-bs-toggle="dropdown" aria-expanded="false" id="topbarDropdown">
        {ManagerData.image ? (
          <img
            src={`http://localhost:5000/${ManagerData.image}`}
            className="img-fluid rounded-circle"
            alt="Profile"
            style={{ cursor: 'pointer' }} // Add cursor to indicate it's clickable
          />
        ) : (
          <img src={noImage} className="img-fluid rounded-circle" alt="No Profile" style={{ cursor: 'pointer' }} />
        )}
      </div>

      {/* Dropdown menu */}
      <ul className="dropdown-menu dropdown-menu-end dropdown-user animated fadeIn" aria-labelledby="topbarDropdown">
        <div className="dropdown-user-scroll scrollbar-outer">
          <li>
            <div className="user-box">
              <div className="avatar-lg">
                {ManagerData.image ? (
                  <img
                    src={`http://localhost:5000/${ManagerData.image}`}
                    className="img-fluid rounded-circle"
                    alt="Profile"
                  />
                ) : (
                  <img src={noImage} className="img-fluid rounded-circle" alt="No Profile" />
                )}
              </div>
              <div className="u-text">
                <h4>{ManagerData.firstName}</h4>
                <p className="text-muted">{ManagerData.email}</p>
              </div>
            </div>
          </li>
          <li>
            <div className="dropdown-divider"></div>
          </li>
          <li>
            <NavLink to="/dashboard/settings" className="dropdown-item">
              <FaGear /> Settings
            </NavLink>
          </li>
          <li>
            <div className="dropdown-divider"></div>
          </li>
          <li>
            <a className="dropdown-item" onClick={handleManagerLogout}>
              <FaSignOutAlt /> Logout
            </a>
          </li>
        </div>
      </ul>
    </div>
  </div>
</nav>



  );
}
else{
  return(
    <nav className="navbar  navbar-header navbar-header-transparent navbar-expand-lg border-bottom ">
      <div className="container-fluid ">
      <NavLink className="navbar-brand" to="/">
      <img src={logo} alt="Logo" className="logo-image" />
      </NavLink>  
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <li><NavLink to="/login" activeClassName="active-link" className="nav-link">Login</NavLink></li>
                            </li>
                            <li className="nav-item">
                            <li><NavLink  to="/register" activeClassName="active-link" className="nav-link">Register</NavLink></li>
                            </li>
                           
                        </ul>
      
        
      </div>
    </nav>

  )
}
}



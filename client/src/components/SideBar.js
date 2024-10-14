import React from 'react';
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";
import { FaBoxes, FaTruck } from "react-icons/fa";
import { FaTableList } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { BsListColumnsReverse } from "react-icons/bs";
import { MdDashboard, MdContactSupport } from "react-icons/md";
import { FaChartPie } from "react-icons/fa6";
import { HiCommandLine } from "react-icons/hi2";
import '../styles/sidebar.css';
import { useManager } from './ManagerContext';
import { NavLink, useLocation } from 'react-router-dom';

export default function SideBar() {
  const { ManagerData } = useManager();
  const location = useLocation(); // useLocation to get the current URL

  if (ManagerData) {
    return (
      <div className="wrapper">
        <nav id="sidebar">
          <div className="sidebar-header">
            {/* Add your header content here if needed */}
          </div>

          <ul className="list-unstyled components">
            {/* Dashboard */}
            <li>
              <NavLink 
                to="/dashboard" 
                exact
                className={({ isActive }) => (isActive ? 'active-link dropdown-item' : 'dropdown-item')}
              >
                <MdDashboard /> Dashboard
              </NavLink>
            </li>

            {/* Products Section */}
            <li className={location.pathname.includes('/dashboard/products') || location.pathname.includes('/dashboard/categories') ? 'active' : ''}>
              <a href="#homeSubmenu" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                <FaBoxes /> Products
              </a>
              <ul className="collapse list-unstyled" id="homeSubmenu">
                <li>
                  <NavLink
                    to="/dashboard/products"
                    className={({ isActive }) => (isActive ? 'active-link dropdown-item' : 'dropdown-item')}
                  >
                    <FaTableList /> Product list
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/categories"
                    className={({ isActive }) => (isActive ? 'active-link dropdown-item' : 'dropdown-item')}
                  >
                    <MdCategory /> Categories
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* Orders Section */}
            <li>
              <NavLink
                to="/dashboard/orders"
                className={({ isActive }) => (isActive ? 'active-link dropdown-item' : 'dropdown-item')}
              >
                <HiCommandLine /> Orders
              </NavLink>
            </li>

            {/* Supplier Section */}
            <li className={location.pathname.includes('/dashboard/suppliers') ? 'active' : ''}>
              <a href="#pageSubmenu" data-bs-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                <FaTruck /> Supplier
              </a>
              <ul className="collapse list-unstyled" id="pageSubmenu">
                <li>
                  <NavLink
                    to="/dashboard/suppliers"
                    className={({ isActive }) => (isActive ? 'active-link dropdown-item' : 'dropdown-item')}
                  >
                    <FaTableList /> Supplier list
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* Contact */}
            <li>
              {/* This is a placeholder for Contact link */}
              <NavLink
                to="/dashboard/payment"
                className={({ isActive }) => (isActive ? 'active-link dropdown-item' : 'dropdown-item')}
              >
                <MdContactSupport /> Payment
                </NavLink>
            </li>
           
          </ul>
        </nav>
      </div>
    );
  }
}

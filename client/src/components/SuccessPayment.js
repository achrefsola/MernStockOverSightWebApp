import Navbar from "../components/Navbar";
import "../styles/SuccessPayment.css";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";


export default function SuccessPayment() {
 const handleBack=()=>{
 window.location.href='/dashboard'
 }

  return (
    <div>
      <Navbar />
      <div class="dummy-positioning d-flex">
  
  <div class="success-icon">
    <div class="success-icon__tip"></div>
    <div class="success-icon__long"></div>
  </div>
   
    <label>Your payment was successfully processed</label>
    <button onClick={handleBack}>Back to dashboard</button>
   
  
</div>
    </div>
  );
}

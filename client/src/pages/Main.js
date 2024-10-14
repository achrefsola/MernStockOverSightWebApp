import React, { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Typed from "typed.js";
import "../styles/Main.css"; // Ensure this path is correct
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      strings: ["Develop your e-commerce project now..."],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
      backDelay: 5000,
      startDelay: 1000,
    };

    // Initialize Typed.js on the element with class 'typed-text'
    const typed = new Typed(".typed-text", options);
    
    return () => {
      typed.destroy();
    };
  }, []);
 const handleRegisterClick =()=>{
  navigate('/register')
 }
 const handleLoginClick =()=>{
  navigate('/login')
 }


  return (
    <div className="landing-background">
     
      <div className="hero-section">
        
        <div className="more">
        <h3 className="static-text1">Because organization is half the work</h3>
        <h3 className="static-text2">Stock OverSight</h3>
        <h3 className="static-text3"> a platform that helps you sell and track   </h3>
        <h3 className="static-text4"> your deals and accounting </h3>
        </div>
      
      </div>
      <div className="text-container">
          <h1 className="typed-text"></h1>
        </div>
        <div className="buttons-container">
          <Button  onClick={handleRegisterClick} name={"Rrgister"}></Button>
          <Button onClick={handleLoginClick} name={"Login"}></Button>
        </div>
    </div>
  );
};

export default Main;

import React from "react";
import "../../index.css";



const Footer = () => {
    return(
        <div className="footerContainer">
            <section className="footerSection">
                <h2>Full-Stack Citizen</h2>
                <div className="links"> 
                    <a href="#">About</a>
                    <a href="#">Portfolio</a>
                    <a href="#">Contact</a>
                </div>
            </section>
            <small style={{color:"gray"}}>Thunderent 2019. Created with the help of React and Firebase</small>
        </div>
    )
}

export default Footer;
import React from 'react'
import './styles/FloatingNavbar.css'
import { FaBars } from "react-icons/fa";
import { IoLogOutOutline, IoEye } from "react-icons/io5";

const FloatingNavbar = () => {

    const openFloatingNavbar = () => {
        const floatingNavbar = document.querySelector(".floating-navbar");
        floatingNavbar.style.zIndex = 5;
        floatingNavbar.style.opacity = 1.0;
        floatingNavbar.style.transition = "all 1s ease-out";
        floatingNavbar.classList.toggle('open');
    
    }
    return (
        <div>
            <div className="floating-navbar">
                <ul className="floating-nav-links">
                    <li><a href="#about" data-tooltip="xx xxView Rules">
                        <IoEye size="1.5em" /> View Rules
                    </a></li>
                    <li><a href="#skills" data-tooltip="xx xxSign Out">
                        <IoLogOutOutline size="1.5em" /> Sign Out
                    </a></li>
                </ul>
            </div>
            <div className="hamburger" id="hamburger" onClick={openFloatingNavbar}>
                <FaBars color='white' size='1.5em' />
            </div>
        </div>
    )
}

export default FloatingNavbar
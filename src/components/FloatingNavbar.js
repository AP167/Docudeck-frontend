import React from 'react'
import './styles/FloatingNavbar.css'
import { FaBars } from "react-icons/fa";
import { IoLogOutOutline, IoEye } from "react-icons/io5";
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const FloatingNavbar = () => {
    const {signout} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signout();
            console.log('Signed out successfully');
            navigate('/sign-in');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }

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
                    <li><a href="/" data-tooltip="xx xxView Rules">
                        <IoEye size="1.5em" /> View Rules
                    </a></li>
                    <li>
                        <span className='sign-out' data-tooltip="Sign Out" onClick={handleSubmit}>
                            <IoLogOutOutline size="1.5em" /> Sign Out
                        </span>
                    </li>
                </ul>
            </div>
            <div className="hamburger" id="hamburger" onClick={openFloatingNavbar}>
                <FaBars color='white' size='1.5em' />
            </div>
        </div>
    )
}

export default FloatingNavbar
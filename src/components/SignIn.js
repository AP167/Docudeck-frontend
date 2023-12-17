import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './styles/SignIn.css'
import FloatingButton from './FloatingButton';
import { useAuth } from '../AuthContext';

const SignIn = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const {signin, signup} = useAuth();
    
    let navigate = useNavigate();
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(email, password, confirmPassword, role);

        if(props.sign === "In"){
          try { // Sign In
            const userCredential = await signin(email, password);
            console.log('User created:', userCredential.user);
          } catch (error) {
            console.error('Failed to log in:', error);
          }
        } else{ // Sign Out
          try {
            const userCredential = await signup(email, password);
            console.log('User created:', userCredential.user);
          } catch (error) {
            console.error('Failed to log in:', error);
          }
        }

    };

    console.log(props.sign)
    
    return (
        <div className="login-container">
          <FloatingButton />
          <form className='login-form card' onSubmit={handleSubmit}>
          <h2 className="form-title">Sign {props.sign}</h2>
            <div className="form-group">
              {/* <label htmlFor="email">Email</label> */}
              <input
                type="email"
                id="email"
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              {/* <label htmlFor="password">Password</label> */}
              <input
                type="password"
                id="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {props.sign==="Up" ? <><div className="form-group">
              {/* <label htmlFor="confirm-password">Confirm Password</label> */}
              <input
                type="password"
                id="confirm-password"
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              {/* <label htmlFor="role">Role</label> */}
              <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="user">Tender Inviting Authority</option>
                <option value="vendor">Vendor</option>
              </select>
            </div></> : <></>
            }
            <button className="sign-in-btn" onClick={handleSubmit} >
                Sign {props.sign}
            </button>
            <h3 className="sign-up-option">
                {props.sign==="In" ? "Don't" : "Already"} have an account? 
                <span onClick={() => navigate(`/sign-${props.sign==="In" ? "up" : "in"}`)}> Sign {props.sign==="In" ? "up" : "in"}</span> here
            </h3>
          </form>
        </div>
    )
}

export default SignIn
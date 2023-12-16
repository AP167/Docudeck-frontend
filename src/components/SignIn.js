import React from 'react'
// import { TextField } from '@mui/material'
// import './styles/SignInPage.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
// import { signInWithEmailPass, signUpWithEmailPass } from '../authentication/authentication'
// import { getUserData, writeUserData } from '../db/db'

const SignIn = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');

    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle the form submission logic here
        console.log(email, password, confirmPassword, role);

        if(props.sign === "In"){
          const data = {
            email: email,
            password: password,
            userType: "role", 
          };
          console.log(JSON.stringify(data))
          try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
  
            if (response.ok) {
                console.log('Login Successful');
            } else {
                console.log('Invalid Credentials');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }

        }
        else{
          const data = {
            email: email,
            password: password,
            userType: role, 
          };
          console.log(JSON.stringify(data))
          try {
            const response = await fetch('http://localhost:5000/sign-up', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
  
            if (response.ok) {
                console.log('Sign up Successful');
            } else {
                console.log('Invalid Credentials');
            }
        } catch (error) {
            console.error('Error during Sign up:', error);
        }

      }

    };

    console.log(props.sign)
    
    return (
        <div className="login-container">
      <form onSubmit={handleSubmit}>
      <h2 className="form-title">Sign {props.sign}</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {props.sign==="Up" ? <><div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Select a role</option>
            <option value="user1">Admin</option>
            <option value="user2">User</option>
            <option value="user3">Vendor</option>
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
      <button onClick={() => navigate('/')}>
        View Rules & Regulations
      </button>
    </div>
    )
}

export default SignIn
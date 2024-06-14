import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
     navigate("/")
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">Adi-Chat</span>
            <span className="title">LogIn</span>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='Email-id' />
                <input type="password" placeholder='Password' />
                
                <button>Log In</button>
                {err && <span>Something went wrong</span>}
            </form>
            <p>Register if you don't have an account : <br /> <Link to="/register">Register!</Link> </p>
        </div>
        <a href='#' className='design'>Designed By- Aditya Shivhare</a>
        
    </div>
  );
};

export default Login;
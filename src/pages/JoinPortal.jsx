import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JoinPortal.css';

const JoinPortal = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', formData);
    navigate('/student-profile');
  };

  return (
    <div className="portal-body">
      <div className={`portal-container ${isRegistering ? 'right-panel-active' : ''}`}>
        
        {/* Registration Form */}
        <div className="form-container register-container">
          <form action="#">
            <h1>Register</h1>
            <p className="subtitle">Join the student jobs portal </p>

            <div className="role-switch">
              <button type="button" className={role === "student" ? "active" : ""} onClick={() => setRole("student")}>Student</button>
              <button type="button" className={role==="admin"?"active":""} onClick={()=>setRole("admin")}>Admin</button>
            </div>

            {role === "student" && (
              <>
                <input type="text" placeholder="Enter your full name" />
                <input type="email" placeholder="Enter your email" />
                <input type="text" placeholder="Student ID" />
                <input type="text" placeholder="Department"/>
                <input type="password" placeholder="Create a strong password" />
              </>
            )}
            {role === "admin" && (
              <>
                <input type="text" placeholder="Admin name" />
                <input type="email" placeholder="Admin email" />
                <input type="password" placeholder="Create a strong password" />
              </>
            )}
           
            <button>Register</button>
          </form>
        </div>

        {/* Login Form */}
        <div className="form-container login-container">
          <form onSubmit={handleSubmit}>
            <h1 className="portal-title">Student <br/>Jobs Portal</h1>
            <p className="subtitle">Sign in to your account</p>
            <div className="input-field-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="student@science.cu.edu.eg"
                required
              />
            </div>
            
            <div className="input-field-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
           
            <div className="content">
              <div className="checkbox">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label>Remember me</label>
              </div> 
              <div className="pass-link">
                <a href="#">Forgot Password?</a>
              </div>          
            </div>
          
            <button type="submit">Login</button>
          </form>
        </div>

        {/* Sliding Overlay */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="title">Hello <br/> friends</h1>
              <p>if you have an account , login there</p>
              <button className="btn-ghost" onClick={() => setIsRegistering(false)}>
                Login <i className="lni lni-arrow-left login"></i>
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="title">Start your <br/> journey now</h1>
              <p>if you don't have an account yet,join us and start your journey.</p>
              <button className="btn-ghost" onClick={() => setIsRegistering(true)}>
                Register <i className="lni lni-arrow-right register"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinPortal;
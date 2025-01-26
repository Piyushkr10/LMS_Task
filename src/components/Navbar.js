import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {isLoggedIn ? (
        <>
          {role === 'Admin' && <Link to="/admin">Admin Dashboard</Link>}
          {role === 'Student' && <Link to="/student">Student Dashboard</Link>}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;

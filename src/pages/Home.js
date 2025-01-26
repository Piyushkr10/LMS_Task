import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-links">
        <Link to="/manage-courses">Manage Courses</Link>
        <Link to="/manage-quizzes">Manage Quizzes</Link>
        <Link to="/upload-content">Upload Content</Link>
        <Link to="/view-progress">View Student Progress</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;

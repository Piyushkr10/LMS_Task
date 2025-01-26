import React from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  return (
    <div className="student-dashboard">
      <h1>Student Dashboard</h1>
      <div className="dashboard-links">
        <Link to="/my-courses">My Courses</Link>
        <Link to="/take-quiz">Take Quiz</Link>
        <Link to="/progress">View Progress</Link>
      </div>
    </div>
  );
};

export default StudentDashboard;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import QuizManagement from './components/Admin/QuizManagement';
import UploadsContent from './components/Admin/UploadsContent';
import CourseList from './components/Courses/CourseList';
import CourseDetails from './components/Courses/CourseDetails';
import Progress from './components/Student/Progress';
import TakeQuiz from './components/Student/TakeQuiz';
import './style.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        {/* Navbar for global navigation */}
        <Navbar />

        {/* App routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/manage-quizzes" element={<QuizManagement />} />
          <Route path="/upload-content" element={<UploadsContent />} />
          <Route path="/my-courses" element={<CourseList />} />
          <Route path="/course-details/:id" element={<CourseDetails />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/take-quiz" element={<TakeQuiz />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;



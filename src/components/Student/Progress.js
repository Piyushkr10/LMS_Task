import React, { useState, useEffect } from 'react';
import API from '../../api/api';

const Progress = () => {
  const [progress, setProgress] = useState([]);
  
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const { data } = await API.get('/progress');
        setProgress(data);
      } catch (error) {
        console.error('Error fetching progress:', error.message);
      }
    };

    fetchProgress();
  }, []);

  if (progress.length === 0) {
    return <p>No progress data available.</p>;
  }

  return (
    <div className="progress">
      <h2>Course Progress</h2>
      <ul>
        {progress.map((course) => (
          <li key={course.courseId}>
            <h3>{course.courseName}</h3>
            <p>Progress: {course.percentage}%</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Progress;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../api/api';

const CourseDetails = () => {
  const { courseId } = useParams(); // Get course ID from URL parameters
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const { data } = await API.get(`/courses/${courseId}`);
        setCourse(data);
      } catch (error) {
        console.error('Error fetching course details:', error.message);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (!course) {
    return <p>Loading course details...</p>;
  }

  return (
    <div className="course-details">
      <h2>{course.name}</h2>
      <p>{course.description}</p>
      <h3>Content:</h3>
      <ul>
        {course.content.map((item, index) => (
          <li key={index}>
            {item.type === 'video' ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.title} (Video)
              </a>
            ) : (
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.title} (PDF)
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetails;

import React,{useEffect, useState} from 'react';
import API from '../../api/api';

const CourseList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() =>{
        const fetchCourses = async () =>{
            const {data} = await API.get('/courses');
            setCourses(data);
        }
        fetchCourses();
    },[]);
    
    return (
        <div className="course-list">
          <h2>Courses</h2>
          <ul>
            {courses.map((course) => (
              <li key={course._id}>{course.name}</li>
            ))}
          </ul>
        </div>
      );
};

export default CourseList;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuthorization } from './AuthorizationContext';

function UserCourses() {
  const { currentUser, setCurrentUser } = useAuthorization();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpdatedUserAndCourses = async () => {
      try {
        // Fetch the updated user data
        const userResponse = await axios.get(`https://verbalearn-back.onrender.com/users/${currentUser._id}`);
        const updatedUser = userResponse.data;
        setCurrentUser(updatedUser);

        // Fetch the courses by their IDs
        const coursesResponse = await axios.post('https://verbalearn-back.onrender.com/courses/by-ids', {
          courseIds: updatedUser.courses
        });

        setCourses(coursesResponse.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setCourses([]);  // Handle the "No courses found" case
        } else {
          setError(error);
        }
        setLoading(false);
      }
    };

    fetchUpdatedUserAndCourses();
  }, [currentUser._id, setCurrentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.response ? error.response.data.message : error.message}</div>;
  }

  if (courses.length === 0) {
    return <div className="container mt-5">
    <h1>My Courses</h1><div>No courses found yet.</div></div>;
  }

  return (
    <div className="container mt-5">
      <h1>My Courses</h1>
      <div className="row mb-3">
        {/* Add search and filter inputs here if needed */}
      </div>
      <div className="row">
        {courses.map((course, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{course.courseName}</h5>
                <Link to={`/courses/${encodeURIComponent(course.courseName)}`} className="btn btn-primary" >View Course</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserCourses;

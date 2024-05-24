import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthorization } from './AuthorizationContext';

function Courses() {
    
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [languageFilter, setLanguageFilter] = useState('');
    const [levelFilter, setLevelFilter] = useState('');
    const [enrolling, setEnrolling] = useState(null);
    const [error, setError] = useState(null);
    const { currentUser } = useAuthorization();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5001/courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const enrollInCourse = async (courseId) => {
        if (!currentUser) {
            setError('User is not logged in.');
            return;
        }

        setEnrolling(courseId);
        setError(null);

        try {
            await axios.post(`http://localhost:5001/users/${currentUser._id}/courses`, { courseId });
            setEnrolling(null);
            alert('Enrolled in course successfully!');
        } catch (error) {
            setError(error.message);
            setEnrolling(null);
        }
    };

    const filteredCourses = courses.filter(course => {
        if (searchTerm && !course.courseName.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }
        if (languageFilter && course.language !== languageFilter) {
            return false;
        }
        if (levelFilter && course.level !== levelFilter) {
            return false;
        }
        return true;
    });

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Available Courses</h1>
            <div className="row mb-3">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={languageFilter}
                        onChange={e => setLanguageFilter(e.target.value)}
                    >
                        <option value="">Filter by Language</option>
                        {["en", "de"].map((language, index) => (
                            <option key={index} value={language}>{language}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={levelFilter}
                        onChange={e => setLevelFilter(e.target.value)}
                    >
                        <option value="">Filter by Level</option>
                        <option value="a1">A1</option>
                        <option value="a2">A2</option>
                        <option value="b1">B1</option>
                        <option value="b2">B2</option>
                        <option value="c1">C1</option>
                        <option value="c2">C2</option>
                    </select>
                </div>
            </div>
            <ul className="list-group">
                {filteredCourses.map((course, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {course.courseName}
                        <button
                            className="btn btn-primary"
                            onClick={() => enrollInCourse(course._id)}
                            disabled={enrolling === course.id}
                        >
                            {enrolling === course.id ? 'Enrolling...' : 'Enroll'}
                        </button>
                    </li>
                ))}
            </ul>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
}

export default Courses;

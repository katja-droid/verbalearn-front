import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthorization } from './AuthorizationContext';

function UserCourses() {
    const { currentUser } = useAuthorization();
    const [searchTerm, setSearchTerm] = useState('');
    const [languageFilter, setLanguageFilter] = useState('');
    const [levelFilter, setLevelFilter] = useState('');

    const filteredCourses = currentUser ? currentUser.courses.filter(course => {
        // Filter by search term
        if (searchTerm && !course.courseName.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }
        // Filter by language
        if (languageFilter && course.language !== languageFilter) {
            return false;
        }
        // Filter by level
        if (levelFilter && course.level !== levelFilter) {
            return false;
        }
        return true;
    }) : [];

    return (
        <div className="container mt-5">
            <h1>My Courses</h1>
            <div className="row mb-3">
                {/* Input fields for filtering */}
            </div>
            <div className="row">
                {filteredCourses.map((course, index) => (
                    <div key={index} className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{course.courseName}</h5>
                                {/* Other card content */}
                                <Link to={`/courses/${encodeURIComponent(course.courseName)}`} className="btn btn-primary">View Details</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserCourses;

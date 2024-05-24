import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CourseEnroll(userId) {
    const { courseId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const enrollCourse = async () => {
            try {
                // Make a POST request to enroll the user in the course
                await axios.post(`http://localhost:5001/users/${userId}/courses`, { courseId });
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        enrollCourse();
    }, [courseId]);

    if (loading) {
        return <div className="container">Enrolling...</div>;
    }

    if (error) {
        return <div className="container">Error: {error.message}</div>;
    }

    return (
        <div className="container">
            <h2>Course Enrollment</h2>
            <div className="alert alert-success" role="alert">
                Course enrolled successfully!
            </div>
        </div>
    );
}

export default CourseEnroll;

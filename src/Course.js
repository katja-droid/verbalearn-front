import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardBody, CardTitle } from 'reactstrap'; // Importing Bootstrap card components
import Topic from './Topic';

function Course() {
    const { courseName, topicIndex } = useParams();
    const [course, setCourse] = useState(null); // State to store the fetched course data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error state
    const parsedTopicIndex = topicIndex ? parseInt(topicIndex, 10) : undefined;

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/courses/${courseName}`);
                setCourse(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseName]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!course) {
        return <div>Course not found</div>;
    }

    if (parsedTopicIndex !== undefined && course.topics[parsedTopicIndex]) {
        const topic = course.topics[parsedTopicIndex];
        return <Topic topic={topic} />;
    }

    return (
        <div className="container mt-5">
            <h1>{course.courseName}</h1>
            <div className="row">
                {course.topics.map((topic, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <Card>
                            <CardBody>
                                <CardTitle tag="h5">{topic.topicName}</CardTitle>
                                <Link to={`/courses/${encodeURIComponent(courseName)}/${index}`} className="btn btn-primary">View Topic</Link>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Course;

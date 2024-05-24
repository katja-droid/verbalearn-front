import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthorization } from './AuthorizationContext';

const FriendCoursesLeaderboard = () => {
  const [friends, setFriends] = useState([]);
  const [courses, setCourses] = useState([]);
  const { currentUser } = useAuthorization();

  useEffect(() => {
    const fetchFriendsAndCourses = async () => {
      try {
        // Fetch user's friends
        const friendsResponse = await axios.get(`http://localhost:5001/users/${currentUser._id}/friends`);
        const friendList = friendsResponse.data;

        // Fetch all courses
        const coursesResponse = await axios.get('http://localhost:5001/courses');
        const coursesList = coursesResponse.data;

        // Update state with friends and courses
        setFriends(friendList);
        setCourses(coursesList);
      } catch (error) {
        console.error('Error fetching friends and courses:', error);
      }
    };

    fetchFriendsAndCourses();
  }, [currentUser._id]);

  // Function to get the course index in the progress array
  const getCourseIndex = (userId, courseId) => {
    const user = friends.find(friend => friend._id === userId) || currentUser;
    const progress = user.progress.find(progress => progress.courseId === courseId);
    return progress ? user.progress.indexOf(progress) : -1;
  };

  // Filter courses to include only those where all friends are enrolled
  const filteredCourses = courses.filter(course =>
    friends.every(friend =>
      friend.progress.some(progress => progress.courseId === course._id)
    )
  );

  return (
    <div className="container">
      <h2 className="mt-4 mb-4">Leaderboard</h2>
      <div className="row">
        {friends.length === 0 ? (
          <div className="col-md-12">
            <p>No friends yet</p>
          </div>
        ) : (
          filteredCourses.map(course => (
            <div key={course._id} className="col-md-6">
              <div className="card mb-4">
                <div className="card-header">{course.courseName}</div>
                <ul className="list-group list-group-flush">
                  {/* Current User's Progress */}
                  <li key={currentUser._id} className="list-group-item">
                    <strong>{currentUser.nickname}</strong> - {currentUser.progress[0].points} points
                  </li>
                  {/* Friends' Progress */}
                  {friends.map(friend => (
                    <li key={friend._id} className="list-group-item">
                      <strong>{friend.nickname}</strong> - {friend.progress[getCourseIndex(friend._id, course._id)].points} points
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FriendCoursesLeaderboard;

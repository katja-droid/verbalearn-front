import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

const FriendCoursesLeaderboard = () => {
    const [courseLeaderboard, setCourseLeaderboard] = useState({});

    useEffect(() => {
        // Mock currentUser and friends data
        const currentUser = {
            nickname: 'CurrentUser',
            courses: [
                { courseName: 'React', progress: { points: 80, totalPoints: 100 } },
                { courseName: 'JavaScript', progress: { points: 60, totalPoints: 100 } }
            ],
            friends: [
                {
                    nickname: 'Friend1',
                    courses: [
                        { courseName: 'React', progress: { points: 70, totalPoints: 100 } },
                        { courseName: 'JavaScript', progress: { points: 50, totalPoints: 100 } }
                    ]
                },
                {
                    nickname: 'Friend2',
                    courses: [
                        { courseName: 'React', progress: { points: 90, totalPoints: 100 } },
                        { courseName: 'JavaScript', progress: { points: 80, totalPoints: 100 } }
                    ]
                }
            ]
        };

        const leaderboard = {};

        currentUser.courses.forEach(course => {
            if (!leaderboard[course.courseName]) {
                leaderboard[course.courseName] = [];
            }

            const userProgress = calculateProgress(course.progress);
            leaderboard[course.courseName].push({
                nickname: currentUser.nickname,
                progress: userProgress
            });

            currentUser.friends.forEach(friend => {
                friend.courses.forEach(fCourse => {
                    if (fCourse.courseName === course.courseName) {
                        const friendProgress = calculateProgress(fCourse.progress);
                        leaderboard[course.courseName].push({
                            nickname: friend.nickname,
                            progress: friendProgress
                        });
                    }
                });
            });

            leaderboard[course.courseName].sort((a, b) => b.progress - a.progress);
        });

        console.log(leaderboard);  // Debugging output to inspect the structure
        setCourseLeaderboard(leaderboard);
    }, []);

    function calculateProgress(progress) {
        return progress.totalPoints > 0 ? ((progress.points / progress.totalPoints) * 100).toFixed(2) : 0;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Course Leaderboards</h2>
            {Object.entries(courseLeaderboard).map(([courseName, users]) => (
                <div key={courseName} className="row mb-4">
                    <div className="col">
                        <Card>
                            <CardBody>
                                <CardTitle tag="h3">{courseName}</CardTitle>
                                {users.map((user, index) => (
                                    <CardText key={index} className={index % 2 === 0 ? 'bg-light' : 'bg-white'}>
                                        {user.nickname} - {user.progress}%
                                    </CardText>
                                ))}
                            </CardBody>
                        </Card>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FriendCoursesLeaderboard;

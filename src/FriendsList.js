import React, { useState, useEffect } from 'react';

const FriendsList = () => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate fetching friends data
        const fetchFriends = async () => {
            try {
                setLoading(true);
                // Simulate API response delay
                setTimeout(() => {
                    const mockFriendsData = [
                        { id: 1, nickname: 'Friend 1' },
                        { id: 2, nickname: 'Friend 2' },
                        { id: 3, nickname: 'Friend 3' }
                        // Add more mock friends data as needed
                    ];
                    setFriends(mockFriendsData);
                    setLoading(false);
                }, 1000); // Simulate 1 second delay
            } catch (error) {
                console.error('Error fetching friends:', error);
                setError('Failed to fetch friends');
                setLoading(false);
            }
        };

        fetchFriends();
    }, []);

    if (loading) return <div>Loading friends...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mt-5">
            <h2>My Friends</h2>
            <div className="row">
                {friends.length > 0 ? (
                    friends.map(friend => (
                        <div key={friend.id} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{friend.nickname}</h5>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No friends found.</p>
                )}
            </div>
        </div>
    );
};

export default FriendsList;

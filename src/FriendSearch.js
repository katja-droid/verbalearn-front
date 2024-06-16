import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthorization } from './AuthorizationContext';

const FriendSearch = () => {
    const [allUsersData, setAllUsersData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [friends, setFriends] = useState([]);
    const { currentUser } = useAuthorization();

    useEffect(() => {
        // Fetch all users data from your API
        const fetchAllUsers = async () => {
            try {
                const response = await axios.get('https://verbalearn-back.onrender.com/all-users');
                setAllUsersData(response.data);
            } catch (error) {
                console.error('Error fetching all users data:', error);
            }
        };

        // Fetch current user's friends
        const fetchUserFriends = async () => {
            try {
                const response = await axios.get(`https://verbalearn-back.onrender.com/users/${currentUser._id}/friends`);
                setFriends(response.data);
            } catch (error) {
                console.error('Error fetching user friends:', error);
            }
        };

        fetchAllUsers();
        fetchUserFriends();
    }, [currentUser._id]);

    // Function to handle search
    const handleSearch = () => {
        if (!searchTerm) return; // Skip searching if the term is empty
        const results = allUsersData.filter(user =>
            user.nickname.toLowerCase().includes(searchTerm.toLowerCase()) &&
            user.nickname !== currentUser?.nickname // Exclude current user from search results
        );
        setSearchResults(results);
    };

    const isFriend = (userId) => {
        return friends.some(friend => friend._id === userId);
    };

    // Function to handle adding a user as friend
    const handleAddFriend = async (friend) => {
        if (isFriend(friend._id)) return; // Prevent adding if already a friend

        try {
            // Make a POST request to add friend to the current user
            await axios.post(`https://verbalearn-back.onrender.com/users/${currentUser._id}/friends`, {
                friendId: friend._id
            });
            setFriends([...friends, friend]);
        } catch (error) {
            console.error('Error adding friend:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Friend Search</h2>
            <input
                type="text"
                placeholder="Search for users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-primary" style={{ margin: '20px' }} onClick={handleSearch}>Search</button>

            <h3>Search Results</h3>
            <div className="row">
                {searchResults.length === 0 ? (
                    <p>No results found or you haven't entered your friend's nickname yet.</p>
                ) : (
                    searchResults.map(user => (
                        <div key={user._id} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{user.nickname}</h5>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleAddFriend(user)}
                                        disabled={isFriend(user._id)}
                                    >
                                        {isFriend(user._id) ? 'Already added' : 'Add friend'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default FriendSearch;

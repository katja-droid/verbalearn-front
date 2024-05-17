import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FriendSearch = () => {
    const [allUsersData, setAllUsersData] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        // Fetch all users data from your API
        const fetchAllUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5001/all-users');
                setAllUsersData(response.data);
            } catch (error) {
                console.error('Error fetching all users data:', error);
            }
        };

        // Fetch current user data from your API
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get('http://localhost:5001/current-user');
                setCurrentUser(response.data);
            } catch (error) {
                console.error('Error fetching current user data:', error);
            }
        };

        fetchAllUsers();
        fetchCurrentUser();
    }, []);

    // Function to handle search
    const handleSearch = () => {
        if (!searchTerm) return; // Skip searching if the term is empty
        const results = allUsersData.filter(user =>
            user.nickname.toLowerCase().includes(searchTerm.toLowerCase()) &&
            user.nickname !== currentUser?.nickname // Exclude current user from search results
        );
        setSearchResults(results);
    };

    // Function to handle adding a user as friend
    const handleAddFriend = async (friend) => {
        try {
            // Make a POST request to add friend to the current user
            await axios.post('http://localhost:5001/add-friend', { friendId: friend.id });
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
                {searchResults.map(user => (
                    <div key={user.id} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{user.nickname}</h5>
                                <button className="btn btn-primary" onClick={() => handleAddFriend(user)}>Add Friend</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FriendSearch;

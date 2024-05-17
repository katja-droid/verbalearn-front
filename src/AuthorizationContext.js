import React, { createContext, useState, useContext } from 'react';

// Sample user data (replace with your actual user data)
const allUsers = []; // Initialize with your user data

const AuthorizationContext = createContext();

// Custom hook to use the authorization context
export const useAuthorization = () => {
    return useContext(AuthorizationContext);
};

// Authorization provider component
export const AuthorizationProvider = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState('');
   
    const login = (nickname, password) => {
        const user = allUsers.find(user => user.nickname === nickname && user.password === password);
        
        if (user) {
            setIsAuthorized(true); // Update isAuthorized state upon successful login
            setCurrentUser(user);
            
            return true;
        } else {
            setError('Invalid nickname or password');
            return false;
        }
    };

    const logout = () => {
        setIsAuthorized(false);
        setCurrentUser(null);
    };

    // Function to add a friend to the current user
    const addFriendToCurrentUser = (friend) => {
        setCurrentUser(prevUser => ({
            ...prevUser,
            friends: [...prevUser.friends, friend]
        }));
    };

    return (
        <AuthorizationContext.Provider value={{ allUsers, isAuthorized, setIsAuthorized, currentUser, login, logout, addFriendToCurrentUser, error }}>
            {children}
        </AuthorizationContext.Provider>
    );
};

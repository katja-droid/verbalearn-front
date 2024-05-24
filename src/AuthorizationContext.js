import React, { createContext, useState, useContext } from 'react';

const AuthorizationContext = createContext();

export const useAuthorization = () => {
    return useContext(AuthorizationContext);
};

export const AuthorizationProvider = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const login = (userData) => {
        setIsAuthorized(true);
        setCurrentUser(userData);
    };

    const logout = () => {
        setIsAuthorized(false);
        setCurrentUser(null);
    };

    const addFriendToCurrentUser = (friend) => {
        setCurrentUser(prevUser => ({
            ...prevUser,
            friends: [...prevUser.friends, friend]
        }));
    };

    return (
        <AuthorizationContext.Provider value={{ isAuthorized, currentUser, setCurrentUser, setIsAuthorized, login, logout, addFriendToCurrentUser }}>
            {children}
        </AuthorizationContext.Provider>
    );
};

import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthorizationContext = createContext();

export const useAuthorization = () => {
    return useContext(AuthorizationContext);
};

export const AuthorizationProvider = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // Check if user is already logged in from local storage
        const storedUser = localStorage.getItem('currentUser');
        const storedAuthorization = localStorage.getItem('isAuthorized');

        if (storedUser && storedAuthorization) {
            setCurrentUser(JSON.parse(storedUser));
            setIsAuthorized(JSON.parse(storedAuthorization));
        }
    }, []);

    const login = (userData) => {
        setIsAuthorized(true);
        setCurrentUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
        localStorage.setItem('isAuthorized', JSON.stringify(true));
    };

    const logout = () => {
        setIsAuthorized(false);
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isAuthorized');
    };

    const addFriendToCurrentUser = (friend) => {
        setCurrentUser(prevUser => ({
            ...prevUser,
            friends: [...prevUser.friends, friend]
        }));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    };

    return (
        <AuthorizationContext.Provider value={{ isAuthorized, currentUser, setCurrentUser, setIsAuthorized, login, logout, addFriendToCurrentUser }}>
            {children}
        </AuthorizationContext.Provider>
    );
};

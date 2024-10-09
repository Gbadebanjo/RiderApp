import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);

    const updateUserDetails = (details) => {
        setUserDetails(details);
    };

    useEffect(() => {
        console.log('userDetails:', userDetails);
    }, [userDetails]);

    return (
        <UserContext.Provider value={{ userDetails, updateUserDetails }}>
            {children}
        </UserContext.Provider>
    );
};
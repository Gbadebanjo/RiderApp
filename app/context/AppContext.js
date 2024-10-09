import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        if (userDetails) {
            // Perform your update logic here, e.g., save userDetails to local storage or make API calls
            // console.log("User details updated:", userDetails);
        }
    }, [userDetails]); 

    return (
        <AppContext.Provider value={{ userDetails, setUserDetails }}>
            {children}
        </AppContext.Provider>
    );
}
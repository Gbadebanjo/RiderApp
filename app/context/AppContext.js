import React, { createContext, useEffect, useState} from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        console.log('userDetails:', userDetails);
    }, [userDetails]);

    
    return (
        <AppContext.Provider value={{ userDetails, setUserDetails }}>
            {children}
        </AppContext.Provider>
    );
}
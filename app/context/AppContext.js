import React, { createContext, useState} from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);
    return (
        <AppContext.Provider value={{ userDetails, setUserDetails }}>
            {children}
        </AppContext.Provider>
    );
}
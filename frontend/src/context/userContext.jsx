// src/context/userContext.js

import React, { createContext, useState } from "react";

// Create a context
export const UserContext = createContext();

// Create a provider component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Update user (on login)
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Clear user (on logout)
  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

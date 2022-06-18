import React, { createContext, useState } from "react";

export const addData = createContext("");
export const updateData = createContext("");
export const deleteUserDataContext = createContext("");
export const loginContext = createContext("");

const ContextProvider = ({ children }) => {
  const [userData, setuserData] = useState("");
  const [updateUserData, setupdateUserData] = useState("");
  const [deleteUserData, setdeleteUserData] = useState("");
  const [loginData, setloginData] = useState("");
  return (
    <loginContext.Provider value={[loginData, setloginData]}>
      <addData.Provider value={[userData, setuserData]}>
        <updateData.Provider value={[updateUserData, setupdateUserData]}>
          <deleteUserDataContext.Provider
            value={[deleteUserData, setdeleteUserData]}
          >
            {children}
          </deleteUserDataContext.Provider>
        </updateData.Provider>
      </addData.Provider>
    </loginContext.Provider>
  );
};

export default ContextProvider;

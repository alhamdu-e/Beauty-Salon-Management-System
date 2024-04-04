import { createContext, useContext, useState } from "react";
import React from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [userId, setUserId] = useState(localStorage.getItem("userid"));
	const [userName, setUserName] = useState(localStorage.getItem("userName"));
	const [userData, setUserData] = useState([]);
	return (
		<UserContext.Provider
			value={{
				userId,
				setUserId,
				setUserName,
				userName,
				userData,
				setUserData,
			}}>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => {
	const context = useContext(UserContext);
	return context;
};

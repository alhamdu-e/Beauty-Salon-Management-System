import { createContext, useContext, useState } from "react";
import React from "react";

const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
	// const tokens = localStorage.getItem("token");
	const [token, setToken] = useState("");
	const [usertype, setUserType] = useState("");
	return (
		<Authcontext.Provider value={{ token, setToken, usertype, setUserType }}>
			{children}
		</Authcontext.Provider>
	);
};

export const useAuthContext = () => {
	const context = useContext(Authcontext);
	return context;
};

import { createContext, useContext, useState } from "react";
const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
	const [token, settoken] = useState(localStorage.getItem("token") || null);
	const login = (token) => {
		settoken(token);
		localStorage.setItem("token", token);
	};
	const logout = () => {
		settoken(null);
		localStorage.setItem("token", null);
	};
	return (
		<Authcontext.Provider value={{ token, login, logout }}>
			{children}
		</Authcontext.Provider>
	);
};

export const useAuth = () => useContext(Authcontext);

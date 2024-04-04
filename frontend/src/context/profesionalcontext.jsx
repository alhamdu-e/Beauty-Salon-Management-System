import { createContext, useContext, useState } from "react";
import React from "react";

const ProfesionalContext = createContext();

export const ProfesionalProvider = ({ children }) => {
	const [profesionalId, setProfesionaId] = useState(0);
	return (
		<ProfesionalContext.Provider value={{ profesionalId, setProfesionaId }}>
			{children}
		</ProfesionalContext.Provider>
	);
};

export const useProfesionalContext = () => {
	const context = useContext(ProfesionalContext);
	return context;
};

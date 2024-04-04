import { createContext, useContext, useState } from "react";
import React from "react";

const CartContext = createContext();

export const ProductProvider = ({ children }) => {
	const [product, setProductt] = useState([]);
	const [service, setServicee] = useState([]);
	const [employee, setEmployeee] = useState([]);
	return (
		<CartContext.Provider
			value={{
				product,
				setProductt,
				service,
				setServicee,
				employee,
				setEmployeee,
			}}>
			{children}
		</CartContext.Provider>
	);
};

export const useServiceProdctContext = () => {
	const context = useContext(CartContext);
	return context;
};

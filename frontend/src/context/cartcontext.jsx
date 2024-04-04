import { createContext, useContext, useState } from "react";
import React from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cartLength, setCartLength] = useState(0);
	const [items, setItems] = useState(JSON.parse(localStorage.getItem("cart")));
	return (
		<CartContext.Provider
			value={{ cartLength, setCartLength, items, setItems }}>
			{children}
		</CartContext.Provider>
	);
};

export const useCartContext = () => {
	const context = useContext(CartContext);
	return context;
};

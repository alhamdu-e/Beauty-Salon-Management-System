import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/styles/main.css";
import { AuthProvider } from "./context/Autcontext";
import { CartProvider } from "./context/cartcontext";
import { ProductProvider } from "./context/productAndServicecomtext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AuthProvider>
			<CartProvider>
				<ProductProvider>
					<App />
				</ProductProvider>
			</CartProvider>
		</AuthProvider>
	</React.StrictMode>
);

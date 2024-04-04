import React from "react";

import Header from "../Header";
import Hero from "../Hero";
import Product from "../Product";
import Services from "../Services";
import Gallery from "../Gallery";
import Calltoaction from "../Calltoaction";
import Footer from "../Footer";
import { useRef } from "react";
import { AuthProvider } from "../../context/Autcontext";

function Home() {
	const service = useRef(null);
	return (
		<div>
			<Header service={service} />
			<Hero />
			<Services service={service} />
			<AuthProvider>
				<Product />
			</AuthProvider>
			<Gallery />
			<Calltoaction />
			<Footer />
		</div>
	);
}
export default Home;
// This is a comment

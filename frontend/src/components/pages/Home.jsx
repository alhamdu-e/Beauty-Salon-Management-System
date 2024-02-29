import Header from "../Header";
import Hero from "../Hero";
import Services from "../Services";
import Gallery from "../Gallery";
import Calltoaction from "../Calltoaction";
import Footer from "../Footer";
import { useRef } from "react";

function Home() {
	const service = useRef(null);
	return (
		<div>
			<Header service={service} />
			<Hero />
			<Services service={service} />
			<Gallery />

			<Calltoaction />
			<Footer />
		</div>
	);
}
export default Home;

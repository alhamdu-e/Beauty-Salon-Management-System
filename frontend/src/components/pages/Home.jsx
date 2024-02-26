import Header from "../Header";
import Hero from "../Hero";
import Services from "../Services";
import Product from "../Product";
import Gallery from "../Gallery";
import Calltoaction from "../Calltoaction";
import Footer from "../Footer";

function Home() {
	return (
		<div>
			<Header />
			<Hero />
			<Product/>
			<Services />
			<Gallery />
               
			<Calltoaction />
			<Footer />
		</div>
	);
}
export default Home;

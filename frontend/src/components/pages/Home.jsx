import Header from "../Header";
import Hero from "../Hero";
import Product from '../Product';
import Services from "../Services";
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
// This is a comment

const productContainer = document.querySelector('.product-list');

// Trigger the slide animation on click or touch
productContainer.addEventListener('click', startSlideAnimation);
productContainer.addEventListener('touchstart', startSlideAnimation);

function startSlideAnimation() {
  const productFrames = document.querySelectorAll('.producteachframe');
  productFrames.forEach((frame) => {
    frame.style.animationPlayState = 'running';
  });
}
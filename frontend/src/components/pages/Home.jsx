import Header from "../Header";
import Hero from "../Hero";
import Product from "../Product";
import Services from "../Services";
import Gallery from "../Gallery";
import Calltoaction from "../Calltoaction";
import Footer from "../Footer";
import { useRef } from "react";
import Products from "../Product";

function Home() {
  const service = useRef(null);
  return (
    <div>
      <Header service={service} />
      <Hero />
      <Services service={service} />
      <Product />
      <Gallery />
      <Calltoaction />
      <Footer />
    </div>
  );
}
export default Home;
// This is a comment

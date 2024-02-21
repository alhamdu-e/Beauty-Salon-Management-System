import "../assets/styles/product.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Products() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
  
    <div>
        <Carousel responsive={responsive}>


      <p className="productfeature">Products</p>
      <div className="productframe">
      <div className="product-list">
      <div className="producteachframe">
           <img src="./images/oliv oil.jpg" alt="" className="product-image" />
          <p className="product-title">Product 1</p>
           <p className="product-description">
             Description of Product 1 goes here...
           </p>
          <button className="add-to-cart">Add to Cart</button>
      </div>
        <div className="producteachframe">
          <img src="./images/oliv oil.jpg" alt="" className="product-image" />
          <p className="product-title">Product 2</p>
          <p className="product-description">
            Description of Product 2 goes here...
          </p>
          <button className="add-to-cart">Add to Cart</button>
        </div>
        <div className="producteachframe">
          <img src="./images/oliv oil.jpg" alt="" className="product-image" />
          <p className="product-title">Product 3</p>
          <p className="product-description">
            Description of Product 3 goes here...
          </p>
          <button className="add-to-cart">Add to Cart</button>
        </div>
        <div className="producteachframe">
          <img src="./images/oliv oil.jpg" alt="" className="product-image" />
          <p className="product-title">Product 4</p>
          <p className="product-description">
            Description of Product 4 goes here...
          </p>
          <button className="add-to-cart">Add to Cart</button>
        </div>
        <div className="producteachframe">
          <img src="./images/oliv oil.jpg" alt="" className="product-image" />
          <p className="product-title">Product 5</p>
          <p className="product-description">
            Description of Product 5 goes here...
          </p>
          <button className="add-to-cart">Add to Cart</button>
        </div>
        <div className="producteachframe">
          <img src="./images/oliv oil.jpg" alt="" className="product-image" />
          <p className="product-title">Product 6</p>
          <p className="product-description">
            Description of Product 6 goes here...
          </p>
          <button className="add-to-cart">Add to Cart</button>
        </div>
        
     
      </div>
      </div>
      </Carousel>;
    </div>
    
  );
}

export default Products;
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
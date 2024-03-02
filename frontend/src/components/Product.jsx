import "../assets/styles/product.css";


function Products() {
  return (
    <div>
      <div className="productframe">
      <p className="productfeature">Products</p>
      
      <div className="product-list">
      <div className="producteachframe">
           <img src="./images/oliv oil.jpg" alt="" className="product-image" />
          <p className="product-title">olve oil</p>
           <p className="product-description">
             Description of Product 1 
           </p>
          <button className="add-to-cart">Cart</button>
      </div>
        <div className="producteachframe">
          <img src="./images/oliv oil.jpg" alt="" className="product-image" />
          <p className="product-title">Product 2</p>
          <p className="product-description">
            Description of Product 2 
          </p>
          <button className="add-to-cart">Cart</button>
        </div>
        <div className="producteachframe">
          <img src="./images/oliv oil.jpg" alt="" className="product-image" />
          <p className="product-title">Product 3</p>
          <p className="product-description">
            Description of Product 3 
          </p>
          <button className="add-to-cart">Cart</button>
        </div>
        <div className="producteachframe">
          <img src="./images/oliv oil.jpg" alt="" className="product-image" />
          <p className="product-title">Product 4</p>
          <p className="product-description">
            Description of Product 4 
          </p>
          <button className="add-to-cart">Cart</button>
        </div>
        <div className="producteachframe">
          <img src="./images/oliv oil.jpg" alt="" className="product-image" />
          <p className="product-title">Product 5</p>
          <p className="product-description">
            Description of Product 5
          </p>
          <button className="add-to-cart">Cart</button>
        </div>
       
      </div>
      </div>
    </div>
    
  );
}
export default Products;

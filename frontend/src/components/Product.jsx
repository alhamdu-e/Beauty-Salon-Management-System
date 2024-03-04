import "../assets/styles/product.css";

function Products() {
  return (
    <div>
      <div className="productframe">
        <p className="productfeature">Products</p>

        <div className="product-list">
          <div className="producteachframe">
            <img
              src="./images/extension.jpg"
              alt=""
              className="product-image"
            />
            <p className="product-title">Hair Extension</p>
            <p className="product-price">15000 Birr</p>
          </div>
          <div className="producteachframe">
            <img src="./images/masc.jpg" alt="" className="product-image" />
            <p className="product-title">Wonder Mascara</p>
            <p className="product-price">1000 Birr</p>
          </div>
          <div className="producteachframe">
            <img
              src="./images/foundation.png"
              alt=""
              className="product-image"
            />
            <p className="product-title">MAC Foundation</p>
            <p className="product-price">5000 Birr</p>
          </div>
          <div className="producteachframe">
            <img src="./images/neutro.jpg" alt="" className="product-image" />
            <p className="product-title">Facial Wash </p>
            <p className="product-price">3000 Birr</p>
          </div>
          <div className="producteachframe">
            <img src="./images/OIP.jpg" alt="" className="product-image" />
            <p className="product-title">Makeup Brushes</p>
            <p className="product-price">1100 Birr</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Products;

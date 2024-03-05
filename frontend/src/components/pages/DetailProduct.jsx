import React, { useState } from "react";
import "../../assets/styles/detailproduct.css";
import Header from "../Header";

export default function DetailProduct() {
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleSubtract = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      <Header />
      <div className="divide">
        <div className="image-side">
          <img
            src="./images/neutro.jpg"
            alt=""
            className="productdetail-image"
          />
        </div>
        <div>
          <p className="detail-title">Facial Wash </p>

          <p className="detailprice">15000 Birr</p>
          <p className="product-detail">
            The Neutrogena Facial Wash is a high-quality skincare product
            designed to cleanse and refresh your skin. Formulated by the
            renownedbrand Neutrogena, this facial wash offers a gentle yet
            effective cleansing experience for all skin types.
          </p>
          <div className="detailbox">
            <span className="detailplus" onClick={handleAdd}>
              &#43;
            </span>
            <span className="detailquantity">{quantity}</span>
            <span className="detailminus" onClick={handleSubtract}>
              &#8722;
            </span>
          </div>
          <button className="detailcart"> ADD TO CART</button>
        </div>
      </div>
    </div>
  );
}

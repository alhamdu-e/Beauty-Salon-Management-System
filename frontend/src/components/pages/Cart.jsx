import "../../assets/styles/cart.css";
import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import Header from "../Header";

function Cart() {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div>
      {" "}
      <Header />
      <div className="whole">
        <h1 className="carthead"> Service Cart</h1>

        <div className="ll">
          <div className="cartcontainer">
            <div className="cart-image-container">
              <img src="./images/G7.jpg" alt="" className="cart-image" />
            </div>
          </div>
          <div className="middle">
            <div className="pad">
              <p className="cart-title">EyeLash Extension</p>
              <div className="boxcart">
                <span className="plus" onClick={handleIncrement}>
                  &#43;
                </span>
                <span className="plus">{quantity}</span>
                <span className="minuscart" onClick={handleDecrement}>
                  &#8722;
                </span>
              </div>
              <p className="price">300.00 Birr</p>
              <MdOutlineCancel className="cancel-icon" />
            </div>

            <hr className="middlehr" />
          </div>

          <div className="leftside">
            <p className="checkout">CHECK OUT</p>
            <p className="totaltitle">Total price</p>
            <p className="subtotal">1200 Birr</p>
            <hr className="lefthr" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;

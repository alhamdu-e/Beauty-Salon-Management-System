import "../../assets/styles/cart.css";
import React, { useState } from 'react';
import { MdOutlineCancel } from "react-icons/md";
function Cart (){
        const [quantity, setQuantity] = useState(0);
      
        const handleIncrement = () => {
          setQuantity(quantity + 1);
        };
      
        const handleDecrement = () => {
          if (quantity > 0) {
            setQuantity(quantity - 1);
          }
        };
    return(
     
        <div className="whole">
             <h className="carthead"> Service Cart</h>
            
            <div className="ll">
            <div className="cart container">
            <div className="cart-image-container">
            <img src="./images/G7.jpg" alt="" className="cart-image"/>
            </div>
            </div>
           <div>
            <div><p className="cart-title">EyeLash Extension</p> 
            <p className="price">300.00 Birr</p>
            <MdOutlineCancel className="cancel-icon"  /></div>
      <div><span className="plus"onClick={handleIncrement}>&#43;</span>
            <span className="cartquantity">{quantity}</span>
            <span className="minus" onClick={handleDecrement}>&#8722;</span> 
            </div>      </div>
          
            <div className="leftside">
                <p>Total price</p>
            </div>
            </div>
        </div>
      
    )

}
export default Cart


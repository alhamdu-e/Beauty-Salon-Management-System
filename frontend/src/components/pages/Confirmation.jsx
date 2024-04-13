import React from "react";
import "../../assets/styles/confirm.css";

export default function Confirmation() {
  console.log(new Date());
  return (
    <div className="container-confirm">
      <span className="check-mark"> &#10003;</span>
      <p className="sucessconfirm">The Payment is successfully </p>
      <p className="detailconfirm">
        Your payment has been processed! Detail of transaction are included
        below
      </p>

      <hr className="confirmhr" />
      <p className="confirmprice">Total Price: 100 Birr</p>
      <p className="confirmtotal">Quantity: 10</p>
      <p className="confirmdate">Date: 2024-04-12</p>
    </div>
  );
}

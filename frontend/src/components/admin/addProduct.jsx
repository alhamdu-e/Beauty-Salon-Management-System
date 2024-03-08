import "../../assets/styles/Admin/addProduct.css";
import { useState } from "react";

function AddProduct(props) {
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [errors, setErrors] = useState({});

  const handleProductName = (event) => {
    setProductName(event.target.value);
  };

  const handleProductDesc = (event) => {
    setProductDesc(event.target.value);
  };

  const handleProductPrice = (event) => {
    setProductPrice(event.target.value);
  };

  const handleProductImage = (event) => {
    setProductImage(event.target.files[0]);
  };

  const validateForm = () => {
    const errors = {};

    if (!productName.trim()) {
      errors.productName = "Product Name is required";
    } else if (!isNaN(productName.trim())) {
      errors.productName = "Product Name cannot be a number";
    }

    if (!productDesc.trim()) {
      errors.productDesc = "Product Description is required";
    } else if (productDesc.trim().length < 20) {
      errors.productDesc =
        "Product Description should be at least 20 characters long";
    } else if (!isNaN(productDesc.trim())) {
      errors.productDesc = "Product Description cannot be a number";
    }

    if (!productPrice) {
      errors.productPrice = "Product Price is required";
    } else if (Number(productPrice) < 100) {
      errors.productPrice = "Product Price must be at least 200 birr";
    }

    if (!productImage) {
      errors.productImage = "Product Image is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Create a new FormData object
    const formData = new FormData();

    // Append each property of addProduct to the FormData object
    formData.append("productName", productName);
    formData.append("productDesc", productDesc);
    formData.append("productPrice", productPrice);
    formData.append("productImage", productImage);

    try {
      const response = await fetch("http://127.0.0.1:5000/addProduct", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Product added successfully");
        const responseData = await response.json();
        console.log(responseData.message);
      } else {
        console.log("Failed to add product:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div>
      <div className="conatnerforaddproduct">
        <button className="add">&#43;</button>
        <button className="manage-employe-button" onClick={props.handleProduct}>
          Manage Product
        </button>
      </div>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="addProduct container">
          <div>
            <label htmlFor="productname">Product Name</label>
            <input
              type="text"
              name="productname"
              id="productname"
              placeholder="Product Name"
              onChange={handleProductName}
            />
            {errors.productName && (
              <p className="error">{errors.productName}</p>
            )}
          </div>

          <div>
            <label htmlFor="productdesc">Product Description</label>
            <input
              type="text"
              name="productdesc"
              id="productdesc"
              placeholder="Product Description"
              onChange={handleProductDesc}
            />
            {errors.productDesc && (
              <p className="error">{errors.productDesc}</p>
            )}
          </div>

          <div>
            <label htmlFor="product-price">Product Price</label>
            <input
              type="text"
              name="productprice"
              id="productprice"
              placeholder="Product Price"
              onChange={handleProductPrice}
            />
            {errors.productPrice && (
              <p className="error">{errors.productPrice}</p>
            )}
          </div>

          <div>
            <label htmlFor="product-image">Product Image</label>
            <input
              type="file"
              name="productimage"
              id="productimage"
              placeholder="Your Adress"
              onChange={handleProductImage}
            />
            {errors.productImage && (
              <p className="error">{errors.productImage}</p>
            )}
          </div>

          <div>
            <button className="addProduct-a">Add Product</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;

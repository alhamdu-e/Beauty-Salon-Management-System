import "../../assets/styles/Admin/editProduct.css";
import { useState, useEffect } from "react";

function EditProduct(props) {
  const [productData, setProductData] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Function to retrieve data from local storage
    const retrieveProductDataFromLocalStorage = () => {
      const storedData = localStorage.getItem("productData");
      if (storedData) {
        setProductData(JSON.parse(storedData));
      }
    };
    // Call the function when component mounts
    retrieveProductDataFromLocalStorage();
  }, []);

  useEffect(() => {
    // Update state with local storage data
    if (productData.length > 0) {
      setProductName(productData[0].productname);
      setProductDesc(productData[0].productdesc);
      setProductPrice(productData[0].productprice);
      setProductQuantity(productData[0].productprice);
    }
  }, [productData]);

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
  const handleProductQuantity = (event) => {
    setProductQuantity(event.target.value);
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
    } else if (productDesc.trim().length < 10) {
      errors.productDesc =
        "Product Description should be at least 10 characters long";
    } else if (
      /^\d+$/.test(productDesc.trim()) ||
      /^\d+\s/.test(productDesc.trim())
    ) {
      errors.productDesc =
        "Product Description should contain a combination of numbers and characters";
    }

    if (!productPrice) {
      errors.productPrice = "Product Price is required";
    } else if (isNaN(Number(productPrice))) {
      errors.productPrice = "Product Price must be a number";
    } else if (!Number.isInteger(Number(productPrice))) {
      errors.productPrice = "Product Price must be integer";
    } else if (Number(productPrice) < 200 || Number(productPrice) > 9999) {
      errors.productPrice =
        "Product Price must be greater than 200 and less than 9999 Birr";
    }

    if (!productQuantity) {
      errors.productQuantity = "Product Quantity is required";
    } else if (Number(productQuantity) > 1000) {
      errors.productQuantity = "Product Quantity must be greater than 1000";
    }
    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productDesc", productDesc);
    formData.append("productPrice", productPrice);
    formData.append("productImage", productImage);
    formData.append("productId", productData[0].id);
    formData.append("productQuantity", productQuantity);
    try {
      const response = await fetch("http://127.0.0.1:5000/editProduct", {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        console.log("Product edited successfully");
        const responseData = await response.json();
        console.log(responseData.message);
      } else {
        console.log("Failed to edit product:", response.statusText);
      }
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  return (
    <div>
      <div className="conatnerforeditproduct">
        <button className="manage-product-button" onClick={props.handleProduct}>
          Manage Product
        </button>
      </div>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="editProduct container">
          <div>
            <label htmlFor="productname">Product Name</label>
            <input
              type="text"
              name="productname"
              id="productname"
              placeholder="Product Name"
              onChange={handleProductName}
              value={productName}
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
              value={productDesc}
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
              value={productPrice}
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
              placeholder="Product Image"
              onChange={handleProductImage}
            />
            {errors.productImage && (
              <p className="error">{errors.productImage}</p>
            )}
          </div>
          <div>
            <label htmlFor="product-quantity">Product Quantity</label>
            <input
              type="number"
              name="productquantity"
              id="productquantity"
              placeholder="Product Quantity"
              onChange={handleProductQuantity}
              value={productQuantity}
              min={1}
            />
            {errors.productQuantity && (
              <p className="error">{errors.productQuantity}</p>
            )}
          </div>
          <div>
            <button className="editProduct-a">Edit Product</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;

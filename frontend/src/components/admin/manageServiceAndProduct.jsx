import React from "react";

import "../../assets/styles/Admin/manageproduct.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/Autcontext";
import { useNavigate } from "react-router-dom";
function ManageProduct(props) {
	const [product, setProduct] = useState([]);
	const [service, setService] = useState([]);
	const { token } = useAuthContext();
	const navigate = useNavigate();
	const [showDeleteProduct, setShowDeleteProduct] = useState(false);
	const [showDeleteService, setShowDeleteService] = useState(false);

	const [ordeid, setOrderId] = useState("");

	useEffect(() => {
		fetch("http://127.0.0.1:5000/product", {
			method: "Get",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setProduct(data);
			});
		fetch("http://127.0.0.1:5000/service", {
			method: "Get",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					navigate("/404page", { replace: true });
				}
			})
			.then((data) => {
				setService(data);
				console.log(service);
			});
	}, []);

	const handleDeleteService = async (serviceid) => {
		const response = await fetch(`http://127.0.0.1:5000/service/${serviceid}`, {
			method: "Delete",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		if (response.ok) {
			const data = await response.json();
			setService(data);
		} else {
			console.error("Failed to fetch product data");
		}
	};
	const handleDeleteProduct = async (productid) => {
		const response = await fetch(`http://127.0.0.1:5000/product/${productid}`, {
			method: "Delete",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		if (response.ok) {
			const data = await response.json();
			setProduct(data);
		} else {
			console.error("Failed to fetch product data");
		}
	};
	return (
		<div>
			<div className="employedata-conatiner">
				{props.isService && (
					<>
						<button className="add" onClick={props.handleAddService}>
							&#43;
						</button>
						<button className="manage-employe-button">Manage Service</button>
					</>
				)}

				{props.isProduct && (
					<>
						<button className="add" onClick={props.handleAddProduct}>
							&#43;
						</button>
						<button className="manage-employe-button">Manage Product</button>
					</>
				)}
				<table>
					{props.isService && (
						<>
							<tr>
								<th>Service Name</th>
								<th>Service Desc</th>
								<th>Salon Price</th>
								<th>Home Price</th>
								<th>Service Catagory</th>
								<th>Service Duration</th>
								<th>Service Image</th>

								<th colSpan={2}>Action</th>
							</tr>

							{service?.map((service) => (
								<tr key={service.id}>
									<td>{service.servicename}</td>

									<td>{service.servicedesc}</td>

									<td>{service.serviceprice}</td>
									<td>{service.servicehomeprice}</td>

									<td>{service.servicecatagory}</td>
									<td>{service.serviceduration}</td>
									<td>
										<img
											src={service.serviceimage}
											alt=""
											className="image-admin"
										/>
									</td>
									<td>
										<button
											className="action"
											onClick={() => {
												props.handleEditService(service.id);
												props.handleShowEditService();
											}}>
											Edit
										</button>
									</td>
									<td>
										<button
											className="action delete"
											onClick={() => {
												setOrderId(service.id);

												setShowDeleteService(true);
											}}>
											Delete
										</button>
									</td>
								</tr>
							))}
						</>
					)}
					{props.isService && service.length == 0 && (
						<h1 className="no" style={{ fontSize: "44px" }}>
							NO Service
						</h1>
					)}

					{props.isProduct && (
						<>
							<tr>
								<th>Product Name</th>
								<th>Product Desc</th>
								<th>Product Price</th>
								<th>Quantity</th>
								<th>Product Image</th>
								<th colSpan={2}>Action</th>
							</tr>
							{product.map((product) => (
								<tr key={product.id}>
									<td>{product.productname}</td>
									<td>{product.productdesc}</td>
									<td>{product.productprice}</td>
									<td>{product.quantity}</td>
									<td>
										<img
											src={product.productimage}
											alt=""
											className="image-admin"
										/>
									</td>
									<td>
										<button
											className="action"
											onClick={() => {
												props.handleShowEditProduct();
												props.handleEditProduct(product.id);
											}}>
											Edit
										</button>
									</td>
									<td>
										<button
											className="action delete"
											onClick={() => {
												setOrderId(product.id);
												setShowDeleteProduct(true);
											}}>
											Delete
										</button>
									</td>
								</tr>
							))}
						</>
					)}
					{props.isProduct && product.length == 0 && (
						<h1 className="no" style={{ fontSize: "44px" }}>
							NO Product
						</h1>
					)}
				</table>
			</div>

			{showDeleteProduct && (
				<>
					<div className="popup-container">
						<div className="popup">
							<p style={{ marginTop: "0px", marginBottom: "30px" }}>
								Do You Want To Delete The Product?
							</p>
							<span
								className="check-mark"
								style={{
									fontSize: "14px",
									padding: "14px 15px",
									cursor: "pointer",
									backgroundColor: "#ac2626",
								}}
								onClick={() => {
									setShowDeleteProduct(false);
									handleDeleteProduct(ordeid);
									props.handleShowPopup();
								}}>
								{" "}
								Yes
							</span>
							<span
								className="check-mark"
								style={{
									fontSize: "14px",
									padding: "14px 15px",
									cursor: "pointer",
									backgroundColor: "#67ac26",
									marginLeft: "30px",
								}}
								onClick={() => {
									setShowDeleteProduct(false);
								}}>
								{" "}
								No
							</span>
						</div>
					</div>
				</>
			)}

			{showDeleteService && (
				<>
					<div className="popup-container">
						<div className="popup">
							<p style={{ marginTop: "0px", marginBottom: "30px" }}>
								Do You Want To Delete The Service?
							</p>
							<span
								className="check-mark"
								style={{
									fontSize: "14px",
									padding: "14px 15px",
									cursor: "pointer",
									backgroundColor: "#ac2626",
								}}
								onClick={() => {
									setShowDeleteService(false);
									handleDeleteService(ordeid);
									props.handleShowPopup();
								}}>
								{" "}
								Yes
							</span>
							<span
								className="check-mark"
								style={{
									fontSize: "14px",
									padding: "14px 15px",
									cursor: "pointer",
									backgroundColor: "#67ac26",
									marginLeft: "30px",
								}}
								onClick={() => {
									setShowDeleteService(false);
								}}>
								{" "}
								No
							</span>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
export default ManageProduct;

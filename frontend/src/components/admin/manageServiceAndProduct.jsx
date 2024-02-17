import "../../assets/styles/Admin/manageproduct.css";
import { useEffect, useState } from "react";
function ManageProduct(props) {
	const [product, setProduct] = useState([]);
	useEffect(() => {
		fetch("http://127.0.0.1:5000/product", {
			method: "Get",
		})
			.then((response) => response.json())
			.then((data) => {
				setProduct(data);
			});
	}, []);

	return (
		<div>
			<div className="welcome-container">
				<h1 className="welcome">Welcome Alhamdu</h1>
			</div>
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
								<th>Service Catagory</th>
								<th>Service Desc</th>
								<th>Service Price</th>
								<th>Service Image</th>

								<th colSpan={2}>Action</th>
							</tr>

							<tr>
								<td>Alfreds Futterkiste</td>
								{props.isService && (
									<>
										<td>Nail</td>
									</>
								)}
								<td>
									In React, "props" refers to properties that are passed to a
									component. It is a way to pass data from a parent component to
									its child components.
								</td>
								<td>0964</td>
								<td>
									<img
										src="../../../../../G1.jpg"
										alt=""
										className="image-admin"
									/>
								</td>
								<td>
									<button className="action">Edit</button>
								</td>
								<td>
									<button className="action delete">Delete</button>
								</td>
							</tr>
						</>
					)}

					{props.isProduct && (
						<>
							<tr>
								<th>Product Name</th>
								<th>Product Desc</th>
								<th>Product Price</th>
								<th>Product Image</th>
								<th colSpan={2}>Action</th>
							</tr>
							{product.map((product) => (
								<tr key={product.id}>
									<td>{product.productname}</td>
									<td>{product.productdesc}</td>
									<td>{product.productprice}</td>
									<td>
										<img
											src={product.productimage}
											alt=""
											className="image-admin"
										/>
									</td>
									<td>
										<button className="action">Edit</button>
									</td>
									<td>
										<button className="action delete">Delete</button>
									</td>
								</tr>
							))}
						</>
					)}
				</table>
			</div>
		</div>
	);
}
export default ManageProduct;

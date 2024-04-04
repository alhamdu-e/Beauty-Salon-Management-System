import React from "react";

export default function ErrorPage() {
	return (
		<div
			style={{
				width: "400px",
				margin: "auto",
				marginTop: "200px",
				paddingLeft: "100px",
			}}>
			<h1 style={{ fontSize: "75px", marginBottom: "12px" }}>404</h1>
			<p style={{ fontSize: "16px", color: "red" }}>
				oops!something went Wrong
			</p>
		</div>
	);
}

import React from "react";

export default function ErrorPage() {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
				textAlign: "center",
			}}
		>
			<h1 style={{ fontSize: "75px", marginBottom: "12px" }}>404</h1>
			<p style={{ fontSize: "16px", color: "red" }}>
				Oops! Something went wrong.
			</p>
		</div>
	);
}
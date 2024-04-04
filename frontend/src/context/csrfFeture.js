import { useEffect, useState } from "react";

function useCsrfToken() {
	const [csrfToken, setCsrfToken] = useState("");

	useEffect(() => {
		async function fetchCsrfToken() {
			try {
				const response = await fetch("http://127.0.0.1:5000/csrf-token", {
					method: "GET",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						credentials: "include",
						mode: "cors",
					},
				});
				if (response.ok) {
					const data = await response.json();
					setCsrfToken(data.csrfToken);
				} else {
					console.error("Failed to fetch CSRF token");
				}
			} catch (error) {
				console.error("Error fetching CSRF token:", error);
			}
		}

		fetchCsrfToken();
	}, []);

	return csrfToken;
}

export default useCsrfToken;

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "../../assets/styles/rating.css";

function Rating() {
	const [rating, setRating] = useState(null);
	const [hover, setHover] = useState(null);
	return (
		<div>
			{[...Array(5)].map((star, index) => {
				const currentRating = index + 1;
				return (
					<label>
						<input
							type="radio"
							name="rating"
							value={currentRating}
							onClick={() => setRating(currentRating)}></input>
						<FaStar
							size={50}
							className="star"
							color={currentRating <= (hover || rating) ? "#ffc107" : "#3d3e44"}
							onMouseEnter={() => setHover(currentRating)}
							onMouseLeave={() => setHover(null)}></FaStar>
					</label>
				);
			})}
			<p>your rating {rating}</p>
		</div>
	);
}
export default Rating;

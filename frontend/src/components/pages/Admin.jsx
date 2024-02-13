import "../../assets/styles/admin.css";
import { FaUser } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import { MdDesignServices } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { FcRating } from "react-icons/fc";
import { IoMdHome } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import Manageemployee from "../manageEmployee";

function Admin() {
	return (
		<div>
			<div className="admin-conatiner">
				<div className="admin-sidebar">
					<div className="admin-menu">
						<div>
							<h2 className="admin-h2">Admin</h2>
						</div>
						<div>
							<div>
								<h3 className="admin-h3">Data</h3>
							</div>
							<div>
								<ul>
									<li>
										<a href="">
											{" "}
											<MdProductionQuantityLimits /> Manage Product
										</a>
									</li>
									<li>
										<a href="">
											{" "}
											<MdDesignServices /> Manage Service
										</a>
									</li>
									<li>
										<a href="">
											{" "}
											<FaUser /> Manage employee
										</a>
									</li>
									<li>
										<a href="">
											{" "}
											<FaBookOpen /> View Appointment{" "}
										</a>
									</li>
									<li>
										<a href="">
											<FcRating /> View Reviwes
										</a>
									</li>
								</ul>
							</div>
							<div>
								<h3 className="admin-h3">Pages</h3>
							</div>
							<div>
								<ul>
									<li>
										<a href="">
											<IoMdHome /> Home
										</a>
									</li>
									<li>
										<a href="">
											{" "}
											<MdDesignServices /> Service
										</a>
									</li>
									<li>
										<a href="">
											{" "}
											<MdProductionQuantityLimits /> Product
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<Manageemployee />
			</div>
		</div>
	);
}
export default Admin;

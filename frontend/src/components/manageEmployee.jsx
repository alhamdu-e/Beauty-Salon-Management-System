import "../assets/styles/managemployee.css";
function Manageemployee() {
	return (
		<div>
			<div className="welcome-container">
				<h1 className="welcome">Welcome Alhamdu</h1>
			</div>
			<div className="employedata-conatiner">
				<button className="add">&#43;</button>
				<button className="manage-employe-button">Manage Employee</button>
				<table>
					<tr>
						<th>Full Name</th>
						<th>Email</th>
						<th>Phone</th>
						<th>Age</th>
						<th>Adress</th>
						<th colSpan={2}>Action</th>
					</tr>
					<tr>
						<td>Alfreds Futterkiste</td>
						<td>Maria Anders</td>
						<td>Germany</td>
						<td>0964676678</td>
						<td>total</td>
						<td>
							<button className="action">Edit</button>
						</td>
						<td>
							<button className="action delete">Delete</button>
						</td>
					</tr>
					<tr>
						<td>Alfreds Futterkiste</td>
						<td>Maria Anders</td>
						<td>Germany</td>
						<td>0964676678</td>
						<td>total</td>
						<td>
							<button className="action">Edit</button>
						</td>
						<td>
							<button className="action delete">Delete</button>
						</td>
					</tr>
					<tr>
						<td>Alfreds Futterkiste</td>
						<td>Maria Anders</td>
						<td>Germany</td>
						<td>0964676678</td>
						<td>total</td>
						<td>
							<button className="action">Edit</button>
						</td>
						<td>
							<button className="action delete">Delete</button>
						</td>
					</tr>
					<tr>
						<td>Alfreds Futterkiste</td>
						<td>Maria Anders</td>
						<td>Germany</td>
						<td>0964676678</td>
						<td>total</td>
						<td>
							<button className="action">Edit</button>
						</td>
						<td>
							<button className="action delete">Delete</button>
						</td>
					</tr>
					<tr>
						<td>Alfreds Futterkiste</td>
						<td>Maria Anders</td>
						<td>Germany</td>
						<td>0964676678</td>
						<td>total</td>
						<td>
							<button className="action">Edit</button>
						</td>
						<td>
							<button className="action delete">Delete</button>
						</td>
					</tr>

					<tr>
						<td>Centro comercial Moctezuma</td>
						<td>Francisco Chang</td>
						<td>Mexico</td>
						<td>0964676678</td>
						<td>total</td>
						<td>
							<button className="action">Edit</button>
						</td>
						<td>
							<button className="action delete">Delete</button>
						</td>
					</tr>
					<tr>
						<td>Ernst Handel</td>
						<td>Roland Mendel</td>
						<td>Austria</td>
						<td>0964676678</td>
						<td>total</td>
						<td>
							<button className="action">Edit</button>
						</td>
						<td>
							<button className="action delete">Delete</button>
						</td>
					</tr>
					<tr>
						<td>Island Trading</td>
						<td>Helen Bennett</td>
						<td>UK</td>
						<td>0964676678</td>
						<td>total</td>
						<td>
							<button className="action">Edit</button>
						</td>
						<td>
							<button className="action delete">Delete</button>
						</td>
					</tr>
					<tr>
						<td>Laughing Bacchus Winecellars</td>
						<td>Yoshi Tannamuri</td>
						<td>Canada</td>
						<td>0964676678</td>
						<td>total</td>
						<td>
							<button className="action">Edit</button>
						</td>
						<td>
							<button className="action delete">Delete</button>
						</td>
					</tr>
					<tr>
						<td>Magazzini Alimentari Riuniti</td>
						<td>Giovanni Rovelli</td>
						<td>Italy</td>
						<td>0964676678</td>
						<td>total</td>
						<td>
							<button className="action">Edit</button>
						</td>
						<td>
							<button className="action delete">Delete</button>
						</td>
					</tr>
				</table>
			</div>
		</div>
	);
}
export default Manageemployee;

import { Link } from "react-router-dom";


export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container-fluid">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Solutions'  To The Carrera</span>
				</Link>
				<div className="d-grid gap-2 d-md-block">
					<Link to="/demo">
						<button className="btn btn-primary">Sing in</button>
						<button className="btn btn-primary">Register</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
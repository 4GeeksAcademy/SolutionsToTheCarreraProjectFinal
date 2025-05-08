import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container-fluid">
				<Link to="/" className="d-flex align-items-center mx-auto text-center">
					<img
						src="https://st4.depositphotos.com/38197074/41920/v/450/depositphotos_419209170-stock-illustration-initial-letter-vector-logo-icon.jpg"
						alt="Logo"
						className="me-2"
						style={{ width: "40px", height: "40px", borderRadius: "50%" }}
					/>
					<span className="navbar-brand mb-0 h1" style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
						Solutions' To The Carrera
					</span>
				</Link>
				<div className="d-flex justify-content-end">

					
					{
						store.token ? (
							<>
								<div className="me-2">
									<Link to="/user">
										<button className="btn btn-primary">User</button>
									</Link>
								</div>
								<div className="me-2">
									<Link to="/logout">
										<button className="btn btn-primary">Logout</button>
									</Link>
								</div>
							</>
						) : (
							<>
								<div className="me-2">
									<Link to="/singin">
										<button className="btn btn-primary">Sign in</button>
									</Link>
								</div>
								<div>
									<Link to="/register">
										<button className="btn btn-primary">Register</button>
									</Link>
								</div>
							</>
						)
					}

				</div>
			</div>
		</nav>
	);
};

export default Navbar;
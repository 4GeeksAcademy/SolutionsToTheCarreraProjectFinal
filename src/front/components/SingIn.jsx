import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
const SingIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const { store, dispatch } = useGlobalReducer();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = {
                email: email,
                password: password
            };

            const backendUrl = import.meta.env.VITE_BACKEND_URL

            if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

            const response = await fetch(`${backendUrl}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Invalid credentials");
            }

            const data = await response.json();
            console.log("Login successful:", data);

            // localStorage.setItem("token", data.token);
            //dispatch(store, { action: "login", data: { token: data.token, user: data.user } });

            dispatch({ type: "login", payload: { token: data.token, user: data.user } })
            navigate("/user");
        } catch (error) {
            console.error("Error during login:", error);
            setErrorMessage("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Sign In {JSON.stringify(store.user)}</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Sign In</button>
            </form>
        </div>
    );
};

export default SingIn;
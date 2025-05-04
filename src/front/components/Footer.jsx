import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export const Footer = () => (
	<footer className="footer mt-auto py-4 bg-dark text-center text-white">
		<div className="container">
			<div className="mb-3">
				<a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
					<FaFacebook size={24} />
				</a>
				<a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
					<FaTwitter size={24} />
				</a>
				<a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
					<FaInstagram size={24} />
				</a>
				<a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
					<FaLinkedin size={24} />
				</a>
			</div>
			<p>
				&copy; {new Date().getFullYear()} Your Company. All rights reserved.
			</p>
			<p>
				<a href="/privacy-policy" className="text-white mx-2">Privacy Policy</a> |
				<a href="/terms-of-service" className="text-white mx-2">Terms of Service</a>
			</p>
		</div>
	</footer>
);

export default Footer;
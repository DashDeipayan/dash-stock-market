import React, { useState } from "react";
import "./header.css";
import Profile from "../profile-options/profile";
import { Link } from "react-router-dom";

const Header = ({ name, email, balance }) => {
	const [showProfileOptions, setShowProfileOptions] = useState(false);
	const showOptions = () => {
		setShowProfileOptions((prev) => !prev);
	};
	const logout = () => {
		window.open("http://localhost:8090/auth/logout", "_self");
	};
	return (
		<div div className="relative mb-0">
			<div
				className={`header flex ${
					name ? "justify-between" : "justify-center"
				} p-10`}
			>
				<div className="header-name ml-14 flex items-center">
					<Link to="/buystocks">Dash Stock Market</Link>
				</div>
				{name && (
					<div className="m-5 flex gap-10">
						<div className="items-center flex mr-10 text-2xl font-extrabold font-serif text-yellow-500">
							Balance: ₹{parseFloat(balance).toFixed(3)}
						</div>
						<div className="flex flex-col cursor-pointer" onClick={showOptions}>
							<div className="flex items-center ml-5 text-xl font-bold text-blue-900">
								{name}
							</div>
							<div className="text-white">{email}</div>
						</div>
						<button
							className="ml-5 text-xl font-bold text-blue-900 hover:text-indigo-300 transition-all"
							onClick={logout}
						>
							Logout
						</button>
					</div>
				)}
			</div>
			{showProfileOptions && (
				<div className="absolute top-20 right-36">
					<Profile setShowProfileOptions={setShowProfileOptions} />
				</div>
			)}
		</div>
	);
};

export default Header;

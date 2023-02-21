import React from "react";
import "./header.css";

const Header = ({ name, email, balance }) => {
	const logout = () => {
		window.open("http://localhost:8090/auth/logout", "_self");
	};
	return (
		<div
			className={`header flex ${
				name ? "justify-between" : "justify-center"
			} p-10`}
		>
			<div className="header-name ml-14 flex items-center">
				Dash Stock Market
			</div>
			{name && (
				<div className="m-5 flex gap-10">
					<div className="items-center flex mr-10 text-2xl font-extrabold font-serif text-yellow-500">
						Balance: ₹{balance}
					</div>
					<div className="flex flex-col">
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
	);
};

export default Header;

import React from "react";
import "./header.css";

const Header = ({ name }) => {
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
				<div className="m-5 flex">
					<div className="flex mr-10">
						<div className="flex items-center ml-5 text-xl font-bold text-blue-900">
							{name}
						</div>
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

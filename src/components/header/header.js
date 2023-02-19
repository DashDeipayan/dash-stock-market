import React from "react";
import "./header.css";

const Header = ({ name, imagesrc }) => {
	const logout = () => {
		window.open("http://localhost:8090/auth/logout", "_self");
	};
	return (
		<div
			className={`header flex ${
				name && imagesrc ? "justify-between" : "justify-center"
			} p-10`}
		>
			<div className="header-name ml-14 flex items-center">
				Dash Stock Market
			</div>
			{name && imagesrc && (
				<div className="m-5 flex">
					<div className="flex mr-10">
						<img
							src={imagesrc}
							alt="user"
							className="w-14 h-14 rounded-full"
						></img>
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

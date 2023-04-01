import React from "react";
import "./footer.css";

const Footer = () => {
	return (
		<div className="footer">
			<p className="text-lg">
				This Stock Market app is deployed in this{" "}
				<a
					href="https://github.com/DashDeipayan/stock-market-engine"
					target="_blank"
					rel="noreferrer"
					className="text-blue-800 font-bold"
				>
					open source repo
				</a>
			</p>
		</div>
	);
};

export default Footer;

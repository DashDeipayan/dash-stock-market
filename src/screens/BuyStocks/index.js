import React from "react";
import Cards from "../../components/cards/cards";

const BuyStocks = () => {
	return (
		<div className="m-32 grid lg:grid-cols-3 gap-32">
			<Cards />
			<Cards />
			<Cards />
		</div>
	);
};

export default BuyStocks;

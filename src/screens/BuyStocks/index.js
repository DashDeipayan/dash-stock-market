import React from "react";
import Cards from "../../components/cards/cards";
import { useSelector } from "react-redux";

const BuyStocks = () => {
	const { stocks } = useSelector((state) => state);
	return (
		<div className="m-32 grid lg:grid-cols-3 gap-32">
			{stocks.map((data) => (
				<Cards key={data.stockId} data={data} />
			))}
		</div>
	);
};

export default BuyStocks;

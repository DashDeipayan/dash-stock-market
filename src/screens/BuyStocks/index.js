import React from "react";
import Cards from "../../components/cards/cards";
import { useSelector } from "react-redux";

const BuyStocks = () => {
	const stocksData = useSelector((state) => state).stocks;
	console.log(stocksData);
	return (
		<div className="m-32 grid lg:grid-cols-3 gap-32">
			{stocksData.map((data) => (
				<Cards key={data.stockId} data={data} />
			))}
		</div>
	);
};

export default BuyStocks;

import React from "react";
import { useSelector } from "react-redux";
import Cards from "../../components/cards/cards";

const SellStocks = () => {
	const { stocks, userStocks } = useSelector((state) => state);
	const userStocksData = userStocks.map((userStock) => {
		const stock = stocks.find((item) => item.stockId === userStock.stockId);
		const userStockData = { ...userStock, ...stock };
		userStockData.value = userStockData.value * userStockData.stockQuantity;
		return userStockData;
	});

	return (
		<>
			<div className="header-name ml-14 mt-28 flex items-center justify-center">
				Your Stocks{" "}
			</div>
			<div className="mr-32 ml-32 mb-32 mt-10 grid lg:grid-cols-3 gap-32">
				{userStocksData.map((data) => (
					<Cards key={data.stockId} data={data} />
				))}
			</div>
		</>
	);
};

export default SellStocks;

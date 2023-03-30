import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cards from "../../components/cards/cards";
import { addUser } from "../../redux/actions";

const BASE_URL = process.env.BASE_URL;

const SellStocks = ({ setUser }) => {
	const { stocks, userStocks, user } = useSelector((state) => state);
	const dispatch = useDispatch();
	const userStocksData = useMemo(() => {
		return userStocks.map((userStock) => {
			const stock = stocks.find((item) => item.stockId === userStock.stockId);
			const userStockData = { ...userStock, ...stock };
			return userStockData;
		});
	}, [stocks, userStocks]);

	const setUserData = async () => {
		const res = await fetch(`${BASE_URL}/api/investors/${user?.investorId}`);
		const data = await res.json();
		const actionPayload = addUser(data);
		dispatch(actionPayload);
		setUser({ ...data[0] });
	};
	useEffect(() => {
		user?.investorId && setUserData();
	}, [dispatch, user?.investorId, setUser]);

	return (
		<>
			<div className="header-name ml-14 flex items-center justify-center">
				Your Stocks{" "}
			</div>
			<div className="mr-32 ml-32 mb-32 mt-10 grid lg:grid-cols-3 gap-32">
				{userStocksData.map((data) => (
					<Cards key={data.stockId} data={data} type={"SELL"} />
				))}
			</div>
		</>
	);
};

export default SellStocks;

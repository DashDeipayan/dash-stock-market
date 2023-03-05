import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cards from "../../components/cards/cards";
import Dialog from "../../components/dialog/dialog";
import { addUser } from "../../redux/actions";

const SellStocks = ({ setUser }) => {
	const { stocks, userStocks, user } = useSelector((state) => state);
	const dispatch = useDispatch();
	const userStocksData = userStocks.map((userStock) => {
		const stock = stocks.find((item) => item.stockId === userStock.stockId);
		const userStockData = { ...userStock, ...stock };
		return userStockData;
	});

	useEffect(() => {
		const setUserData = () => {
			fetch(`http://localhost:8090/api/investors/${user?.investorId}`)
				.then((res) => res.json())
				.then((data) => {
					const actionPayload = addUser(data);
					dispatch(actionPayload);
					return data;
				})
				.then((data) => setUser({ ...data[0] }));
		};
		user?.investorId && setUserData();
	}, [dispatch, user?.investorId, setUser]);

	return (
		<>
			<div className="header-name ml-14 flex items-center justify-center">
				Your Stocks{" "}
			</div>
			<Dialog />
			<div className="mr-32 ml-32 mb-32 mt-10 grid lg:grid-cols-3 gap-32">
				{userStocksData.map((data) => (
					<Cards key={data.stockId} data={data} type={"SELL"} />
				))}
			</div>
		</>
	);
};

export default SellStocks;

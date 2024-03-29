import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cards from "../../components/cards/cards";
import { addUser } from "../../redux/actions";
import BASE_URL from "../../Constants";

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

	useEffect(() => {
		const setUserData = async () => {
			const res = await fetch(`${BASE_URL}/api/investors/${user?.investorId}`);
			const data = await res.json();
			const actionPayload = addUser(data);
			dispatch(actionPayload);
			setUser({ ...data[0] });
		};
		user?.investorId && setUserData();
	}, [dispatch, user?.investorId, setUser]);

	return (
		<>
			<div className="header-name ml-14 flex items-center justify-center">
				Your Stocks{" "}
			</div>
			{userStocksData.length ? (
				<>
					<div className="mr-32 ml-32 mb-32 mt-10 grid lg:grid-cols-3 gap-32">
						{userStocksData.map((data) => (
							<Cards key={data.stockId} data={data} type={"SELL"} />
						))}
					</div>
				</>
			) : (
				<>
					<div className="text-3xl ml-14 flex items-center justify-center">
						You don't own any stocks.
					</div>
				</>
			)}
		</>
	);
};

export default SellStocks;

import React, { useEffect, useMemo } from "react";
import Cards from "../../components/cards/cards";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../../redux/actions";
import LoadingSpinner from "../../components/loader/loader";

const BASE_URL = process.env.BASE_URL;

const BuyStocks = ({ setUser, isLoading }) => {
	const { stocks, user } = useSelector((state) => state);
	const dispatch = useDispatch();

	const memoizedStocks = useMemo(() => {
		return stocks.map((stock) => ({
			...stock,
			investorId: user?.investorId,
		}));
	}, [stocks, user?.investorId]);

	const setUserData = async () => {
		const res = await fetch(`${BASE_URL}/api/investors/${user?.investorId}`);
		const data = await res.json();
		const actionPayload = addUser({ ...data[0] });
		dispatch(actionPayload);
		setUser(data[0]);
	};
	useEffect(() => {
		user?.investorId && setUserData();
	}, [dispatch, setUser, user?.investorId]);

	return (
		<div className="mr-32 ml-32 mb-32 mt-16  grid lg:grid-cols-3 gap-32">
			{isLoading && <LoadingSpinner />}
			{memoizedStocks.map((data) => (
				<Cards key={data.stockId} data={data} type={"BUY"} />
			))}
		</div>
	);
};

export default BuyStocks;

import React, { useEffect } from "react";
import Cards from "../../components/cards/cards";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../../redux/actions";

const BuyStocks = ({ setUser }) => {
	const { stocks } = useSelector((state) => state);
	const { user } = useSelector((state) => state);
	const state = useSelector((state) => state);
	const dispatch = useDispatch();
	console.log(state);

	stocks.forEach((stock) => {
		stock.investorId = user?.investorId;
	});
	useEffect(() => {
		const setUserData = () => {
			fetch(`http://localhost:8090/api/investors/${user?.investorId}`)
				.then((res) => res.json())
				.then((data) => {
					console.log("daksjdalskdj");
					console.log(data[0]);
					const actionPayload = addUser({ ...data[0] });
					dispatch(actionPayload);
					return data;
				})
				.then((data) => setUser(data[0]));
		};
		user?.investorId && setUserData();
	}, [dispatch, setUser, user?.investorId]);

	return (
		<div className="m-32 grid lg:grid-cols-3 gap-32">
			{stocks.map((data) => (
				<Cards key={data.stockId} data={data} type={"BUY"} />
			))}
		</div>
	);
};

export default BuyStocks;

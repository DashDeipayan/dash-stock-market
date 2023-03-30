import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import LandingPage from "./screens/LandingPage/LandingPage";
import SellStocks from "./screens/SellStocks";
import BuyStocks from "./screens/BuyStocks";
import { addStocks, addUser, addUserStocks } from "./redux/actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const BASE_URL = process.env.BASE_URL;

function App() {
	const [user, setUser] = useState(null);
	const [sse, setSse] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		const getUser = async () => {
			fetch(`${BASE_URL}/auth/login/success`, {
				method: "GET",
				credentials: "include",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"Allow-Control-Access-Credentials": true,
				},
			})
				.then((res) => {
					if (res.status === 200) return res.json();
					throw new Error("authentication failed");
				})
				.then((res) => {
					setUser(res.user?.data);
					const actionPayload = addUser(res.user?.data);
					dispatch(actionPayload);
				})
				.then(() => {
					setSse(new EventSource(`${BASE_URL}/api/stocks`));
				})
				.catch((err) => console.error(err));
		};
		getUser();
	}, [dispatch]);
	useEffect(() => {
		const updateStockPrices = (data) => {
			const actionPayload = addStocks(data);
			dispatch(actionPayload);
		};

		if (sse) {
			sse.onmessage = (e) => {
				updateStockPrices(JSON.parse(e.data));
			};
		}
		return () => {
			sse && sse.close();
		};
	}, [sse, dispatch]);
	useEffect(() => {
		const getUserStocksData = async () => {
			setIsLoading(true);
			fetch(`${BASE_URL}/api/investments/${user?.investorId}`)
				.then((res) => {
					if (res.status === 200) return res.json();
					throw new Error("Error in fetching data");
				})
				.then((res) => {
					setIsLoading(false);
					const actionPayload = addUserStocks(res.stocks);
					dispatch(actionPayload);
				})
				.catch((err) => {
					setIsLoading(false);
					console.error(err);
				});
		};
		user?.investorId && getUserStocksData();
	}, [user?.investorId, dispatch]);
	return (
		<div className="App">
			<Header
				name={user?.name || ""}
				email={user?.email || ""}
				balance={user?.balance || ""}
			/>
			<Routes>
				{!user ? (
					<>
						<Route path="/*" element={<LandingPage />} />
					</>
				) : (
					<>
						<Route
							path="/sellstocks"
							element={<SellStocks setUser={setUser} isLoading={isLoading} />}
						/>
						<Route
							path="/buystocks"
							element={<BuyStocks setUser={setUser} isLoading={isLoading} />}
						/>
						<Route path="/*" element={<Navigate to="/buystocks" />} />
					</>
				)}
			</Routes>
			<Footer />
		</div>
	);
}

export default App;

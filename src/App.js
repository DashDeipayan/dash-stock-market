import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import LandingPage from "./screens/LandingPage/LandingPage";
import SellStocks from "./screens/SellStocks";
import BuyStocks from "./screens/BuyStocks";
import { useEffect, useState } from "react";

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const getUser = async () => {
			fetch("http://localhost:8090/auth/login/success", {
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
				})
				.catch((err) => console.error(err));
		};
		getUser();
	}, []);

	return (
		<div className="App">
			<Header name={user?.name} email={user?.email} balance={user?.balance} />
			<Routes>
				<Route
					path="/"
					element={!user ? <LandingPage /> : <Navigate to="/buystocks" />}
				/>
				<Route
					path="/sellstocks"
					element={user ? <SellStocks /> : <Navigate to="/" />}
				/>
				<Route
					path="/buystocks"
					element={user ? <BuyStocks /> : <Navigate to="/" />}
				/>
			</Routes>
			<Footer />
		</div>
	);
}

export default App;

import React, { useState, useCallback, Suspense } from "react";
import "./cards.css";
import LoadingSpinner from "../loader/loader";
const Dialog = React.lazy(() => import("../dialog/dialog"));

const Cards = ({ data, type }) => {
	const [showDialog, setShowDialog] = useState(false);
	const openModal = useCallback(() => {
		setShowDialog(true);
	}, []);
	return (
		<>
			<div className="card hover:shadow-lg" onClick={openModal}>
				<img
					src={data.image}
					alt={`Stock of ${data.name}`}
					className="w-1/4 h-1/4 mb-0 mx-auto sm:h-48 object-contain"
				/>
				<div className="px-4 pb-6 w-full">
					<span className="block font-bold text-2xl text-center">
						{data.name}{" "}
						<span className="font-light text-lg block">({data.symbol})</span>
					</span>
					<span className="block text-gray-700 text-xl text-center ">
						Price: $
						{type === "SELL"
							? (data.value * (data.stockQuantity || data.quantity)).toFixed(4)
							: data.value}
					</span>
				</div>
				<div className="time-badge">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-4 h-4 inline-block mr-2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
						/>
					</svg>
					{
						<span className="text-blue-700">
							Quantity: {data.stockQuantity || data.quantity}
						</span>
					}
				</div>
			</div>
			<Suspense
				fallback={
					<div>
						<LoadingSpinner />
					</div>
				}
			>
				<Dialog
					data={data}
					showDialog={showDialog}
					setShowDialog={setShowDialog}
					type={type}
				/>
			</Suspense>
		</>
	);
};

export default Cards;

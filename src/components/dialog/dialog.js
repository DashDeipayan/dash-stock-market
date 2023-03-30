import { useCallback, useState } from "react";
import { buyValidations } from "../../helpers/buy-validations";
import { sellValidations } from "../../helpers/sell-validations";
import { useSelector } from "react-redux";
import LoadingSpinner from "../loader/loader";

const BASE_URL = process.env.BASE_URL;

const Dialog = (props) => {
	const [price, setPrice] = useState(0);
	const [quantity, setQuantity] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [errorCode, setErrorCode] = useState({ code: 0, error: null });

	const getUser = (state) => state.user;
	const user = useSelector(getUser);

	const { data, setShowDialog, showDialog, type } = props;

	const closeDialog = () => {
		setShowDialog(() => false);
	};

	const changeQuantity = (e) => {
		e.preventDefault();
		setQuantity(e.target?.value);
		setPrice((e.target?.value * data?.value).toFixed(4));
		setErrorCode({ code: 0, error: null });
	};

	const changePrice = (e) => {
		e.preventDefault();
		setPrice(e.target.value);
		setQuantity((e.target.value / data.value).toFixed(4));
		setErrorCode({});
	};

	const onblurPrice = (e) => {
		e.preventDefault();
		!e.target.value && setPrice(0) && setQuantity(0);
	};
	const onblurQuantity = (e) => {
		e.preventDefault();
		!e.target.value && setQuantity(0) && setPrice(0);
	};
	const onsubmit = useCallback(() => {
		const payload = {
			price,
			name: data.name,
			quantity,
			stockId: data.stockId,
			investorId: data.investorId,
		};
		const isErrorBuy = buyValidations(user, payload);
		const isErrorSell = sellValidations(data, payload);
		type === "BUY" ? setErrorCode(isErrorBuy) : setErrorCode(isErrorSell);
		if (isErrorBuy.code !== 0 || isErrorSell?.code !== 0) return;
		setIsLoading(true);
		fetch(`${BASE_URL}/api/purchase/${type.toLowerCase()}/`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(payload),
		})
			.then((res) => {
				if (res.status === 200) {
					setIsLoading(false);
					return res.json();
				}
				throw new Error("Transaction failed");
			})
			.then((data) => {
				alert(`Transaction successful \n TransactionID:${data.transactionId}`);
				closeDialog();
			})
			.catch((err) => {
				setIsLoading(false);
				console.error(err);
			});
	}, [data, price, quantity, setShowDialog, type, user]);

	return showDialog ? (
		<div className="bg-slate-800 left-0 right-0 top-0 bottom-0 bg-opacity-40 grid place-items-center fixed z-50">
			{isLoading && <LoadingSpinner />}
			<div className="p-10 w-1/3 bg-gray-200 flex flex-col justify-center rounded-md relative">
				<div
					className="p-3 top-1 right-8 absolute text-2xl cursor-pointer hover:text-red-700"
					onClick={closeDialog}
				>
					&times;
				</div>
				<div className="flex flex-col">
					<label className="pb-1">Stock</label>
					<input
						className="w-full p-3 mb-4"
						readOnly
						value={`${data.name} (${data.symbol})`}
					/>
				</div>
				<div>
					<label className="pb-1">Type</label>
					<input className="w-full mb-4 p-3" readOnly value={type} />
				</div>
				<div>
					<label className="pb-1">Quantity</label>
					{type === "SELL" && errorCode.code !== 0 && errorCode.error}
					<input
						className={`w-full mb-4 p-3 ${
							errorCode.code !== 0 ? "text-red-600" : ""
						}`}
						type="number"
						value={quantity}
						onChange={(e) => changeQuantity(e)}
						onBlur={(e) => onblurQuantity(e)}
					/>
				</div>
				<div>
					<label className="pb-1">Price</label>
					{type === "BUY" && errorCode.code !== 0 && errorCode.error}
					<input
						className={`w-full mb-4 p-3 ${
							errorCode.code !== 0 ? "text-red-600" : ""
						}`}
						type="number"
						value={price}
						onChange={(e) => changePrice(e)}
						onBlur={(e) => onblurPrice(e)}
					/>
				</div>
				<div className="flex flex-row-reverse">
					<button
						type="submit"
						onClick={onsubmit}
						className="bg-cyan-600 w-1/4 p-2 rounded-sm hover:bg-green-500 hover:transition-colors hover:text-white"
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	) : null;
};

export default Dialog;

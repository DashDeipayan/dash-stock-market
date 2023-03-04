import { useState } from "react";

const Dialog = (props) => {
	const [price, setPrice] = useState(0);
	const [quantity, setQuantity] = useState(0);
	const { data, setShowDialog, showDialog, type } = props;
	const closeDialog = () => {
		setShowDialog(() => false);
	};

	const changeQuantity = (e) => {
		e.preventDefault();
		setQuantity(e.target.value);
		setPrice(e.target.value * data.value);
	};

	const changePrice = (e) => {
		e.preventDefault();
		setPrice(e.target.value);
		setQuantity((e.target.value / data.value).toFixed(4));
	};

	const onblurPrice = (e) => {
		e.preventDefault();
		!e.target.value && setPrice(0) && setQuantity(0);
	};
	const onblurQuantity = (e) => {
		e.preventDefault();
		!e.target.value && setQuantity(0) && setPrice(0);
	};

	const onsubmit = () => {
		const payload = {
			price,
			name: data.name,
			quantity,
			stockId: data.stockId,
			investorId: data.investorId,
		};
		console.log(payload);
		console.log(data);
		fetch(`http://localhost:8090/api/purchase/${type.toLowerCase()}/`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(payload),
		})
			.then((res) => {
				if (res.status === 200) return res.json();
				throw new Error("Transaction failed");
			})
			.then((data) => {
				alert(`Transaction successful \n TransactionID:${data.transactionId}`);
				window.location.reload();
			})
			.catch((err) => console.error(err));
	};

	return showDialog ? (
		<div className="bg-slate-800 left-0 right-0 top-0 bottom-0 bg-opacity-40 grid place-items-center fixed z-50">
			<div className="p-10 w-1/3 bg-gray-200 flex flex-col justify-center rounded-md relative">
				<div
					className="p-3 top-1 right-8 absolute text-2xl"
					onClick={closeDialog}
				>
					&times;
				</div>
				<div className="flex flex-col">
					<label className="pb-1">Stock</label>
					<input className="w-full p-3 mb-4" readOnly value={data.name} />
				</div>
				<div>
					<label className="pb-1">Type</label>
					<input className="w-full mb-4 p-3" readOnly value={type} />
				</div>
				<div>
					<label className="pb-1">Quantity</label>
					<input
						className="w-full mb-4 p-3"
						type="number"
						value={quantity}
						onChange={(e) => changeQuantity(e)}
						onBlur={(e) => onblurQuantity(e)}
					/>
				</div>
				<div>
					<label className="pb-1">Price</label>
					<input
						className="w-full mb-4 p-3"
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
						className="bg-cyan-600 w-1/4 p-2 rounded-sm hover:bg-green-500"
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	) : null;
};

export default Dialog;

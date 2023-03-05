export const buyValidations = (userData, purchaseData) => {
	if (purchaseData.quantity === 0)
		return {
			error: (
				<p className="block text-sm text-red-600">
					Quantity or Price cannot be 0
				</p>
			),
			code: 2,
		};
	if (userData.balance < purchaseData.price)
		return {
			error: <p className="block text-sm text-red-600">Not enough balance</p>,
			code: 1,
		};

	return { error: null, code: 0 };
};

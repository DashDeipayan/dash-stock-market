export const sellValidations = (userData, purchaseData) => {
	if (parseFloat(purchaseData.quantity) === 0)
		return {
			error: (
				<p className="block text-sm text-red-600">
					Quantity or Price cannot be 0
				</p>
			),
			code: 2,
		};
	if (userData.stockQuantity < purchaseData.quantity) {
		return {
			error: (
				<p className="block text-sm text-red-600">{`Not a valid quantity, must be less than ${userData?.stockQuantity}`}</p>
			),
			code: 1,
		};
	}
	return { error: null, code: 0 };
};

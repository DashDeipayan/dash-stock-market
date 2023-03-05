export const sellValidations = (userData, purchaseData) => {
	if (userData.stockQuantity < purchaseData.quantity) {
		return 1;
	}
	return 0;
};

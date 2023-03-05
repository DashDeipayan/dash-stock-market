export const buyValidations = (userData, purchaseData) => {
	if (userData.balance < purchaseData.price) {
		return 1;
	}
	return 0;
};

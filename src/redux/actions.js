export const addStocks = (body) => {
	return {
		type: "ADD_STOCKS",
		payload: {
			stocks: body,
		},
	};
};

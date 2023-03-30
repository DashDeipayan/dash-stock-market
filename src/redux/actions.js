export const addStocks = (body) => {
	return {
		type: "ADD_STOCKS",
		payload: {
			stocks: body,
		},
	};
};
export const addUser = (body) => {
	return {
		type: "ADD_USER",
		payload: {
			user: body,
		},
	};
};
export const addUserStocks = (body) => {
	return {
		type: "ADD_USER_STOCKS",
		payload: {
			userStocks: body,
		},
	};
};

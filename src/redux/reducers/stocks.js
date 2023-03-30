const initialState = {
	stocks: [],
	userStocks: [],
	user: null,
};

const stocksDetails = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_USER_STOCKS": {
			return {
				...state,
				userStocks: action.payload.userStocks,
			};
		}
		case "ADD_STOCKS": {
			return {
				...state,
				stocks: action.payload.stocks,
			};
		}
		case "ADD_USER": {
			return {
				...state,
				user: action.payload.user,
			};
		}
		default: {
			return state;
		}
	}
};

export default stocksDetails;

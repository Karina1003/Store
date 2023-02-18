const initialState = {
    isLoading: false,
    isError: false,
    list: [],
    name: "List of products",
};
    
const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_PRODUCTS': {
            return {
                ...state,
                isLoading: true,
            };
        }
        case 'RECEIVE_PRODUCTS': {
            const {
                products,
            } = action;
            return {
                ...state,
                isLoading: false,
                list: action.products,
            };
        }
        case 'ERROR_RECEIVE_PRODUCTS': {
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        }
        default: return state;
    }
};
    
export default productsReducer;
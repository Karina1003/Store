const initialState = {
    isLoading: false,
    isError: false,
    product: {},
    name: "Product",
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_PRODUCT': {
            return {
                ...state,
                isLoading: true,
            };
        }
        case 'RECEIVE_PRODUCT': {
            const {
                product,
            } = action;
            return {
                ...state,
                isLoading: false,
                product: action.product,
            };
        }
        case 'ERROR_RECEIVE_PRODUCT': {
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        }
        default: return state;
    }
};
    
export default productReducer;
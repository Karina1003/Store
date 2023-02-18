const requestProduct = () => ({
    type: 'REQUEST_PRODUCT',
});

const receiveProduct = product => ({
    product,
    type: 'RECEIVE_PRODUCT',
});

const errorReceiveProduct = () => ({
    type: 'ERROR_RECEIVE_PRODUCT',
});


const getProduct = (id) => {
        const response = fetch(`http://localhost:8080/product/${id}`, {method: "GET"})
        return response;
};

const fetchProduct = (id) => (dispatch) => {
    dispatch(requestProduct());
    return getProduct(id)
    .then(result => result.json())
    .then(product =>  dispatch(receiveProduct(product)))
    .catch(product => dispatch(errorReceiveProduct()));
};

export default { fetchProduct };
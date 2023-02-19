const requestProducts = () => ({
    type: 'REQUEST_PRODUCTS',
});

const receiveProducts = products => ({
    products,
    type: 'RECEIVE_PRODUCTS',
});

const errorReceiveProducts = () => ({
    type: 'ERROR_RECEIVE_PRODUCTS',
});


const getProducts = () => {
        const response = fetch("http://localhost:8080/category/1/products", {method: "GET"})
        return response;
};

const fetchProducts = () => (dispatch) => {
    dispatch(requestProducts());
    return getProducts()
    .then(result => result.json())
    .then(products =>  dispatch(receiveProducts(products)))
    .catch(products => dispatch(errorReceiveProducts()));
};

const fetchDeleteProducts = (id) => (dispatch) => {
    return fetch(`http://localhost:8080/product/delete/${id}`, {method: "DELETE"});
};

export default { fetchProducts, fetchDeleteProducts };
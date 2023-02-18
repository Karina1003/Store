import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import productsActions from '../actions/action';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Link from 'components/Link';

const Products = () => {

    const dispatch = useDispatch();

    const reducer = useSelector(({ reducer }) => reducer);

    const [state, setState] = useState({
        list: [],
        componentDidMount: false,
        isChanged: false,
    });

    useEffect(() => {
        dispatch(productsActions.fetchProducts());
    }, []);

    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            list: reducer.list,
            componentDidMount: true,
            isChanged: false,
        }));
    }, [state.isChanged]);

    const deleteProductById = (id) => {
        dispatch(productsActions.fetchDeleteProducts(id))
        .then(result => dispatch(productsActions.fetchProducts())
                        .then(result => {
                            setState(prevState => ({
                                ...prevState,
                                isChanged: true,
                            }))
                        }));
        ;
    };

    return (
        <div>
        <Link
        to={location => ({
        ...location,
        pathname: `/saveProduct/new`,
        })} >
            <Button variant="contained" >
                Create
            </Button>
        </Link>
        {state.list.map(product => 
            <Typography>
                {product.name}
                <IconButton onClick={() => {deleteProductById(product.id)}}>
                    <DeleteIcon />
                </IconButton>
                <Link
        to={location => ({
        ...location,
        pathname: `/saveProduct/${product.id}`,
        })} >
                <IconButton>
                    <EditIcon />
                </IconButton>
                </Link>
            </Typography>
        )}        
        </div>
    );

}

export default Products;
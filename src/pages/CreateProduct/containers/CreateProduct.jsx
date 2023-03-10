import TextField from 'components/TextField';
import Select from 'components/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useChangePage from 'hooks/useChangePage';
import useLocationSearch from 'hooks/useLocationSearch';
import productActions from '../actions/action';
import Button from '@material-ui/core/Button';
import Link from 'components/Link';
import * as PAGES from 'constants/pages';

const CreateProduct = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const reducer = useSelector(({ reducer }) => reducer);

    const [state, setState] = useState({
        product: {},
        componentDidMount: false,
        isSuccess: false,
    });

    const [saveParams, setSaveParams] = useState({
        name: '',
        description: '',
        categoryId: 0,
    });

    useEffect(()=>{
        if ([id]!='new') {
            dispatch(productActions.fetchProduct([id]))
            .then(result => {
                setSaveParams(prevState => ({
                    ...prevState,
                    name: result.product.name,
                    description: result.product.description,
                    categoryId: result.product.category.id,
                }))
            });
        }
    },[]);

    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            componentDidMount: true,
        }));
    }, []);

    const saveProduct = (name, description, categoryId) => {
        dispatch(productActions.saveProduct(name, description, categoryId))
        .then(result => {
            setState(prevState => ({
                ...prevState,
                isSuccess: true,
            }));
        });
    };

    const updateProduct = (id, name, description, categoryId) => {
        dispatch(productActions.updateProduct(id, name, description, categoryId))
        .then(result => {
            setState(prevState => ({
                ...prevState,
                isSuccess: true,
            }));
        });
    };

    const handleChangeName = event => {
        setSaveParams(prevState => ({
            ...prevState,
            name: event.target.value,
        }));
    };

    const handleChangeDescription = event => {
        setSaveParams(prevState => ({
            ...prevState,
            description: event.target.value,
        }));
    };

    const handleChangeCategory = event => {
        setSaveParams(prevState => ({
            ...prevState,
            categoryId: event.target.value,
        }));
    };

    const locationSearch = useLocationSearch();
    const changePage = useChangePage();
    useEffect(() => {
        if (state.isSuccess) {
            changePage({
                locationSearch: locationSearch.redirectLocationSearch
                ? JSON.parse(locationSearch.redirectLocationSearch)
                : locationSearch,
                path: locationSearch.redirectPathname || `/${PAGES.PRODUCTS}`,
            });
        }
    }, [state.isSuccess]);

    return(
        <div>
            {[id]!='new' && (
                <div>
                    <h2>Update product: {id}</h2>
                    <div>
                        Product name:  
                        <TextField value={saveParams.name} defaultValue="" 
                                   onChange={handleChangeName} />       
                    </div>
                    <div>
                        Description:  
                        <TextField value={saveParams.description} defaultValue="" 
                                   onChange={handleChangeDescription} />       
                    </div>
                    <div>
                        Category:
                        <Select value={saveParams.categoryId} onChange={handleChangeCategory} >
                            <MenuItem value={1}>Tools</MenuItem>
                            <MenuItem value={2}>Furniture</MenuItem>
                            <MenuItem value={3}>Cutlery</MenuItem>    
                        </Select>     
                    </div>
                    <Link
                    to={location => ({
                    ...location,
                    pathname: `/products`,
                    })} >
                        <Button variant="contained" >
                            Cancel
                        </Button>
                    </Link>
                    <Button variant="contained" onClick={() => 
                            {updateProduct(id, saveParams.name, saveParams.description, saveParams.categoryId)}}>
                            Save
                    </Button>
                </div>
            )}

            {[id]=='new' && (
            <div>
                <h2>Create product</h2>
                <div>
                    Product name:  
                    <TextField onChange={handleChangeName} />       
                </div>
                <div>
                    Description:  
                    <TextField onChange={handleChangeDescription} />       
                </div>
                <div>
                    Category:
                    <Select onChange={handleChangeCategory} >
                        <MenuItem value={1}>Tools</MenuItem>
                        <MenuItem value={2}>Furniture</MenuItem>
                        <MenuItem value={3}>Cutlery</MenuItem>    
                    </Select>        
                </div>
                <Link
                    to={location => ({
                    ...location,
                    pathname: `/products`,
                    })} >
                        <Button variant="contained" >
                            Cancel
                        </Button>
                    </Link>
                    <Button variant="contained" onClick={() => 
                            {saveProduct(saveParams.name, saveParams.description, saveParams.categoryId)}}>
                            Save
                    </Button>
            </div>
            )}
        </div>
    );
}

export default CreateProduct;
import TextField from 'components/TextField';
import Select from 'components/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import productActions from '../actions/action';
import Button from '@material-ui/core/Button';
import Link from 'components/Link';

const CreateProduct = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const reducer = useSelector(({ reducer }) => reducer);

    const [state, setState] = useState({
        product: {},
        componentDidMount: false,
    });

    const [saveParams, setSaveParams] = useState({
        name: '',
        description: '',
        categoryId: 0,
    });

    useEffect(()=>{
        if ([id]!='new') {
            dispatch(productActions.fetchProduct([id]));
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
        .then(result => console.log(result));
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


    return(
        <div>
            {[id]!='new' && (
                <div>
                    <h2>Update product: {id}</h2>
                    <div>
                        Product name:  
                        <TextField value={reducer.product.name} defaultValue="" 
                                   onChange={handleChangeName} />       
                    </div>
                    <div>
                        Description:  
                        <TextField value={reducer.product.description} defaultValue="" 
                                   onChange={handleChangeDescription} />       
                    </div>
                    <div>
                        Category:
                        <Select onChange={handleChangeCategory} >
                            <MenuItem value={1}>Tools</MenuItem>
                            <MenuItem value={2}>Furniture</MenuItem>
                            <MenuItem value={3}>Cutlery</MenuItem>    
                        </Select>     
                    </div>
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
            </div>
            )}
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
    );
}

export default CreateProduct;
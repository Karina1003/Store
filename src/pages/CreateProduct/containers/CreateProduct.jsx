import TextField from 'components/TextField';
import Select from 'components/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import productActions from '../actions/action';

const CreateProduct = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const reducer = useSelector(({ reducer }) => reducer);

    const [state, setState] = useState({
        product: {},
        componentDidMount: false,
    });

    useEffect(()=>{
        if ([id]!='new') {
            dispatch(productActions.fetchProduct([id]));
            console.log(reducer);
        }
    },[]);
    console.log(reducer);
    useEffect(() => {
        console.log(reducer);
        setState(prevState => ({
            ...prevState,
            componentDidMount: true,
        }));
    }, []);

    return(
        <div>
            {[id]!='new' && (
                <div>
                    <h2>Update product: {id}</h2>
                    <div>
                        Product name:  
                        <TextField value={reducer.product.name} defaultValue="" />       
                    </div>
                    <div>
                        Description:  
                        <TextField value={reducer.product.description} defaultValue="" />       
                    </div>
                    <div>
                        Category:
                        <Select >
                            <MenuItem value={1}>Tools</MenuItem>
                            <MenuItem value={2}>Furniture</MenuItem>
                            <MenuItem value={3}>Cutlery</MenuItem>    
                        </Select>     
                    </div>
                </div>)}

                {[id]=='new' && (
                <div>
                    <h2>Create product</h2>
                    <div>
                        Product name:  
                        <TextField />       
                    </div>
                    <div>
                        Description:  
                        <TextField />       
                    </div>
                    <div>
                        Category:
                        <Select>
                            <MenuItem value={1}>Tools</MenuItem>
                            <MenuItem value={2}>Furniture</MenuItem>
                            <MenuItem value={3}>Cutlery</MenuItem>    
                        </Select>        
                    </div>
                </div>)}
        </div>
    );
}

export default CreateProduct;
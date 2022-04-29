import { useContext, useState } from 'react';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem';
import Loading from '../utils/loading/loading';
import Filters from './filters';

function Products() {
    const state = useContext(GlobalState);
    const [products, setProducts] = state.productsAPI.products;
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;
    const [callback, setCallback] = state.productsAPI.callback;
    const [loading, setLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    function handleChecked(id) {
        products.forEach(product => {
            if(product._id === id) {
                product.checked = !product.checked;
            }
        })
        setProducts([...products]);
    }

    async function deleteProduct(id, public_id) {
        try {
            setLoading(true);
            await axios.post('/api/destroy', {public_id}, {
                headers: {Authorization: token}
            });
                await axios.delete(`/api/delete_product/${id}`, {
                headers: {Authorization: token}
            });
            
            setCallback(!callback);
            setLoading(false);
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    function checkAll() {
        products.forEach(product => {
            product.checked = !isChecked;
        })
        setProducts([...products]);
        setIsChecked(!isChecked);
    }

    function deleteAll() {
        products.forEach(product => {
            if(product.checked) deleteProduct(product._id, product.image.public_id);
        })
    }

    return (
        <>
            <div className="d-flex mt-3">
                <Filters />
            </div>
            {
                isAdmin &&
                <div className="d-flex justify-content-between form-check mt-2 products__checkall">
                    <div>
                        <span className="products__checkall__title">Select All</span>
                        <input
                            className="form-check-input ml-2 products__checkall__checkbox"
                            type="checkbox"
                            value=""
                            id="defaultCheck1"
                            checked={isChecked}
                            onChange={checkAll}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary ml-2 products__checkall__btn"
                        onClick={deleteAll}
                    >
                        Delete all
                    </button>
                </div>
            }
            {

                loading ? <Loading /> :
                <div className="container products">
                    {
                        products.map(product => {
                            return <ProductItem
                                        key={product._id}
                                        productItem={product}
                                        isAdmin={isAdmin}
                                        // token={token}
                                        // callback={callback}
                                        // setCallback={setCallback}
                                        // setProducts={setProducts}
                                        deleteProduct={deleteProduct}
                                        handleChecked={handleChecked}
                                    />
                        })
                    }
                </div>
            }
            {products.length === 0 && <Loading />}
        </>
    )
}

export default Products;
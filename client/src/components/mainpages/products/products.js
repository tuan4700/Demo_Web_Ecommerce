import { useContext, useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem';
import Loading from '../utils/loading/loading';
import axios from 'axios';

function Products() {
    const state = useContext(GlobalState);
    const [products, setProducts] = state.productsAPI.products;
    const [isAdmin] = state.userAPI.isAdmin;

    const getProducts = async () => {
        const res = await axios.get('/api/products');
        setProducts(res.data.products);
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            <div className="container products">
                {
                    products.map(product => {
                        return <ProductItem
                                    key={product._id}
                                    productItem={product}
                                    isAdmin={isAdmin}
                                />
                    })
                }
            </div>
            {products.length === 0 && <Loading />}
        </>
    )
}

export default Products;
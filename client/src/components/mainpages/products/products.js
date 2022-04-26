import { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem';
import Loading from '../utils/loading/loading';

function Products() {
    const state = useContext(GlobalState);
    const [products] = state.productsAPI.products;
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;
    const [callback, setCallback] = state.productsAPI.callback;

    return (
        <>
            <div className="container products">
                {
                    products.map(product => {
                        return <ProductItem
                                    key={product._id}
                                    productItem={product}
                                    isAdmin={isAdmin}
                                    token={token}
                                    callback={callback}
                                    setCallback={setCallback}
                                />
                    })
                }
            </div>
            {products.length === 0 && <Loading />}
        </>
    )
}

export default Products;
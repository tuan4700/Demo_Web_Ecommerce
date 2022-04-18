import { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem';
import Loading from '../utils/loading/loading';

function Products() {
    const state = useContext(GlobalState);
    const [products] = state.productsAPI.products;

    return (
        <>
            <div className="container products">
                {
                    products.map(product => <ProductItem key={product._id} productItem={product} />)
                }
            </div>
            {products.length === 0 && <Loading />}
        </>
    )
}

export default Products;
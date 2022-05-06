import { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem';

function DetailProduct() {
    const params = useParams();
    const state = useContext(GlobalState);
    const [products] = state.productsAPI.products;
    const addCart = state.userAPI.addCart;
    const [detailProduct, setDetailProduct] = useState([]);

    useEffect(() => {
        if(params.id) {
            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product);
            })
        }
    }, [params.id, products])

    if(detailProduct.length === 0) return null;

    return (
        <>
            <div className="d-flex detail-product">
                <img src={detailProduct.image.url} alt="" className="detail-product__image" />
                <div className="detail-product__info">
                    <div className="d-flex w-100 detail-product__block" >
                        <h5 className="w-75 detail-product__info__title" title={detailProduct.title} >{detailProduct.title}</h5>
                        <h6 className="w-25 detail-product__info__id">#{detailProduct.product_id}</h6>
                    </div>
                    <h6 className="text-danger detail-product__info__price">${detailProduct.price}</h6>
                    <h6 className="detail-product__info__description">{detailProduct.description}</h6>
                    <h6 className="detail-product__info__sold">Sold: {detailProduct.sold}</h6>
                    <Link
                        className="btn btn-secondary detail-product__btn__buy"
                        to="/cart"
                        onClick={() => addCart(detailProduct)}
                    >
                        Buy now
                    </Link>
                </div>
            </div>
            <div className="related-products">
                <h5 className="related-products__title">Related Products</h5>
                <div className="d-flex related-products__products">
                    {
                        products.map(product => {
                            return product.category === detailProduct.category ? 
                            <ProductItem key={product._id} productItem={product} /> : null;
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailProduct;
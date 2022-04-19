import { useContext, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';
import './cart.css';

function Cart() {
    const state = useContext(GlobalState);
    const [cart] = state.userAPI.cart;
    const [total, setTotal] = useState(0);
    
    if(cart.length === 0)
        return <h2 className="cart__empty">Cart Empty</h2>;

    return (
        <div>
            {
                cart.map(product => (
                    <div className="d-flex detail-product" key={product.product_id}>
                        <img src={product.image.url} alt="" className="w-50 detail-product__image" />
                        <div className="w-50 detail-product__info cart__info">
                            <div className="d-flex w-100 detail-product__block" >
                                <h5 className="w-75 detail-product__info__title" title={product.title} >{product.title}</h5>
                                <h6 className="w-25 detail-product__info__id">#{product.product_id}</h6>
                            </div>
                            <h6 className="w-100 text-danger detail-product__info__price">${product.price * product.quantity}</h6>
                            <h6 className="w-100 detail-product__info__description">{product.description}</h6>
                            <h6 className="w-100 detail-product__info__sold">Sold: {product.sold}</h6>
                            <div className="d-flex cart__quantity">
                                <span className="cart__quantity-title">Quantity: </span>
                                <button className="text-primary cart__quantity-dec"> - </button>
                                <span className="cart__quantity-number">{product.quantity}</span>
                                <button className="text-primary cart__quantity-inc"> + </button>
                            </div>
                            <div className="text-danger cart__delete">X</div>
                        </div>
                    </div>
                ))
            }
            <div className="d-flex justify-content-between">
                <div className="text-danger">Total: $ {total}</div>
                <Link to="#!" className="text-info">Payment</Link>
            </div>
        </div>
    )
}

export default Cart;
import { useContext, useState, useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import PaypalButton from './PaypalButton';
import './cart.css';

function Cart() {
    const state = useContext(GlobalState);
    const [cart, setCart] = state.userAPI.cart;
    const [token] = state.token;
    const [total, setTotal] = useState(0);
    // console.log(cart)

    async function saveCart(cart) {
        await axios.patch('/user/addCart', {cart}, {
            headers: {Authorization: token}
        })
    }

    useEffect(() => {
        function getTotal() {
            const total = cart.reduce((sum, item) => {
                return sum + (item.price * item.quantity);
            }, 0);

            setTotal(total);
        }

        getTotal();
    }, [cart]);
    
    if(cart.length === 0)
        return <h2 className="cart__empty">Cart Empty</h2>;

    function quantityDec(id) {
        cart.forEach(item => {
            if(item.quantity === 1) return;
            if(item._id === id) {
                item.quantity --;
            }
        });

        setCart([...cart]);
        saveCart(cart);
    };

    function quantityInc(id) {
        cart.forEach(item => {
            if(item._id === id) {
                item.quantity ++;
            }
        });

        setCart([...cart]);
        saveCart(cart);
    };

    function deleteProduct(id) {
        if(window.confirm("Would you like to delete this product?")) {
            cart.forEach((item, index) => {
                if(item._id === id) {
                    cart.splice(index, 1);
                }
            })

            setCart([...cart]);
            saveCart(cart);
        }
    }

    async function tranSuccess(payment) {
        const {paymentID, address} = payment;

        await axios.post('/api/payment', {cart, paymentID, address}, {
            headers:{Authorization: token}
        })

        setCart([]);
        saveCart([]);
        alert("You have successfully placed an order.");
    }

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
                                <button className="text-primary cart__quantity-dec" onClick={() => quantityDec(product._id)}> - </button>
                                <span className="cart__quantity-number">{product.quantity}</span>
                                <button className="text-primary cart__quantity-inc" onClick={() => quantityInc(product._id)}> + </button>
                            </div>
                            <div className="text-danger cart__delete" onClick={() => deleteProduct(product._id)}>X</div>
                        </div>
                    </div>
                ))
            }
            <div className="d-flex justify-content-between cart__cost">
                <div className="text-danger cart__total">Total: $ {total}</div>
                <PaypalButton
                    total={total}
                    tranSuccess={tranSuccess}
                />
            </div>
        </div>
    )
}

export default Cart;
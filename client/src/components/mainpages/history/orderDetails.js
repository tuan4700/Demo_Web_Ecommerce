import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';

function OderDetails() {
    const state = useContext(GlobalState);
    const [history] = state.userAPI.history;
    const [orderDetails, setOrderDetails] = useState([]);
    // console.log(state);

    const params = useParams();
    useEffect(() => {
        if(params.id) {
            history.forEach(item => {
                if(item._id === params.id) setOrderDetails(item);
            })
        }
    }, [params.id, history]);
    
    if(orderDetails.length === 0) return null;

    return (
        <div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col" className="text-center">Name</th>
                        <th scope="col" className="text-center">Address</th>
                        <th scope="col" className="text-center">Postal Code</th>
                        <th scope="col" className="text-center">Country Code</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center">{orderDetails.address.recipient_name}</td>
                        <td className="text-center">{orderDetails.address.line1 + " - " + orderDetails.address.city}</td>
                        <td className="text-center">{orderDetails.address.postal_code}</td>
                        <td className="text-center">{orderDetails.address.country_code}</td>
                    </tr>
                </tbody>
            </table>
            
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col" className="text-center"></th>
                        <th scope="col" className="text-center">Product</th>
                        <th scope="col" className="text-center">Quantity</th>
                        <th scope="col" className="text-center">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderDetails.cart.map(item => (
                            <tr key={item._id}>
                                <td className="text-center order-details__product">
                                    <img src={item.image.url} alt="img-product" className="order-details__product__image" />
                                </td>
                                <td className="text-center order-details__product">{item.title}</td>
                                <td className="text-center order-details__product">{item.quantity}</td>
                                <td className="text-center order-details__product">$ {item.price * item.quantity}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OderDetails;
import { useState } from 'react';
import BtnProduct from './BtnProduct';
import axios from 'axios';
import Loading from '../loading/loading';

function ProductItem({productItem, isAdmin, token, callback, setCallback}) {
    const [loading, setLoading] = useState(false);

    async function deleteProduct() {
        try {
            setLoading(true);
            if(window.confirm("You want to delete this product?")) {
                await axios.post('/api/destroy', {public_id: productItem.image.public_id}, {
                    headers: {Authorization: token}
                });
                 await axios.delete(`/api/delete_product/${productItem._id}`, {
                    headers: {Authorization: token}
                });
                // alert(deleteProduct.response.data.message);
            }
            setLoading(false);
            setCallback(!callback);
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    if(loading) return <div className="product-card"><Loading /></div>

    return (
        <div className="product-card">
            <img src={productItem.image.url} className="img-fluid product-card__image" alt="Product"></img>
            {
                isAdmin && 
                <input
                    className="form-check-input product-card__checked"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                    // checked={productItem.checked}
                >
                </input>
            }
            <div className="product-card__content">
                <h5 className="product-card__content__title" title={productItem.title} >{productItem.title}</h5>
                <h6 className="text-danger product-card__content__price">${productItem.price}</h6>
                <h6 className="product-card__content__description">{productItem.description}</h6>
            </div>
            <BtnProduct product={productItem} deleteProduct={deleteProduct}/>
        </div>
    )
}

export default ProductItem;
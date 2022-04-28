import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';

function BtnProduct({product, deleteProduct}) {
    const state = useContext(GlobalState);
    const [isAdmin] = state.userAPI.isAdmin;
    const addCart = state.userAPI.addCart;

    return (
        <div className="d-flex product-card__btns">
            {
                isAdmin ?
                <>
                    <Link
                        className="btn btn-secondary product-card__btns__buy"
                        to="/"
                        onClick={() => deleteProduct(product._id, product.image.public_id)}
                    >
                        Delete
                    </Link>
                    <Link className="btn btn-primary product-card__btns__view" to={`/edit_product/${product._id}`}>Edit</Link>
                </>
                :
                <>
                    <Link
                        className="btn btn-secondary product-card__btns__buy"
                        to="/#!"
                        onClick={() => addCart(product)}
                    >
                        Buy
                    </Link>
                    <Link className="btn btn-primary product-card__btns__view" to={`/detail/${product._id}`}>View</Link>
                </>
            }
        </div>
    )
}

export default BtnProduct;
import { Link } from 'react-router-dom';

function BtnProduct({product}) {
    return (
        <div className="d-flex product-card__btns">
            <Link className="btn btn-secondary product-card__btns__buy" to="/cart">Buy</Link>
            <Link className="btn btn-primary product-card__btns__view" to={`/detail/${product._id}`}>View</Link>
        </div>
    )
}

export default BtnProduct;
import BtnProduct from './BtnProduct';

function ProductItem({productItem}) {
    return (
        <div className="product-card">
            <img src={productItem.image.url} className="img-fluid product-card__image" alt="Product"></img>
            <div className="product-card__content">
                <h5 className="product-card__content__title" title={productItem.title} >{productItem.title}</h5>
                <h6 className="text-danger product-card__content__price">${productItem.price}</h6>
                <h6 className="product-card__content__description">{productItem.description}</h6>
            </div>
            {/* <div className="d-flex product-card__btns">
                <Link className="btn btn-secondary product-card__btns__buy" to="#!">Buy</Link>
                <Link className="btn btn-primary product-card__btns__view" to={`/detail/${productItem._id}`}>View</Link>
            </div> */}
            <BtnProduct product={productItem} />
        </div>
    )
}

export default ProductItem;
import BtnProduct from './BtnProduct';

function ProductItem({productItem, isAdmin, deleteProduct, handleChecked}) {

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
                    checked={productItem.checked}
                    onChange={() => handleChecked(productItem._id)}
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
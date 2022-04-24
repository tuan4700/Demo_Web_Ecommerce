import { useState, useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import Loading from '../utils/loading/loading';

const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: 'Description product want to create.',
    content: 'Content product',
    category: ''
}

function CreateProduct() {
    const state = useContext(GlobalState);
    const [product, setProduct] = useState(initialState);
    const [categories] = state.categoriesAPI.categories;
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;
    // console.log(categories);

    const styleUploadImage = {
        display: image ? "block" : "none"
    }

    async function handleUpload(e) {
        try {
            if(!isAdmin) return alert("You are not an admin");
            const file = e.target.files[0];
            if(!file) return alert("File not exists");
            if(file.size > 1024*1024) return alert("File too large");
            if(file.type !== "image/jpeg" && file.type !== "image/png") return alert("File format is incorrect");
            let formData = new FormData();
            formData.append('file', file);
            setLoading(true);
            const res = await axios.post('/api/upload', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                    Authorization: token
                }
            })
            setLoading(false);
            setImage(res.data.url);
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    function closeImage() {
        setImage(false);
    }

    return (
        <div className="d-flex create-product">
            {
                loading ? <div className="create-product__upload-file"><Loading /></div> :
                <div className="create-product__upload-file">
                    <input type="file" name="file" id="upload-file-img" onChange={handleUpload}/>
                    <div className="create-product__file-img" style={styleUploadImage}>
                        <img
                            src={image ? image : ''}
                            alt=""
                            className="img-thumbnail create-product__file-img__show"
                        />
                        <button className="create-product__file-img__close" onClick={closeImage}>x</button>
                    </div>
                </div>
            }
            <form className="w-50 mt-4">
                <div className="form-group">
                    <label htmlFor="createProductID" className="create-product__form-title">Product ID</label>
                    <input
                        type="text"
                        className="form-control"
                        name="createProductID"
                        id="createProductID"
                        placeholder=""
                        value={product.product_id}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="createProductTitle" className="create-product__form-title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="createProductTitle"
                        id="createProductTitle"
                        placeholder=""
                        value={product.title}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="createProductPrice" className="create-product__form-title">Price</label>
                    <input
                        type="text"
                        className="form-control"
                        id="createProductPrice"
                        placeholder=""
                        value={product.price}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="createProductDescription" className="create-product__form-title">Description</label>
                    <textarea
                        type="text"
                        className="form-control"
                        name="createProductDescription"
                        id="createProductDescription"
                        placeholder=""
                        value={product.description}
                        required
                        rows="3"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="createProductContent" className="create-product__form-title">Content</label>
                    <textarea
                        type="text"
                        className="form-control"
                        name="createProductContent"
                        id="createProductContent"
                        placeholder=""
                        value={product.content}
                        required
                        rows="3"
                    />
                </div>
                <div className="form-group d-flex flex-justify-content create-product__form">
                    <label htmlFor="createProductCategory" className="align-self-center create-product__form-title">Category:</label>
                    <select className="form-control pt-0 pb-0 h-50" id="createProductCategory" placeholder="" value={product.content} >
                        <option>Please select a category</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-secondary mb-2 create-product__btn">Save</button>
            </form>
        </div>
    )
}

export default CreateProduct;
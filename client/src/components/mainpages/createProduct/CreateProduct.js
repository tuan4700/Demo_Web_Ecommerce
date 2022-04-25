import { useState, useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import Loading from '../utils/loading/loading';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
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
            setImage(res.data);
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    async function destroyImage() {
        try {
            if(!isAdmin) return alert("You are not an admin");
            setLoading(true);
            await axios.post('/api/destroy', {public_id: image.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false);
            setImage(false);
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    function handleChangeInput(e) {
        const {name, value} = e.target;
        setProduct({...product, [name]: value});
    }

    async function submitProduct(e) {
        e.preventDefault();
        try {
            if(!isAdmin) return alert("You are not an admin");
            if(!image) return alert("Image not exists");
            const res = await axios.post('/api/products', {...product, image}, {
                headers: {Authorization: token}
            })
            setProduct(initialState);
            setImage(false);
            alert(res.data.message);
            navigate("/"); // Go to products page
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    return (
        <div className="d-flex create-product">
            {
                loading ? <div className="create-product__upload-file"><Loading /></div> :
                <div className="create-product__upload-file">
                    <input type="file" name="file" id="upload-file-img" onChange={handleUpload}/>
                    <div className="create-product__file-img" style={styleUploadImage}>
                        <img
                            src={image ? image.url : ''}
                            alt=""
                            className="img-thumbnail create-product__file-img__show"
                        />
                        <button className="create-product__file-img__close" onClick={destroyImage}>x</button>
                    </div>
                </div>
            }
            <form className="w-50 mt-4" onSubmit={submitProduct}>
                <div className="form-group">
                    <label htmlFor="product_id" className="create-product__form-title">Product ID</label>
                    <input
                        type="text"
                        className="form-control"
                        name="product_id"
                        id="createProductID"
                        placeholder=""
                        value={product.product_id}
                        required
                        onChange={handleChangeInput}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="title" className="create-product__form-title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        id="createProductTitle"
                        placeholder=""
                        value={product.title}
                        required
                        onChange={handleChangeInput}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price" className="create-product__form-title">Price</label>
                    <input
                        type="text"
                        className="form-control"
                        name="price"
                        id="createProductPrice"
                        placeholder=""
                        value={product.price}
                        required
                        onChange={handleChangeInput}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description" className="create-product__form-title">Description</label>
                    <textarea
                        type="text"
                        className="form-control"
                        name="description"
                        id="createProductDescription"
                        placeholder=""
                        value={product.description}
                        required
                        rows="3"
                        onChange={handleChangeInput}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content" className="create-product__form-title">Content</label>
                    <textarea
                        type="text"
                        className="form-control"
                        name="content"
                        id="createProductContent"
                        placeholder=""
                        value={product.content}
                        required
                        rows="3"
                        onChange={handleChangeInput}
                    />
                </div>
                <div className="form-group d-flex flex-justify-content create-product__form">
                    <label htmlFor="category" className="align-self-center create-product__form-title">Category:</label>
                    <select
                        className="form-control pt-0 pb-0 h-50"
                        name="category"
                        id="createProductCategory"
                        placeholder=""
                        value={product.category}
                        onChange={handleChangeInput}
                    >
                        <option>Please select a category</option>
                        {
                            categories.map(category => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))
                        }
                    </select>
                </div>
                <button type="submit" className="btn btn-secondary mb-2 create-product__btn">Save</button>
            </form>
        </div>
    )
}

export default CreateProduct;
import { useState, useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';

function Categories() {
    const state = useContext(GlobalState);
    const [categories] = state.categoriesAPI.categories;
    const [token] = state.token;
    const [category, setCategory] = useState('');
    const [callback, setCallback] = state.categoriesAPI.callback;
    const [onEditCategory, setOnEditCategory] = useState(false);
    const [id, setID] = useState('');
    // console.log(state);

    async function createCategory(e) {
        e.preventDefault();
        try {
            if(onEditCategory) {
                const res = await axios.put(`/api/category/${id}`, {name: category}, {
                    headers: {Authorization: token}
                })
                alert(res.data.message);
            } else {
                const res = await axios.post('/api/category', {name: category}, {
                    headers: {Authorization: token}
                })
                alert(res.data.message);
            }
            setOnEditCategory(false);
            setCategory('');
            setCallback(!callback);
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    async function editCategory(id, name) {
        setID(id);
        setCategory(name);
        setOnEditCategory(true);
    }

    async function deleteCategory(id) {
        try {
            const res = await axios.delete(`/api/category/${id}`, {
                headers: {Authorization: token}
            })
            alert(res.data.message);
            setCallback(!callback);
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    return (
        <div className="">
            <form className="form-inline justify-content-center mt-2 mb-5" onSubmit={createCategory}>
                <div className="d-flex flex-wrap">
                    <span className="w-100 text-center categories__form-title">Category</span>
                    <input
                        type="text"
                        className="form-control categories__form-name"
                        value={category}
                        required
                        onChange={e => setCategory(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary ml-2 pl-4 pr-4"
                    >
                        {onEditCategory ? "Update" : "Save"}
                    </button>
                </div>
            </form>
            <div className="mt-2 ml-4 mr-3">
                <span className="category__list-title">List Categories</span>
                <ul className="list-group mt-2 pt-2 pb-2 category__list">
                    {
                        categories.length === 0 ? <li className="category__item-empty">Empty List Category</li>
                        :
                        categories.map(item => (
                            <li className="list-group-item d-flex category__item mb-2" key={item._id}>
                                <span className="category__item__title">{item.name}</span>
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-secondary pl-4 pr-4"
                                        onClick={() => editCategory(item._id, item.name)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary ml-2"
                                        onClick={() => deleteCategory(item._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Categories;
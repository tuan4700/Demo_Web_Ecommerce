import { useState, useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';

function Categories() {
    const state = useContext(GlobalState);
    const [categories, setCategories] = state.categoriesAPI.categories;
    const [token] = state.token;
    const [category, setCategory] = useState('');
    const [callback, setCallback] = state.categoriesAPI.callback;
    // console.log(state);

    async function createCategory(e) {
        e.preventDefault();
        try {
            const res = await axios.post('/api/category', {name: category}, {
                headers: {Authorization: token}
            })
            setCategory('');
            alert(res.data.message);
            setCallback(!callback);
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    return (
        <div className="d-flex row">
            <form className="col form-inline" onSubmit={createCategory}>
                <div className="d-flex justify-content-center align-items-center flex-wrap">
                    <span className="w-100 categories__form-title">Category</span>
                    <input type="text" className="form-control" value={category} required onChange={e => setCategory(e.target.value)}/>
                    <button type="submit" className="btn btn-primary ml-3 pl-4 pr-4">Save</button>
                </div>
            </form>
            <div className="col mt-2">
                <span className="category__list-title">List Categories</span>
                <ul className="list-group mt-2">
                    {
                        categories.length === 0 ? <li className="category__item-empty">Empty List Category</li>
                        :
                        categories.map(item => (
                            <li className="list-group-item d-flex category__item mb-2" key={item._id}>
                                <span>{item.name}</span>
                                <div>
                                    <button type="button" className="btn btn-secondary pl-4 pr-4">Edit</button>
                                    <button type="button" className="btn btn-secondary ml-2">Delete</button>
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
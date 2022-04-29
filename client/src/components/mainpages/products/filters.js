import { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';

function Filters() {
    const state = useContext(GlobalState);
    const [categories] = state.categoriesAPI.categories;
    // const [products, setProducts] = state.productsAPI.products;
    const [category, setCategory] = state.productsAPI.category;
    const [sort, setSort] = state.productsAPI.sort;
    const [search, setSearch] = state.productsAPI.search;

    function handleCategory(e) {
        setCategory(e.target.value);
        setSearch("");
    }

    return (
        <div className="form-group d-flex mb-2 align-items-center">
            <label htmlFor="filters" className="mb-0 filters__title">Filters:</label>
            <select
                className="form-control pb-0 pt-0 pl-2 ml-2 filters__selects"
                id="filters"
                onChange={handleCategory}
                name="category"
                value={category}
            >
                <option value="">All Products</option>
                {
                    categories.map(category => (
                        <option key={category._id} value={"category=" + category._id}>
                            {category.name}
                        </option>
                    ))
                }
            </select>

            <input
                type="text"
                className="form-control pb-0 pt-0 ml-2 filters__search"
                value={search}
                placeholder="Enter your search..."
                onChange={e => setSearch(e.target.value.toLowerCase())}
            >
            </input>

            <label htmlFor="filters" className="mb-0 ml-2 filters__sort">Sort By:</label>
            <select
                className="form-control pb-0 pt-0 pl-2 ml-2 filters__selects"
                id="filters"
                onChange={e => setSort(e.target.value)}
                value={sort}
            >
                <option value="">Newest</option>
                <option value="sort=oldest">Oldest</option>
                <option value="sort=-sold">Best Sales</option>
                <option value="sort=-price">Price: Hight-Low</option>
                <option value="sort=price">Price: Low-Hight</option>
            </select>
        </div>
    )
}

export default Filters;
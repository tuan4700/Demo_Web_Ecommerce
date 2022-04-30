import { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';

function LoadMore() {
    const state = useContext(GlobalState);
    const [page, setPage] = state.productsAPI.page;
    const [result] = state.productsAPI.result;

    return (
        <div className="d-flex justify-content-center mb-4">
            {
                result < page * 9 ? "" : 
                <button type="button" className="btn btn-secondary" onClick={() => setPage(page + 1)}>Load More</button>
            }
        </div>
    )
}

export default LoadMore;
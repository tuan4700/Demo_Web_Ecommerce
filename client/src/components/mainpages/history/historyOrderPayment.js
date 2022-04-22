import { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';

function HistoryOrderPayment() {
    const state = useContext(GlobalState);
    const [history] = state.userAPI.history;
    console.log(history);

    function emptyCartHistory() {
        return (
            <>
            <table className="table table-bordered">
                <thead>
                    <tr>
                    <th scope="col" colSpan="2" className="text-center">Payment ID</th>
                    <th scope="col" colSpan="2" className="text-center">Date Of Purchase</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
            </table>
            <h5 className="text-center" colSpan="5">Cart History Empty</h5>
            </>
        )
    }

    function non_emptyCartHistory() {
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                    <th scope="col" colSpan="2" className="text-center">Payment ID</th>
                    <th scope="col" colSpan="2" className="text-center">Date Of Purchase</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map(item => (
                            <tr key={item._id}>
                                <td colSpan="2" className="text-center">{item.paymentID}</td>
                                <td colSpan="2" className="text-center">{new Date(item.createdAt).toLocaleDateString()}</td>
                                <td className="text-center"><Link to={`/history/${item._id}`} className="text-info">View</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }

    return (
        <div>
            <h3 className="history__title">History</h3>
            <h6 className="history__orders">You have {history.length} ordered</h6>
            {
                history.length === 0 ? emptyCartHistory() : non_emptyCartHistory()
            }
        </div>
    )
}

export default HistoryOrderPayment;
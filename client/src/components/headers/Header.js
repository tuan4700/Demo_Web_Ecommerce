import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import Cart from './icon/cart.svg';
import axios from 'axios';

function Header() {
    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;
    const [cart] = state.userAPI.cart;

    async function logoutUser() {
        await axios.get('/user/logout');
        localStorage.removeItem('firstLogin');
        window.location.href = "/";
    }

    function adminRouter() {
        return (
            <>
                <li className="nav-item">
                    <Link to="/create_product" className="nav-link pr-3">Create_Product</Link>
                </li>
                <li className="nav-item">
                    <Link to="/category" className="nav-link pr-3">Categories</Link>
                </li>
            </>
        )
    }

    function loggedRouter() {
        return (
            <>
                <li className="nav-item">
                    <Link to="/history" className="nav-link pr-3">History</Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link pr-3" onClick={logoutUser}>Logout</Link>
                </li>
            </>
        )
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand Logo">{isAdmin ? 'ADMIN' : 'ECOMMERCE WEB'}</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse Navbar_actions" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-0 ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link pr-3" to="/">{isAdmin ? 'Product' : 'Shop'}<span className="sr-only">(current)</span></Link>
                        </li>
                        {isAdmin && adminRouter()}
                        {isLogged ? loggedRouter() :
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link pl-0 pr-0 align-self-center text-dark d-none d-none d-lg-block d-xl-block">&#10022;</span>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link pr-3" to="/register">Register</Link>
                            </li>
                        </> 
                        }
                        <li className="nav-item">
                            {
                                isAdmin ? '' : 
                                <Link className="nav-link disabled position-relative pr-3" to="/cart">
                                    <span className="position-absolute rounded-circle Cart_quantity">{cart.length}</span>
                                    <img src={Cart} alt="" className="Cart_icon"></img>
                                </Link>
                            }
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header;
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import Menu from './icon/bars.svg';
import Cart from './icon/cart.svg';
import Close from './icon/close.svg';

function Header() {
    const value = useContext(GlobalState);
    return (
        <div>
            {/* <div className="Menu">
                <img src={Menu} alt="" width="30px"/>
            </div>

            <div className="Logo">
                ECOMMERCE WEB
            </div>

            <ul>
                <li className="Product"><Link to="/">Product</Link></li>
                <li className="Account"><Link to="/login">Login &#10022; Register</Link></li>
            </ul>

            <div className="Close">
                <img src={Close} alt="" width="30px"/>
            </div>

            <div className="Cart">
                <Link to="/">
                    <span>0</span>
                    <img src={Cart} alt="" width="30px"></img>
                </Link>
            </div> */}

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="navbar-brand Logo">ECOMMERCE WEB</div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse Navbar_actions" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-0 ml-auto">
                        <li className="nav-item pr-3 active">
                            <Link className="nav-link" to="/">Product <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item pr-3 d-flex">
                            <Link className="nav-link" to="/login">Login</Link>
                            <span className="align-self-center">&#10022;</span>
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                        <li className="nav-item pr-3">
                            <Link className="nav-link disabled position-relative" to="/cart">
                                <span className="position-absolute rounded-circle Cart_quantity">0</span>
                                <img src={Cart} alt="" className="Cart_icon"></img>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header;
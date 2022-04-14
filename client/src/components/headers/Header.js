import { useContext, useState } from 'react';
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

            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="navbar-brand Logo">ECOMMERCE WEB</div>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse Navbar_actions" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-0 ml-auto">
                        <li class="nav-item pr-3 active">
                            <Link class="nav-link" to="/">Product <span class="sr-only">(current)</span></Link>
                        </li>
                        <li class="nav-item pr-3 d-flex">
                            <Link class="nav-link" to="/login">Login</Link>
                            <span className="align-self-center">&#10022;</span>
                            <Link class="nav-link" to="/register">Register</Link>
                        </li>
                        <li class="nav-item pr-3">
                            <Link class="nav-link disabled position-relative" to="/cart">
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
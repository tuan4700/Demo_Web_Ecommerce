import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Products from './products/products';
import DetailProduct from './DetailProduct/DetailProduct';
import Login from './auth/login';
import Register from './auth/Register';
import Cart from './cart/cart';
import HistoryOrderPayment from './history/historyOrderPayment';
import OrderDetails from './history/orderDetails';
import Categories from './categories/Categories';
import CreateProduct from './createProduct/CreateProduct';
import NotFound from './utils/not_found/NotFound';

import { GlobalState } from '../../GlobalState';

function Pages() {
    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;

    return (
        <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/detail/:id" element={<DetailProduct />} />

            <Route path="/login" element={isLogged ? <NotFound /> : <Login />} />
            <Route path="/register" element={isLogged ? <NotFound /> : <Register />} />

            <Route path="/create_product" element={isAdmin ? <CreateProduct /> : <NotFound />} />

            <Route path="/category" element={isAdmin ? <Categories /> : <NotFound />} />

            <Route path="/history" element={isLogged ? <HistoryOrderPayment /> : <NotFound />} />
            <Route path="/history/:id" element={isLogged ? <OrderDetails /> : <NotFound />} />

            <Route path="/cart" element={<Cart />} />


            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default Pages;
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Products from './products/products';
import DetailProduct from './DetailProduct/DetailProduct';
import Login from './auth/login';
import Register from './auth/Register';
import Cart from './cart/cart';
import NotFound from './utils/not_found/NotFound';

function Pages() {
    return (
        <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/detail/:id" element={<DetailProduct />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />


            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default Pages;
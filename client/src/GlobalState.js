import { createContext, useState, useEffect } from 'react';
import ProductsApi from './api/ProductsAPI';
import UserAPI from './api/UserAPI';
import axios from 'axios';

export const GlobalState = createContext();


export function DataProvider({children}) {
    const [token, setToken] = useState(false);

    async function resfreshToken() {
        const res = await axios.get('/user/refresh_token');
        setToken(res.data.accesstoken);
    }

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin');
        if(firstLogin) {
            resfreshToken();
        }
    }, []);

    const state = {
        token: [token, setToken],
        productsAPI: ProductsApi(),
        userAPI: UserAPI(token)
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
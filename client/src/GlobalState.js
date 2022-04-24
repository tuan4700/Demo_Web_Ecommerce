import { createContext, useState, useEffect } from 'react';
import ProductsApi from './api/ProductsAPI';
import UserAPI from './api/UserAPI';
import CategoriesAPI from './api/CategoriesAPI';
import axios from 'axios';

export const GlobalState = createContext();


export function DataProvider({children}) {
    const [token, setToken] = useState(false);

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin', true);
        if(firstLogin) {
            async function resfreshToken() {
                const res = await axios.get('/user/refresh_token');
                setToken(res.data.accesstoken);
                
                setTimeout(() => {
                    resfreshToken();
                }, 10 * 60 * 60 * 1000);
            }
            
            resfreshToken();
        }
    }, []);

    const state = {
        token: [token, setToken],
        productsAPI: ProductsApi(),
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI()
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
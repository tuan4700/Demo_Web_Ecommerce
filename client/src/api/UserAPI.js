import { useState, useEffect } from 'react';
import axios from 'axios';

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);
    const [history, setHistory] = useState([]);
    const [callback, setCallback] = useState(false);

    useEffect(() => {
        if(token) {
            async function getUser() {
                try {
                    const res = await axios.get('/user/info', { 
                        headers: {Authorization: token}
                    });

                    setIsLogged(true);
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

                    setCart(res.data.cart);
                } catch (error) {
                    alert(error.response.data.message);
                }
            }

            getUser();
        }
    }, [token]);

    useEffect(() => {
        if(token) {
            async function getHistory() {
                const res = await axios.get('/user/history', {
                    headers: {Authorization: token}
                });
                setHistory(res.data);
            }

            getHistory();
        }
    }, [token, callback]);

    async function addCart(product) {
        if(!isLogged) return alert("Please login to continue buying.");
        
        const check = cart.every(item => {
            return item._id !== product._id;
        })
        if(check) {
            setCart([...cart, {...product, quantity: 1}]);

            await axios.patch('/user/addcart', {cart: [...cart, {...product, quantity: 1}]}, {
                headers: {Authorization: token}
            })
        } else {
            alert("The product has been added to cart");
        }
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory],
        callback: [callback, setCallback]
    }
}

export default UserAPI;
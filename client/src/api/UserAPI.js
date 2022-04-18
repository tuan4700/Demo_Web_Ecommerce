import { useState, useEffect } from 'react';
import axios from 'axios';

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if(token) {
            async function getUser() {
                try {
                    const res = await axios.get('/user/info', { 
                        headers: {Authorization: token}
                    });

                    setIsLogged(true);
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

                    console.log(res);
                } catch (error) {
                    alert(error.response.data.message);
                }
            }

            getUser();
        }
    }, [token]);

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin]
    }
}

export default UserAPI;
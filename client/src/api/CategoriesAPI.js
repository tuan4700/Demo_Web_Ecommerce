import { useState, useEffect } from 'react';
import axios from 'axios';

function CategoriesAPI() {
    const [categories, setCategories] = useState([]);
    const [callback, setCallback] = useState(false);

    useEffect(() => {
        async function getCategories() {
            const res = await axios.get('/api/category');
            setCategories(res.data)
        }

        getCategories();
    }, [callback])

    return {
        categories: [categories, setCategories],
        callback: [callback, setCallback]
    }
}

export default CategoriesAPI;
import { useState, useEffect } from 'react';
import axios from 'axios';

function ProductsApi() {
    const [products, setProducts] = useState([]);

    return {
        products: [products, setProducts]
    }

}

export default ProductsApi;
import { useEffect } from "react";
import { useState } from "react";
import ProductDisplay from "./productDisplay";
import ProductDisplayNext10 from "./productNext10";

const ProductNext = () => {

    const [product, setProduct] = useState([]);
    const [productNext10, setProductNext10] = useState([]);

    useEffect(() => {
        // const options = {
        //     method: 'GET',
        //     headers: {
        //         'X-RapidAPI-Key': '4e42d0c84fmshad21791bff9573ep11f3f5jsn6fd829760e41',
        //         'X-RapidAPI-Host': 'e-commerce12.p.rapidapi.com'
        //     }
        // };
        
        // fetch('https://e-commerce12.p.rapidapi.com/products/toprated?rating=4&page=1&limit=50', options)
        //     .then(response => response.json())
        //     .then(response => console.log(response))
        //     .catch(err => console.error(err));

        fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=> {
                const dataInArrayForm = Array.from(data)
                const first10 = dataInArrayForm.slice(0, 10)
                const next10 = dataInArrayForm.slice(10, 20);
                setProductNext10(next10)
                setProduct(first10)
                console.log(next10)})
    }, [])

    return (
        <>
        <h1>Available Products</h1>
        {productNext10.map((item) => {
            return(
                <ProductDisplayNext10 image={item.image} description={item.description} alt="fakeAPI"/>
            )
        })}
        </>
    )
};

export default ProductNext;
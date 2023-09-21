import { useCallback, useEffect, useState } from 'react';
import './App.css';

function Menu() {
    const [productName, setProductName] = useState('');
    
    const [arrayOfProduct, setArrayOfProduct] = useState([]);

    const searchProduct = useCallback(
        async () => {
            try {
                const productAPI = await fetch(
                    `https://forkify-api.herokuapp.com/api/v2/recipes?search=${productName}`
                )

                if (!productAPI.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await productAPI.json();
                const allRecipes = jsonData.data || [];
                const deStructure = allRecipes.recipes
                // console.log(...deStructure);
                setArrayOfProduct(deStructure)


            } catch (error) {
                console.error('there is a problem may be in your connection', error);
            }
        }, [productName])
    // jab bhi koi cahnges hongey to
    useEffect(() => {
        searchProduct()
    }, [searchProduct])


    const onInputChange = (e) => {
        setProductName(e.target.value)
    }

    const onKeyEnter = (e) => {
        if (e.key === 'Enter') {
            searchProduct();
        }
    }
    return (
        <>
            <div className="menuDiv">
                <div className="input">
                    <input
                        type="text"
                        placeholder='enter the food that you want,s'
                        value={productName}
                        onChange={onInputChange}
                        onKeyPress={onKeyEnter}
                    />
                </div>
                <div className="allProducts">
                    {arrayOfProduct.map((singleProduct) => (
                        <SingleProduct key={singleProduct.id} dataOfsingleProdut={singleProduct} />
                    ))}
                </div>
            </div>
        </>
    )

}

function SingleProduct(props) {
    const price = ((Math.random()+11)*22).toFixed(1)
    // console.log(price);
    const { title, publisher, image_url } = props.dataOfsingleProdut || {}
    // console.log(props.dataOfsingleProdut);
    return(
        <div className="main">
        <div className="singleItem">
            <div className="textArea">
                <div className="imageDiv">
                    <img className="img-fluid picture" src={image_url} alt="burger" />
                </div>
    
                <div className="upperText">
                    <h3>{publisher}</h3>
                    <h4>price:{price}$</h4>
                </div>
                <hr/>
                <div className="lowerText">
                    <p>{title}</p>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Menu;
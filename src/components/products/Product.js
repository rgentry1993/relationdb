import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom"

function Product(props) {

    const cart = useSelector(state=>state.cart);

    const text = cart.name;


    return(
     <div>
         <h1>{text}</h1>
         <Link to={`/itempage/${props.text}`}>Link to itemPage {props.id}</Link>

     </div>
    )

}


export default Product;
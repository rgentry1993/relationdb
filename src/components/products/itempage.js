import React from 'react';
import {Link} from "react-router-dom";
import Card from "../card/Card";

function ItemPage(props) {

    return(

        <div>
            <h1>Item selected: {props.match.params.id}</h1>
            <div><Card imageurl = "{it.imageURL}"/></div>

            <ul>
                    <Link to="/collection">Back to the collection</Link>

            </ul>
        </div>

    )}



export default ItemPage;
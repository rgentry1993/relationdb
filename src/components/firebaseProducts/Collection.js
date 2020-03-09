import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {checkChange} from "../../redux/actions/setActions";
import fire from "../../firebase/Fire";
import {Link} from "react-router-dom";
import Card from "../card/Card";
import MyCollection from "../about/MyCollection";

function Collection(props) {


    const cart = useSelector(state => state.cart);
    const [items, setItems] = React.useState(cart);
    const [load] = React.useState(true);
    const [error] = React.useState(false);

    const db = fire.firestore();

    const dispatch = useDispatch();


    React.useEffect(() => {



        setItems(cart);
    }, [db, cart]);


    const addToMyStuff = (it) => {

        const newItem = {
            name: it.name,
        };



        db.collection("user").doc("sKaZeNXZBjx9e3SO6HMn").collection("userName").add(newItem).then(() => {
            dispatch(checkChange());
        });
    };

    let itemsEle = items.map((it, idx) =>

        <div key={idx}>
            <Link to={`/itempage/${it.name}`}> <h1>{it.name}</h1> </Link>
            <Card name={it.name} imagesrc = {it.imageURL} color = {it.color}/>

            <img src = {it.imageURL}></img>


            <button onClick={() => {
                addToMyStuff(it)
            }}>Add to myCollection
            </button>


        </div>
    );

    return (
        <div>
            {itemsEle}

        </div>
    )
}


export default Collection;
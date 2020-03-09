import React from "react";
import {useSelector, useDispatch} from "react-redux"
import {checkChange} from "../../redux/actions/setActions";
import fire from "../../firebase/Fire";
import {Link} from "react-router-dom";
import Card from "../card/Card";

function MyCollection(){

    const cart = useSelector(state=>state.cart);
    const [myItems, setMyItems] = React.useState([]);
    const dispatch = useDispatch();
    const db = fire.firestore();


    React.useEffect(()=> {

        let newItems = [];


        db.collection("user").doc("sKaZeNXZBjx9e3SO6HMn").collection("userName").get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
                const object = doc.data();
                let item = {
                    name: object.name,
                    imageURL: object.imageURL,
                    id:doc.id
                };
                newItems.push(item);

            });

            setMyItems(newItems);
        });

    },[db, cart]);

    const deleteItem =id=>{
        db.collection("user").doc("sKaZeNXZBjx9e3SO6HMn").collection("userName").doc(id).delete().then(()=>{
            dispatch(checkChange());
        })
    };

    let myItemsEle = myItems.map((it,idx)=>
        <div key={idx}>
            <Link to={`/itempage/${it.name}`}> <h1>{it.name}</h1> </Link>
            <img src = {it.imageURL}></img>
        <button onClick={()=>deleteItem(it.id)}>Remove from myCollection</button></div>
    );

// below can use {user.name} in h1
    return(
        <div>
            {myItemsEle}
        </div>
    )
}




export default MyCollection;
import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {checkChange} from "../../redux/actions/setActions";
import fire from "../../firebase/Fire";

function AdminPage(props){



    const cart = useSelector(state=>state.cart);
    const [items, setItems] =React.useState(cart);
    const dispatch =useDispatch();
    const [value, setValues]=React.useState({
        name: "",
        imageURL: "",
    });





    const db = fire.firestore();


    React.useEffect(()=>{
        setItems(cart);
    },[db, cart]);



    const handleChange = prop => event => {
        if (prop==="cost"){
            setValues({...value, [prop]: {
                    USA:Number(event.target.value),
                    CANADA:Number(event.target.value)+5,
                    UK:Number(event.target.value)/2
                }});
        }else{
            setValues({...value, [prop]:event.target.value});
        }

    };

    const submit =()=>{


            db.collection("products").add(value).then(() => {
                setValues({

                    name: "",
                    imageURL: ""
                });
                dispatch(checkChange());

            });

        };

    const deleteItem =id=>{
        db.collection("products").doc(id).delete().then(()=>{
            dispatch(checkChange());

        })
    };


    let itemsEle = items.map((it , idx)=>

        <div key={idx}>
            <h1>{it.name}</h1>
            <h2>{it.imageURL}</h2>
            <button onClick={()=>deleteItem(it.id)}>Remove from Products List</button>

        </div>
    );


    return(
        <div>
            <div>
                <input type="text" placeholder="Name" onChange={handleChange("name")} value={value.name}/>
                <input type="text" placeholder="Image URL" onChange={handleChange("imageURL")} value={value.imageURL}/>
                <button onClick={submit}>Submit</button>
            </div>

            {items.length===0?"No items filtered":itemsEle}
        </div>
    )
}


export default AdminPage;
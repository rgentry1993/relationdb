import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {changeSort} from "../../redux/actions/setActions";

function Products(props){

    const [items, setItems]=React.useState([]);
    const user = useSelector(state=>state.user);
    const cart= useSelector(state=>state.cart);
    const sort = useSelector(state=>state.sort);
    const [country] = React.useState(user.country);
    const dispatch = useDispatch();

    React.useEffect(()=>{
        let sortedList = cart;
            for(let i in sort){
                if(sort[i].toggle){
                 sortedList=sortedList.filter(it=>{
                     return sort[i].val.includes(it[i])
                 });
                }
            }

        setItems(sortedList);
    },[sort, cart]);







    let itemsEle = items.map((it , idx)=>

    <div key={idx}>
        <h1>{it.name}</h1>
        <h2>{it.color}</h2>
    <h4>{country==="USA"&&"Cost in USA:$"+it.cost.USA}</h4>
        <h4>{country==="CANADA"&&"Cost in CANADA:"+it.cost.CANADA}</h4>
        <h4>{country==="UK"&&"Cost in UK:"+it.cost.UK}</h4>

    </div>
    );

        let style={
          color:"red"
        };

    return(
        <div>
            <button style={sort.type.val.includes("shirt")?style:null} onClick={()=>dispatch(changeSort("type","shirt"))}>Shirts</button>
            <button onClick={()=>dispatch(changeSort("type","pants"))}>Pants</button>
            <button style={sort.color.val.includes("red")?style:null} onClick={()=>dispatch(changeSort("color","red"))}>Red</button>
            <button onClick={()=>dispatch(changeSort("color","blue"))}>Blue</button>
            <button onClick={()=>dispatch(changeSort("color","green"))}>Green</button>
            {items.length===0?"No items filtered":itemsEle}
        </div>
    )
}


export default Products;
import React from 'react';
import './App.css';
import MyCollection from "./components/about/MyCollection";
import Home from "./components/home/Home";
import Product from "./components/products/Product";
import {initCart} from "./redux/actions/setActions";
import {useSelector, useDispatch} from "react-redux";
import Collection from "./components/firebaseProducts/Collection";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import fire from "./firebase/Fire";
import AdminPage from "./components/products/AdminPage";
import ItemPage from "./components/products/itempage";

function App(props) {

    const change = useSelector(state=>state.change);
    const cart = useSelector(state=>state.cart);
    const dispatch = useDispatch();
    const db = fire.firestore();

    React.useEffect(()=> {

        let newItems = [];


        db.collection("products").get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
                const object = doc.data();
                let item = {
                    name: object.name,
                    type: object.type,
                    id:doc.id
                };
                newItems.push(item);

            });

            dispatch(initCart(newItems));
        });

    },[db, dispatch, change]);



    return (

        <Router>
            <div className="App">
                <nav>
                    <Link to={"/"}>userPage</Link>-
                    <Link to={"/collection"}>Collection</Link>-
                    <Link to={"/mycollection"}>myCollection</Link>-
                    <Link to={"/adminpage"}>Admin Page</Link>
                </nav>
                <Switch>
                    <Route path={"/"} exact component={Home}/>
                    <Route path={"/mycollection"} component={MyCollection}/>
                    <Route path={"/collection"} component={Collection}/>
                    <Route path={"/adminpage"} component={AdminPage}/>
                    <Route path={"/itempage/:id"} component={ItemPage}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner, faExclamationCircle, faCircle} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";

function Card(props) {


    const [load, setLoad] = React.useState("loading");

    const [rend, setRend] = React.useState({
        img:false,
        spin:true,
        error:false
    });

    const [seconds, setTime] = React.useState(0);


    React.useEffect(()=>{
        let interval = null;


        interval = setInterval(()=>{
          setTime(seconds => seconds +1);
            if(load) {
                if(props.imageURL===null){
                    setRend({
                        img:false,
                        load:false,
                        error:true
                    });
                }else{
                    setRend({
                        img:true,
                        load:false,
                        error:false
                    });
                }

            } else {
                if(seconds>3){
                    setRend({
                        img:false,
                        load:false,
                        error:true
                    });
                }else{
                    setRend({
                        img:false,
                        load:true,
                        error:false
                    });
                }
            }
      }, 1000);

        return()=> clearInterval(interval);

    },[seconds,load, props.imageURL]);


    const handleLoad = () => {
        setLoad(true)
    };

    const handleError = () => {
        setLoad(false)
    };


    console.log(props.name);


    return(
        <div className="card">
            {rend.img&& <img alt={props.name} onLoad={handleLoad} onError={handleError} src={props.imageURL}/>}
            <h1></h1>
            {rend.spin&&<FontAwesomeIcon icon={faSpinner} spin/>}
            {rend.error&&<FontAwesomeIcon icon={faExclamationCircle}/>}
        </div>
    )

}

export default Card;
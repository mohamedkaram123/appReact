import React, { useEffect, useRef, useState } from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
  import Home from '../learn redux/home'
export default function CheckAuth() {
        const [logged, setlogged] = useState(false)
           const mounted = useRef(false);
    useEffect(() => {
      if (!mounted.current) {


          if (!localStorage.getItem('user')) {

              setlogged(false)
          } else {
              setlogged(true)

          }


        mounted.current = true;
      } else {

        // do componentDidUpdate logic
      }
    }, []);
    if(logged)  {


           return (
        <div className="d-flex flex-row" style={{justifyContent:"center",alignItems:"center",marginTop:50}}>
            <Home />
        </div>
    )
     }else {
        return <Redirect to={process.env.MIX_FOLDER_APP_NAME+"auth"} />;
     }
}

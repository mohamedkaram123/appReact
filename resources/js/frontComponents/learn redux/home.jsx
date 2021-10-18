import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import Home2 from './home2';
import Header from './navbar'
import Home3 from './home3';
import { connect } from 'react-redux';
import { csrf_token,header_auth } from '../helpers/header';
import { useHistory } from "react-router-dom";
import {encryptLocalStorage,decryptLocalStorage} from '../helpers/hash';
import LoadingInline from '../helpers/LoadingInline';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
 function Home(props) {
          let history = useHistory();
    const [trans, setTrans] = useState({
        "Home": "",

    })
     console.log({ props });
     const [loadingPage, setloadingPage] = useState(true)

   const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current) {


            if (!decryptLocalStorage('user')) {
                  history.replace(process.env.MIX_FOLDER_APP_NAME + "auth")

            } else {


          let data = {
              csrf_token,
              trans
          }
                axios.post(process.env.MIX_API_DOMAIN + "translate_auth", data, header_auth)
                    .then(res => {
                        setloadingPage(false)
                        setTrans(res.data.data)

                    })
                    .catch(err => {
                    console.log({err});
                })

            }
        mounted.current = true;
        } else {

      }
    }, []);
     if (loadingPage) {

         return (
             <div>
                 <LoadingInline />

             </div>
         )

     } else {
         return (
             <div className="d-flex flex-row" style={{ justifyContent: "center", alignItems: "center", marginTop: 50 }}>
                 hello home
             </div>
         )

     }
   // }


}


var mapStateAsProps = (state) => {
    return {
        count:state.count
    }
}

const action1 = {
    type:"INCREASE"
}
const action2 = {
    type:"DECREASE"
}

var mapDispatchProps = (dispatch) => {
    return {
        check_user:()=>dispatch( {type:"User"}),
    }
}
export default connect(mapStateAsProps,mapDispatchProps)(Home)

import React, { useEffect, useRef, useState } from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import Home from '../learn redux/home'
import { connect } from 'react-redux';

  import {encryptLocalStorage,decryptLocalStorage} from '../helpers/hash';

export default  function CheckAuth() {

const logged = false;

    const [loggedData, setloggedData] = useState(false)

    if(decryptLocalStorage('user'))  {


                return <Redirect to={process.env.MIX_FOLDER_APP_NAME+"home"} />;


    } else {

        return <Redirect to={process.env.MIX_FOLDER_APP_NAME+"auth"} />;
     }
}


import React, { useEffect, useRef, useState } from 'react'

import AnimateLoginReg from './auth/animateLoginReg';
import './styles/custom-style.scss';



const lang_check = localStorage.getItem("lang_dir");

console.log({lang_check});

if (lang_check == "1") {
    require("../../../public/assets/css/bootstrap.rtl.min.css");
} else {
        require("../../../public/assets/css/bootstrap.min.css");

}


import CheckAuth from './auth/checkAuth'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
export default function RouterHome() {

    console.log(process.env.MIX_FOLDER_APP_NAME);

    return (
        <div>

            <Router>

                <Switch>
                    <Route path={ process.env.MIX_FOLDER_APP_NAME + "auth"} >
                                <AnimateLoginReg />
                    </Route>

                     <Route path="/">
                                <CheckAuth />
                    </Route>

                </Switch>
        </Router>
        </div>
    )
}

import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import Home2 from './home2';
import Header from './navbar'
import Home3 from './home3';
import { connect } from 'react-redux';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
 function Home(props) {


 return (
     <div className="d-flex flex-row" style={{ justifyContent: "center", alignItems: "center", marginTop: 50 }}>
        hello home
     </div>
    )


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
        increase:()=>dispatch(action1),
        decrease:()=>dispatch(action2)
    }
}
export default connect(mapStateAsProps,mapDispatchProps)(Home)

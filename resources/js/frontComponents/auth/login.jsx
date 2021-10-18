
import React,{useRef,useState,useEffect} from 'react'
import { useSpring, animated } from 'react-spring'
import axios from "axios";
import { csrf_token } from '../helpers/header';
import { useHistory } from "react-router-dom";
import {encryptLocalStorage,decryptLocalStorage} from '../helpers/hash';


export default function Login({ trans,handleLoading }) {
      let history = useHistory();

    const  loginImg = process.env.MIX_ASSET_URL + "uploads/login.svg";

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })
    const [error, seterror] = useState({
        email: "",
        password:""
    })
    const handle_login_data = (type,e) => {

                                     setLoginData((prevState) => ({
                                                       ...prevState,
                                                       [type]: e.target.value
                                     }));
    }

    const send_data = () => {
                handleLoading(true);

        loginData["_token"] = csrf_token;

        axios.post(process.env.MIX_API_DOMAIN +"login",loginData)
            .then(res => {
                    console.log({res:res.data});

                if (res.data.status == 1) {
                    encryptLocalStorage(res.data.data,"user")
                        history.replace(process.env.MIX_FOLDER_APP_NAME + "home")
                } else {
                         handleLoading(false);

                    Object.keys(error).map(function (key, index) {

                        if (key in res.data.msg) {
                             seterror((prevState) => ({
                                                       ...prevState,
                                                       [key]: res.data.msg[key][0]
                                               }));
                        } else{
                                seterror((prevState) => ({
                                                       ...prevState,
                                                       [key]: ""
                                               }));
                        }


                    });
                }
            })
        .catch(err=>{})
    }

    //     if (redirect) {
    //    return <Redirect to='/somewhere'/>;
    //  }
    return (
        <div className="base-container" >


        <div className="header">{trans["Login"]}</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group" style={{marginBottom:30}}>
                        <label htmlFor="username">{trans["Username"]}</label>
                        <input style={{marginBottom:0}} onChange={handle_login_data.bind(this, "email")} type="text" name="username" placeholder="username" />
                                                <small style={{color:"#dc3545"}}>{ error.email}</small>

            </div>
            <div className="form-group" style={{marginBottom:30}}>
                        <label htmlFor="password">{trans["Password"]}</label>
                        <input style={{marginBottom:0}} onChange={handle_login_data.bind(this, "password")} type="password" name="password" placeholder="password" />
                                                <small style={{color:"#dc3545"}}>{ error.password}</small>

            </div>
          </div>
        </div>
        <div className="footer">
          <button onClick={send_data} type="button" className="btn">
                    {trans["Login"]}
                </button>

        </div>
      </div>
    )
}

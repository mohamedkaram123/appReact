
import React,{useRef,useState,useEffect} from 'react'
import { useSpring, animated } from 'react-spring'
import axios from "axios";
import { useHistory } from "react-router-dom";
import {encryptLocalStorage,decryptLocalStorage} from '../helpers/hash';


export default function Register({ handleLoading, trans }) {
          let history = useHistory();

    const  loginImg = process.env.MIX_ASSET_URL + "uploads/login.svg";
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [error, seterror] = useState({
        name: "",
        email: "",
        password:""
    })


    const register = () => {

        handleLoading(true);


        let csrf_token =   document.querySelector('meta[name="csrf-token"]').getAttribute('content');


        let  data_post = {
            name,
             email,
             password,
              "_token": csrf_token
          }
        axios.post(process.env.MIX_API_DOMAIN +"register",data_post)
            .then(res => {

                if (res.data.status == 0) {
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
                    console.log({error});

                } else {
                    encryptLocalStorage(res.data.data,"user")

                        history.replace(process.env.MIX_FOLDER_APP_NAME + "home")
                }

                console.log(res);

        })
        .catch(err=>{

        })

    }

    return (
   <div className="base-container" >
            <div className="header">{trans["Register"]}</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group" style={{marginBottom:30}} >
                        <label htmlFor="username">{trans["Username"]}</label>
                        <input style={{marginBottom:0}} onChange={e => {
                            setName(e.target.value)
                        }} type="text" name="username" placeholder="username" />
                        <small style={{color:"#dc3545"}}>{ error.name}</small>
            </div>
            <div className="form-group" style={{marginBottom:30}} >
                        <label htmlFor="email">{trans["Email"]}</label>
              <input style={{marginBottom:0}}  onChange={e => {
                            setEmail(e.target.value)
                        }} type="text" name="email" placeholder="email" />
                        <small style={{color:"#dc3545"}}>{ error.email}</small>

            </div>
            <div className="form-group"  style={{marginBottom:30}}>
                        <label htmlFor="password">{trans["Password"]}</label>
              <input style={{marginBottom:0}} onChange={e => {
                            setpassword(e.target.value)
                        }} type="text" name="password" placeholder="password" />
                        <small style={{color:"#dc3545"}}>{ error.password}</small>

            </div>
          </div>
        </div>
        <div className="footer">
          <button onClick={register} type="button" className="btn">
                    {trans["Register"]}
          </button>
        </div>
      </div>

    )
}

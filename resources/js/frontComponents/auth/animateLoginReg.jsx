import React, { useEffect, useRef, useState } from 'react'
import { useSpring, animated ,useChain} from 'react-spring'
import Login from './login';
import Register from './register';
import LoadinOverlay from '../helpers/loadinOverlay';
import LoadingInline from '../helpers/LoadingInline';
import axios from "axios";
import { header, csrf_token } from '../helpers/header';
import NavbarLogin from './navbar_login';
import { useHistory } from "react-router-dom";
import {encryptLocalStorage,decryptLocalStorage} from '../helpers/hash';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
export default function AnimateLoginReg() {
          let history = useHistory();

    const [transformSpring1, settransformSpring1] = useState(`translate(0px, 0px)`)
    const [transformSpring2, settransformSpring2] = useState(`translate(1200px, 0px)`)
    const [toglleSpring, settoglleSpring] = useState(true)
    const [loading, setloading] = useState(false)
    const [loadingPage, setloadingPage] = useState(true)
        const [authLogin, setauthLogin] = useState(false)

    const [langs, setLangs] = useState({})
    const [checkLang, setCheckLang] = useState("")
    const [trans, setTrans] = useState({
        "Navbar": "",
        "Home": "",
        "Langs": "",
        "Register": "",
        "Login":""
    })

    const fade1 = useSpring({
        transform: transformSpring1,


    })
    const fade2 = useSpring({
        transform: transformSpring2,
    })
    const handleLoading = (val) => {
        setloading(val);
    }
    const register_link = () => {
         settransformSpring1(`translate(1200px, 0px)`)
                    settransformSpring2(`translate(0px, 0px)`)
                    settoglleSpring(false)
    }
    const login_link = () => {
          settransformSpring1(`translate(0px, 0px)`)
                    settransformSpring2(`translate(1200px, 0px)`)
                    settoglleSpring(true)
    }

  const  get_langs = () => {


        let csrf_token =   document.querySelector('meta[name="csrf-token"]').getAttribute('content');


        axios.get(process.env.MIX_API_DOMAIN +"langs")
            .then(res => {

                if (res.data.status == 1) {
                    setLangs(res.data.data.langs)
                    setCheckLang(res.data.data.check_lang)
                    setloadingPage(false);

                }
                console.log(res);

        })
        .catch(err=>{

        })
    }


      const  get_trans = () => {




          let data = {
              csrf_token,
              trans
          }
        axios.post(process.env.MIX_API_DOMAIN +"translate",data,header)
            .then(res => {

                console.log({res});
                if (res.data.status == 1) {

                    setTrans(res.data.data)

                }
                console.log(res);

        })
        .catch(err=>{

        })
    }

   const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current) {


            if (!decryptLocalStorage('user')) {
                  get_langs()
                get_trans()
            }
        mounted.current = true;
        } else {

//                        setauthLogin(false)



        // do componentDidUpdate logic
      }
    }, []);


    if (decryptLocalStorage('user')) {
                    return <Redirect to={process.env.MIX_FOLDER_APP_NAME+"home"} />;

    } else {
            if (loadingPage) {

        return (
            <div>
            <LoadingInline />
        </div>
        )

    } else {
         return (
        <div >

            {loading ? <LoadinOverlay /> : null}
            <NavbarLogin trans={trans} langs={langs} register={register_link} login={login_link}  />
            <div className="d-flex flex-column" style={{ justifyContent: "center", alignItems: "center" }}>
                <div style={{marginBlock:50}}>
                                   <animated.div style={fade1}>
                <div style={{display:toglleSpring?"block":"none"}}>

                    <Login handleLoading={handleLoading} trans={trans} />
                    </div>

            </animated.div>
                <animated.div style={fade2}>
                    <div style={{display:toglleSpring?"none":"block"}}>
                    <Register trans={trans} handleLoading={handleLoading} />

                    </div>

            </animated.div>
                </div>

         <button type="button" onClick={() => {
                if (toglleSpring) {
                settransformSpring1(`translate(1200px, 0px)`)
                    settransformSpring2(`translate(0px, 0px)`)
                    settoglleSpring(false)
                } else {
                      settransformSpring1(`translate(0px, 0px)`)
                    settransformSpring2(`translate(1200px, 0px)`)
                    settoglleSpring(true)
                }

                }} className="btn btn-link">
             {toglleSpring?"Im not register?":"Im registerd!"}
            </button>
            </div>


        </div>
    )
    }
    }


}

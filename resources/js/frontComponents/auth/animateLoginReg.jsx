import React, { useEffect, useRef, useState } from 'react'
import { useSpring, animated ,useChain} from 'react-spring'
import Login from './login';
import Register from './register';
import LoadinOverlay from '../helpers/loadinOverlay';
import LoadingInline from '../helpers/LoadingInline';
import axios from "axios";

import NavbarLogin from './navbar_login';

export default function AnimateLoginReg() {

    const [transformSpring1, settransformSpring1] = useState(`translate(0px, 0px)`)
    const [transformSpring2, settransformSpring2] = useState(`translate(1200px, 0px)`)
    const [toglleSpring, settoglleSpring] = useState(true)
    const [loading, setloading] = useState(false)
    const [loadingPage, setloadingPage] = useState(true)
    const [langs, setLangs] = useState({})
    const [checkLang, setCheckLang] = useState("")

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

   const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current) {
          get_langs()
        mounted.current = true;
      } else {

        // do componentDidUpdate logic
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
        <div >

            {loading ? <LoadinOverlay /> : null}
            <NavbarLogin langs={langs} checkLang={checkLang} register={register_link} login={login_link}  />
            <div className="d-flex flex-column" style={{ justifyContent: "center", alignItems: "center" }}>
                <div style={{marginBlock:50}}>
                                   <animated.div style={fade1}>
                <div style={{display:toglleSpring?"block":"none"}}>

                    <Login />
                    </div>

            </animated.div>
                <animated.div style={fade2}>
                    <div style={{display:toglleSpring?"none":"block"}}>
                    <Register handleLoading={handleLoading} />

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

import React from 'react'

export default function NavbarLogin({register,login,langs}) {
    return (
        <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Langs
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              {langs.map((item,i)=>{
                  return (
                      <li key={i} >
                          <a onClick={() => {
                              localStorage.setItem("lang_dir", item.rtl)
                              localStorage.setItem("lang",item.code)
                          }}  className="dropdown-item item-lang" href={process.env.MIX_API_DOMAIN + "changeLanguage?lang=" + item.code}>
                              <span>{item.name}</span> <img style={{width:15,height:15}} src={process.env.MIX_ASSET_URL + "uploads/flags/"+item.code+".png"} />
                          </a>
                      </li>

                  )
              })}
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
      <div className="d-flex">
          <ul className="navbar-nav ">
          <li className="nav-item">
          <button onClick={()=>{
              register()
          }} className="btn btn-link link-a" aria-current="page" >Register</button>
        </li>
        <li className="nav-item">
          <button onClick={()=>{
                            login()

          }} className="btn btn-link link-a" >Login</button>
        </li>
      </ul>
      </div>

    </div>
  </div>
</nav>
        </div>
    )
}

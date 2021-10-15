import React from 'react'
export default function LoadinOverlay() {
    return (
        <div >
            <div className="loading-overlay">
                <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <img src={ process.env.MIX_ASSET_URL + "uploads/loader.gif"}   width={80} height={80} />

                </div>
        </div>

        </div>
    )
}

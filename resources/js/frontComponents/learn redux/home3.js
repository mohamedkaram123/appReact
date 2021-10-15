import React from 'react'
import { connect } from 'react-redux'

 function Home3(props) {
    return (
        <div>
          {props.count}
        </div>
    )
}
var mapStateAsProps = (state) => {
    return {
        count:state.count
    }
}

export default connect(mapStateAsProps)(Home3)


// import {useContext} from "react"
// import {Mycontext} from "./Mycontext"

// export default ()=>{
//     let count = useContext(Mycontext)
//     return(
//         <h1>{count}</h1>
//     )
// }

import React, { Component,useContext } from 'react'
import {Mycontext} from "./Mycontext"

const Index = ()=>{
    const child = useContext(Mycontext)
    return(
        <h1>{child}</h1>
    )
}

export default class Mychild extends Component {
    render() {
        return (
            <div>
                <Index/>
            </div>
        )
    }
}

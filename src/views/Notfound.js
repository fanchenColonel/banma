import React, { Component,useState,createContext,useContext,useRef } from 'react'
//useContext 主要用于组件通信，先创建一个容器

// 一个页面内的两个组件

// const Mycontext = createContext();

// const Childcontext = ()=>{
//     let ok = useContext(Mycontext)
//     return (
//         <h1>{ok}</h1>
//     )
// }

// 不同页面间的组件通信
import {Mycontext} from "./Mycontext"
import Childcontext from "./Mychild"
import { Index } from './redux/index'

// import UseCallback from "./useCallback"
// import Forwardref from "./forwardref"

// import UseLayout from "./useLayoutEffect"

// import Hook from "./Hook"

// import Reducer from "./reducer"

// import Index from "./redux/"

const Indexa = () =>{
    const [count,setcount] = useState(2)
    const inputref = useRef(null)

    return(
        <div>
            <Index/>
            
            <Mycontext.Provider value={count}>
                <Childcontext/>
                <input type="text" ref={inputref}/>
                <button onClick={()=>{
                    setcount(inputref.current.value)
                    inputref.current.value=""
                }} >点我</button>
            </Mycontext.Provider>

            {/* <Hook/> */}

            {/* <Reducer/> */}

            {/* <UseLayout/> */}

            {/* <UseCallback/>

            <Forwardref/> */}

            
            
        </div>
    )
}

export default class Notfound extends Component {
    render() {
        return (
            <div>
                <Indexa/>
            </div>
        )
    }
}

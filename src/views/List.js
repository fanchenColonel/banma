import React, { Component,useRef } from 'react'
import {TabBars} from "../components"

// useRef
// 主要有两个功能：  获取dom元素 (获取dom元素) ， 存取变量



const Ref = ()=>{
    
    const inputref = useRef(null)
    const save = useRef({name:"珊珊"})
    return (
        <div>
            <input type="text" 
                
                ref={inputref}
            />
            <button onClick={()=>{
                // console.log(inputref.current.value)
                save.current.name = inputref.current.value
                console.log(save.current.name)
            }}>点我</button>
        </div>
    )
}


export default class List extends Component {
    render() {
        return (
            <div>
                <Ref/>
                <footer>
                    <TabBars/>
                </footer>
            </div>
        )
    }
}

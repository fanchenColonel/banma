import  {useState,useRef,forwardRef,useImperativeHandle} from "react"
import React, { Component } from 'react'



// useImperativeHandle的作用就是暴露给父组件一些自定义的属性或方法，需要和forwardRef结合使用

// 第一个参数，用来和forwardRef的配合使用，forwardref的第二个参数，作为useimperativehandle的第一个
// 第二个参数：回调函数，返回的是自定义的，属性和方法，  暴露给父组件的
// 第三个参数：依赖的状态，不写的话useImperativeHandle默认执行，写了话就只有当依赖的状态发生改变的时候才会执行，才会返回给父组件


const Child = forwardRef((props,ref1)=>{
    const inputref = useRef(null)
    // 箭头函数的两种写法：
    //  useImperativeHandle(ref1,()=>{
    //     return {
    //         name:"少有人走的路"
    //     }
    // })
    
    const [count,setcount] = useState(0)
    const [num,setnum] = useState(8)
    
    useImperativeHandle(ref1,()=>({
        name:"JavaScrit",
        focus:()=>{
            inputref.current.focus()
        },
        num
    }),[count]
    )

    return(
        <div>
            <h1 ref={ref1}>王者</h1>
            <h2>荣耀</h2>

            <h2>{count}</h2>
            <h2>{num}</h2>
            <input type="text" ref={inputref} />
            <button onClick={()=>{
                setcount(count+1)
            }}>setcount</button>
            <button onClick={()=>{
                setnum(num+1)
            }}>setnum</button>
        </div>
    )
})

const Father = ()=>{
    const el = useRef(null)
    return(
        <div>
            <Child ref={el}/>
            <button onClick={()=>{
                console.log(el)
                el.current.focus()
            }}>获取子组件的属性和方法</button>
        </div>
    )
}

export default class forwardref extends Component {
    render() {
        return (
            <div>
                <Father/>
            </div>
        )
    }
}

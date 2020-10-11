import React, { Component,useState } from 'react'

import UseMemo from "./useMemo"

// usestate：在看其他视频进行补充

// useState 返回的是一个数组
// 他有两个参数，一个是变量用来接收数据，另一个是函数用来改变数据
// useState参数类型可以是:基本数据类型，对象，数组，函数
// 参数作为对象或数组时：在用set改变数据的时候，必须返回一个新的对象或数组，才能改变成功
// set改变数据，包括更改原有属性值，新增属性值
// set的参数也有：基本数据，对象，数组，函数

// 函数返回什么，func就是什么，具体到是什么什么数据类型的操作，和上面是一样的




const Index = ()=>{
    const [count, setcount] = useState("ok")
    const [valu,setvalu] = useState({name:"ok"})
    const [arr,setarr] = useState([1,2,3])
    const [func,setfunc] = useState(()=>{
        return [123]
    })

    // const []
    // console.log(typeof 20a)
    return  (
        <div>
            <h1> {count}</h1>
            <button onClick={()=>{
                setcount(count+1)
            }}>基本数据</button>
            <h1> {valu.name} -----{valu.age}</h1>
            <button onClick={()=>{
                setvalu(
                    // Object.assign(valu,{name:"点我"})
                    {
                        ...valu,
                        name:"王者",
                        age:"荣耀"
                    }
                )
            }}>对象</button>
            <h1> {arr} -----{arr}</h1>
            <button onClick={()=>{
                setarr(
                    ()=>{
                        arr.push(4)
                        return [...arr]
                    }
                )
            }}>数组</button>
            <h1> {func} -----{arr}</h1>
            <button onClick={()=>{
                setfunc(
                        
                    ()=>{
                        func.push(4)
                        return [...func]
                    }
                )
            }}>函数</button>
        </div>
    )
}

export default class Login extends Component {
    render() {
        return (
            <div>
                <Index/>
                <UseMemo/>
            </div>
        )
    }
}



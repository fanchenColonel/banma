import {useState,useMemo} from "react"
import React, { Component } from 'react'
import Child from "./useMemochild"

// useMemo 和useeffect 类似
// 都是一个函数，参数也相同，数组可以不写，默认监控所有的，
// useMemo在组件渲染时执行，useEffect在组件挂载后执行

// 功能和shouldComponent 类似
// 减少不必要的组件渲染，来提升性能

// 原理是利用的缓存技术（，以空间换速度），将更新的数据缓存在CPU中，控制是否将数据更新到页面上
// 所以使用时需要注意

// 如何实现对控制更新？
// 将要控制的数据，放到useMemo中返回出去


// 不写第二个参数的时候，默认监听全部状态，当一个状态改变的时候，useMemo就会执行
// 当数组里有指定的监听状态时，只有该状态改变的时候，组件才会更新
// 没有被监听的状态，改变状态时是会有效的改变，但界面上不会执行更新，渲染出来
// 只有当被监听的状态改变时，useMemo才会执行，界面才会更新，渲染出最新的状态，（没被监听的状态，也会跟着渲染出最新的状态）




const Index= ()=>{
    const [count,setcount] = useState(0)
    const [num,setnum] = useState(0)

    // let res = useMemo(()=>{
    //     console.log("useMemo")
    //     return {count,num}
    // },[count])
    return (
        <div>
 {/* 当父组件改变时，减少不必要的子组件更新 */}
                <Child c={count} n={num}/>

             {/* <div>count:{res.count}</div>
             <div>num: {res.num}</div>              */}
             <button onClick={()=>{
                 setcount(count+1)
                 console.log(count)
             }}>count</button>

             <button onClick={()=>{
                 setnum(num+1)
                 console.log(num)
             }}>num</button>
        </div>
    )
}

export default class UseMemo extends Component {
    render() {
        return (
            <div>
                <Index/>
            </div>
        )
    }
}

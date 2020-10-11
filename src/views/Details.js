import React, { Component ,useState, useEffect} from 'react'

// useeffect是一个函数
// 代替了 类组件中的：componentDidMount,componentDidUpdate,componentWillUnMount
// 在这三个状态后useEffect都会执行

// 一般在useEffect中进行副作用操作：请求数据，dom操作，组件更新

// useEffect为什么在组件内部执行？是为了可以获取props和state，他采用了闭包的形式

// 有两个参数useEffect(回调函数，[这个数组参数可不写])
// 当useeffect的第二个参数不写时，默认监控所有的useState，即只要有一个状态改变，useEffect都会执行
// 也可进行定制式监控，指定要监控的useState，只有被指定的useState状态发生改变时，useEffect才会执行
// 如果不指定，写成空的，就不监控任何状态。即任何useState发生改变useeffect都不会执行,只会在组件挂载后执行

// 可进行无阻塞更新,
// 无阻塞更新:  我们发送数据请求可以在:组件挂载前,componentWillMount中进行，也可以在组件挂载后，componentDidMount中进行。
// 但如果在挂载前执行，如果请求出了问题，组件连挂载都挂不上去，（即发生了阻塞）所以一般都是组件挂载后进行数据请求
// useeffect就可以是在组件挂载后执行的，所以可以进行无阻塞更新

// 可以写多个useEffect

// 函数式组件的写法：

       const Index= ()=>{
            const [count,setcount] = useState(1)

            useEffect(
// componentDidMount,componentDidUpdate，组件挂载和状态更改的时候执行
                ()=>{
                    console.log("牛哥哥")
//componentWillUnMount,组件切换时执行,当监听的时候return也会执行，如果不监听，就只有在组件切换的时候才会执行
                return ()=>{
                    console.log("i am so over you")
                }
            },[count])
            
            useEffect(()=>{
                console.log("you had me at hello")
                return ()=>{
                    console.log("No pain,no gain")
                }
            },[])
            return (
                <div>
                    <h1 id="count">{count}</h1>
                    <button onClick={()=>{
                        setcount(count+1)
                    }}>来吧</button>
                </div>
            )

        }


export default class Details extends Component {
    render() {
        return (
            <div>
                <Index/>
            </div>
        )
    }
}

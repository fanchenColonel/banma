import React,{useMemo,useLayoutEffect,useEffect,useState} from "react"

// 可以执行一些副操作，在组件生成的过程中
// useLayoutEffect和useEffect的功能和写法一样，但是他会在useEffect之前执行
// 但是需要注意的是，他会在浏览器执行绘制前执行，会发生阻塞，慎用


export default ()=>{
    const [count,setcount] = useState(88)
    useMemo(() => {
        console.log("useMemo")
    })
    useEffect(() => {
        console.log("ueseEffect")
        return () => {
            console.log("useEFFect_return")
        }
    },[count])
    useLayoutEffect(() => {
        console.log("useLayoutEffect")
        return () => {
            console.log("useLayoutEffect_return")
        };
    }, [count])
    return(
        <div>
            <div>{count}</div>
            <button onClick={()=>{
                setcount(count+1)
            }}>useLayoutEffect</button>
        </div>
    )
}


import React,{useState} from "react"

// 自定义hook和普通函数没有本质区别，都是做一些函数的封装，方便使用
// 自定义hook，必须以use开头
// 可以使用我们这些hook，(usesate,useeffect......)来封装

const useHook = (val,num)=>{
    const [count,setcount] = useState(val)
    const add = ()=>{
        setcount(count+num)
    }

    return {count,add}
}

export default ()=>{
    let {count,add} = useHook(10,2)
    return(
        <div>
            <div>{count}</div>
            <button onClick={()=>{
                add()
            }}>Hook</button>
        </div>
    )
}
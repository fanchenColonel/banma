import React, { useCallback,useState} from 'react'

// useCallback和useMemo功能一样都是控制组件不必要的更新，提升性能
// 同样用到了缓存技术
// useMemo缓存的是return返回的状态，useCallback缓存的是一个函数

// const Callback = useCallback(()=>{})    返回的Callback是个函数，可以直接执行

//该函数是被缓存出到内存中的，每次状态改变，该组件刷新，useCallback也会执行，但如果不依赖任何状态，他缓存的就是
// 之前的函数。






export default () =>{
    const [count,setcount] = useState(8)
    const [num,setnum] = useState(8)

    let back = useCallback(()=>{
        return  count
    },[count,num])
    return(
        <div>
            <h1>   count: {count}</h1>
            <h1>   num: {num}</h1>

            <h1> useCallback:{back().count}</h1>
            <button onClick={()=>{
                setcount(count+1)
            }}>useCallback count</button>
            <button onClick={()=>{
                setnum(num+1)
            }}>useCallback num </button>
        </div>
    )

}
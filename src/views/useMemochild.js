import React, { useMemo } from 'react'

export default  ({c,n})=>{
    let res = useMemo(()=>{
        return {c,n}
    },[c])
    return(
        <div>
            <h1>我是子组件：{res.c}----{res.n}</h1>
        </div>
    )
}


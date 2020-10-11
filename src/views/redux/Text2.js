import React,{useContext} from 'react'
import { Mycontext } from './Reducer'


export const Text2 = () => {
    const {date,dispatch} = useContext(Mycontext)
    return (
        <div>
            <div>赵峰位置：{date.name}</div>
            <div>英雄：{date.hero}</div>
            <button onClick={()=>{
                dispatch({
                    type:"setname",
                    name:"射手"
                })
            }}>T2点我改位置</button>
            <button onClick={()=>{
                dispatch({
                    type:"sethero",
                    hero:"后羿"
                })
            }}>T2改英雄</button>
        </div>
    )
}

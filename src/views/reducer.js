import React,{useReducer} from "react"

export default ()=>{
    const [stat,dispatch] = useReducer((stat,action)=>{
        switch(action.type){
            case "setname":
                return{
                    ...stat,
                    name:action.name
                }
            case "setbook":
                return{
                ...stat,
                book:action.book
            }


            
            default:
                return stat
        }
    },{name:"are you ok",book:"闻香"})
    return(
        <div>
            <div>{stat.name}</div>
            <button onClick={()=>{
                dispatch({
                    type:"setname",
                    name:"i am ok"
                })
            }}>王者</button>
        </div>
    )
}

import React,{createContext,useReducer} from 'react'

export const Mycontext = createContext()

const reducer = (state,action)=>{
    switch(action.type){
        case "setname":
            return{
                ...state,
                name:action.name
            }
        case "sethero":
            return{
                ...state,
                hero:action.hero
            }
        default:
            return state
    }
}
const data = {name:"上单",hero:"兰陵王"}

export const Reducer = (props) => {
    const [date,dispatch] = useReducer(reducer,data)
    return (
        <div>
            <Mycontext.Provider value={{date,dispatch}}>
                {props.children}
            </Mycontext.Provider>
        </div>
    )
}

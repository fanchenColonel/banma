import {Home,Login,Notfound,List,Detail} from "../views"

//需要登录进去才能看到

export const mainRoute = [
    {
        pathname:"/admin/home",
        component:Home
    },
    {
        pathname:"/admin/list",
        component:List,
        exact:true
    },
    {
        pathname:"/admin/list/detail",
        component:Detail
    }

]

//不需要登录就能看的到

export const adminRoute = [
    {
        pathname:"/login",
        component:Login
    },
    {
        pathname:"/404",
        component:Notfound
    }
]
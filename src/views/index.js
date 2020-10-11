// import Loadable from 'react-loadable';
// // import Loading from "../components/"

//  const Home  = Loadable({
//     loader: () => import('./Home'),
//     Loading: Loading
//   })

//   const Login = Loadable({
//      loader: ()=> import('./Login'),
//      Loading:Loading
//   }) 

//   const Notfound = Loadable({
//     loader: ()=> import('./Notfound'),
//     Loading:Loading
//   }) 



// export  {
//     Home,Login,Notfound
// }


import Home from "./Home"
import Login from "./Login"
import Notfound from "./Notfound"
import List from "./List"
import Detail from "./Details"

export {
    Home,Login,Notfound,List,Detail
}

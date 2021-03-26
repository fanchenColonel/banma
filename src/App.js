// import React from 'react';
// import Home from "./views/Home"

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <HashRouter>
//         <Switch>
//           asad
//             {
//               mainRoute.map(item=>{
//                   return <Route path={item.pathname} key={item.pathname} component={item.component}/>
//               })
//             }
//             <Redirect to="/home" from="/admin" exact/>
//         </Switch>
//     </HashRouter>
//   );
// }
// hhh

  

import {mainRoute} from "./route"
import {HashRouter,Route,Switch,Redirect} from "react-router-dom"
import React, { Component } from 'react'
import "./style.less"
// import {Tabbar} from "./components"


export default class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
            <Switch>
                {/* <Route path="/" component={Tabbar}/> */}
                {
                  mainRoute.map(item=>{
                      // console.log(item)
                      return <Route path={item.pathname} key={item.pathname} component={item.component} exact={item.exact}/>
                  })
                }
                <Redirect to="/admin/home" from="/admin" exact/>
                <Redirect to="/404"/>
            </Switch>
        </HashRouter>
      </div>
    )
  }
}

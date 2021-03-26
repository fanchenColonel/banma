import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import {HashRouter, Route,Switch,Redirect} from "react-router-dom"
import {adminRoute} from "./route"

ReactDOM.render(
  <HashRouter>
    <Switch>
      
        <Route path="/admin" render={(routeprops)=>{
          return <App {...routeprops} />
        }}></Route>
        
        {
          adminRoute.map((item)=>{
              // console.log(item)
            return <Route path={item.pathname} key={item.pathname} component={item.component} />
          })
        }
        <Redirect to="/admin" from="/" exact/>
        <Redirect to="/404" ></Redirect>
    </Switch>
  </HashRouter>,
  document.getElementById('root')
);


// vs code  git 练习
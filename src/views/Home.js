import React, { Component } from 'react'
import {TabBars} from "../components"
import "./home.less"

export default class Home extends Component {
  render() {
    return (
      <div id="box">
          <header>
              img
          </header>
          <content>
              {
                Array.from({length:100}).map((item, i) => <div>{i}</div>)
              }
          </content>
          <footer >
            <TabBars/>
          </footer>
      </div>
    )
  }
}

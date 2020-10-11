import { TabBar } from 'antd-mobile';
import React,{Component} from "react"
import "./index.less"
import {withRouter} from "react-router-dom"
// import home from "../../img/home.svg"

const hom = require("../../img/hom.svg")
const home = require("../../img/home.svg")
const target1 = require("../../img/target1.svg")
const target2 = require("../../img/target2.svg")
const found = require("../../img/found.svg")
const found1 = require("../../img/found1.svg")
const my = require("../../img/my.svg")
const my1 = require("../../img/my1.svg")

 class TabBars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
      // hidden: false,
    //   fullScreen: false,
    };
  }

//   renderContent(pageText) {
//     return (
//       <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
//         <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
//         <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
//           onClick={(e) => {
//             e.preventDefault();
//             this.setState({
//               hidden: !this.state.hidden,
//             });
//           }}
//         >
//           Click to show/hide tab-bar
//         </a>
//         <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
//           onClick={(e) => {
//             e.preventDefault();
//             this.setState({
//               fullScreen: !this.state.fullScreen,
//             });
//           }}
//         >
//           Click to switch fullscreen
//         </a>
//       </div>
//     );
//   }
  
  render() {
    return (
        // style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}
      <div >
        
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
            
          <TabBar.Item
            title="主页"
            key="Life"
            icon={
                <div style={{
                width: '22px',
                height: '22px',
                background: `url(${hom}) center center /  21px 21px no-repeat` }}
                />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: `url(${home}) center center /  21px 21px no-repeat` }}
            />
            }
            selected={this.state.selectedTab === 'blueTab'}
            // badge={1}
            onPress={() => {
                console.log(this.props.ok)
                // console.log(this.state.selectedTab)
              // this.props.history.push({
              //     pathname:"/admin",
              //     ok:{
              //         id: this.props.location.pathname 
              //     }
              // })
              this.setState({
                selectedTab: 'redTab',
              });
            }}
            data-seed="logId"
          >
            {/* {this.renderContent('Life')} */}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: `url(${target1}) center center /  21px 21px no-repeat` }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: `url(${target2}) center center /  21px 21px no-repeat`  }}
              />
            }
            title="目的地"
            key="Koubei"
            // badge={'new'}
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              console.log(this.props.ok )
              // this.props.history.push({
              //     pathname:"/admin/list",
              //     ok:{
              //         path:this.props.location.pathname
              //     }
              // })
              this.setState({
                selectedTab: 'redTab',
              });
            }}
            data-seed="logId1"
          >
            {/* {this.renderContent('Koubei')} */}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: `url(${found1}) center center /  21px 21px no-repeat` }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: `url(${found}) center center /  21px 21px no-repeat`}}
              />
            }
            title="地图"
            key="Friend"
            // dot
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
            }}
          >
            {/* {this.renderContent('Friend')} */}
          </TabBar.Item>
          <TabBar.Item
            icon={<div style={{
                width: '22px',
                height: '22px',
                background: `url(${my1}) center center /  21px 21px no-repeat`}}
              />}
            selectedIcon={ <div style={{
                width: '22px',
                height: '22px',
                background: `url(${my}) center center /  21px 21px no-repeat`}}
              />  
            //   { uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }
            }
            title="我的"
            key="my"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              });
            }}
          >
            {/* {this.renderContent('My')} */}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}


// ReactDOM.render(<TabBarExample />, mountNode);

export default withRouter(TabBars)
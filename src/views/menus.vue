<template>
    <div id="menus">
        <!-- 头部 -->
        <a-layout-header class="layout-header" style="background: rgb(24, 144, 255); padding: 0">
            <!-- <a-icon type="robot" class="logoIcon" /> -->
            <div class="header-left">
                <img src="../assets/img/logo.svg" alt="" class="logoImg" />
                <span class="logo">重大活动检查系统</span>
                <a-icon class="trigger logoIcon" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="() => (collapsed = !collapsed)" />
                <span class="spanText">欢迎进入 Izhandao 企业级快速开发平台</span>
            </div>
            <div class="header-right">
                <div class="welcome">
                    <a-icon type="smile" class="icon" />
                    欢迎您，IZHANDAO用户
                </div>
                <div class="quit" @click="showConfirm">
                    <a-icon type="logout" />
                    退出登录
                </div>
            </div>
        </a-layout-header>
        <!-- 主体内容 -->
        <a-layout id="components-layout-demo-custom-trigger">
            <!-- 左侧菜单栏 -->
            <a-layout-sider v-model="collapsed" :trigger="null" collapsible style="z-index: 10">
                <a-menu mode="inline" :open-keys="openKeys" :selectedKeys="selectKey" @openChange="onOpenChange" @click="handleClick">
                    <a-sub-menu key="sub1">
                        <span slot="title">
                            <a-icon type="apartment" />
                            <span>表单设计</span>
                        </span>
                        <a-menu-item key="1">
                            <router-link to="/designer">表单设计器</router-link>
                        </a-menu-item>
                        <!-- <a-menu-item key="2">
                            <router-link to="/designerTemplate">表单设计器模板</router-link>
                        </a-menu-item> -->
                    </a-sub-menu>
                    <a-sub-menu key="sub2">
                        <span slot="title">
                            <a-icon type="cloud" />
                            <span>在线开发</span>
                        </span>
                        <a-menu-item key="3">
                            <router-link to="/menus">Online表单开发</router-link>
                        </a-menu-item>
                        <a-menu-item key="4">
                            <router-link to="/OnlineDev/ReportConfig">Online报表配置</router-link>
                        </a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu mode="vertical-right" key="sub3" style="color: #000000a6" @mouseenter="showDrawer('sub3')" class="fullMenu">
                        <span slot="title">
                            <a-icon type="inbox" />
                            <span> 表单申报与管理 </span>
                        </span>
                        <a-menu-item v-for="item in tableList" :key="item.id" class="fullMenu">
                            <router-link :to="{ name: 'OnlineFormFuncTest', params: { id: item.id, isTree: item.isTree } }">
                                <span :title="item.tableTxt">{{ item.tableTxt + '(' + item.tableName + ')' }} </span>
                            </router-link>
                        </a-menu-item>
                        <!-- <a-drawer @mouseover="showDrawer" class="myDrawer" :style="visible ? 'display: block' : 'display: none;'" title="Basic Drawer" placement="left" :mask="false" :closable="false" :visible="visible" wrap-class-name="drawer-wrapper">
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </a-drawer> -->
                    </a-sub-menu>
                    <a-sub-menu mode="vertical-right" key="sub4" @mouseenter="ariseDrawer('sub4')">
                        <span slot="title">
                            <a-icon type="inbox" />
                            <span> 数据统计报表 </span>
                        </span>
                        <a-menu-item key="10">
                            <router-link to="/DataStatistic">省际入浙防疫检查情况日报表</router-link>
                        </a-menu-item>
                    </a-sub-menu>
                </a-menu>
            </a-layout-sider>
            <!-- 右侧表格 -->
            <a-layout-content
                v-if="routerShow"
                ref="MyLayoutContent"
                :style="{
                    margin: '24px 16px',
                    padding: '24px',
                    background: '#fff',
                    minHeight: '280px'
                }"
            >
                <router-view :key="$route.fullPath" :canDo='canDo' />
            </a-layout-content>
        </a-layout>
    </div>
</template>
<script>
import { getOnlineFormPage } from '@/api/onlineForm';

export default {
    name: 'munes',
    data() {
        return {
            visible: false,
            collapsed: false,
            rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
            openKeys: ['sub2'],
            selectKey: ['3'],
            tableList: [],
            routerShow: true,
            canDo: false,
        };
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.formdeClaration();
        });
    },
    methods: {
        onOpenChange(openKeys) {
            const latestOpenKey = openKeys.find((key) => this.openKeys.indexOf(key) === -1);
            if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                this.openKeys = openKeys;
            } else {
                this.openKeys = latestOpenKey ? [latestOpenKey] : [];
            }
        },
        handleClick(e) {
            let _selectKey = [];
            _selectKey.push(e.key);
            this.selectKey = _selectKey;
        },
        showDrawer(value) {
            let _selectKey = [];
            _selectKey.push(value);
            this.openKeys = _selectKey;
        },
        ariseDrawer(value) {
            let _select = [];
            _select.push(value);
            this.openKeys = _select;
        },
        closeDrawer() {
            this.openKeys = [];
        },
        selectContainer() {
            return document.querySelector('#layoutContent');
        },
        formdeClaration() {
            // console.log("sss")
            getOnlineFormPage({
                pageNo: 1,
                pageSize: 9999,
                tableName: '',
                tableType: '',
                formCategory: '',
                isDbSynch: '',
                tableTxt: '',
                createTime: '',
                column: 'createTime',
                order: 'desc',
                copyType: 0,
                tableTypeStr: '1,2'
            })
                .then((res) => {
                    this.canDo = true;
                    this.tableList = res.result.records;
                })
                .catch((err) => {
                    this.$message.error(err);
                });
        },
        toOneTable(record) {},
        // 退出登录
        showConfirm() {
            let _this = this;
            this.$confirm({
                title: '提示',
                content: (h) => <div style="color:#000000A6;">真的要注销登录吗？</div>,
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    sessionStorage.removeItem('token');

                    _this.$router.push({ path: '/' });
                },
                onCancel() {
                    // console.log('取消');
                },
                class: 'test'
            });
        }
    }
};
</script>
<style lang="less">
#menus {
    min-width: 1200px;
    .ant-menu-submenu-title {
        padding-left: 24px;
    }
    .ant-menu .ant-menu-vertical-right .ant-menu-sub .ant-menu-submenu-content {
        position: absolute;
        top: -147px;
        left: -5px;
    }
    .ant-menu-submenu-popup {
        position: absolute;
        z-index: 1100;
        top: -147px;
        left: -5px;
    }
}
#components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}
// #components-layout-demo-custom-trigger .logo {
//   height: 32px;
//   background: rgba(255, 255, 255, 0.2);
//   margin: 16px;
// }
#components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
}
#menus {
    height: calc(100vh - 65px);
    .logoIcon {
        font-size: 22px;
        margin-left: 28px;
        color: #fff;
    }
    .logo {
        display: inline-block;
        color: #fff;
        font-size: 16px;
        text-align: left;
        margin-left: 10px;
    }
    .ant-layout-sider-children {
        box-shadow: 2px 116px 8px 0 rgba(29, 35, 41, 0.05);
    }
    .ant-menu-item {
        color: #333;
        margin: 0;
    }
    .ant-layout-sider {
        background-color: #ffffff;
    }
    .ant-menu-dark,
    .ant-menu-dark .ant-menu-sub {
        background-color: #fff;
    }
    .ant-layout.ant-layout-has-sider {
        height: calc(100vh - 65px);
    }
    .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
        color: rgb(24, 144, 255);
    }
    .ant-menu-item:hover {
        color: rgb(24, 144, 255);
    }
    .logoImg {
        width: 35px;
        height: 35px;
        font-size: 15px;
        margin-left: 26px;
        vertical-align: -12px;
    }
    .spanText {
        color: #fff;
        margin-left: 20px;
    }
    .layout-header {
        display: flex;
        justify-content: space-between;
    }
    .header-right {
        display: flex;
        margin-right: 12px;
        .quit {
            width: 106px;
            color: #fff;
            padding: 0 16px;
        }
        .quit:hover {
            cursor: pointer;
            background: #5eb2ff;
        }
        .welcome {
            color: #fff;
            padding: 0 16px;
            .icon {
                font-size: 22px;
                vertical-align: -6px;
                margin-right: 4px;
                color: pink;
            }
        }
        .welcome:hover {
            cursor: pointer;
            background: #5eb2ff;
        }
    }
}
.ant-menu-submenu-popup {
    max-height: 70vh;
    overflow: auto;
}

.myDrawer {
    transform: translateX(198px);
    z-index: 2;
    top: 64px;
}
// .drawer-wrapper {
//     position: relative;
//     left: -200px;
//     overflow: hidden;
// }
</style>

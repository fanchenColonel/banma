<template>
    <div id="reportConfig">
        <!-- 搜索表单 -->
        <a-form :labelCol="{ span: 5 }" :wrapperCol="{ span: 17 }" labelAlign="left">
            <a-row>
                <a-col :span="5">
                    <a-form-item label="报表编码">
                        <a-input ref='formcode' placeholder="请输入报表编码" v-/>
                    </a-form-item>
                </a-col>
                <a-col :span="5">
                    <a-form-item label="报表名字">
                        <a-input ref="name" placeholder="请输入报表名字" />
                    </a-form-item>
                </a-col>
                <a-col :span="14">
                    <a-form-item>
                        <a-button class="searchBtn" type="primary" icon="search" @click="search">查询</a-button>
                        <a-button type="primary" icon="redo" @click="reset">重置</a-button>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>

        <!-- 新增按钮 -->
        <a-space size="middle">
            <a-button type="primary" @click="showModal"><a-icon type="plus" /> 录入</a-button>
            <template v-if="selectNum > 0">
                <a-dropdown>
                    <a-menu slot="overlay" @click="handleMenuClick">
                        <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
                    </a-menu>
                    <a-button style="margin-left: 8px" >批量操作 <a-icon type="down" /> </a-button>
                </a-dropdown>
            </template>
        </a-space>

        <!-- 选择统计 -->
        <div class="tableCount">
            <table-check-count :num="selectNum" @clean="cleanCheck"></table-check-count>
        </div>
        <!-- 表格 -->
        <v-table  ref="table" 
            :tableData="tableData" 
            @selectChange="selectChange" 
            @getpage="getpage"
            @delete="deleteDate"
        ></v-table>
        <!-- 弹窗 -->
        <v-modal ref="modal"></v-modal>
    </div>
</template>
<script>
import TableCheckCount from '../../components/tableCheckCount';
import Table from './components/table';
import Modal from './components/modal';
import {searchStatement,batchDelete,getReportFormPage,deleteStatement} from "../../api/reportConfig"

export default {
    components: {
        'table-check-count': TableCheckCount,
        'v-table': Table,
        'v-modal': Modal
    },
    data() {
        return {
            // loading:false,
            // tableData: [
            //     {
            //         key: '1',
            //         name: '测试1',
            //         code: 32,
            //         sentence: 'select * from dual',
            //         source: 'mysql8.0',
            //         createTime: 123123123
            //     },
            //     {
            //         key: '2',
            //         name: '测试2',
            //         code: 32,
            //         sentence: 'select * from dual',
            //         source: 'mysql8.0',
            //         createTime: 123123123
            //     },
            //     {
            //         key: '3',
            //         name: '测试3',
            //         code: 32,
            //         sentence: 'select * from dual',
            //         source: 'mysql8.0',
            //         createTime: 123123123
            //     },
            //     {
            //         key: '4',
            //         name: '测试4',
            //         code: 32,
            //         sentence: 'select * from dual',
            //         source: 'mysql8.0',
            //         createTime: 123123123
            //     },
            //     {
            //         key: '5',
            //         name: '测试5',
            //         code: 32,
            //         sentence: 'select * from dual',
            //         source: 'mysql8.0',
            //         createTime: 123123123
            //     }
            // ],
            selectNum: 0,
            selectArr: [],
            tableData:[],
            ids:"",
            pageNo:"",
            pageSize:"",
            total:"",
            column:"createTime",
            order:"desc",
        };
    },
    // 进入页面前的加载当前模块
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.getReportForm();
        });
    },
    methods: {
        // 删除报表数据
        deleteDate(val){
            deleteStatement(val.id).then(res=>{
                console.log(res,"delete")
                // 重新请求列表
                this.getReportForm()
            })
        },
        // 表格分页  
        getpage(value){
            this.pageNo = value.current,
            this.pageSize = value.pageSize
            this.getReportForm()
        },
        // 获取报表数据
        getReportForm(){
            getReportFormPage({pageNo:this.pageNo,pageSize:this.pageSize,column:this.column,order:this.order}).then(res=>{
                this.tableData = res.result.records.reverse()
            })
        },
        //报表 查询
        search(){
            searchStatement(this.$refs.formcode.stateValue,this.$refs.name.stateValue).then(res=>{
                // this.loading = true,
                //倒序排列需要纠正
                this.tableData = res.result.records.reverse()
            })
        },
        // 重置 
        reset(){
            this.$refs.formcode.stateValue = '',
            this.$refs.name.stateValue = ''
            this.search()
        },
        handleChange(ev) {
            console.log('---');
        },
        // 报表表格数据勾选
        selectChange(ev,selectedRowKeys) {
            // console.log('----选择发生改变----', ev,selectedRowKeys);
            let ids = selectedRowKeys.map(item=>{
                return item.id
            })
            this.ids = ids
            this.selectNum = ev.length;
        },
        
        // 批量操作
        handleMenuClick(ev) {
            // 批量删除
            batchDelete(this.ids).then(res=>{
                this.selectNum = 0;
                this.$refs.table.cancelAllSelect();
                this.getReportForm()

            })
        },
        // 清空选择
        cleanCheck() {
            this.selectNum = 0;
            this.$refs.table.cancelAllSelect();
        },
        // 显示新增弹窗
        showModal() {
            this.$refs.modal.show();
        }
    }
};
</script>
<style lang="less">
// 表单公共样式修改
.ant-form-item {
    margin-bottom: 10px;
}

// 其他样式
.searchBtn {
    margin-right: 10px;
}

.tableCount {
    margin-top: 16px;
    margin-bottom: 16px;
}
</style>

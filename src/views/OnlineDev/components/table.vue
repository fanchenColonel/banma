<template>
    <div class="table">
        <a-table :row-selection="{ fixed: true, type: 'checkbox', selectedRowKeys: selectArr, onChange: selectChange }" :columns="columns" :data-source="tableData" :bordered="true">
            <template slot="operation" slot-scope="text, record">
                <a-row class="operationBox">
                    <a-col :span="11" class="operationItem">
                        <span>编辑</span>
                    </a-col>
                    <a-col class="cutLine" :span="2">|</a-col>
                    <a-col :span="11" class="operationItem">
                        <a-dropdown>
                            <span class="" @click="(e) => e.preventDefault()">更多 <a-icon class="downIcon" type="down"/></span>
                            <a-menu slot="overlay">
                                <a-menu-item>
                                    <a class="menuItem" href="javascript:;">配置地址</a>
                                </a-menu-item>
                                <a-menu-item>
                                    <a class="menuItem" href="javascript:;">功能测试</a>
                                </a-menu-item>
                                <a-menu-item>
                                    <a class="menuItem" href="javascript:;">删除</a>
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </a-col>
                </a-row>
            </template>
        </a-table>
    </div>
</template>
<script>
const columns = [
    {
        title: '报表名称',
        align: 'center',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '编码',
        align: 'center',
        dataIndex: 'code',
        key: 'code'
    },
    {
        title: '查询SQL',
        align: 'center',
        dataIndex: 'sentence',
        key: 'sentence'
    },
    {
        title: '数据源',
        align: 'center',
        dataIndex: 'source',
        key: 'source'
    },
    {
        title: '创建时间',
        align: 'center',
        dataIndex: 'createTime',
        key: 'createTime'
    },
    {
        title: '操作',
        align: 'center',
        key: 'operation',
        scopedSlots: { customRender: 'operation' }
    }
];
export default {
    props: {
        tableData: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            columns,
            selectArr: []
        };
    },
    methods: {
        selectChange(ev) {
            this.selectArr = ev;
            this.$emit("selectChange",ev);
        },
        cancelAllSelect(){
            this.selectArr = [];
        }
    }
};
</script>
<style lang="less">
.operationBox {
    position: relative;
    .operationItem {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #1890ff;
    }

    .cutLine {
        color: #ccc;
    }
}
.menuItem {
    text-align: center;
    &:hover {
        color: #1890ff;
    }
}
</style>

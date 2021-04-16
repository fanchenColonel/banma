<template>
    <div id="wrappper">
        <div class="addBtnBox">
            <a-row>
                <a-col :span="2">
                    <a-button type="primary" icon="plus" @click="addNewColumns">新增</a-button>
                </a-col>
            </a-row>
        </div>

        <a-table
            :row-selection="{ fixed: true, type: 'checkbox', selectedRowKeys: selectArr, onChange: selectChange }"
            :columns="columns"
            :data-source="tableData"
            :bordered="true"
            rowKey="id"
        >
            <div class="customHeader" slot="custom1">
                <span class="mustIcon">*</span>
                <a-icon type="form" />字段名
            </div>
            <div class="customHeader" slot="custom2">
                <span class="mustIcon">*</span>
                <a-icon type="form" />字段文本
            </div>
            <div class="customHeader" slot="custom3">
                <span class="mustIcon">*</span>
                <a-icon type="form" />类型
            </div>
            <div class="customHeader" slot="custom4">
                <a-icon type="form" />是否显示
            </div>
            <div class="customHeader" slot="custom5">
                <a-icon type="form" />字段href
            </div>
            <div class="customHeader" slot="custom6">
                <a-icon type="form" />查询模式
            </div>
            <div class="customHeader" slot="custom7">
                <a-icon type="form" />取值表达式
            </div>
            <div class="customHeader" slot="custom8">
                <a-icon type="form" />字典code
            </div>
            <div class="customHeader" slot="custom9">
                <a-icon type="form" />是否查询
            </div>
            <div class="customHeader" slot="custom10">
                <a-icon type="form" />合计
            </div>

            <template v-for="col in textFields" :slot="col.name" slot-scope="text, record, index">
                <div :key="col.name">
                    <template v-if="col.name == 'id'">
                        <span>{{ index + 1 }}</span>
                    </template>
                    <template v-if="col.type == 'input'">
                        <a-input :placeholder="col.tip" />
                    </template>
                    <template v-if="col.type == 'check'">
                        <a-checkbox :checked="record[col.field]"></a-checkbox>
                    </template>
                    <template v-if="col.type == 'choseInput'">
                        <a-select :default-value="record[col.field]" style="width: 120px">
                            <a-select-option
                                v-for="item in col.selectArr"
                                :key="item.key"
                                :value="item.value"
                            >{{ item.value }}</a-select-option>
                        </a-select>
                    </template>
                </div>
            </template>
        </a-table>
    </div>
</template>
<script>

const columns = [
    {
        title: '#',
        align: 'center',
        dataIndex: 'id',
        key: 'id',
        scopedSlots: { customRender: 'id' }
    },
    {
        align: 'center',
        dataIndex: 'fieldName',
        key: 'fieldName',
        slots: { title: 'custom1' },
        scopedSlots: { customRender: 'fieldName' }
    },
    {
        align: 'center',
        dataIndex: 'fieldTxt',
        key: 'fieldTxt',
        slots: { title: 'custom2' },
        scopedSlots: { customRender: 'fieldTxt' }
    },
    {
        align: 'center',
        dataIndex: 'fieldType',
        key: 'fieldType',
        slots: { title: 'custom3' },
        scopedSlots: { customRender: 'fieldType' }
    },
    {
        align: 'center',
        dataIndex: 'show',
        key: 'show',
        slots: { title: 'custom4' },
        scopedSlots: { customRender: 'show' }
    },
    {
        align: 'center',
        dataIndex: 'fieldHref',
        key: 'fieldHref',
        slots: { title: 'custom5' },
        scopedSlots: { customRender: 'fieldHref' }
    },
    {
        align: 'center',
        dataIndex: 'queryType',
        key: 'queryType',
        slots: { title: 'custom6' },
        scopedSlots: { customRender: 'queryType' }
    },
    {
        align: 'center',
        dataIndex: 'expression',
        key: 'expression',
        slots: { title: 'custom7' },
        scopedSlots: { customRender: 'expression' }
    },
    {
        align: 'center',
        dataIndex: 'dictionaryCode',
        key: 'dictionaryCode',
        slots: { title: 'custom8' },
        scopedSlots: { customRender: 'dictionaryCode' }
    },
    {
        align: 'center',
        dataIndex: 'query',
        key: 'query',
        slots: { title: 'custom9' },
        scopedSlots: { customRender: 'query' }
    },
    {
        align: 'center',
        dataIndex: 'total',
        key: 'total',
        slots: { title: 'custom10' },
        scopedSlots: { customRender: 'total' }
    }
];

//  表格里展示输入框或者复选框（下拉框另写）
const textFields = [
    {
        name: 'fieldName',
        type: 'input',
        tip: '请输入字段名称'
    },
    {
        name: 'fieldTxt',
        type: 'input',
        tip: '请输入字段文本'
    },
    {
        name: 'fieldType',
        type: 'choseInput',
        field: 'fieldType',
        selectArr: [
            {
                key: 1,
                value: '数值类型'
            },
            {
                key: 2,
                value: '字符类型'
            },
            {
                key: 3,
                value: '日期类型'
            },
            {
                key: 4,
                value: '时间类型'
            },
            {
                key: 5,
                value: '长整形'
            }
        ]
    },
    {
        name: 'show',
        type: 'check',
        field: 'show'
    },
    {
        name: 'fieldHref',
        type: 'input',
        tip: '请输入字段href'
    },
    {
        name: 'queryType',
        type: 'input',
        tip: '请选择查询模式'
    },
    {
        name: 'expression',
        type: 'input',
        tip: '请输入取值表达式'
    },
    {
        name: 'dictionaryCode',
        type: 'input',
        tip: '请输入字典Code'
    },
    {
        name: 'query',
        type: 'check',
        field: 'query'
    },
    {
        name: 'total',
        type: 'check',
        field: 'total'
    }
];

var tableTempData = [
    {
        id: '',
        fieldName: '',
        fieldTxt: '',
        fieldType: '数值类型',
        show: true,
        fieldHref: '',
        queryType: '',
        expression: '',
        dictionaryCode: '',
        query: true,
        total: true,
    }
];

export default {
    data() {
        return {
            tableData: [],
            columns,
            tableTempData,
            selectArr: [],
            textFields,
            count: 1
        };
    },
    methods: {
        selectChange() {
            
        },
        addNewColumns() {
            // let newData = JSON.parse(JSON.stringify(this.tableTempData));
            let newData = this.tableTempData
            newData.id = this.count++;
            this.tableData.push(newData); 
        }
    }
};
</script>
<style lang="less">
.addBtnBox {
    margin-bottom: 10px;
}

.customHeader {
    .mustIcon {
        margin-right: 4px;
        color: #f5222d;
        font-size: 14px;
        font-family: SimSun, sans-serif;
        line-height: 1;
    }
    .anticon {
        margin-right: 4px;
    }
}
</style>

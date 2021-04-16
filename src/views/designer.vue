<template>
    <div id="designer">
        <!-- 查询 -->
        <div class="header-search">
            <div class="table-left">
                <label for="">表单名称:</label>
                <a-input placeholder="请输入表单名称" class="table-name" />
            </div>
            <div class="table-middle">
                <label for="">表单编码:</label>
                <a-input placeholder="请输入表单编码" class="table-name" />
            </div>
            <div class="button">
                <a-button type="primary" icon="search"> 查询 </a-button>
                <a-button type="primary" icon="reload"> 重置 </a-button>
            </div>
        </div>
        <!-- 新增 -->
        <div class="table-operator">
            <a-button type="primary" class="btn" icon="plus" @click="showModal"> 新增 </a-button>

            <a-dropdown>
                <a-button type="primary" class="btn" icon="redo" @click="(e) => e.preventDefault()"> 重置索引 </a-button>
                <a-menu slot="overlay" @click="onClick">
                    <a-menu-item key="1"> 快速重置索引 </a-menu-item>
                    <a-menu-item key="2"> 强制重置索引 </a-menu-item>
                </a-menu>
            </a-dropdown>

            <a-dropdown>
                <a-button type="primary" class="btn btn-operation" @click="(e) => e.preventDefault()">
                    批量操作
                    <a-icon type="down" />
                </a-button>
                <a-menu slot="overlay" class="btn-del">
                    <a-menu-item>
                        <a-icon type="delete" />
                        <span>删除</span>
                    </a-menu-item>
                </a-menu>
            </a-dropdown>
        </div>
        <!-- 新增模态框 
      id="designer-modal"-->
        <a-modal v-model="visible" title="新增表单" @ok="handleOk" style="top: 0; height: 100%" width="800px">
            <template slot="footer">
                <div style="display: flex; align-items: center; justify-content: space-between">
                    <a-checkbox default-checked> 添加后自动打开设计 </a-checkbox>
                    <div style="display: flex; align-items: center">
                        <a-button key="back" @click="handleCancel"> 取消 </a-button>
                        <a-button key="submit" type="primary" :loading="loading" @click="handleOk"> 确定 </a-button>
                    </div>
                </div>
            </template>
            <a-form :form="form" @submit="handleSubmit">
                <a-form-item v-bind="formItemLayout" label="表单名称">
                    <a-input
                        placeholder="请输入表单名称"
                        v-decorator="[
                            'formName',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入表单名称!'
                                    }
                                ]
                            }
                        ]"
                    />
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="表单编码" has-feedback>
                    <a-input
                        placeholder="请输入表单编码"
                        v-decorator="[
                            'formCoding',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入表单编码!'
                                    },
                                    {
                                        validator: validateToNextPassword
                                    }
                                ]
                            }
                        ]"
                        type="password"
                    />
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="online表单"> <a-switch checked-children="开启" un-checked-children="关闭" style="margin-right: 10px" @change="onChange" /> 开启后将自动根据选择的Online表单生成 </a-form-item>
                <a-form-item v-bind="formItemLayout" label="表单名称" v-if="select">
                    <a-select
                        default-value=""
                        placeholder="请选择online表单"
                        v-decorator="[
                            'onlineTable',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择online表单!'
                                    }
                                ]
                            }
                        ]"
                    >
                        <a-select-option v-for="item in onlineForms" :key="item.id" :value="item.id"> {{ item.tableName }}</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="表单模板" v-if="select">
                    <a-select default-value="0" v-decorator="['tableTemplate']">
                        <a-select-option key="0" value="0">请选择模板</a-select-option>
                        <a-select-option v-for="item in formTemplates" :key="item.id" :value="item.id"> {{ item.template }}</a-select-option>
                    </a-select>
                </a-form-item>
            </a-form>
        </a-modal>
        <!-- 已选项统计 -->
        <div class="total">
            <span>
                <template>
                    {{ `已选择 ${selectedRowKeys.length} 项` }}
                </template>
            </span>
            <a href="javascript:;" class="dele" type="primary" :disabled="!hasSelected" :loading="loading" @click="start">清空</a>
        </div>
        <!-- 编辑模态框 -->
        <a-modal v-model="visible1" title="编辑表单" @ok="handle" width="800px">
            <a-form :form="form" @submit="submit">
                <a-form-item v-bind="formStyle" label="表单名称">
                    <a-input
                        v-decorator="[
                            'FormName',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入表单名称!'
                                    }
                                ]
                            }
                        ]"
                    />
                </a-form-item>
                <a-form-item v-bind="formStyle" label="表单编码">
                    <a-input
                        disabled
                        v-decorator="[
                            'FormeNcod',
                            {
                                rules: [
                                    {
                                        required: true
                                    }
                                ]
                            }
                        ]"
                    />
                </a-form-item>
            </a-form>
        </a-modal>
        <!-- 表格 -->
        <div class="table">
            <a-table
                :row-selection="{
                    selectedRowKeys: selectedRowKeys,
                    onChange: onSelectChange
                }"
                :columns="columns1"
                :data-source="data"
                bordered
            >
                <template slot="operation">
                    <a-row class="operationBox">
                        <a-col :span="2" class="operationItem">
                            <a href="javascript:;" @click="dispModal">编辑</a>
                        </a-col>
                        <a-col class="cutLine" :span="1">|</a-col>
                        <a-col :span="5" class="operationItem">
                            <a href="javascript:;" @click="showDesign"><a-icon type="setting" class="icon" />表单设计</a>
                        </a-col>
                        <a-col class="cutLine" :span="1">|</a-col>
                        <a-col :span="4" class="operationItem">
                            <a href="javascript:;">表单数据</a>
                        </a-col>
                        <a-col class="cutLine" :span="1">|</a-col>
                        <a-col :span="4" class="operationItem">
                            <a href="javascript:;">配置地址</a>
                        </a-col>
                        <a-col class="cutLine" :span="1">|</a-col>
                        <a-col :span="3" class="operationItem">
                            <a-dropdown>
                                <a href="javascript:;" class="" @click="(e) => e.preventDefault()">更多 <a-icon class="downIcon" type="down" /></a>
                                <a-menu slot="overlay">
                                    <a-menu-item>
                                        <a class="menuItem" href="javascript:;">控制权限</a>
                                    </a-menu-item>
                                    <a-menu-item>
                                        <a class="menuItem" href="javascript:;">角色授权</a>
                                    </a-menu-item>
                                    <a-menu-item>
                                        <a class="menuItem" href="javascript:;">路由配置</a>
                                    </a-menu-item>
                                    <a-menu-item>
                                        <a class="menuItem" href="javascript:;">复制视图</a>
                                    </a-menu-item>
                                    <a-menu-item>
                                        <a class="menuItem" href="javascript:;">复制表单</a>
                                    </a-menu-item>
                                    <a-menu-item>
                                        <a class="menuItem" href="javascript:;">索引工具</a>
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
        <!-- 表单设计模态框 -->
        <a-modal id="design" v-model="visible2" title="表单设计器" on-ok="designOk" width="100%" :bodyStyle="addDesignStyle" :dialogStyle="addModalStyle">
            <k-form-design ref="kfd" :title="'模板设计'" :showHead="false" @save="handleSave" @close="handleClose" />
            <template slot="footer" id="footer"> Powered by ZHANZAO </template>
        </a-modal>
    </div>
</template>
<script>
import 'k-form-design/lib/k-form-design.css';
import 'ant-design-vue/dist/antd.css';
const onlineForms = [
    {
        id: 1,
        tableName: '测试'
    },
    {
        id: 2,
        tableName: '运行模式'
    },
    {
        id: 3,
        tableName: '请假单'
    }
];

const formTemplates = [
    {
        id: 1,
        template: '基本信息表'
    },
    {
        id: 2,
        template: '增强的信息表'
    },
    {
        id: 3,
        template: '导入导出表'
    }
];

const data = [];
const columns1 = [
    {
        title: '表单名称',
        dataIndex: 'formName',
        align: 'center',
        width: 510
    },
    {
        title: '表单编码',
        dataIndex: 'formCoding',
        align: 'center',
        width: 330
    },
    {
        title: '移动视图',
        dataIndex: 'mobileView',
        align: 'center',
        width: 330
    },
    {
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        scopedSlots: { customRender: 'operation' }
    }
];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        formName: `印章`,
        formCoding: `yz001`,
        mobileView: ` `,
        operation: `2020`
    });
}

export default {
    data() {
        return {
            data,
            columns1,
            onlineForms,
            formTemplates,
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            visible: false,
            visible1: false,
            visible2: false,
            formLayout: 'inline',
            count: 6,
            confirmDirty: false,
            tailFormItemLayout: {
                wrapperCol: {
                    xs: {
                        span: 24,
                        offset: 0
                    },
                    sm: {
                        span: 16,
                        offset: 8
                    }
                }
            },
            select: false,
            formStyle: {
                labelCol: { span: 4 },
                wrapperCol: { span: 17 }
            },
            FormeNcod: {
                value: 'benjycui'
            },
            addDesignStyle: {
                height: 'calc(100vh - 80px)',
                overflow: 'auto'
            },
            addModalStyle: {
                height: '100%',
                top: 0,
                flex: 1,
                padding: 0,
                'min-width': '1200px'
            }
        };
    },

    created() {
        this.form = this.$form.createForm(this, {
            name: 'register',
            mapPropsToFields: () => {
                return {
                    FormeNcod: this.$form.createFormField({
                        ...this.FormeNcod,
                        value: this.FormeNcod.value
                    })
                };
            }
        });
    },
    computed: {
        hasSelected() {
            return this.selectedRowKeys.length > 0;
        },
        formItemLayout() {
            const { formLayout } = this;
            return formLayout === 'inline'
                ? {
                      labelCol: { span: 5 },
                      wrapperCol: { span: 16 }
                  }
                : {};
        },
        rowSelection() {
            return {
                onChange: (selectedRowKeys, selectedRows) => {
                    
                },
                getCheckboxProps: (record) => ({
                    props: {
                        disabled: record.name === 'Disabled User', // Column configuration not to be checked
                        name: record.name
                    }
                })
            };
        }
    },
    methods: {
        log(e) {
            
        },
        // 表格
        start() {
            this.loading = true;
            // ajax request after empty completing
            this.loading = false;
            this.selectedRowKeys = [];
        },
        onSelectChange(selectedRowKeys) {
            
            this.selectedRowKeys = selectedRowKeys;
        },
        // 新增模态框
        showModal() {
            this.visible = true;
        },
        handleOk(e) {
            
            this.visible = false;
        },
        callback(key) {
            
        },
        addOneRow() {
            const { count, dataTwo } = this;
            let newData = {
                key: count,
                id: count,
                fieldsName: '',
                comment: '',
                length: '',
                dot: '',
                type: '',
                main: false,
                null: true
            };
            this.dataTwo = [...dataTwo, newData];
            this.count = count + 1;
        },
        handleChange(value, key, col) {
            const newData = [...this.dataTwo];
            const target = newData.filter((item) => key === item.id)[0];

            if (target) {
                target[col] = value;
                this.data = newData;
            }
        },
        handleSelectChange(value, key, col) {
            
            const newData = [...this.dataTwo];
            const target = newData.filter((item) => key === item.id)[0];

            if (target) {
                target[col] = value;
                this.data = newData;
            }
        },

        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                }
            });
        },
        validateToNextPassword(rule, value, callback) {
            const form = this.form;
            if (value && this.confirmDirty) {
                form.validateFields(['confirm'], { force: true });
            }
            callback();
        },
        handleCancel() {
            this.visible = false;
        },
        onChange(checked) {
            console.log(`a-switch to ${checked}`);
            this.select = checked;
        },
        onClick({ key }) {
            console.log(`Click on item ${key}`);
        },
        dispModal() {
            this.visible1 = true;
        },
        handle(e) {
            console.log(e);
            this.visible1 = false;
        },
        submit(e) {
            e.preventDefault();
            this.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                }
            });
        },
        showDesign() {
            this.visible2 = true;
        },
        designOk(e) {
            console.log(e);
            this.visible2 = false;
        },
        // 表单设计器--拖拽
        handleSave() {
            console.log('保存');
            this.$refs.kfd.handleSave();
        },
        handleClose() {
            console.log('关闭');
        },
        resetFormDesign() {
            this.$refs.kfd.handleReset();
        }
    }
};
</script>
<style lang="less">
p,
ul {
    margin: 0;
    padding: 0;
    list-style: none;
}
#designer {
    .header-search {
        display: flex;
    }
    .table-left,
    .table-middle {
        width: 404px;
        height: 56px;
    }
    .table-name {
        width: 320px;
        margin-left: 8px;
    }
    .button {
        width: 170px;
        display: flex;
        justify-content: space-between;
    }
    .table-operator {
        margin-bottom: 8px;
    }
    .btn {
        margin: 0 8px 8px 0;
    }
    .btn-operation {
        background-color: #fff;
        padding: 0 15px;
        color: black;
    }
    .ant-dropdown-link {
        color: rgba(0, 0, 0, 0.65);
    }

    .total {
        border: 1px solid #91d5ff;
        background-color: #e6f7ff;
        height: 38px;
        border-radius: 4px;
        padding: 8px 15px 8px 37px;
        margin-bottom: 16px;
        .dele {
            margin-left: 24px;
        }
    }
    label {
        font-size: 12px;
    }

    .operationItem {
        .icon {
            margin-right: 2px;
        }
    }
    .cutLine {
        color: #e8e8e8;
    }
}
#designer-modal {
    width: 520px;
    .ant-modal-content {
        width: 800px;
    }
}
#design {
    .ant-modal-footer {
        padding: 0 20px;
        height: 30px;
        color: #1890ff;
    }
}
</style>
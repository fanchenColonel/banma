<template>
    <div id="designer">
        <!-- 查询 -->
        <div class="header-search">
            <div class="table-left">
                <label for="">表单名称:</label>
                <a-input placeholder="请输入表单名称" class="table-name" v-model="searchData.formName" />
            </div>
            <div class="table-middle">
                <label for="">表单编码:</label>
                <a-input placeholder="请输入表单编码" class="table-name" v-model="searchData.formEncode" />
            </div>
            <div class="button">
                <a-button type="primary" icon="search" @click="getTableList(1)"> 查询 </a-button>
                <a-button type="primary" icon="reload" @click="restSearcPage"> 重置 </a-button>
            </div>
        </div>
        <!-- 新增 -->
        <div class="table-operator">
            <a-button type="primary" class="btn" icon="plus" @click="showModal"> 新增 </a-button>

            <!-- 重置搜索 -->
            <!-- <a-dropdown>
                <a-button type="primary" class="btn" icon="redo" @click="(e) => e.preventDefault()"> 重置索引 </a-button>
                <a-menu slot="overlay" @click="onClick">
                    <a-menu-item key="1"> 快速重置索引 </a-menu-item>
                    <a-menu-item key="2"> 强制重置索引 </a-menu-item>
                </a-menu>
            </a-dropdown> -->

            <a-dropdown v-if="selectedRowKeys.length > 0">
                <a-button type="primary" class="btn btn-operation" @click="(e) => e.preventDefault()">
                    批量操作
                    <a-icon type="down" />
                </a-button>
                <a-menu slot="overlay" class="btn-del">
                    <a-menu-item @click="confirmDel">
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
                    <a-checkbox :checked="defaultChecked" @change="onCheckbox"> 添加后自动打开设计 </a-checkbox>
                    <div style="display: flex; align-items: center">
                        <a-button key="back" @click="handleCancel"> 取消 </a-button>
                        <a-button key="submit" type="primary" :loading="loading" @click="handleSubmit"> 确定 </a-button>
                    </div>
                </div>
            </template>
            <a-form :form="form">
                <a-form-item v-bind="formItemLayout" label="表单名称">
                    <a-input
                        placeholder="请输入表单名称"
                        v-decorator="[
                            'name',
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
                <a-form-item v-bind="formItemLayout" label="表单编码">
                    <a-input v-model="encodeValue" placeholder="请输入表单编码" v-decorator="['encode', { rules: [{ required: true, message: '编码必须以字母开头，可包含数字、下划线、横杠' }, { validator: checkPrice }] }]" />
                </a-form-item>
                <!-- <a-form-item v-bind="formItemLayout" label="online表单"> <a-switch checked-children="开启" un-checked-children="关闭" style="margin-right: 10px" @change="onChange" /> 开启后将自动根据选择的Online表单生成 </a-form-item>
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
                        <a-select-option v-for="item in onlineForms" :key="item.id" :value="item.id"> {{ item.name + '（' + item.encode + '）' }}</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="表单模板" v-if="select">
                    <a-select default-value="0" v-decorator="['tableTemplate']">
                        <a-select-option key="0" value="0">请选择模板</a-select-option>
                        <a-select-option v-for="item in formTemplates" :key="item.id" :value="item.id"> {{ item.template }}</a-select-option>
                    </a-select>
                </a-form-item> -->
            </a-form>
        </a-modal>
        <!-- 已选项统计 -->
        <div class="total">
            <span>
                <template>
                    已选择
                    <a href="javascript:;">{{ selectedRowKeys.length }}</a>
                    项
                </template>
            </span>
            <a href="javascript:;" class="dele" type="primary" :disabled="!hasSelected" :loading="loading" @click="start">清空</a>
        </div>
        <!-- 编辑模态框 -->
        <a-modal v-model="visible1" title="编辑表单" width="800px" on-ok="editsubmit">
            <template slot="footer">
                <a-button @click="editCancel"> 取消 </a-button>
                <a-button type="primary" :loading="loading" @click="editsubmit"> 确定 </a-button>
            </template>

            <a-form :form="editForm" @submit="editsubmit">
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
                :pagination="pagination"
                :columns="columns1"
                :data-source="data"
                @change="tablePageChange"
                bordered
                :loading="loading6"
                rowKey="id"
            >
                <template slot="operation" slot-scope="text, record">
                    <a-row class="operationBox">
                        <a-col :span="4" class="operationItem">
                            <a href="javascript:;" @click="dispModal(record)">编辑</a>
                        </a-col>
                        <a-col class="cutLine" :span="1">|</a-col>
                        <a-col :span="8" class="operationItem">
                            <a href="javascript:;" @click="showDesign(record)"><a-icon type="setting" class="icon" />表单设计</a>
                        </a-col>
                        <a-col class="cutLine" :span="1">|</a-col>
                        <a-col :span="5" class="operationItem">
                            <a href="javascript:;" @click="formData(record)">表单数据</a>
                        </a-col>
                        <!-- 配置地址 -->
                        <!-- <a-col class="cutLine" :span="1">|</a-col>
                        <a-col :span="4" class="operationItem">
                            <a href="javascript:;">配置地址</a>
                        </a-col> -->
                        <a-col class="cutLine" :span="1">|</a-col>
                        <a-col :span="4" class="operationItem">
                            <a-dropdown>
                                <a href="javascript:;" class="" @click="(e) => e.preventDefault()">更多 <a-icon class="downIcon" type="down" /></a>
                                <a-menu slot="overlay">
                                    <!-- <a-menu-item>
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
                                    </a-menu-item> -->
                                    <a-menu-item>
                                        <a-popconfirm title="确定删除吗?" ok-text="确定" cancel-text="取消" @confirm="(e) => deleteTableList(e, record)"> 删除 </a-popconfirm>
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
import { formTable, addFormTable, selectEncode, delTableData, batchDelete, updateTableData, getById, createForm } from '@/api/designer';
import designerList from './designerList';
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
        dataIndex: 'name',
        align: 'center',
        width: 510
    },
    {
        title: '表单编码',
        dataIndex: 'encode',
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
        width: 300,
        scopedSlots: { customRender: 'operation' }
    }
];

export default {
    components: {
        'v-child': designerList
    },
    // props: {
    //     sonTableData: {
    //         type: Object,
    //         required: false
    //     }
    // },
    data() {
        return {
            sonTableData: { parVal: 1 },
            tableRowKey: '',
            loading6: false,
            encodeValue: '',
            tableEncodeList: '',
            formTableList: '',
            searchData: {
                formName: '',
                formEncode: ''
            },
            pagination: {
                size: 'small',
                total: 100,
                current: 1,
                pageSize: 10,
                'show-size-changer': true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} 共 ${total} 条`
            },
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
            },
            editForm: this.$form.createForm(this),
            addFormCode: '',
            tableDataId: '',
            tableId: '',
            formModuleId: '',
            selectType: '',
            defaultChecked: true
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
        this.getTableList();
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
                onChange: (selectedRowKeys, selectedRows) => {},
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
        // 表格初始加载
        getTableList(page) {
            this.loading6 = true;
            formTable({
                name: this.searchData.formName,
                encode: this.searchData.formEncode,
                pageNo: page == 1 ? 1 : this.pagination.current,
                pageSize: this.pagination.pageSize
            })
                .then((res) => {
                    this.onlineForms = [];
                    this.formTableList = res.result;
                    this.tableEncodeList = res.result.records;
                    let page = res.result;
                    this.data = page?.records;
                    this.loading6 = false;
                    Object.assign(this.pagination, {
                        current: page.current,
                        pageSize: page.size,
                        total: page.total
                    });
                    let selectData = res.result.records;
                    for (let index = 0; index < selectData.length; index++) {
                        this.onlineForms.push(selectData[index]);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.$message.error(err);
                });
        },
        restSearcPage() {
            Object.assign(this.searchData, {
                formName: '',
                formEncode: ''
            });
            this.getTableList(1);
        },
        log(e) {},
        // 表格
        start() {
            this.loading = true;
            // ajax request after empty completing
            this.loading = false;
            this.selectedRowKeys = [];
        },
        onSelectChange(selectedRowKeys, selectedRows) {
            this.selectedRowKeys = selectedRowKeys;
            console.log(selectedRowKeys);
        },
        // 新增模态框
        showModal() {
            this.visible = true;
            this.defaultChecked = true;
            this.form.setFieldsValue({
                name: '',
                encode: ''
            });
        },
        handleOk(e) {
            this.visible = false;
        },
        callback(key) {},
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
            this.form.validateFields((err, values) => {
                this.addFormCode = values.encode;
                if (!err) {
                    this.loading = true;
                    addFormTable({
                        name: values.name,
                        encode: values.encode
                    })
                        .then((res) => {
                            // console.log(res);
                            if (this.defaultChecked == true) {
                                this.visible2 = true;
                                this.tableId = res.result;
                                setTimeout(() => {
                                    this.$refs.kfd.handleSetData({
                                        list: [],
                                        config: {
                                            layout: 'horizontal',
                                            labelCol: {
                                                span: 4,
                                                lg: 4,
                                                md: 4,
                                                sm: 4,
                                                xl: 4,
                                                xs: 4,
                                                xxl: 4
                                            },
                                            wrapperCol: {
                                                span: 18,
                                                lg: 18,
                                                md: 18,
                                                sm: 18,
                                                xl: 18,
                                                xs: 18,
                                                xxl: 18
                                            },
                                            hideRequiredMark: false,
                                            customStyle: ''
                                        }
                                    });
                                }, 200);
                            } else {
                                this.$message.success('保存成功');
                                this.visible2 = false;
                            }
                            this.getTableList();
                            this.form.resetFields();
                            this.defaultChecked = true;
                            this.visible = false;
                            this.loading = false;
                        })
                        .catch((err) => {
                            this.loading = false;
                            console.log(err);
                            this.$message.error('保存失败');
                        });
                }
            });
        },
        checkPrice(rule, value, callback) {
            // console.log(tableEncode);
            if (value && value.length > 0) {
                var reg = /^[a-zA-Z]{1}([-_a-zA-Z0-9]{1,9})$/;
                if (!reg.test(value)) {
                    callback('编码必须以字母开头，可包含数字、下划线、2-10位编码');
                } else {
                    selectEncode({ encode: value })
                        .then((res) => {
                            // console.log(res);
                            // console.log(rule);
                            callback();
                        })
                        .catch((err) => {
                            console.log(err);
                            callback('该值不可用，系统中已存在！');
                            // let tableEncode = this.tableEncodeList;
                            // for (const key in tableEncode) {
                            //     if (tableEncode[key].encode == value) {
                            //         callback('该值不可用，系统中已存在！');
                            //     }
                            // }
                            this.loading = false;
                        });
                }
            } else {
                callback();
            }
        },
        // 表格分页
        tablePageChange(pagination, filters, sorter) {
            // console.log(pagination);
            let pager = { ...this.pagination };
            pager.current = pagination.current;
            this.pagination = pager;
            // console.log(this.pagination);
            this.getTableList();
        },
        deleteTableList(e, record) {
            delTableData({ id: record.id })
                .then((res) => {
                    // console.log(res);
                    if (this.data.length <= 1 && this.pagination.current > 1) {
                        let _current = this.pagination.current;
                        Object.assign(this.pagination, {
                            current: _current - 1
                        });
                    }
                    this.getTableList();
                })
                .catch((err) => {
                    console.log(err);
                    this.$message.error(err);
                });
        },
        // 批量删除
        confirmDel() {
            if (this.selectedRowKeys.length == this.data.length) {
                var flag = true;
            }
            let _this = this;
            this.$confirm({
                title: '确定删除',
                content: '是否删除选中数据？',
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    console.log(_this.selectedRowKeys);
                    // _this.selectedRowKeys = [];
                    batchDelete({ ids: _this.selectedRowKeys.join(',') })
                        .then((res) => {
                            // console.log(res);
                            if (flag && _this.pagination.current > 1) {
                                let _current = _this.pagination.current;
                                Object.assign(_this.pagination, {
                                    current: _current - 1
                                });
                            }
                            _this.getTableList();
                            _this.selectedRowKeys = [];
                        })
                        .catch((err) => {
                            console.log(err);
                            _this.$message.error(err);
                        });
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
            this.defaultChecked = true;
            this.visible = false;
            this.loading = false;
        },
        onChange(checked) {
            console.log(`a-switch to ${checked}`);
            this.select = checked;
        },
        onClick({ key }) {
            console.log(`Click on item ${key}`);
        },
        dispModal(record) {
            console.log(record);
            this.tableDataId = record.id;
            this.visible1 = true;
            setTimeout(() => {
                this.editForm.setFieldsValue({
                    FormName: record.name,
                    FormeNcod: record.encode
                });
            }, 200);
        },
        editCancel() {
            this.visible1 = false;
        },
        editsubmit(e) {
            e.preventDefault();
            this.editForm.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    updateTableData({
                        id: this.tableDataId,
                        name: values.FormName
                    })
                        .then((res) => {
                            console.log(res);
                            this.visible1 = false;
                            this.getTableList();
                        })
                        .catch((err) => {
                            console.log(err);
                            this.$message.error(err);
                        });
                }
            });
        },
        showDesign(record) {
            this.tableId = record.id;
            this.visible2 = true;
            this.getByIdPort(record);
        },
        getByIdPort(record) {
            getById({ id: record.id })
                .then((res) => {
                    this.sonTableData = JSON.parse(res.result.json);
                    // console.log(this.sonTableData);
                    this.$refs.kfd.handleSetData(
                        this.sonTableData
                            ? this.sonTableData
                            : {
                                  list: [],
                                  config: {
                                      layout: 'horizontal',
                                      labelCol: {
                                          span: 4,
                                          lg: 4,
                                          md: 4,
                                          sm: 4,
                                          xl: 4,
                                          xs: 4,
                                          xxl: 4
                                      },
                                      wrapperCol: {
                                          span: 18,
                                          lg: 18,
                                          md: 18,
                                          sm: 18,
                                          xl: 18,
                                          xs: 18,
                                          xxl: 18
                                      },
                                      hideRequiredMark: false,
                                      customStyle: ''
                                  }
                              }
                    );
                })
                .catch((err) => {
                    console.log(err);
                    this.$message.error(err);
                });
        },
        designOk(e) {
            console.log(e);
            this.visible2 = false;
        },
        // 表单设计器--拖拽
        handleSave(values) {
            values = JSON.parse(values);
            console.log(values);
            let moduleId = [];
            for (let index = 0; index < values.list.length; index++) {
                moduleId.push(values.list[index].key);
            }
            this.formModuleId = moduleId;
            createForm({
                formTableId: this.tableId.toString(),
                list: values.list,
                config: values.config
            })
                .then((res) => {
                    this.$message.success('保存成功');
                    // console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                    this.$message.error(err);
                });
            // this.$refs.kfd.handleSave();
        },
        formData(record) {
            // console.log(record);
            this.$router.push({ name: 'designerList', params: { id: record.id, encode: record.encode } });
        },
        handleClose() {
            this.visible2 = false;
        },
        resetFormDesign() {
            this.$refs.kfd.handleReset();
        },
        onCheckbox(e) {
            this.defaultChecked = e.target.checked;
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
        color: #000000a6;
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
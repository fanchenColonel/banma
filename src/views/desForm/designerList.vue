<template>
    <div>
        <div v-if="!showNull">你还没有设计任何表单项，不能查看表单数据！</div>
        <div v-else>
            <!-- 按钮合集 -->
            <div class="btnGather">
                <a-button type="primary" class="btn" icon="plus" @click="addFormFun">新增</a-button>
                <a-button type="primary" class="btn" icon="download" @click="exportExcel">导出</a-button>
                <a-button type="primary" class="btn" icon="upload" @click="uploadModal">导入</a-button>
                <!-- <a-button type="primary" class="btn" icon="filter" @click="advancedSelect">高级查询</a-button> -->
            </div>
            <!-- 已选择项 -->
            <div class="vessel">
                <div>
                    <a-icon type="info-circle" theme="twoTone" two-tone-color="#1890ff" />
                    <span class="text">已选择 <a href="javascript:;">0</a> 项</span>
                </div>
                <div>
                    <a href="javascript:;" @click="refresh"><a-icon type="sync" />刷新</a>
                    <!-- <span class="wire"></span> -->
                    <!-- <a href="javascript:;"><a-icon type="setting" />自定义列</a> -->
                </div>
            </div>
            <!-- <a-table :row-selection="{ selectedRowKeys: modSelectedRowKeys, onChange: modOnSelectChange }" :columns="moduleColumns" :data-source="moduleData" bordered> </a-table> -->
            <!-- 表格 -->
            <a-table :data-source="desData" :row-selection="{ selectedRowKeys: modSelectedRowKeys, onChange: modOnSelectChange }" :pagination="desPagination" :loading="tableLateLoading" @change="tableOnChange" bordered>
                <template v-for="item in moduleColumns">
                    <a-table-column v-if="item.dataIndex == 'operation'" :key="item.key" :title="item.title" :align="item.align" :width="item.width" :dataIndex="item.key">
                        <template slot-scope="text, record">
                            <a-row>
                                <a-col :span="7" class="operationItem">
                                    <a href="javascript:;" @click="examine(record)">查看</a>
                                </a-col>
                                <a-col class="cutLines" :span="1">|</a-col>
                                <a-col :span="7" class="operationItem">
                                    <a href="javascript:;" @click="edClick(record)">编辑</a>
                                </a-col>
                                <!-- <a-col class="cutLines" :span="1">|</a-col>
                                <a-col :span="9" class="operationItem">
                                    <a href="javascript:;">获取编辑地址</a>
                                </a-col> -->
                                <a-col class="cutLines" :span="1">|</a-col>
                                <a-col :span="8" class="operationItem">
                                    <a-dropdown>
                                        <a href="javascript:;" class="" @click="(e) => e.preventDefault()">更多 <a-icon class="downIcon" type="down" /></a>
                                        <a-menu slot="overlay">
                                            <a-menu-item>
                                                <a-popconfirm title="确定删除吗?" ok-text="确定" cancel-text="取消" @confirm="(e) => deleteFormTable(e, record)"> 删除 </a-popconfirm>
                                            </a-menu-item>
                                        </a-menu>
                                    </a-dropdown>
                                </a-col>
                            </a-row>
                        </template>
                        <!-- <template slot-scope="text, record"> <a> 编辑</a> </template>
                        <template slot-scope="text, record"> <a> 获取编辑地址</a> </template>
                        <template slot-scope="text, record"> <a> 更多</a> </template> -->
                    </a-table-column>
                    <a-table-column v-else :key="item.key" :title="item.title" :align="item.align" :width="item.width" :dataIndex="item.key"> </a-table-column>
                </template>
            </a-table>
            <!-- 查看模态框 -->
            <a-modal v-model="exameVisible" :title="addModalTitle" width="1000px" :footer="null">
                <k-form-build ref="kfb" :value="jsonData" />
            </a-modal>
            <!-- 高级查询模态框 -->
            <a-modal id="seleModal" v-model="seleVisible" title="高级查询构造器" on-ok="seleHandleOk" width="1000px">
                <template slot="footer">
                    <div class="footer-btn">
                        <div>
                            <a-button @click="Resets">重置</a-button>
                            <a-button>保存查询条件</a-button>
                        </div>
                        <div>
                            <a-button key="back" @click="seleHandleCancel"> 关闭 </a-button>
                            <a-button key="submit" type="primary" :loading="seleLoading" @click="seleHandleOk"> 查询 </a-button>
                        </div>
                    </div>
                </template>
                <div class="seleContent">
                    <div class="contleft">
                        <a-form-model :model="condForm" :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
                            <a-row>
                                <a-col :span="18">
                                    <a-form-model-item label="过滤条件匹配:">
                                        <a-select style="width: 282px" v-model="superQueryMatch">
                                            <a-select-option value="and"> AND（所有条件都要求匹配） </a-select-option>
                                            <a-select-option value="or"> OR（条件中的任意一个匹配） </a-select-option>
                                        </a-select>
                                    </a-form-model-item>
                                </a-col>
                            </a-row>
                            <a-row v-for="(modelForms, i) in selModelForms" :key="i">
                                <a-col :span="8">
                                    <a-form-model-item>
                                        <a-tree-select
                                            v-model="modelForms.field"
                                            :tree-data="selectData"
                                            placeholder="请选择查询字段"
                                            show-search
                                            style="width: 240px"
                                            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                                            allow-clear
                                            @change="
                                                (value, label, extra) => {
                                                    modelForms.type = extra.triggerNode.dataRef.type;
                                                }
                                            "
                                        >
                                        </a-tree-select>
                                    </a-form-model-item>
                                </a-col>
                                <a-col :span="4">
                                    <a-form-model-item class="optionCompare">
                                        <a-select style="width: 116px" v-model="modelForms.rule"
                                            ><!--@change="handleProvinceChange"-->
                                            <a-select-option v-for="selitems in seleItemList" :key="selitems.value" :value="selitems.value"> {{ selitems.title }} </a-select-option>
                                        </a-select>
                                    </a-form-model-item>
                                </a-col>
                                <a-col :span="8">
                                    <a-form-model-item>
                                        <!-- <a-input :placeholder="'请输入值'" style="width: 240px" /> -->
                                        <a-input :placeholder="'请输入值'" v-if="modelForms.type == 'input' || modelForms.type == 'textarea' || modelForms.type == 'rate' || modelForms.type == 'slider' || modelForms.type == 'uploadFile' || modelForms.type == 'uploadImg' || modelForms.type == 'treeSelect' || modelForms.type == 'cascader' || modelForms.type == 'batch' || modelForms.type == 'editor' || modelForms.type == 'editor' || modelForms.type == 'editor'" allowClear style="width: 240px" v-model="modelForms.value" />
                                        <a-input-number :placeholder="'请输入数字'" v-if="modelForms.type == 'number'" allowClear style="width: 240px" v-model="modelForms.value" />
                                        <a-date-picker :placeholder="'请选择日期'" v-if="modelForms.type == 'date'" allowClear style="width: 240px" v-model="modelForms.value" />
                                        <a-date-picker show-time :placeholder="'请选择日期时间'" v-if="modelForms.type == 'datetime'" allowClear style="width: 240px" v-model="modelForms.value" />
                                        <a-time-picker :placeholder="'请选择时间'" v-if="modelForms.type == 'time'" allowClear style="width: 240px" v-model="modelForms.value" />
                                        <a-select :options="modelForms.enum" :placeholder="'请选择值'" v-if="modelForms.type == 'checkbox' || modelForms.type == 'select' || modelForms.type == 'radio' || modelForms.type == 'list' || modelForms.type == 'list_multi' || modelForms.type == 'sel_search' || modelForms.type == 'switch'" switch allowClear style="width: 240px" v-model="modelForms.value">
                                            <a-select-option v-for="item in modelForms.enum" :key="item.value" :value="item.value">{{ item.text }}</a-select-option>
                                        </a-select>
                                        <!-- <j-select-multi-user v-if="modelForm.type == 'sel_user'" :placeholder="'请选择用户'" style="width: 240px" v-modal="modelForm.val" :read-only="true" /> -->
                                    </a-form-model-item>
                                </a-col>
                                <a-col :span="4">
                                    <a-form-model-item>
                                        <a-button class="addRow" @click="addQuerys"><a-icon type="plus" /></a-button>
                                        <a-button class="subtract" @click="subQuerys(modelForms.key)"><a-icon type="minus" /></a-button>
                                    </a-form-model-item>
                                </a-col>
                            </a-row>
                        </a-form-model>
                    </div>
                    <div class="contright">
                        <a-table :columns="seleColumns" :data-source="seleData" bordered size="small">
                            <template slot="name" slot-scope="text">
                                <a>{{ text }}</a>
                            </template>
                        </a-table>
                    </div>
                </div>
            </a-modal>
            <!-- 导入模态框 -->
            <a-modal v-model="impVisible" title="导入EXCEL" on-ok="impHandleOk" width="600px">
                <template slot="footer">
                    <a-button @click="impHandleCancel"> 关闭 </a-button>
                    <a-button type="primary" :disabled="fileLists.length === 0" :loading="impLoading" @click="impHandleOk"> 开始上传 </a-button>
                </template>
                <a-upload :file-list="fileLists" :remove="impHandleRemove" :before-upload="impBeforeUpload" accept=".xls,.xlsx">
                    <a-button> <a-icon type="upload" /> 选择导入文件 </a-button>
                </a-upload>
            </a-modal>
            <!-- 新增模态框 -->
            <a-modal id="addModal" v-model="addvisible" :title="addModalTitle" on-ok="addHandleOk" width="1000px">
                <template slot="footer">
                    <div class="footerBtn">
                        <a-button key="back" @click="addHandleCancel"> 取消 </a-button>
                        <!-- 新增确定按钮 -->
                        <!-- <button @click="handleGetData">获取数据</button> -->
                        <a-button key="submit" type="primary" :loading="addLoading" @click="addHandleOk"> 确定 </a-button>
                    </div>
                </template>
                <k-form-build ref="kfb" :value="jsonData" />
            </a-modal>
            <!-- 编辑模态框 -->
            <a-modal id="edModal" v-model="edVisible" :title="addModalTitle" on-ok="edHandleOk" width="1000px">
                <template slot="footer">
                    <div class="edFooter">
                        <a-button @click="edHandleCancel"> 取消 </a-button>
                        <a-button type="primary" :loading="edLoading" @click="edHandleOk"> 确定 </a-button>
                    </div>
                </template>
                <k-form-build ref="kfb" :value="jsonData" />
            </a-modal>
        </div>
    </div>
</template>
<script>
import 'k-form-design/lib/k-form-design.css';
import 'ant-design-vue/dist/antd.css';
import { getById } from '@/api/designer';
import { baseUrl } from '@/assets/js/base-url';
import { getdesFormList, getdesFormFields, addVariation, editUpdateAll, deleteById, selectById, excelImport } from '@/api/designerList';
import reqwest from 'reqwest';

const moduleColumns = [
    {
        title: '#',
        key: 'figure',
        align: 'center',
        width: 50
    },
    {
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        width: 180,
        scopedSlots: { customRender: 'operation' }
    }
];

const desData = [];
const moduleData = [
    // {
    //     key: '1',
    //     name: 'John Brown',
    //     age: 32,
    //     address: 'New York No. 1 Lake Park'
    // },
    // {
    //     key: '2',
    //     name: 'Jim Green',
    //     age: 42,
    //     address: 'London No. 1 Lake Park'
    // },
    // {
    //     key: '3',
    //     name: 'Joe Black',
    //     age: 32,
    //     address: 'Sidney No. 1 Lake Park'
    // },
    // {
    //     key: '4',
    //     name: 'Disabled User',
    //     age: 99,
    //     address: 'Sidney No. 1 Lake Park'
    // }
];
const seleItemList = [
    {
        title: '等于',
        value: 'eq'
    },
    {
        title: '包含',
        value: 'in'
    },
    {
        title: '以...开始',
        value: 'right_like'
    },
    {
        title: '以...结尾',
        value: 'left_like'
    },
    {
        title: '在...中',
        value: 'like'
    },
    {
        title: '不等于',
        value: 'ne'
    },
    {
        title: '大于',
        value: 'gt'
    },
    {
        title: '大于等于',
        value: 'ge'
    },
    {
        title: '小于',
        value: 'lt'
    },
    {
        title: '小于等于',
        value: 'le'
    }
];
const selModelForms = [
    {
        key: 1,
        rule: 'eq',
        type: 'input',
        value: undefined,
        title: '测试',
        field: undefined,
        enum: []
    }
];
const selectData = [];
const seleColumns = [
    {
        title: '保存的查询',
        dataIndex: 'saveSearch',
        scopedSlots: { customRender: 'name' }
    }
];
const seleData = [];

export default {
    data() {
        return {
            edLoading: false,
            edVisible: false,
            exameVisible: false,
            desData,
            addLoading: false,
            addvisible: false,
            fileLists: [],
            impLoading: false,
            impVisible: false,
            seleData,
            seleColumns,
            modelKeys: 1,
            selModelForms,
            superQueryMatch: 'and',
            seleItemList,
            seleVisible: false,
            seleLoading: false,
            moduleColumns,
            moduleData,
            modSelectedRowKeys: [],
            // json数据，用来在新增里展示组件
            jsonData: {
                list: [
                    {
                        options: {
                            minRows: 4,
                            maxRows: 6,
                            clearable: false,
                            hidden: false,
                            defaultValue: '',
                            width: '100%',
                            disabled: false,
                            placeholder: '请输入'
                        },
                        model: 'textarea_1611314577770',
                        rules: [
                            {
                                message: '必填项',
                                required: false
                            }
                        ],
                        label: '文本框',
                        type: 'textarea',
                        key: 'textarea_1611314577770'
                    },
                    {
                        options: {
                            hidden: false,
                            max: 5,
                            defaultValue: 3,
                            disabled: false,
                            allowHalf: false
                        },
                        model: 'rate_1611369199377',
                        rules: [
                            {
                                message: '必填项',
                                required: true
                            }
                        ],
                        label: '评分',
                        type: 'rate',
                        key: 'rate_1611369199377'
                    }
                ],
                config: {
                    layout: 'horizontal',
                    customStyle: '',
                    wrapperCol: {
                        xl: 18,
                        md: 18,
                        sm: 18,
                        xs: 18,
                        lg: 18,
                        xxl: 18
                    },
                    hideRequiredMark: false,
                    labelCol: {
                        xl: 4,
                        md: 4,
                        sm: 4,
                        xs: 4,
                        lg: 4,
                        xxl: 4
                    }
                }
            },
            // widgetData,
            condForm: {
                suited: ''
            },
            desFormTable: '',
            addModalTitle: '',
            formJson: '',
            showNull: false,
            addModalName: '',
            desPagination: {
                size: 'small',
                total: 100,
                current: 1,
                pageSize: 10,
                'show-size-changer': true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} 共 ${total} 条`
            },
            desFormTableData: '',
            tableRecords: '',
            edTableId: '',
            fatherFormId: '',
            selectData,
            tableLateLoading: false,
            exportNames: ''
        };
    },
    created() {
        console.log(this.$route.params);

        this.showNull = false;
        this.getByIdPort(this.$route.params);
        this.getFormTableTitle(this.$route.params.id);
        this.getFormJson();
    },
    methods: {
        modOnSelectChange(selectedRowKeys) {
            // console.log('selectedRowKeys changed: ', selectedRowKeys);
            this.modSelectedRowKeys = selectedRowKeys;
        },
        addFormFun() {
            this.setFormItemsDisable(false);
            this.addvisible = true;
        },
        getByIdPort(record) {
            getById({ id: record.id })
                .then((res) => {
                    console.log(res);
                    this.fatherFormId = res.result.id;
                    this.addModalTitle = res.result.name;
                    this.addModalName = res.result.tableName;
                    let sonTableData = JSON.parse(res.result.json);
                    this.jsonData.config = sonTableData.config;
                    this.jsonData.list = sonTableData.list;
                    this.formJson = res.result.json;
                    if (res.result.json) {
                        this.showNull = true;
                    }
                    // console.log(res);
                    this.getFormJson;
                })
                .catch((err) => {
                    console.log(err);
                    // this.$message.error(err);
                    this.showNull = false;
                });
        },
        getFormJson(page) {
            // if (this.formJson) {
            getdesFormList({
                pageNo: page == 1 ? 1 : this.desPagination.current,
                pageSize: this.desPagination.pageSize,
                formTableId: this.$route.params.id
                // queryId: 1
            })
                .then((res) => {
                    this.desFormTableData = res.result;
                    this.tableRecords = res.result.records;
                    let tableList = res.result.records;
                    let page = res.result;
                    this.desData = page?.records;
                    for (let index = 0; index < tableList.length; index++) {
                        tableList[index].figure = (index + 1).toString();
                        this.desData = tableList;
                    }

                    Object.assign(this.desPagination, {
                        current: page.current,
                        pageSize: page.size,
                        total: page.total
                    });
                    console.log(this.desPagination);
                })
                .catch((err) => {
                    console.log(err);
                    // this.$message.error(err);
                    // this.showNull = false;
                });
            // this.getFormTableTitle(this.$route.params.id);
            // }
        },
        // 高级查询模态框展示
        advancedSelect() {
            this.seleVisible = true;
        },
        // 高级查询模态框关闭按钮
        seleHandleCancel() {},
        // 确定按钮
        seleHandleOk() {
            this.seleLoading = true;
            this.tableLateLoading = true;
            console.log(this.selModelForms);
            if (!this.selModelForms[0].field || !this.selModelForms[0].value) {
                this.seleLoading = false;
                this.tableLateLoading = false;
                this.$message.warning('不能查询空条件！');
                return false;
            } else {
                setTimeout(() => {
                    this.seleLoading = false;
                    this.tableLateLoading = false;

                    this.getFormJson(1);
                }, 500);
            }
        },
        addQuerys() {
            this.selModelForms.push({
                key: this.modelKeys + 1,
                rule: 'eq',
                type: 'text',
                val: undefined,
                field: undefined,
                enum: []
            });
            this.modelKeys = this.modelKeys + 1;
        },
        subQuerys(key) {
            let list = [];
            if (this.selModelForms.length <= 1) {
                this.$message.error('必须存在一条数据');
                return false;
            }
            this.selModelForms.map((item) => {
                if (item.key != key) {
                    list.push(item);
                }
            });
            this.selModelForms = list;
            console.log(list);
        },
        Resets() {
            let list = [
                {
                    key: 1,
                    rule: 'eq',
                    type: 'text',
                    val: undefined,
                    field: undefined
                }
            ];
            this.selModelForms = list;
        },
        impHandleCancel() {
            this.impVisible = false;
        },
        impBeforeUpload(file) {
            console.log(file);
            this.fileLists = [...this.fileLists, file];
            return false;
        },

        impHandleOk() {
            const { fileLists } = this;

            console.log(fileLists[0]);
            const formData = new FormData();
            formData.append('file', fileLists[0]);
            formData.append('formTableId', this.$route.params.id);

            this.impLoading = true;

            excelImport(formData)
                .then((res) => {
                    console.log(res);
                    this.fileLists = [];
                    this.impLoading = false;
                    this.$message.success('导入成功');
                    this.impVisible = false;
                    this.getFormJson();
                })
                .catch((e) => {
                    this.$message.error('error:', e);
                    this.impLoading = false;
                });
        },
        uploadModal() {
            this.impVisible = true;
        },
        impHandleRemove(file) {
            const index = this.fileLists.indexOf(file);
            const newFileList = this.fileLists.slice();
            newFileList.splice(index, 1);
            this.fileLists = newFileList;
        },

        getFormTableTitle(id) {
            getdesFormFields({ formTableId: id })
                .then((res) => {
                    console.log(res);
                    this.exportNames = res.result.tableName;
                    this.moduleColumns = [
                        {
                            title: '#',
                            key: 'figure',
                            align: 'center',
                            width: 50
                        },
                        {
                            title: '操作',
                            dataIndex: 'operation',
                            align: 'center',
                            width: 180,
                            scopedSlots: { customRender: 'operation' }
                        }
                    ];
                    this.desFormTable = res.result;
                    let columnsList = res.result.columns;
                    for (let index = 0; index < columnsList.length; index++) {
                        columnsList[index].title = columnsList[index].label;
                        columnsList[index].align = 'center';
                        columnsList[index].value = columnsList[index].key;
                        this.moduleColumns.splice(1, 0, columnsList[index]);
                    }
                    this.selectData = columnsList;

                    console.log(columnsList);
                })
                .catch((err) => {
                    console.log(err);
                    // this.$message.error(err);
                });
        },
        addHandleCancel() {
            this.addvisible = false;
        },
        // 新增表单确定按钮事件
        addHandleOk() {
            // 使用getData函数获取数据
            this.$refs.kfb
                .getData()
                .then((values) => {
                    console.log('验证通过', values);
                    values.tableName = this.addModalName;
                    // if (values.) {

                    // }
                    addVariation(values)
                        .then((res) => {
                            // console.log(res);
                            this.addvisible = false;
                            this.getFormJson();
                        })
                        .catch((err) => {
                            console.log(err);
                            this.$message.error(err);
                        });
                })
                .catch(() => {
                    console.log('验证未通过，获取失败');
                });
        },
        examine(record) {
            this.exameVisible = true;
            console.log(record);
            console.log(this.jsonData.list);
            this.setFormItemsDisable(true);

            selectById({ formTableId: this.fatherFormId, tableId: record.id })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                    // this.$message.error(err);
                });

            setTimeout(() => {
                this.$refs.kfb.setData(record);
            }, 200);
        },
        setFormItemsDisable(flag) {
            let exaJsonData = this.jsonData.list;
            exaJsonData.forEach((t) => {
                t.options.disabled = flag;
            });
        },
        edClick(record) {
            this.edTableId = record.id;
            this.edVisible = true;
            this.setFormItemsDisable(false);
            setTimeout(() => {
                this.$refs.kfb.setData(record);
            }, 200);
        },
        edHandleCancel() {
            this.edVisible = false;
        },
        edHandleOk() {
            this.$refs.kfb
                .getData()
                .then((values) => {
                    console.log('验证通过', values);
                    values.tableName = this.addModalName;
                    values.id = this.edTableId;
                    editUpdateAll(values)
                        .then((res) => {
                            this.edVisible = false;
                            this.getFormJson();
                        })
                        .catch((err) => {
                            console.log(err);
                            this.$message.error(err);
                        });
                })
                .catch(() => {
                    console.log('验证未通过，获取失败');
                });
        },
        deleteFormTable(e, record) {
            deleteById({ formTableId: this.fatherFormId, ids: record.id })
                .then((res) => {
                    if (this.desData.length == 1) {
                        this.getFormJson(this.desPagination.current == 1 ? 1 : this.desPagination.current - 1);
                    } else {
                        this.getFormJson();
                    }
                })
                .catch((err) => {
                    console.log(err);
                    // this.$message.error(err);
                });
        },
        // 获取当前选择框的选项值（下拉框值）
        // getExpertSelect() {
        //     selectValue({ tableName: this.addModalName })
        //         .then((res) => {
        //             console.log(res);
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //             this.$message.error(err);
        //         });
        // }
        vzfbvz(value, label, extra) {
            console.log(value, label, extra);
        },
        // 表格分页
        tableOnChange(pageNumber) {
            let pager = this.desPagination;
            pager.current = pageNumber.current;
            this.desPagination = pager;
            this.getFormJson();
        },
        // 导出
        exportExcel() {
            var link = document.createElement('a');
            link.href = baseUrl + 'formTable/base/excelExport?formTableId=' + this.$route.params.id + '&exportName=' + this.exportNames + '&pageSize=' + this.desPagination.pageSize + '&pageNo=' + this.desPagination.current;
            link.click();
        },
        // 刷新
        refresh() {
            console.log(11);
            this.tableLateLoading = true;
            setTimeout(() => {
                this.tableLateLoading = false;
            }, 500);
            this.getFormJson();
        }
    }
};
</script>
<style lang="less">
.cutLines {
    color: #e8e8e8;
}
.btnGather {
    margin-bottom: 8px;
    .btn {
        margin: 0 8px 8px 0;
    }
}
.vessel {
    display: flex;
    justify-content: space-between;
    padding: 8px 25px 8px 14px;
    border-radius: 4px;
    height: 40px;
    line-height: 22px;
    background-color: #e6f7ff;
    border: 1px solid #91d5ff;
    margin-bottom: 16px;
}
.text {
    margin-left: 8px;
    color: #000000d9;
}
.wire {
    display: inline-block;
    width: 1px;
    height: 14px;
    margin: 0 8px;
    background-color: #e8e8e8;
    vertical-align: -3px;
}
#seleModal {
    .seleContent {
        display: flex;
    }
    .contleft {
        width: 754px;
    }
    .ant-form-item label {
        font-size: 12px;
    }
    .ant-form-item {
        margin-bottom: 12px;
    }
    .ant-modal-body {
        min-height: 200px;
    }
    .addRow {
        width: 32px;
        margin-right: 8px;
        margin-left: 4px;
        margin-bottom: 4px;
        vertical-align: middle;
        padding: 0;
    }
    .subtract {
        width: 32px;
        margin-bottom: 4px;
        vertical-align: middle;
        padding: 0;
    }
    .contright {
        width: 198px;
        .ant-empty-normal {
            margin: 0;
        }
        .ant-table-thead > tr > th {
            font-size: 16px;
            padding: 4px 0;
        }
    }
    .footer-btn {
        width: 965px;
        display: flex;
        justify-content: space-between;
    }
}
#addModal {
    .footerBtn {
        width: 136px;
        margin: 0 auto;
    }
}
#edModal {
    .edFooter {
        width: 136px;
        margin: 0 auto;
    }
}
</style>

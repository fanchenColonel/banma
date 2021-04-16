<template>
    <div id="modal">
        <a-modal v-model="isShow" title="新增" width="100%" :bodyStyle="{ height: 'calc(100vh - 108px' }" :dialogStyle="dialogStyle" 
            okText="确认" cancelText="取消"
            @ok="handleOk"
            @cancel="handleCancel"
        >
            <div class="formBox">
                <a-form :form="form" labelAlign="right" :labelCol="{ span: 4 }" :wrapperCol="{ span: 19 }">
                    <a-row class="formRow">
                        <a-col :span="8">
                            <a-form-item label="编码">
                                <a-input
                                    ref="code"
                                    placeholder="请输入编码"
                                    v-decorator="[
                                        'code',
                                        {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Input something!'
                                                }
                                            ]
                                        }
                                    ]"
                                />                      
                            </a-form-item>
                        </a-col>
                        <a-col :span="8">
                            <a-form-item class="formItem" label="名称">
                                <a-input
                                    placeholder="请输入名称"
                                    v-decorator="[
                                        'name',
                                        {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Input something!'
                                                }
                                            ]
                                        }
                                    ]"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span="8">
                            <a-form-item class="formItem" label="数据源">
                                <a-select show-search placeholder="请选择数据源" option-filter-prop="children" :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur" @change="handleChange">
                                    <a-select-option value="null">
                                        请选择
                                    </a-select-option>
                                    <a-select-option value="MySQL5.7">
                                        MySQL5.7
                                    </a-select-option>
                                    <a-select-option value="SqlserverMac">
                                        SqlserverMac
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row class="formRow">
                        <a-col :span="21">
                            <a-form-item class="formItem" label="报表sql" :labelCol="{ span: 2 }" :wrapperCol="{ span: 22 }" :required="true">
                                <v-code-mirror @getVal="getCode"></v-code-mirror>
                            </a-form-item>
                        </a-col>
                        <a-col :span="3" class="analysisBtn">
                            <a-space size="middle">
                                <a-popover placement="bottom">
                                    <template slot="content">
                                        <p>Content</p>
                                        <p>Content</p>
                                    </template>
                                    <template slot="title">
                                        <span>Title</span>
                                    </template>
                                    <a-icon type="question-circle" />
                                </a-popover>
                                <a-button type="primary" @click="analysisSql">SQL 解析</a-button>
                            </a-space>
                        </a-col>
                    </a-row>
                </a-form>
            </div>

            <div class="tabsBox">
                <a-tabs default-active-key="1" @change="callback">
                    <a-tab-pane key="1" tab="动态报表配置明细">
                        <v-config-table></v-config-table>
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="报表参数" force-render>
                        <v-params-table></v-params-table>
                    </a-tab-pane>
                </a-tabs>
            </div>
        </a-modal>
    </div>
</template>
<script>
import CodeMirror from '../../../components/codeMirror';
import ConfigTable from './configTable';
import ParamsTable from './paramsTable';
import {getSql,addStatement} from "../../../api/reportConfig"
export default {
    components: {
        'v-code-mirror': CodeMirror,
        'v-config-table': ConfigTable,
        'v-params-table': ParamsTable
    },
    data() {
        return {
            sqlcode:"",
            // 其他配置
            form: this.$form.createForm(this),
            isShow: false,
            dialogStyle: {
                height: '100%',
                top: 0,
                flex: 1,
                padding: 0,
                'min-width': '1200px'
            }
        };
    },
    methods: {
        handleOk(){
            let code = this.$refs.code.value
            let name = this.form.getFieldValue("name")
            let cgrSql = this.sqlcode
            let head = {code,name,cgrSql}
            let paramName = "sex";
            let paramTxt = "man";
            let paramValue = "ss";
            var orderNum = 1;
            let params = [{paramName,paramTxt,paramValue,orderNum}]
            var orderNum = 1;
            let fieldName = 'fieldName';
            let fieldTxt = "fieldTxt";
            let fieldType = "String";
            let isShow = '1';
            let searchMode = "searchMode";
            let replaceVal = "replaceVal";
            let dictCode = "dictCode";
            let isSearch = "1";
            let fieldHref = "fieldHref";
            let groupTitle = "groupTitle";
            let isTotal = "isTotal"
            let items = [{fieldName,fieldTxt,fieldType,isShow,searchMode,replaceVal,dictCode,isSearch,fieldHref,groupTitle,isTotal}]
            // 新增报表数据
            addStatement({head,params,items}).then(res=>{
                console.log(res)
            })
            this.isShow = false
        },
        handleCancel(){
            this.isShow = false
        },
        // 解析SQL
        analysisSql(){
            getSql(this.sqlcode).then(res=>{
                console.log(res)
            })
            // console.log(this.$refs.code.value,"code")
            // console.log(this.form.getFieldValue("name"),"name") 
        },
        getvalue(){
            // console.log(this.form,"this.form")
            // console.log(this.form.getFieldValue("code"),"code") 
        },
        callback() {
            
        },

        show() {
            this.isShow = true;
        },
        hide() {
            this.isShow = false;
        },
        // 数据源选择
        handleChange(value) {
            
        },
        handleBlur() {
            
        },
        handleFocus() {
            
        },
        filterOption(input, option) {
            return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        },
        // 在线代码编辑器
        getCode(val) {
            this.sqlcode = val;
            // console.log(val,"getcode")
        }
    }
};
</script>
<style lang="less">
.ant-modal-content {
    border-radius: 0;
}

.formBox {
    padding: 10px 80px;
    .formRow {
        &:first-child {
            border: 1px solid transparent;
            border-bottom-color: #ccc;
            box-sizing: border-box;
            padding-bottom: 10px;
        }
        &:last-child {
            padding: 10px 0;
            border: 1px solid transparent;
            border-bottom-color: #ccc;
            box-sizing: border-box;
        }

        .formItem {
            margin-bottom: 0px !important;
        }

        .analysisBtn {
            padding-left: 10px;
        }
    }
}
</style>

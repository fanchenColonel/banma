<template>
    <div id="modal">
        <a-modal v-model="isShow" title="新增" width="100%" :bodyStyle="{ height: 'calc(100vh - 108px' }" :dialogStyle="dialogStyle" okText="确认" cancelText="取消">
            <div class="formBox">
                <a-form :form="form" labelAlign="right" :labelCol="{ span: 4 }" :wrapperCol="{ span: 19 }">
                    <a-row class="formRow">
                        <a-col :span="8">
                            <a-form-item label="编码">
                                <a-input
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
                                <a-button type="primary">SQL 解析</a-button>
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
export default {
    components: {
        'v-code-mirror': CodeMirror,
        'v-config-table': ConfigTable,
        'v-params-table': ParamsTable
    },
    data() {
        return {
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

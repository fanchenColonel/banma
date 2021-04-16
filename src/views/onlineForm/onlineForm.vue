<template>
    <div id="about">
        <!-- 查询 -->
        <div class="header-search">
            <div class="table-left">
                <label for>表名:</label>
                <a-input placeholder="请输入表名" class="table-name" v-model="searchData.tableName" />
            </div>
            <div class="table-middle">
                <label for>表类型:</label>
                <a-select placeholder="请选择" class="table-type" allow-clear v-model="searchData.tableType">
                    <a-select-option value="1">单表</a-select-option>
                    <a-select-option value="2">主表</a-select-option>
                    <a-select-option value="3">附表</a-select-option>
                </a-select>
            </div>
            <div class="table-right">
                <label for>表描述:</label>
                <a-input class="table-describe" placeholder="请输入表描述" v-model="searchData.tableTxt" />
            </div>
            <div class="button">
                <a-button type="primary" icon="search" @click="getTemplateList(1)">查询</a-button>
                <a-button type="primary" icon="reload" @click="restTempPage">重置</a-button>
                <a-button type="primary" icon="filter" @click="advancedSearch">高级查询</a-button>
            </div>
        </div>
        <!-- 按钮合集 -->
        <div class="table-operator">
            <a-button type="primary" class="btn" icon="plus" @click="showModal">新增</a-button>
            <a-button type="primary" class="btn" icon="highlight" @click="ctmBtn">自定义按钮</a-button>
            <a-button type="primary" class="btn" icon="api" @click="jsEnhance">JS增强</a-button>
            <a-button type="primary" class="btn" icon="api" @click="sqlEnhance">SQL增强</a-button>
            <a-button type="primary" class="btn" icon="tool" @click="javaEnhance">JAVA增强</a-button>
            <a-button type="primary" class="btn" icon="hdd" @click="databaseModal">导入数据库表</a-button>
            <a-button type="primary" class="btn" icon="file" @click="codeCreate">代码生成</a-button>
            <a-dropdown v-if="this.selectedRowKeys.length > 0">
                <a-button type="primary" class="btn btn-operation" @click="(e) => e.preventDefault()">
                    批量操作
                    <a-icon type="down" />
                </a-button>
                <a-menu slot="overlay" class="btn-del">
                    <a-menu-item @click="showConfirm"> <a-icon type="delete" />删除 </a-menu-item>
                </a-menu>
            </a-dropdown>
            <!-- 新增模态框 -->
            <a-modal id="about-modal" v-model="visible" :title="editStatus == true ? '修改' : '新增'" @ok="addHandleOk" @cancel="addHandleCancel" width="100%" okText="确定" cancelText="取消" style="top: 0; height: 100%" :bodyStyle="addBodyStyle" :dialogStyle="addDialogStyle">
                <div class="model-content">
                    <a-form-model class="ant-advanced-search-form" :model="head" ref="headForm" :rules="headRules" @submit.native.prevent :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                        <a-row :gutter="24">
                            <a-col :span="8">
                                <a-form-model-item label="表名" prop="tableName">
                                    <a-input placeholder="请输入表名" v-model="head.tableName" :read-only="editStatus" />
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-model-item label="表描述" prop="tableTxt">
                                    <a-input placeholder="请输入表描述" v-model="head.tableTxt" />
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="8" style="padding-bottom: 0">
                                <a-form-model-item label="表类型">
                                    <a-select v-model="head.tableType" @change="changeHeadTableType">
                                        <a-select-option :value="1">单表</a-select-option>
                                        <a-select-option :value="2">主表</a-select-option>
                                        <a-select-option :value="3">附表</a-select-option>
                                    </a-select>
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="17" v-if="head.tableType == 3" style="padding-top: 0"></a-col>
                            <a-col :span="4" v-if="head.tableType == 3" style="padding-top: 0">
                                <a-form-model-item>
                                    <a-radio-group v-model="head.relationType" style="font-size: 12px">
                                        <a-radio :value="0">一对多</a-radio>
                                        <a-radio :value="1">一对一</a-radio>
                                    </a-radio-group>
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="3" v-if="head.tableType == 3" style="padding-top: 0">
                                <a-form-model-item label="序号" prop="tabOrderNum">
                                    <a-input-number id="inputNumber" v-model="head.tabOrderNum" :min="1" style="width: 100%" />
                                </a-form-model-item>
                            </a-col>
                        </a-row>
                        <a-row :gutter="24" class="border-top-e8e8e8">
                            <a-col :span="8">
                                <a-form-model-item label="表单分类">
                                    <a-select v-model="head.formCategory" class="noChoose">
                                        <a-select-option v-for="item in formCategoryList" :key="item.value" :value="item.value">{{ item.text }}</a-select-option>
                                    </a-select>
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-model-item label="主键策略">
                                    <a-select :default-value="'UUID'" v-model="head.idType">
                                        <a-select-option :value="'UUID'">ID_WORKER(分布式自增)</a-select-option>
                                    </a-select>
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-model-item label="查询模式">
                                    <a-select :default-value="'single'" v-model="head.queryMode">
                                        <a-select-option :value="'single'">单表查询</a-select-option>
                                        <a-select-option :value="'group'">组合查询</a-select-option>
                                    </a-select>
                                </a-form-model-item>
                            </a-col>
                        </a-row>
                        <a-row :gutter="24" class="border-top-e8e8e8">
                            <a-col :span="8">
                                <a-form-model-item label="主体模板">
                                    <a-select :default-value="'normal'" v-model="head.themeTemplate">
                                        <a-select-option :value="'normal'">默认主题</a-select-option>
                                        <a-select-option :value="'erp'">ERP主题</a-select-option>
                                        <a-select-option :value="'embedded'">内嵌子表主题</a-select-option>
                                        <a-select-option :value="'tab'">TAB主题</a-select-option>
                                    </a-select>
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-model-item label="表单风格">
                                    <a-select :default-value="'1'" v-model="head.formTemplate">
                                        <a-select-option :value="'1'">一列</a-select-option>
                                        <a-select-option :value="'2'">二列</a-select-option>
                                        <a-select-option :value="'3'">三列</a-select-option>
                                        <a-select-option :value="'4'">四列</a-select-option>
                                    </a-select>
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-model-item label="滚动条">
                                    <a-select :default-value="'Y'" v-model="head.scroll">
                                        <a-select-option :value="'Y'">有</a-select-option>
                                        <a-select-option :value="'N'">无</a-select-option>
                                    </a-select>
                                </a-form-model-item>
                            </a-col>
                        </a-row>
                        <a-row :gutter="24" class="border-top-e8e8e8">
                            <a-col :span="8">
                                <a-form-model-item label="显示复选框">
                                    <a-select :default-value="'Y'" v-model="head.isCheckbox">
                                        <a-select-option :value="'Y'">是</a-select-option>
                                        <a-select-option :value="'N'">否</a-select-option>
                                    </a-select>
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-model-item label="是否分页">
                                    <a-select :default-value="'Y'" v-model="head.isPage">
                                        <a-select-option :value="'Y'">是</a-select-option>
                                        <a-select-option :value="'N'">否</a-select-option>
                                    </a-select>
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-model-item label="是否树">
                                    <a-select :default-value="'N'" v-model="head.isTree" @change="changeIsTree">
                                        <a-select-option :value="'Y'">是</a-select-option>
                                        <a-select-option :value="'N'">否</a-select-option>
                                    </a-select>
                                </a-form-model-item>
                            </a-col>
                        </a-row>
                        <a-row :gutter="24" class="border-top-e8e8e8" v-if="head.isTree == 'Y'">
                            <a-col :span="8">
                                <a-form-model-item label="树表单父ID" prop="treeParentIdField">
                                    <a-input placeholder="请输入树表单父ID" v-model="head.treeParentIdField" />
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-model-item label="树开表单列" prop="treeFieldname">
                                    <a-input placeholder="请输入树开表单列字段名" v-model="head.treeFieldname" />
                                </a-form-model-item>
                            </a-col>
                        </a-row>
                    </a-form-model>
                </div>
                <div class="model-footer">
                    <div class="nav-ul">
                        <a-tabs default-active-key="1" @change="callback">
                            <a-tab-pane key="1" tab="数据库属性">
                                <div class="opabtn">
                                    <a-button type="primary" icon="plus" class="btnn" @click="addOneRow">新增</a-button>
                                    <a-button type="primary" icon="minus" class="btnn" v-if="addSelectedRowKeys.length > 0" @click="delAddRows">删除</a-button>
                                    <a-button type="primary" icon="delete" class="delbtn" v-if="addSelectedRowKeys.length > 0" @click="clearSelectKeys">清空选择</a-button>
                                </div>
                                <!-- 表格 -->
                                <div class="dataTable">
                                    <a-table :row-selection="rowSelection" :columns="addColumns1" :data-source="fields" :pagination="false" :scroll="{ y: 324 }" border="1" cellspacing="1" cellpadding="1" style="border: solid thin #e8e8e8" size="small">
                                        <template slot="dbType" slot-scope="text, record">
                                            <div>
                                                <a-select placeholder="请选择字段" :value="text" style="width: 100%" :disabled="record.dbFieldName == 'id' ? true : false" @change="(e) => handleSelectChange(e, record.id, 'dbType')" allowClear>
                                                    <a-select-option :key="'1'" :value="'String'">String</a-select-option>
                                                    <a-select-option :key="'2'" :value="'int'">Integer</a-select-option>
                                                    <a-select-option :key="'3'" :value="'double'">Double</a-select-option>
                                                    <a-select-option :key="'4'" :value="'Date'">Date</a-select-option>
                                                    <a-select-option :key="'5'" :value="'BigDecimal'">BigDecimal</a-select-option>
                                                    <a-select-option :key="'6'" :value="'Text'">Text</a-select-option>
                                                    <a-select-option :key="'7'" :value="'Blob'">Blob</a-select-option>
                                                </a-select>
                                            </div>
                                        </template>
                                        <template v-for="col in textFields" :slot="col.name" slot-scope="text, record">
                                            <div :key="col.name">
                                                <a-checkbox :checked="text == 'N' || text == 0 ? false : true" v-if="col.type == 'checkBox'" @change="(e) => handleChange(e.target.checked, record.id, col.name)" :disabled="record.dbFieldName == 'id' ? true : false"></a-checkbox>
                                                <a-input v-if="col.type == 'input' && col.name !== 'dbFieldName' && col.name !== 'dbFieldTxt'" style="margin: -50px 0" :value="text" :placeholder="col.tip" @change="(e) => handleChange(e.target.value, record.id, col.name)" :disabled="record.dbFieldName == 'id' ? true : false"></a-input>
                                                <!-- 字段备注 -->
                                                <a-tooltip
                                                    v-if="col.name == 'dbFieldTxt'"
                                                    v-model="record.dbFieldTxt_clicked"
                                                    @visibleChange="
                                                        (visible) => {
                                                            (text == null || text.length == 0) && visible ? (record.dbFieldTxt_clicked = true) : (record.dbFieldTxt_clicked = false);
                                                        }
                                                    "
                                                >
                                                    <template slot="title"> 字段备注不能为空 </template>
                                                    <a-input :class="text == null || text.length == 0 ? 'hint' : ''" style="margin: -50px 0" :value="text" :placeholder="col.tip" @change="(e) => handleChange(e.target.value, record.id, col.name)" :disabled="record.dbFieldName == 'id' ? true : false"></a-input>
                                                </a-tooltip>
                                                <!-- 字段名称 -->
                                                <a-tooltip
                                                    v-if="col.name == 'dbFieldName'"
                                                    v-model="record.dbFieldName_clicked"
                                                    @visibleChange="
                                                        (visible) => {
                                                            (text == null || text.length == 0 || record.dbFielNameChecked || record.dbFielNameCheck) && visible ? (record.dbFieldName_clicked = true) : (record.dbFieldName_clicked = false);
                                                        }
                                                    "
                                                >
                                                    <template slot="title"> {{ record.dbFielNameCheck ? text + '是关键字，不能作为字段名称使用' : record.dbFielNameChecked ? text + '已存在，不能重复使用' : text == null || text.length == 0 ? '字段名不能为空' : '' }} </template>
                                                    <a-input :class="text == null || text.length == 0 || record.dbFielNameChecked || record.dbFielNameCheck ? 'hint' : ''" style="margin: -50px 0" :value="text" :placeholder="col.tip" @change="(e) => handleChange(e.target.value, record.id, col.name)" :disabled="record.dbFieldName == 'id' ? true : false"></a-input>
                                                </a-tooltip>
                                            </div>
                                        </template>
                                    </a-table>
                                </div>
                            </a-tab-pane>
                            <a-tab-pane key="2" tab="页面属性" force-render>
                                <div class="dataTable">
                                    <a-table :columns="addColumns2" :data-source="fields" :pagination="false" :scroll="{ y: 374 }" border="1" cellspacing="1" cellpadding="1" style="border: solid thin #e8e8e8" size="small">
                                        <template slot="fieldShowType" slot-scope="text, record">
                                            <div>
                                                <a-tooltip
                                                    v-model="record.fieldShowType_clicked"
                                                    @visibleChange="
                                                        (visible) => {
                                                            record.fieldShowTypeCheck && visible ? (record.fieldShowType_clicked = true) : (record.fieldShowType_clicked = false);
                                                        }
                                                    "
                                                >
                                                    <template slot="title"> 当控件类型为日期时，数据库属性里的字段类型必须为Date </template>
                                                    <a-select :class="record.fieldShowTypeCheck ? 'hint' : ''" placeholder="请选择控件类型" :value="text" style="width: 100%" :disabled="record.dbFieldName == 'id' ? true : false" @change="(e) => handleSelectChange(e, record.id, 'fieldShowType')" allowClear>
                                                        <a-select-option v-for="item in fieldShowTypeList" :title="item.text" :key="item.value" :value="item.value">{{ item.text }}</a-select-option>
                                                    </a-select>
                                                </a-tooltip>
                                            </div>
                                        </template>
                                        <template slot="queryMode" slot-scope="text, record">
                                            <div>
                                                <a-select placeholder="请选择查询类型" :value="text" style="width: 100%" :disabled="record.dbFieldName == 'id' ? true : false" @change="(e) => handleSelectChange(e, record.id, 'queryMode')" allowClear>
                                                    <a-select-option :key="'1'" :value="'single'">普通查询</a-select-option>
                                                    <a-select-option :key="'2'" :value="'group'">范围查询</a-select-option>
                                                </a-select>
                                            </div>
                                        </template>
                                        <template v-for="col in textFields" :slot="col.name" slot-scope="text, record">
                                            <div :key="col.name">
                                                <a-checkbox 
                                                    :checked="text == 'N' || text == 0 ? false : true" 
                                                    v-if="col.type == 'checkBox'" @change="(e) => handleChange(e.target.checked, record.id, col.name)" 
                                                    :disabled="record.dbFieldName == 'id' ? true : false"
                                                ></a-checkbox>
                                                <a-input v-if="col.type == 'input'" 
                                                    style="margin: -50px 0" 
                                                    :value="text" 
                                                    :placeholder="col.tip" 
                                                    @change="(e) => handleChange(e.target.value, record.id, col.name)" 
                                                    :disabled="record.dbFieldName == 'id' || col.name == 'dbFieldName' || col.name == 'dbFieldTxt' ? true : false"
                                                > </a-input>
                                            </div>
                                        </template>
                                    </a-table>
                                </div>
                            </a-tab-pane>
                            <a-tab-pane key="3" tab="校验字段">
                                <div class="dataTable">
                                    <a-table :columns="addColumns3" :data-source="fields" :pagination="false" :scroll="{ y: 374 }" border="1" cellspacing="1" cellpadding="1" style="border: solid thin #e8e8e8" size="small">
                                        <template slot="fieldValidType" slot-scope="text, record">
                                            <div>
                                                <a-select placeholder="" :value="text" style="width: 100%" :disabled="record.dbFieldName == 'id' ? true : false" @change="(e) => handleSelectChange(e, record.id, 'fieldValidType')" allowClear>
                                                    <a-select-option v-for="item in fieldValidTypeList" :title="item.text" :key="item.value" :value="item.value">{{ item.text }}</a-select-option>
                                                </a-select>
                                            </div>
                                        </template>
                                        <template v-for="col in textFields" :slot="col.name" slot-scope="text, record">
                                            <div :key="col.name" class="father">
                                                <a-checkbox :checked="text == 'N' || text == 0 ? false : true" v-if="col.type == 'checkBox'" @change="(e) => handleChange(e.target.checked, record.id, col.name)" :disabled="record.dbFieldName == 'id' ? true : false"></a-checkbox>
                                                <a-input v-if="col.type == 'input'" style="margin: -50px 0" :value="text" :placeholder="col.tip" @change="(e) => handleChange(e.target.value, record.id, col.name)" :disabled="record.dbFieldName == 'id' || col.name == 'dbFieldName' || col.name == 'dbFieldTxt' ? true : false"> </a-input>

                                                <a-popover placement="right" v-if="col.type == 'input' && col.name == 'dictTable'" trigger="click" v-model="record.clicked">
                                                    <template slot="content">
                                                        <a-textarea
                                                            style="width: 300px; height: 210px"
                                                            :rows="4"
                                                            :value="text"
                                                            @change="
                                                                (e) => {
                                                                    record.dictTable = e.target.value;
                                                                }
                                                            "
                                                        />
                                                    </template>
                                                    <template slot="title">
                                                        <div :style="{ textAlign: 'right' }">
                                                            <a-icon
                                                                :style="{ cursor: 'pointer' }"
                                                                @click="
                                                                    () => {
                                                                        record.clicked = false;
                                                                    }
                                                                "
                                                                type="close"
                                                            />
                                                        </div>
                                                    </template>
                                                    <a-icon type="fullscreen" class="fullscreen" />
                                                </a-popover>
                                            </div>
                                        </template>
                                    </a-table>
                                </div>
                            </a-tab-pane>
                            <a-tab-pane key="4" tab="外键">
                                <div class="dataTable">
                                    <a-table :columns="addColumns4" :data-source="fields" :pagination="false" :scroll="{ y: 374 }" border="1" cellspacing="1" cellpadding="1" style="border: solid thin #e8e8e8" size="small">
                                        <template v-for="col in textFields" :slot="col.name" slot-scope="text, record">
                                            <div :key="col.name">
                                                <a-checkbox :checked="text == 'N' || text == 0 ? false : true" v-if="col.type == 'checkBox'" @change="(e) => handleChange(e.target.checked, record.id, col.name)" :disabled="record.dbFieldName == 'id' ? true : false"></a-checkbox>
                                                <a-input v-if="col.type == 'input'" style="margin: -50px 0" :value="text" :placeholder="col.tip" @change="(e) => handleChange(e.target.value, record.id, col.name)" :disabled="record.dbFieldName == 'id' || col.name == 'dbFieldName' || col.name == 'dbFieldTxt' ? true : false"></a-input>
                                            </div>
                                        </template>
                                    </a-table>
                                </div>
                            </a-tab-pane>
                            <a-tab-pane key="5" tab="索引">
                                <div class="opabtn">
                                    <a-button type="primary" icon="plus" class="btnn" @click="addIndexRow">新增</a-button>
                                    <a-button type="primary" icon="minus" class="btnn" v-if="indexSelectedRowKeys.length > 0" @click="delIndexRows">删除</a-button>
                                </div>
                                <div class="dataTable">
                                    <a-table
                                        :row-selection="{
                                            selectedRowKeys: this.indexSelectedRowKeys,
                                            onChange: (selectedRowKeys, selectedRows) => {
                                                this.indexSelectedRowKeys = selectedRowKeys;
                                            }
                                        }"
                                        :columns="addColumns5"
                                        :data-source="indexs"
                                        :pagination="false"
                                        :scroll="{ y: 374 }"
                                        border="1"
                                        cellspacing="1"
                                        cellpadding="1"
                                        style="border: solid thin #e8e8e8"
                                        size="small"
                                    >
                                        <template slot="indexType" slot-scope="text, record">
                                            <div>
                                                <a-select placeholder="请选择索引类型" :value="text" style="width: 100%" @change="(e) => handleIndexSelectChange(e, record.key, 'indexType')" allowClear>
                                                    <a-select-option key="normal" :value="'normal'">normal</a-select-option>
                                                    <a-select-option key="unique" :value="'unique'">unique</a-select-option>
                                                </a-select>
                                            </div>
                                        </template>
                                        <template slot="indexField" slot-scope="text, record">
                                            <div>
                                                <a-select :maxTagCount="1" mode="multiple" placeholder="请选择索引栏位" :value="text == '' ? [] : typeof text == 'string' ? text.split(',') : text" style="width: 100%" @change="(e) => handleIndexSelectChange(e, record.key, 'indexField')" allowClear>
                                                    <a-select-option v-for="item in fields" :key="item.key" :value="item.dbFieldName">{{ item.dbFieldName }}</a-select-option>
                                                </a-select>
                                            </div>
                                        </template>
                                        <template slot="indexName" slot-scope="text, record">
                                            <div>
                                                <a-input style="margin: -50px 0" :value="text" placeholder="请输入索引名称" @change="(e) => handleIndexChange(e.target.value, record.key, 'indexName')"></a-input>
                                            </div>
                                        </template>
                                    </a-table>
                                </div>
                            </a-tab-pane>
                            <a-tab-pane key="6" tab="查询配置">
                                <div class="dataTable">
                                    <a-table :columns="addColumns6" :data-source="fields" :pagination="false" :scroll="{ y: 374 }" border="1" cellspacing="1" cellpadding="1" style="border: solid thin #e8e8e8" size="small">
                                        <template slot="queryShowType" slot-scope="text, record">
                                            <div>
                                                <a-select placeholder="请选择控件类型" :value="text" style="width: 100%" :disabled="record.dbFieldName == 'id' ? true : false" @change="(e) => handleSelectChange(e, record.id, 'queryShowType')" allowClear>
                                                    <a-select-option v-for="item in queryShowTypeList" :title="item.text" :key="item.value" :value="item.value">{{ item.text }}</a-select-option>
                                                </a-select>
                                            </div>
                                        </template>
                                        <template v-for="col in textFields" :slot="col.name" slot-scope="text, record">
                                            <div :key="col.name">
                                                <a-checkbox :checked="text == 'N' || text == 0 ? false : true" v-if="col.type == 'checkBox'" @change="(e) => handleChange(e.target.checked, record.id, col.name)" :disabled="record.dbFieldName == 'id' ? true : false"></a-checkbox>
                                                <a-input v-if="col.type == 'input'" style="margin: -50px 0" :value="text" :placeholder="col.tip" @change="(e) => handleChange(e.target.value, record.id, col.name)" :disabled="record.dbFieldName == 'id' || col.name == 'dbFieldName' || col.name == 'dbFieldTxt' ? true : false"></a-input>
                                            </div>
                                        </template>
                                    </a-table>
                                </div>
                            </a-tab-pane>
                        </a-tabs>
                    </div>
                </div>
            </a-modal>
        </div>
        <!-- 已选项统计 -->
        <div class="total">
            <span>
                <template>{{ `已选择 ${selectedRowKeys.length} 项` }}</template>
            </span>
            <a href="javascript:;" class="dele" type="primary" :disabled="!hasSelected" :loading="loading" @click="start">清空</a>
        </div>
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
                :pagination="pagination"
                @change="handlSearchPage"
                :loading="templateLoading"
                rowKey="id"
            >
                <template slot="key" slot-scope="text, record, index">
                    <div>
                        {{ index + 1 }}
                    </div>
                </template>
                <template slot="isDbSynch" slot-scope="text">
                    <div>
                        <span v-if="text == 'Y'" style="color: limegreen">已同步</span>
                        <span v-else style="color: red">未同步</span>
                    </div>
                </template>
                <template slot="tableType" slot-scope="text, record">
                    <div>
                        <span v-if="text == 1">单表{{ record.isTree == 'Y' ? '(树)' : '' }}</span>
                        <span v-if="text == 2">主表</span>
                        <span v-if="text == 3">附表</span>
                    </div>
                </template>
                <template slot="operation" slot-scope="text, record">
                    <a-row class="operationBox">
                        <span style="color: #1890ff; cursor: pointer" @click="editTableTemp(record)">编辑</span>
                        <span style="color: #ccc; margin: 0 7px">|</span>
                        <a-dropdown>
                            <span @click="(e) => e.preventDefault()" style="color: #1890ff; cursor: pointer">更多 <a-icon class="downIcon" type="down" /></span>
                            <!-- 单表，主表同步后的更多 -->
                            <a-menu slot="overlay" v-if="record.isDbSynch == 'Y' && record.tableType != 3">
                                <a-menu-item>
                                    <a class="menuItem" href="javascript:;" @click="funcTest(record)">功能测试</a>
                                </a-menu-item>
                                <a-menu-item>
                                    <a class="menuItem" href="javascript:;" @click="setSite">配置地址</a>
                                </a-menu-item>
                                <!-- <a-menu-item>
                                    <a class="menuItem" href="javascript:;" @click="openDrawer">权限控制</a>
                                </a-menu-item> -->
                                <!-- <a-menu-item>
                                    <a class="menuItem" href="javascript:;">角色授权</a>
                                </a-menu-item> -->
                                <!-- <a-menu-item>
                                    <a class="menuItem" href="javascript:;">生成视图</a>
                                </a-menu-item> -->
                                <a-menu-item>
                                    <a class="menuItem" href="javascript:;" @click="removeUndock(record)">移除</a>
                                </a-menu-item>
                                <a-menu-item>
                                    <a-popconfirm placement="left" ok-text="确定" cancel-text="取消" @confirm="delConfirm(record)">
                                        <template slot="title">
                                            <p>确定删除吗？</p>
                                        </template>
                                        <a class="menuItem" style="color: #000000a6" href="javascript:;">删除</a>
                                    </a-popconfirm>
                                </a-menu-item>
                            </a-menu>
                            <!-- 单表，主表，未同步前的更多 -->
                            <a-menu slot="overlay" v-if="record.isDbSynch == 'N' && record.tableType != 3">
                                <a-menu-item>
                                    <a class="menuItem" href="javascript:;" @click.stop="toDoDbSynch(record)">同步数据库</a>
                                </a-menu-item>
                                <!-- <a-menu-item>
                                    <a class="menuItem" href="javascript:;">权限控制</a>
                                </a-menu-item> -->
                                <!-- <a-menu-item>
                                    <a class="menuItem" href="javascript:;">角色授权</a>
                                </a-menu-item> -->
                                <!-- <a-menu-item>
                                    <a class="menuItem" href="javascript:;">生成视图</a>
                                </a-menu-item> -->
                                <a-menu-item>
                                    <a class="menuItem" href="javascript:;" @click="removeUndock(record)">移除</a>
                                </a-menu-item>
                                <a-menu-item>
                                    <a-popconfirm placement="left" ok-text="确定" cancel-text="取消" @confirm="delConfirm(record)">
                                        <template slot="title">
                                            <p>确定删除吗？</p>
                                        </template>
                                        <a class="menuItem" style="color: #000000a6" href="javascript:;">删除</a>
                                    </a-popconfirm>
                                </a-menu-item>
                            </a-menu>
                            <!-- 附表，同步后的更多 -->
                            <a-menu slot="overlay" v-if="record.isDbSynch == 'Y' && record.tableType == 3">
                                <!-- <a-menu-item>
                                    <a class="menuItem" href="javascript:;">权限控制</a>
                                </a-menu-item>
                                <a-menu-item>
                                    <a class="menuItem" href="javascript:;">角色授权</a>
                                </a-menu-item>
                                <a-menu-item>
                                    <a class="menuItem" href="javascript:;">生成视图</a>
                                </a-menu-item> -->
                                <!-- <a-menu-item>
                                    <a class="menuItem" href="javascript:;">视图管理</a>
                                </a-menu-item> -->
                                <a-menu-item>
                                    <a class="menuItem" href="javascript:;" @click="removeUndock(record)">移除</a>
                                </a-menu-item>
                                <a-menu-item>
                                    <a-popconfirm placement="left" ok-text="确定" cancel-text="取消" @confirm="delConfirm(record)">
                                        <template slot="title">
                                            <p>确定删除吗？</p>
                                        </template>
                                        <a class="menuItem" style="color: #000000a6" href="javascript:;">删除</a>
                                    </a-popconfirm>
                                </a-menu-item>
                            </a-menu>
                            <!-- 附表，未同步前的更多 -->
                            <a-menu slot="overlay" v-if="record.isDbSynch == 'N' && record.tableType == 3">
                                <a-menu-item>
                                    <a class="menuItem" href="javascript:;" @click.stop="toDoDbSynch(record)">同步数据库</a>
                                </a-menu-item>
                                <!-- <a-menu-item>
                                    <a class="menuItem" href="javascript:;">权限控制</a>
                                </a-menu-item>
                                <a-menu-item>
                                    <a class="menuItem" href="javascript:;">角色授权</a>
                                </a-menu-item>
                                <a-menu-item>
                                    <a class="menuItem" href="javascript:;">生成视图</a>
                                </a-menu-item> -->
                                <!-- <a-menu-item>
                                    <a class="menuItem" href="javascript:;">视图管理</a>
                                </a-menu-item> -->
                                <a-menu-item>
                                    <a class="menuItem" href="javascript:;" @click="removeUndock(record)">移除</a>
                                </a-menu-item>
                                <a-menu-item>
                                    <a-popconfirm placement="left" ok-text="确定" cancel-text="取消" @confirm="delConfirm(record)">
                                        <template slot="title">
                                            <p>确定删除吗？</p>
                                        </template>
                                        <a class="menuItem" style="color: #000000a6" href="javascript:;">删除</a>
                                    </a-popconfirm>
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </a-row>
                </template>
            </a-table>
        </div>
        <!-- 自定义按钮--模态框 -->
        <a-modal id="btn-model" v-model="visible1" title="自定义按钮" @ok="btnHandleOk" style="top: 0; height: 100%" width="100%" :bodyStyle="addBodyStyle" :dialogStyle="addDialogStyle">
            <div class="table-operator">
                <a-button type="primary" icon="plus" class="btnPlus" @click="btnAdd"> 新增</a-button>
                <a-dropdown v-if="this.btnSelectedRowKeys.length > 0">
                    <a-button class="delete-btn" @click="(e) => e.preventDefault()">
                        批量操作
                        <a-icon type="down" />
                    </a-button>
                    <a-menu slot="overlay" class="btn-del">
                        <a-menu-item @click="deleteConfirm"> <a-icon type="delete" />删除 </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </div>
            <!-- 已选择项 -->
            <div class="btn-total">
                <span>
                    <template
                        >已选择 <a>{{ btnSelectedRowKeys.length }}</a> 项</template
                    >
                </span>
                <a href="javascript:;" class="btn-dele" type="primary" :disabled="!Selected" :loading="loading2" @click="open">清空</a>
            </div>
            <!-- 表格 -->
            <div>
                <a-table
                    size="middle"
                    :row-selection="{
                        selectedRowKeys: btnSelectedRowKeys,
                        onChange: selectChange
                    }"
                    :columns="btnColumns"
                    :data-source="btnData"
                    rowKey="id"
                    bordered
                >
                    <span slot="buttonStatus" slot-scope="text"> {{ text == 1 ? '激活' : '未激活' }} </span>
                    <template slot="oprtn" slot-scope="text, record">
                        <a-row class="operationBox">
                            <span style="color: #1890ff; cursor: pointer" @click="compile(record)">编辑</span>
                            <span style="color: #ccc; margin: 0 7px">|</span>
                            <a-dropdown>
                                <span @click="(e) => e.preventDefault()" style="color: #1890ff; cursor: pointer">更多 <a-icon class="downIcon" type="down" /></span>
                                <a-menu slot="overlay">
                                    <a-menu-item>
                                        <a-popconfirm title="确定删除吗?" ok-text="确定" cancel-text="取消" @confirm="(e) => ratify(e, record)"> 删除 </a-popconfirm>
                                    </a-menu-item>
                                </a-menu>
                            </a-dropdown>
                        </a-row>
                    </template>
                </a-table>
            </div>
        </a-modal>
        <!-- 自定义按钮新增--模态框 -->
        <a-modal id="add-model" v-model="visible3" :title="amendStatus == false ? '新增' : '编辑'" on-ok="btnAddHandleOk" style="top: 0" width="800px">
            <a-form :form="form" @submit="hadSubmit">
                <a-form-item v-bind="formItemLayu" label="按钮编码">
                    <a-input
                        placeholder="请输入按钮编码"
                        v-decorator="[
                            'buttonCode',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入按钮编码!'
                                    }
                                ]
                            }
                        ]"
                    />
                </a-form-item>
                <a-form-item v-bind="formItemLayu" label="按钮名称">
                    <a-input
                        placeholder="请输入按钮名称"
                        v-decorator="[
                            'buttonName',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入按钮名称'
                                    }
                                ]
                            }
                        ]"
                    />
                </a-form-item>

                <a-form-item v-bind="formItemLayu" label="按钮样式">
                    <a-select v-decorator="['buttonStyle']" @change="checkbox">
                        <a-select-option value="link"> link </a-select-option>
                        <a-select-option value="botton"> botton </a-select-option>
                        <a-select-option value="form"> form </a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item v-bind="formItemLayu" label="按钮类型">
                    <a-select v-decorator="['optType']" @change="typtCheckbox">
                        <a-select-option value="js"> js </a-select-option>
                        <a-select-option value="action"> action </a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item v-bind="formItemLayu" label="排序">
                    <a-input-number id="inputNumber" :min="1" :max="10" placeholder="请输入按钮排序" v-decorator="['orderNum']" />
                </a-form-item>

                <a-form-item v-bind="formItemLayu" label="按钮图标" class="form-icon">
                    <a-input placeholder="请输入按钮图标" v-decorator="['buttonIcon']" />
                    <a-tooltip class="input-icon">
                        <template slot="title"> a-icon type </template>
                        <a-icon type="info-circle" />
                    </a-tooltip>
                </a-form-item>

                <a-form-item v-bind="formItemLayu" label="表达式">
                    <a-input placeholder="请输入表达式" v-decorator="['exp']" />
                </a-form-item>

                <a-form-item v-bind="formItemLayu" label="按钮状态">
                    <a-select v-decorator="['buttonStatus']" @change="checkbox">
                        <a-select-option :value="1">激活</a-select-option>
                        <a-select-option :value="0">未激活</a-select-option>
                    </a-select>
                </a-form-item>

                <!-- <a-button type="primary" @click="setFormValue()">赋值</a-button> -->
            </a-form>
            <template slot="footer">
                <a-button key="btnCancel " @click="backCancel"> 关闭 </a-button>
                <a-button key="confirm" type="primary" :loading="loading3" @click="hadSubmit"> 确定 </a-button>
            </template>
        </a-modal>
        <!-- JS增强--模态框 -->
        <a-modal v-model="visible2" title="JS增强" on-ok="jsHandleOk" width="800px">
            <v-code-mirror @getVal="getCode"></v-code-mirror>
            <template slot="footer">
                <a-button key="dleJs" @click="jsCancel"> 关闭 </a-button>
                <a-button key="sbtJs" type="primary" :loading="loading4" @click="jsHandleOk"> 确定 </a-button>
            </template>
        </a-modal>
        <!-- java增强 -->
        <a-modal v-model="visible4" title="JAVA增强" on-ok="javaHandleOk" width="800px">
            <template slot="footer">
                <a-button key="dleJava" @click="javaCancel"> 关闭 </a-button>
                <a-button key="sbtJava" type="primary" :loading="loading5" @click="javaSubmit"> 确定 </a-button>
            </template>
            <a-form :form="form" @submit="javaSubmit" :labelCol="{ span: 4 }" :wrapperCol="{ span: 19 }">
                <a-form-item label="页面按钮">
                    <a-select @change="selecChange" v-decorator="['pageBtn']">
                        <a-select-option value="add"> 新增 </a-select-option>
                        <a-select-option value="edit"> 编辑 </a-select-option>
                        <a-select-option value="delete"> 删除 </a-select-option>
                        <a-select-option value="import"> 导入 </a-select-option>
                        <a-select-option value="export"> 导出 </a-select-option>
                        <a-select-option value="query"> 查询 </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="事件状态">
                    <a-radio-group name="radioGroup" v-decorator="['eventState']" @change="onChoose">
                        <a-radio value="start"> 开始 </a-radio>
                        <a-radio value="end"> 结束 </a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="类型">
                    <a-radio-group v-decorator="['eventType']" @change="onChoose">
                        <a-radio value="spring"> spring-key </a-radio>
                        <a-radio value="class"> java-class </a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="内容">
                    <a-input
                        placeholder="请输入内容"
                        v-decorator="[
                            'pageContent',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入内容'
                                    }
                                ]
                            }
                        ]"
                    />
                </a-form-item>
                <a-form-item label="是否生效">
                    <a-radio-group v-decorator="['judge']">
                        <a-radio value="1"> 有效 </a-radio>
                        <a-radio value="0"> 无效 </a-radio>
                    </a-radio-group>
                </a-form-item>
            </a-form>
        </a-modal>
        <!-- 导入数据库表--模态框 -->
        <a-modal id="importData-modal" v-model="visible5" title="从数据库导入表单" on-ok="handleSubmit" width="500PX">
            <div class="header-search">
                <a-row>
                    <a-col :span="2">
                        <label for="" class="name-label">表名:</label>
                    </a-col>
                    <a-col :span="22">
                        <a-input placeholder="请输入表名按回车查询" />
                    </a-col>
                </a-row>
            </div>
            <div class="statistics">
                <p>
                    已选择 <a href="javascript:;">0</a> 项
                    <a href="javascript:;" class="empty">清空</a>
                </p>
            </div>
            <p>注: 导入表会排除配置前缀表 <a href="javascript:;">参考文档</a></p>
            <a-table :row-selection="rowSelectionData" :columns="columnsForm" :data-source="dataForm" bordered size="small">
                <a slot="name" slot-scope="text">{{ text }}</a>
            </a-table>
            <template slot="footer">
                <a-button key="shut" @click="handleBack"> 关闭 </a-button>
                <a-button key="generate" type="primary" @click="handleSubmit"> 生成表单 </a-button>
            </template>
        </a-modal>
        <!-- 高级查询--模态框 -->
        <a-modal id="advanced-modal" v-model="visible6" title="高级查询构造器" on-ok="handleSearch" width="1000px">
            <div class="modal-content">
                <div class="modal-left">
                    <a-form :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }" :form="advancedForm">
                        <a-row>
                            <a-col :span="18">
                                <a-form-item label="过滤条件匹配:">
                                    <a-select style="width: 282px" v-decorator="['pairing']" @change="changePairing">
                                        <a-select-option value="1"> AND（所有条件都要求匹配） </a-select-option>
                                        <a-select-option value="2"> OR（条件中的任意一个匹配） </a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="8">
                                <a-form-item class="field-form">
                                    <a-select placeholder="选择查询字段" class="field" v-decorator="['field']">
                                        <a-select-option value="1"> 表名 </a-select-option>
                                        <a-select-option value="2"> 表类型 </a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :span="4">
                                <a-form-item class="compare">
                                    <a-select style="width: 111px" v-decorator="['algorithm']">
                                        <a-select-option value="1"> 等于 </a-select-option>
                                        <a-select-option value="2"> 包含 </a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item>
                                    <a-input placeholder="请输入值" style="width: 240px" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="4">
                                <a-form-item>
                                    <a-button style="width: 32px; margin-right: 8px; margin-left: 4px; margin-bottom: 4px; vertical-align: middle; padding: 0"><a-icon type="plus" /></a-button>
                                    <a-button style="width: 32px; margin-bottom: 4px; vertical-align: middle; padding: 0"><a-icon type="minus" /></a-button>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </a-form>
                </div>
                <div class="modal-right">
                    <a-table :columns="saveColumns" :data-source="saveData" bordered size="small">
                        <template slot="name" slot-scope="text">
                            <a>{{ text }}</a>
                        </template>
                    </a-table>
                </div>
            </div>
            <template slot="footer">
                <div class="btn-footer">
                    <div class="btn-left">
                        <a-button key="reset" @click="handleReset"> 重置 </a-button>
                        <a-button key="saveCondition" :loading="loading6" @click="saveCondition"> 保存查询条件 </a-button>
                    </div>
                    <div class="btn-right">
                        <a-button key="shut" @click="handleShut"> 关闭 </a-button>
                        <a-button key="searchSubmit" type="primary" :loading="loading6" @click="handleSearch"> 查询 </a-button>
                    </div>
                </div>
            </template>
        </a-modal>
        <!-- 同步数据库 -->
        <a-modal :visible="dbSynchVisible" title="同步数据库" @ok="dbSynchHandleOk" @cancel="dbSynchHandleCancel">
            <template slot="footer">
                <a-button key="back" @click="dbSynchHandleCancel"> 关闭 </a-button>
                <a-button key="submit" type="primary" :loading="dbSynchloading" @click="dbSynchHandleOk"> 确定 </a-button>
            </template>
            <a-form-model :model="dbSynchObj" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
                <a-form-model-item label>
                    <a-radio-group v-model="dbSynchObj.synMethod">
                        <a-radio value="normal">普通同步（保留表数据）</a-radio>
                        <br />
                        <a-radio value="force">强制同步（删除表，重新生成）</a-radio>
                    </a-radio-group>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
        <!-- 配置地址--模态框 -->
        <a-modal v-model="visible7" title="菜单连接">
            <template slot="footer">
                <a-button @click="siteCancel"> 关闭 </a-button>
                <a-button type="primary" @click="copyOk"> 复制 </a-button>
            </template>
        </a-modal>
        <!-- 权限控制--抽屉 -->
        <a-drawer id="drawerSty" title="权限管理" placement="right" :visible="visibleOpen" :after-visible-change="afterVisibleChange" @close="onClose" width="800px">
            <a-tabs default-active-key="1" @change="call">
                <a-tab-pane key="1" tab="字段权限">
                    <a-table :columns="fieldsColumns" :data-source="fieldsData" bordered>
                        <template slot="using" slot-scope="text, record, index">
                            <a-switch
                                size="small"
                                @change="
                                    (e) => {
                                        onOpen(e, record, index);
                                    }
                                "
                                :checked="text"
                            />
                        </template>
                        <template slot="listOper" slot-scope="text, record">
                            <a-checkbox
                                @change="
                                    (e) => {
                                        onfollow(e, record);
                                    }
                                "
                                :checked="text"
                                :disabled="disabled"
                            >
                                可见
                            </a-checkbox>
                        </template>
                        <template slot="formOper" slot-scope="text, record">
                            <a-checkbox
                                @change="
                                    (e) => {
                                        formShow(e, record);
                                    }
                                "
                                :checked="record.formOperShow"
                                :disabled="disabledShow"
                                >可见
                            </a-checkbox>
                            <a-checkbox
                                @change="
                                    (e) => {
                                        formEdit(e, record);
                                    }
                                "
                                :checked="record.formOperEdit"
                                :disabled="disabledEdit"
                            >
                                可编辑
                            </a-checkbox>
                        </template>
                    </a-table>
                </a-tab-pane>
                <a-tab-pane key="2" tab="按钮权限" force-render>
                    <a-table :columns="buttonColumns" :data-source="buttonData" bordered>
                        <template slot="use" slot-scope="text, record">
                            <a-switch
                                size="small"
                                @change="
                                    (e) => {
                                        onControl(e, record);
                                    }
                                "
                            />
                        </template>
                    </a-table>
                </a-tab-pane>
                <a-tab-pane key="3" tab="数据权限">
                    <a-button icon="plus" class="add-btn" @click="addBtn">新增</a-button>
                    <a-table :columns="dataColumns" :data-source="dataPrivilege" bordered>
                        <template slot="invoke" slot-scope="text">
                            <a>{{ text }}</a>
                        </template>
                    </a-table>
                </a-tab-pane>
            </a-tabs>
        </a-drawer>
        <!-- 权限控制--数据权限--新增--模态框 -->
        <a-modal v-model="visible8" title="新增" on-ok="OkHandle" width="800px">
            <template slot="footer">
                <a-button @click="handleReturn"> 取消 </a-button>
                <a-button type="primary" :loading="loading8" @click="OkHandle"> 确定 </a-button>
            </template>
            <a-form-model ref="ruleForm" :model="formRule" :rules="rules" :labelCol="{ span: 4 }" :wrapperCol="{ span: 18 }">
                <a-form-model-item label="规则名称" prop="name">
                    <a-input placeholder="请输入规则名称" v-model="formRule.name" width="564px" />
                </a-form-model-item>
                <a-form-model-item label="规则字段">
                    <a-select v-model="formRule.ruleField" placeholder="请选择规则字段">
                        <a-select-option value="shanghai"> Zone one </a-select-option>
                        <a-select-option value="beijing"> Zone two </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="条件规则" prop="region">
                    <a-select v-model="formRule.region" placeholder="请选择条件规则">
                        <a-select-option value="shanghai"> Zone one </a-select-option>
                        <a-select-option value="beijing"> Zone two </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="规则值" prop="ruleValue">
                    <a-input placeholder="请输入规则值" v-model="formRule.ruleValue" />
                </a-form-model-item>
                <a-form-model-item label="状态">
                    <a-radio-group button-style="solid" v-model="formRule.resource">
                        <a-radio-button value="a"> 有效 </a-radio-button>
                        <a-radio-button value="b"> 无效 </a-radio-button>
                    </a-radio-group>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
        <!-- 代码生成完成--模态框 -->
        <a-modal v-model="visibleTen" title="提示" on-ok="handleOk">
            <template slot="footer">
                <a-button @click="download"> 下载到本地 </a-button>
                <a-button @click="confirmCancel"> 取消 </a-button>
                <a-button type="primary" @click="confirmShut"> 确认关闭 </a-button>
            </template>
            <h2 style="text-align: center">代码生成，成功！</h2>
        </a-modal>
        <!-- 单表--代码生成模态框 -->
        <a-modal v-model="visible9" title="代码生成" on-ok="codeHandleOk" width="800px">
            <template slot="footer">
                <a-button key="back" @click="codeCancel"> 取消 </a-button>
                <a-button key="submit" type="primary" :loading="loading" @click="codeHandleOk"> 生成代码 </a-button>
            </template>
            <a-form-model ref="codeForm" :model="priceForm" :rules="system" :labelCol="{ span: 6 }" :wrapperCol="{ span: 16 }">
                <a-form-model-item label="代码生成目录" prop="catalog">
                    <a-input v-model="priceForm.catalog" placeholder="请选择代码生成目录" autocomplete="off" />
                </a-form-model-item>
                <a-form-model-item label="页面风格">
                    <a-select v-model="priceForm.style">
                        <a-select-option value="classic" v-for="(item, index) in jspModeListOne" :key="index"> {{ item.note }} </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="功能说明">
                    <a-input v-model="priceForm.explain" />
                </a-form-model-item>
                <a-form-model-item label="表名" prop="formName">
                    <a-input v-model="priceForm.formName" read-only />
                </a-form-model-item>
                <a-form-model-item label="实体类名" prop="entityClass">
                    <a-input v-model="priceForm.entityClass" placeholder="请输入实体类名（首字母大写）" />
                </a-form-model-item>
                <a-form-model-item label="包名（小写）" prop="packetName">
                    <a-input v-model="priceForm.packetName" placeholder="请输入包名" />
                </a-form-model-item>
                <a-form-model-item label="代码分层样式">
                    <a-select v-model="priceForm.codeStyle" disabled>
                        <a-select-option value="classic"> 业务分层 </a-select-option>
                    </a-select>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
        <!-- 主表--代码生成模态框 -->
        <a-modal id="hostModal" v-model="visibleEleven" title="代码生成" on-ok="hostHandleOk" width="1200px">
            <template slot="footer">
                <a-button @click="hostCancel"> 取消 </a-button>
                <a-button type="primary" @click="hostHandleOk"> 生成代码 </a-button>
            </template>
            <a-form-model ref="hostFormTable" :model="hostForm" :rules="host" :labelCol="{ span: 3 }" :wrapperCol="{ span: 20 }">
                <a-row>
                    <a-col>
                        <a-form-model-item label="代码生成目录" prop="catalog">
                            <a-input v-model="hostForm.catalog" placeholder="请选择代码生成目录" autocomplete="off" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col class="title-list" :span="12">
                        <a-form-model-item label="页面风格">
                            <a-select v-model="hostForm.style">
                                <a-select-option v-for="(item, index) in jspModeList" :key="index"> {{ item.note }} </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col class="title-listTo" :span="12">
                        <a-form-model-item label="功能说明">
                            <a-input v-model="hostForm.explain" class="a-input" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col class="title-list3" :span="12">
                        <a-form-model-item label="表名" prop="formName">
                            <a-input v-model="hostForm.formName" read-only style="width: 376px" />
                        </a-form-model-item>
                    </a-col>
                    <a-col class="title-list4" :span="12">
                        <a-form-model-item prop="entityClass" label="实体类名" class="p-col">
                            <a-input v-model="hostForm.entityClass" placeholder="请输入实体类名（首字母大写）" class="entity-class" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col class="title-list5" :span="12">
                        <a-form-model-item prop="packetName" label="包名(小写)" class="p-col1">
                            <a-input v-model="hostForm.packetName" placeholder="请输入包名" style="width: 376px; margin-left: 7px" />
                        </a-form-model-item>
                    </a-col>
                    <a-col class="title-list6" :span="12">
                        <a-col :span="3"><p class="p-col2">代码分层样式：</p></a-col>
                        <a-col>
                            <a-form-model-item>
                                <a-select v-model="hostForm.codeStyle" disabled style="margin-left: 73px">
                                    <a-select-option value="classic"> 业务分层 </a-select-option>
                                </a-select>
                            </a-form-model-item>
                        </a-col>
                    </a-col>
                </a-row>
            </a-form-model>
            <div class="son-table">
                <p class="p-text">子表信息</p>
                <a-form-model class="row-table" slot="body" ref="sonTable" :model="sonForm" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15 }">
                    <a-row v-for="(sonItem, index) in sonForm.sonSub" :key="index">
                        <a-col :span="8" style="marign-left: 20px">
                            <a-form-model-item label="子表名" :prop="'sonSub.' + index + '.sonTableName'">
                                <a-input read-only :value="sonItem.sonTableName" />
                            </a-form-model-item>
                        </a-col>
                        <a-col :span="8">
                            <a-form-model-item label="子表实体" :prop="'sonSub.' + index + '.sonTableEntity'" :rules="{ required: true, message: '请输入子表实体', trigger: 'blur' }">
                                <a-input v-model="sonItem.sonTableEntity" />
                            </a-form-model-item>
                        </a-col>
                        <a-col :span="8">
                            <a-form-model-item label="功能说明" :prop="'sonSub.' + index + '.sonExplain'" :rules="{ required: true, message: '请输入功能说明', trigger: 'blur' }">
                                <a-input v-model="sonItem.sonExplain" />
                            </a-form-model-item>
                        </a-col>
                    </a-row>
                </a-form-model>
            </div>
        </a-modal>
        <!-- SQL增强模态框 -->
        <a-modal v-model="visibleTwelve" title="SQL增强" on-ok="sqlHandleOk" width="800px">
            <template slot="footer">
                <a-button @click="sqlHandleCancel"> 取消 </a-button>
                <a-button type="primary" @click="sqlHandleOk"> 确定 </a-button>
            </template>
            <a-form-model :model="sqlForm" :labelCol="{ span: 4 }" :wrapperCol="{ span: 16 }">
                <a-form-model-item label="页面按钮">
                    <a-select v-model="sqlForm.sqlPageBtn">
                        <a-select-option value="shanghai"> Zone one </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="增强SQL">
                    <a-input v-model="sqlForm.sqlCode" type="textarea" :auto-size="{ minRows: 14, maxRows: 14 }" />
                </a-form-model-item>
                <a-form-model-item label="描述">
                    <a-input v-model="sqlForm.sqlExp" type="textarea" placeholder="请输入描述" />
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
</template>
<script>
//  首页 表格
const columns1 = [
    {
        title: '#',
        dataIndex: 'key',
        align: 'center',
        width: 60,
        scopedSlots: { customRender: 'key' }
    },
    {
        title: '表类型',
        dataIndex: 'tableType',
        align: 'center',
        width: 150,
        scopedSlots: { customRender: 'tableType' },
        sorter: (a, b) => a.tableType - b.tableType
    },
    {
        title: '表名',
        dataIndex: 'tableName',
        align: 'center',
        width: 190,
        sorter: (a, b) => a.tableName.localeCompare(b.tableName, 'en')
    },
    {
        title: '表描述',
        dataIndex: 'tableTxt',
        align: 'center',
        width: 200
    },
    {
        title: '版本',
        dataIndex: 'tableVersion',
        align: 'center',
        width: 80
    },
    {
        title: '同步状态',
        dataIndex: 'isDbSynch',
        align: 'center',
        width: 160,
        scopedSlots: { customRender: 'isDbSynch' },
        filterMultiple: false,
        onFilter: (value, record) => record.isDbSynch.indexOf(value) === 0,
        sorter: (a, b) => a.isDbSynch.localeCompare(b.isDbSynch, 'en'),
        sortDirections: ['descend', 'ascend']
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        align: 'center',
        width: 180,
        sorter: (a, b) => a.createTime.localeCompare(b.createTime, 'en')
    },
    {
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        width: 200,
        scopedSlots: { customRender: 'operation' }
    }
];
//  新增 数据库属性
const addColumns1 = [
    {
        title: '#',
        dataIndex: 'key',
        width: 60,
        align: 'center',
        scopedSlots: { customRender: 'key' }
    },
    {
        title: '字段名称',
        dataIndex: 'dbFieldName',
        align: 'center',
        width: 150,
        scopedSlots: { customRender: 'dbFieldName' } //和这个对应
    },
    {
        title: '字段备注',
        dataIndex: 'dbFieldTxt',
        align: 'center',
        width: 150,
        scopedSlots: { customRender: 'dbFieldTxt' }
    },
    {
        title: '字段长度',
        dataIndex: 'dbLength',
        align: 'center',
        width: 150,
        scopedSlots: { customRender: 'dbLength' }
    },
    {
        title: '小数点',
        dataIndex: 'dbPointLength',
        align: 'center',
        width: 150,
        scopedSlots: { customRender: 'dbPointLength' }
    },
    {
        title: '默认值',
        dataIndex: 'dbDefaultVal',
        align: 'center',
        width: 150,
        scopedSlots: { customRender: 'dbDefaultVal' }
    },
    {
        title: '字段类型',
        dataIndex: 'dbType',
        align: 'center',
        width: 150,
        scopedSlots: { customRender: 'dbType' }
    },

    {
        title: '主键',
        dataIndex: 'dbIsKey',
        align: 'center',
        width: 80,
        scopedSlots: { customRender: 'dbIsKey' }
    },
    {
        title: '允许空值',
        dataIndex: 'dbIsNull',
        align: 'center',
        width: 100,
        scopedSlots: { customRender: 'dbIsNull' }
    },
    {
        title: '',
        dataIndex: 'opre',
        align: ''
    }
];
//  新增 页面属性
const addColumns2 = [
    {
        title: '#',
        dataIndex: 'key',
        width: 50,
        align: 'center',
        scopedSlots: { customRender: 'key' }
    },
    {
        title: '字段名称',
        dataIndex: 'dbFieldName',
        align: 'center',
        width: 120,
        scopedSlots: { customRender: 'dbFieldName' }
    },
    {
        title: '字段备注',
        dataIndex: 'dbFieldTxt',
        align: 'center',
        width: 120,
        scopedSlots: { customRender: 'dbFieldTxt' }
    },
    {
        title: '表单显示',
        dataIndex: 'isShowForm',
        align: 'center',
        width: 45,
        scopedSlots: { customRender: 'isShowForm' }
    },
    {
        title: '列表显示',
        dataIndex: 'isShowList',
        align: 'center',
        width: 45,
        scopedSlots: { customRender: 'isShowList' }
    },
    {
        title: '是否排序',
        dataIndex: 'sortFlag',
        align: 'center',
        width: 45,
        scopedSlots: { customRender: 'sortFlag' }
    },
    {
        title: '是否只读',
        dataIndex: 'isReadOnly',
        align: 'center',
        width: 45,
        scopedSlots: { customRender: 'isReadOnly' }
    },

    {
        title: '控件类型',
        dataIndex: 'fieldShowType',
        align: 'center',
        width: 180,
        scopedSlots: { customRender: 'fieldShowType' }
    },
    {
        title: '控件长度',
        dataIndex: 'fieldLength',
        align: 'center',
        width: 100,
        scopedSlots: { customRender: 'fieldLength' }
    },
    {
        title: '是否查询',
        dataIndex: 'isQuery',
        align: 'center',
        width: 80,
        scopedSlots: { customRender: 'isQuery' }
    },
    {
        title: '查询类型',
        dataIndex: 'queryMode',
        align: 'center',
        width: 120,
        scopedSlots: { customRender: 'queryMode' }
    },
    {
        title: '控件默认值',
        dataIndex: 'fieldDefaultValue',
        align: 'center',
        width: 150,
        scopedSlots: { customRender: 'fieldDefaultValue' }
    },
    {
        title: '扩展参数',
        dataIndex: 'fieldExtendJson',
        align: 'center',
        width: 150,
        scopedSlots: { customRender: 'fieldExtendJson' }
    },
    {
        title: '自定义转换器',
        dataIndex: 'converter',
        align: 'center',
        width: 150,
        scopedSlots: { customRender: 'converter' }
    },
    {
        title: '',
        dataIndex: 'opre',
        align: ''
    }
];
//  新增 校验字段
const addColumns3 = [
    {
        title: '#',
        dataIndex: 'key',
        width: 50,
        align: 'center',
        scopedSlots: { customRender: 'key' }
    },
    {
        title: '字段名称',
        dataIndex: 'dbFieldName',
        align: 'center',
        width: 120,
        scopedSlots: { customRender: 'dbFieldName' }
    },
    {
        title: '字段备注',
        dataIndex: 'dbFieldTxt',
        align: 'center',
        width: 120,
        scopedSlots: { customRender: 'dbFieldTxt' }
    },
    {
        title: '字段Href',
        dataIndex: 'fieldHref',
        align: 'center',
        width: 120,
        scopedSlots: { customRender: 'fieldHref' }
    },
    {
        title: '验证规则',
        dataIndex: 'fieldValidType',
        align: 'center',
        width: 150,
        scopedSlots: { customRender: 'fieldValidType' }
    },
    {
        title: '校验必填',
        dataIndex: 'fieldMustInput',
        align: 'center',
        width: 80,
        scopedSlots: { customRender: 'fieldMustInput' }
    },
    {
        title: '字典Table',
        dataIndex: 'dictTable',
        align: 'center',
        width: 120,
        scopedSlots: { customRender: 'dictTable' }
    },

    {
        title: '字典Code',
        dataIndex: 'dictField',
        align: 'center',
        width: 120,
        scopedSlots: { customRender: 'dictField' }
    },
    {
        title: '字典Text',
        dataIndex: 'dictText',
        align: 'center',
        width: 120,
        scopedSlots: { customRender: 'dictText' }
    },
    {
        title: '',
        dataIndex: 'opre',
        align: ''
    }
];
//  新增 外键
const addColumns4 = [
    {
        title: '#',
        dataIndex: 'key',
        width: 50,
        align: 'center',
        scopedSlots: { customRender: 'key' }
    },
    {
        title: '字段名称',
        dataIndex: 'dbFieldName',
        align: 'center',
        width: 180,
        scopedSlots: { customRender: 'dbFieldName' }
    },
    {
        title: '字段备注',
        dataIndex: 'dbFieldTxt',
        align: 'center',
        width: 150,
        scopedSlots: { customRender: 'dbFieldTxt' }
    },
    {
        title: '主表名',
        dataIndex: 'mainTable',
        align: 'center',
        width: 150,
        scopedSlots: { customRender: 'mainTable' }
    },
    {
        title: '主表字段',
        dataIndex: 'mainField',
        align: 'center',
        width: 150,
        scopedSlots: { customRender: 'mainField' }
    },
    {
        title: '',
        dataIndex: 'opre',
        align: ''
    }
];
//  新增 索引
const addColumns5 = [
    {
        title: '#',
        dataIndex: 'key',
        width: 50,
        align: 'center',
        scopedSlots: { customRender: 'key' }
    },
    {
        title: '索引名称',
        dataIndex: 'indexName',
        align: 'center',
        width: 250,
        scopedSlots: { customRender: 'indexName' }
    },
    {
        title: '索引栏位',
        dataIndex: 'indexField',
        align: 'center',
        width: 250,
        scopedSlots: { customRender: 'indexField' }
    },
    {
        title: '索引类型',
        dataIndex: 'indexType',
        align: 'center',
        width: 250,
        scopedSlots: { customRender: 'indexType' }
    },
    {
        title: '',
        dataIndex: 'opre',
        align: ''
    }
];
//  新增 查询配置
const addColumns6 = [
    {
        title: '#',
        dataIndex: 'key',
        width: 50,
        align: 'center',
        scopedSlots: { customRender: 'key' }
    },
    {
        title: '字段名称',
        dataIndex: 'dbFieldName',
        align: 'center',
        width: 120,
        scopedSlots: { customRender: 'dbFieldName' }
    },
    {
        title: '字段备注',
        dataIndex: 'dbFieldTxt',
        align: 'center',
        width: 150,
        scopedSlots: { customRender: 'dbFieldTxt' }
    },
    {
        title: '控件类型',
        dataIndex: 'queryShowType',
        align: 'center',
        width: 180,
        scopedSlots: { customRender: 'queryShowType' }
    },
    {
        title: '字典Table',
        dataIndex: 'queryDictTable',
        align: 'center',
        width: 150,
        scopedSlots: { customRender: 'queryDictTable' }
    },
    {
        title: '字典Code',
        dataIndex: 'queryDictField',
        align: 'center',
        width: 150,
        scopedSlots: { customRender: 'queryDictField' }
    },
    {
        title: '字典Text',
        dataIndex: 'queryDictText',
        align: 'center',
        width: 150,
        scopedSlots: { customRender: 'queryDictText' }
    },
    {
        title: '默认值',
        dataIndex: 'queryDefVal',
        align: 'center',
        width: 150,
        scopedSlots: { customRender: 'queryDefVal' }
    },

    {
        title: '是否启用',
        dataIndex: 'queryConfigFlag',
        align: 'center',
        width: 80,
        scopedSlots: { customRender: 'queryConfigFlag' }
    },
    {
        title: '',
        dataIndex: 'opre',
        align: ''
    }
];
//  表格里展示输入框或者复选框（下拉框另写）
const textFields = [
    {
        name: 'dbFieldName',
        type: 'input',
        tip: '请输入字段名称'
    },
    {
        name: 'dbFieldTxt',
        type: 'input',
        tip: '请输入字段备注'
    },
    {
        name: 'dbLength',
        type: 'input',
        tip: '请输入字段长度'
    },
    {
        name: 'dbPointLength',
        type: 'input',
        tip: '请输入小数点'
    },
    {
        name: 'dbDefaultVal',
        type: 'input'
    },
    {
        name: 'dbIsKey',
        type: 'checkBox'
    },
    {
        name: 'dbIsNull',
        type: 'checkBox'
    },
    {
        name: 'isShowForm',
        type: 'checkBox'
    },
    {
        name: 'isShowList',
        type: 'checkBox'
    },
    {
        name: 'sortFlag',
        type: 'checkBox'
    },
    {
        name: 'isReadOnly',
        type: 'checkBox'
    },
    {
        name: 'fieldLength',
        type: 'input'
    },
    {
        name: 'isQuery',
        type: 'checkBox'
    },
    {
        name: 'fieldDefaultValue',
        type: 'input'
    },
    {
        name: 'fieldExtendJson',
        type: 'input'
    },
    {
        name: 'converter',
        type: 'input'
    },
    {
        name: 'fieldHref',
        type: 'input'
    },
    {
        name: 'fieldMustInput',
        type: 'checkBox'
    },
    {
        name: 'dictTable',
        type: 'input'
    },
    {
        name: 'dictField',
        type: 'input'
    },
    {
        name: 'dictText',
        type: 'input'
    },
    {
        name: 'mainTable',
        type: 'input'
    },
    {
        name: 'mainField',
        type: 'input'
    },
    {
        name: 'queryDictTable',
        type: 'input'
    },
    {
        name: 'queryDictField',
        type: 'input'
    },
    {
        name: 'queryDictText',
        type: 'input'
    },
    {
        name: 'queryDefVal',
        type: 'input'
    },
    {
        name: 'queryConfigFlag',
        type: 'checkBox'
    }
];
//  新增 页面属性的控件类型选择项
const fieldShowTypeList = [
    {
        value: 'text',
        text: '文本框'
    },
    {
        value: 'password',
        text: '密码'
    },
    {
        value: 'list',
        text: '下拉框'
    },
    {
        value: 'radio',
        text: '单选框'
    },
    {
        value: 'checkbox',
        text: '多选框'
    },
    {
        value: 'switch',
        text: '开关'
    },
    {
        value: 'date',
        text: '日期(yyyy-MM-dd)'
    },
    {
        value: 'datetime',
        text: '日期(yyyy-MM-dd HH:mm:ss)'
    },
    {
        value: 'time',
        text: '时间(HH:mm:ss)'
    },
    {
        value: 'file',
        text: '文件'
    },
    {
        value: 'image',
        text: '图片'
    },
    {
        value: 'textarea',
        text: '多行文本'
    },
    {
        value: 'list_multi',
        text: '下拉多选框'
    },
    {
        value: 'sel_search',
        text: '下拉搜索框'
    },
    {
        value: 'popup',
        text: 'Popup弹框'
    },
    {
        value: 'cat_tree',
        text: '分类字典树'
    },
    {
        value: 'sel_depart',
        text: '部门选择'
    },
    {
        value: 'sel_user',
        text: '用户选择'
    },
    {
        value: 'umeditor',
        text: '富文本'
    },
    {
        value: 'markdown',
        text: 'MarkDown'
    },
    {
        value: 'pca',
        text: '省市区组件'
    },
    {
        value: 'link_down',
        text: '联动组件'
    },
    {
        value: 'sel_tree',
        text: '自定义树控件'
    }
];
//  新增 校验字段的验证规则选择项
const fieldValidTypeList = [
    {
        value: ' ',
        text: '空'
    },
    {
        value: 'only',
        text: '唯一校验'
    },
    {
        value: 'n6-16',
        text: '6-16位的数字'
    },
    {
        value: '*6-16',
        text: '6-16位任意字符'
    },
    {
        value: 's6-18',
        text: '6-18位字母'
    },
    {
        value: 'url',
        text: '网址'
    },
    {
        value: 'm',
        text: '手机号码'
    },
    {
        value: 'p',
        text: '邮政编码'
    },
    {
        value: 's',
        text: '字母'
    },
    {
        value: 'n',
        text: '数字'
    },
    {
        value: 'z',
        text: '整数'
    },
    {
        value: '*',
        text: '非空'
    },
    {
        value: 'e',
        text: '邮箱'
    },
    {
        value: 'money',
        text: '金额'
    }
];
//  新增 查询配置的控件类型选择项
const queryShowTypeList = [
    {
        value: 'text',
        text: '文本框'
    },
    {
        value: 'date',
        text: '日期(yyyy-MM-dd)'
    },
    {
        value: 'datetime',
        text: '日期(yyyy-MM-dd HH:mm:ss)'
    },
    {
        value: 'time',
        text: '时间(HH:mm:ss)'
    },
    {
        value: 'select',
        text: '下拉框'
    },
    {
        value: 'multipleSelect',
        text: '下拉多选框'
    },
    {
        value: 'searchSelect',
        text: '下拉搜索框'
    },
    {
        value: 'cdTree',
        text: '分类字典树'
    },
    {
        value: 'popup',
        text: 'Popup弹框'
    },
    {
        value: 'deptChoose',
        text: '部门选择'
    },
    {
        value: 'userChoose',
        text: '用户选择'
    },
    {
        value: 'address',
        text: '省市区组件'
    },
    {
        value: 'tree',
        text: '自定义树控件'
    }
];
//  字段模型（初始数据）
const fields = [
    {
        key: '1',
        id: '1',
        dbFieldName: 'id',
        dbFieldTxt: '主键',
        dbLength: 36,
        dbPointLength: 0,
        dbIsKey: true,
        dbIsNull: false,
        dbDefaultVal: '',
        dbType: 'String',
        isShowForm: '0',
        isShowList: '0',
        sortFlag: '0',
        isReadOnly: '0',
        fieldShowType: 'text',
        fieldLength: '120',
        isQuery: '0',
        queryMode: 'single',
        fieldDefaultValue: '',
        fieldExtendJson: '',
        converter: '',
        fieldHref: '',
        fieldValidType: '',
        fieldMustInput: '0',
        dictTable: '',
        dictField: '',
        dictText: '',
        mainTable: '',
        mainField: '',
        queryShowType: undefined,
        queryDictTable: '',
        queryDictField: '',
        queryDictText: '',
        queryDefVal: '',
        queryConfigFlag: ''
    },
    {
        key: '2',
        id: '2',
        dbFieldName: 'create_by',
        dbFieldTxt: '创建人',
        dbLength: 50,
        dbPointLength: 0,
        dbIsKey: false,
        dbIsNull: true,
        dbDefaultVal: '',
        dbType: 'String',
        isShowForm: '0',
        isShowList: '0',
        sortFlag: '0',
        isReadOnly: '0',
        fieldShowType: 'text',
        fieldLength: '120',
        isQuery: '0',
        queryMode: 'single',
        fieldDefaultValue: '',
        fieldExtendJson: '',
        converter: '',
        fieldHref: '',
        fieldValidType: '',
        fieldMustInput: '0',
        dictTable: '',
        dictField: '',
        dictText: '',
        mainTable: '',
        mainField: '',
        queryShowType: undefined,
        queryDictTable: '',
        queryDictField: '',
        queryDictText: '',
        queryDefVal: '',
        queryConfigFlag: ''
    },
    {
        key: '3',
        id: '3',
        dbFieldName: 'create_time',
        dbFieldTxt: '创建时间',
        dbLength: 20,
        dbPointLength: 0,
        dbIsKey: false,
        dbIsNull: true,
        dbDefaultVal: '',
        dbType: 'Date',
        isShowForm: '0',
        isShowList: '0',
        sortFlag: '0',
        isReadOnly: '0',
        fieldShowType: 'date',
        fieldLength: '120',
        isQuery: '0',
        queryMode: 'single',
        fieldDefaultValue: '',
        fieldExtendJson: '',
        converter: '',
        fieldHref: '',
        fieldValidType: '',
        fieldMustInput: '0',
        dictTable: '',
        dictField: '',
        dictText: '',
        mainTable: '',
        mainField: '',
        queryShowType: undefined,
        queryDictTable: '',
        queryDictField: '',
        queryDictText: '',
        queryDefVal: '',
        queryConfigFlag: ''
    },
    {
        key: '4',
        id: '4',
        dbFieldName: 'update_by',
        dbFieldTxt: '更新人',
        dbLength: 50,
        dbPointLength: 0,
        dbIsKey: false,
        dbIsNull: true,
        dbDefaultVal: '',
        dbType: 'String',
        isShowForm: '0',
        isShowList: '0',
        sortFlag: '0',
        isReadOnly: '0',
        fieldShowType: 'text',
        fieldLength: '120',
        isQuery: '0',
        queryMode: 'single',
        fieldDefaultValue: '',
        fieldExtendJson: '',
        converter: '',
        fieldHref: '',
        fieldValidType: '',
        fieldMustInput: '0',
        dictTable: '',
        dictField: '',
        dictText: '',
        mainTable: '',
        mainField: '',
        queryShowType: undefined,
        queryDictTable: '',
        queryDictField: '',
        queryDictText: '',
        queryDefVal: '',
        queryConfigFlag: ''
    },
    {
        key: '5',
        id: '5',
        dbFieldName: 'update_time',
        dbFieldTxt: '更新时间',
        dbLength: 20,
        dbPointLength: 0,
        dbIsKey: false,
        dbIsNull: true,
        dbDefaultVal: '',
        dbType: 'Date',
        isShowForm: '0',
        isShowList: '0',
        sortFlag: '0',
        isReadOnly: '0',
        fieldShowType: 'date',
        fieldLength: '120',
        isQuery: '0',
        queryMode: 'single',
        fieldDefaultValue: '',
        fieldExtendJson: '',
        converter: '',
        fieldHref: '',
        fieldValidType: '',
        fieldMustInput: '0',
        dictTable: '',
        dictField: '',
        dictText: '',
        mainTable: '',
        mainField: '',
        queryShowType: undefined,
        queryDictTable: '',
        queryDictField: '',
        queryDictText: '',
        queryDefVal: '',
        queryConfigFlag: ''
    },
    {
        key: '6',
        id: '6',
        dbFieldName: 'sys_org_code',
        dbFieldTxt: '所属部门',
        dbLength: 64,
        dbPointLength: 0,
        dbIsKey: false,
        dbIsNull: true,
        dbDefaultVal: '',
        dbType: 'String',
        isShowForm: '0',
        isShowList: '0',
        sortFlag: '0',
        isReadOnly: '0',
        fieldShowType: 'text',
        fieldLength: '120',
        isQuery: '0',
        queryMode: 'single',
        fieldDefaultValue: '',
        fieldExtendJson: '',
        converter: '',
        fieldHref: '',
        fieldValidType: '',
        fieldMustInput: '0',
        dictTable: '',
        dictField: '',
        dictText: '',
        mainTable: '',
        mainField: '',
        queryShowType: undefined,
        queryDictTable: '',
        queryDictField: '',
        queryDictText: '',
        queryDefVal: '',
        queryConfigFlag: ''
    }
];
//  字段模板
const fieldsTemp = [
    {
        key: '1',
        id: '1',
        dbFieldName: 'id',
        dbFieldTxt: '主键',
        dbLength: 36,
        dbPointLength: 0,
        dbIsKey: true,
        dbIsNull: false,
        dbDefaultVal: '',
        dbType: 'String',
        isShowForm: '0',
        isShowList: '0',
        sortFlag: '0',
        isReadOnly: '0',
        fieldShowType: 'text',
        fieldLength: '120',
        isQuery: '0',
        queryMode: 'single',
        fieldDefaultValue: '',
        fieldExtendJson: '',
        converter: '',
        fieldHref: '',
        fieldValidType: '',
        fieldMustInput: '0',
        dictTable: '',
        dictField: '',
        dictText: '',
        mainTable: '',
        mainField: '',
        queryShowType: undefined,
        queryDictTable: '',
        queryDictField: '',
        queryDictText: '',
        queryDefVal: '',
        queryConfigFlag: ''
    },
    {
        key: '2',
        id: '2',
        dbFieldName: 'create_by',
        dbFieldTxt: '创建人',
        dbLength: 50,
        dbPointLength: 0,
        dbIsKey: false,
        dbIsNull: true,
        dbDefaultVal: '',
        dbType: 'String',
        isShowForm: '0',
        isShowList: '0',
        sortFlag: '0',
        isReadOnly: '0',
        fieldShowType: 'text',
        fieldLength: '120',
        isQuery: '0',
        queryMode: 'single',
        fieldDefaultValue: '',
        fieldExtendJson: '',
        converter: '',
        fieldHref: '',
        fieldValidType: '',
        fieldMustInput: '0',
        dictTable: '',
        dictField: '',
        dictText: '',
        mainTable: '',
        mainField: '',
        queryShowType: undefined,
        queryDictTable: '',
        queryDictField: '',
        queryDictText: '',
        queryDefVal: '',
        queryConfigFlag: ''
    },
    {
        key: '3',
        id: '3',
        dbFieldName: 'create_time',
        dbFieldTxt: '创建时间',
        dbLength: 20,
        dbPointLength: 0,
        dbIsKey: false,
        dbIsNull: true,
        dbDefaultVal: '',
        dbType: 'Date',
        isShowForm: '0',
        isShowList: '0',
        sortFlag: '0',
        isReadOnly: '0',
        fieldShowType: 'date',
        fieldLength: '120',
        isQuery: '0',
        queryMode: 'single',
        fieldDefaultValue: '',
        fieldExtendJson: '',
        converter: '',
        fieldHref: '',
        fieldValidType: '',
        fieldMustInput: '0',
        dictTable: '',
        dictField: '',
        dictText: '',
        mainTable: '',
        mainField: '',
        queryShowType: undefined,
        queryDictTable: '',
        queryDictField: '',
        queryDictText: '',
        queryDefVal: '',
        queryConfigFlag: ''
    },
    {
        key: '4',
        id: '4',
        dbFieldName: 'update_by',
        dbFieldTxt: '更新人',
        dbLength: 50,
        dbPointLength: 0,
        dbIsKey: false,
        dbIsNull: true,
        dbDefaultVal: '',
        dbType: 'String',
        isShowForm: '0',
        isShowList: '0',
        sortFlag: '0',
        isReadOnly: '0',
        fieldShowType: 'text',
        fieldLength: '120',
        isQuery: '0',
        queryMode: 'single',
        fieldDefaultValue: '',
        fieldExtendJson: '',
        converter: '',
        fieldHref: '',
        fieldValidType: '',
        fieldMustInput: '0',
        dictTable: '',
        dictField: '',
        dictText: '',
        mainTable: '',
        mainField: '',
        queryShowType: undefined,
        queryDictTable: '',
        queryDictField: '',
        queryDictText: '',
        queryDefVal: '',
        queryConfigFlag: ''
    },
    {
        key: '5',
        id: '5',
        dbFieldName: 'update_time',
        dbFieldTxt: '更新时间',
        dbLength: 20,
        dbPointLength: 0,
        dbIsKey: false,
        dbIsNull: true,
        dbDefaultVal: '',
        dbType: 'Date',
        isShowForm: '0',
        isShowList: '0',
        sortFlag: '0',
        isReadOnly: '0',
        fieldShowType: 'date',
        fieldLength: '120',
        isQuery: '0',
        queryMode: 'single',
        fieldDefaultValue: '',
        fieldExtendJson: '',
        converter: '',
        fieldHref: '',
        fieldValidType: '',
        fieldMustInput: '0',
        dictTable: '',
        dictField: '',
        dictText: '',
        mainTable: '',
        mainField: '',
        queryShowType: undefined,
        queryDictTable: '',
        queryDictField: '',
        queryDictText: '',
        queryDefVal: '',
        queryConfigFlag: ''
    },
    {
        key: '6',
        id: '6',
        dbFieldName: 'sys_org_code',
        dbFieldTxt: '所属部门',
        dbLength: 64,
        dbPointLength: 0,
        dbIsKey: false,
        dbIsNull: true,
        dbDefaultVal: '',
        dbType: 'String',
        isShowForm: '0',
        isShowList: '0',
        sortFlag: '0',
        isReadOnly: '0',
        fieldShowType: 'text',
        fieldLength: '120',
        isQuery: '0',
        queryMode: 'single',
        fieldDefaultValue: '',
        fieldExtendJson: '',
        converter: '',
        fieldHref: '',
        fieldValidType: '',
        fieldMustInput: '0',
        dictTable: '',
        dictField: '',
        dictText: '',
        mainTable: '',
        mainField: '',
        queryShowType: undefined,
        queryDictTable: '',
        queryDictField: '',
        queryDictText: '',
        queryDefVal: '',
        queryConfigFlag: ''
    }
];
// 自定义按钮 表格
const btnColumns = [
    {
        title: '按钮编码',
        dataIndex: 'buttonCode',
        align: 'center'
    },
    {
        title: '按钮名称',
        dataIndex: 'buttonName',
        align: 'center'
    },
    {
        title: '按钮样式',
        dataIndex: 'buttonStyle',
        align: 'center'
    },
    {
        title: '按钮类型',
        dataIndex: 'optType',
        align: 'center'
    },
    {
        title: '排序',
        dataIndex: 'orderNum',
        align: 'center'
    },
    {
        title: '按钮图标',
        dataIndex: 'buttonIcon',
        align: 'center'
    },
    {
        title: '表达式',
        dataIndex: 'exp',
        align: 'center'
    },
    {
        title: '按钮状态',
        dataIndex: 'buttonStatus',
        align: 'center',
        scopedSlots: { customRender: 'buttonStatus' }
    },
    {
        title: '操作',
        dataIndex: 'oprtn',
        align: 'center',
        scopedSlots: { customRender: 'oprtn' }
    }
];
// 自定义按钮 表格数据
const btnData = [];

const data = [];
// 高级查询--表格
const saveColumns = [
    {
        title: '保存的查询',
        dataIndex: 'saveSearch',
        scopedSlots: { customRender: 'name' }
    }
];
const saveData = [];
const formCategoryList = [
    {
        value: '',
        text: '请选择'
    },
    {
        value: 'officialexample',
        text: '官方示例'
    },
    {
        value: 'processForm',
        text: '流程表单'
    },
    {
        value: 'testForm',
        text: '测试表单'
    },
    {
        value: 'inputForm',
        text: '导入表单'
    }
];

const headTemp = {
    formCategory: '',
    formTemplate: '1',
    idType: 'UUID',
    isCheckbox: 'Y',
    isPage: 'Y',
    isTree: 'N',
    queryMode: 'single',
    scroll: 'Y',
    tableName: '',
    tableTxt: '',
    tableType: 1,
    relationType: 0,
    tabOrderNum: 1,
    themeTemplate: 'normal',
    treeParentIdField: 'pid',
    treeIdField: 'has_child',
    treeFieldname: ''
};
// 导入数据库表--表格
const columnsForm = [
    {
        title: '#',
        dataIndex: 'key',
        scopedSlots: { customRender: 'key' },
        align: 'center',
        width: 70
    },
    {
        title: '表名',
        dataIndex: 'name',
        align: 'left'
    }
];
const dataForm = [];
// 字段权限
const fieldsColumns = [
    {
        title: '启用',
        dataIndex: 'using',
        align: 'center',
        width: 100,
        scopedSlots: { customRender: 'using' }
    },
    {
        title: '字段名称',
        dataIndex: 'money',
        width: 180
    },
    {
        title: '字段描述',
        dataIndex: 'fieldsText',
        width: 180
    },
    {
        title: '列表控制',
        dataIndex: 'listOper',
        width: 130,
        scopedSlots: { customRender: 'listOper' }
    },
    {
        title: '表单控制',
        dataIndex: 'formOperShow',
        width: 180,
        scopedSlots: { customRender: 'formOper' }
    }
];
const fieldsData = [
    {
        key: '1',
        using: false,
        money: '￥300,000.00',
        fieldsText: 'New York No. ',
        listOper: false,
        formOperShow: false,
        formOperEdit: false
    },
    {
        key: '2',
        using: false,
        money: '￥1,256,000.00',
        fieldsText: 'New York No. ',
        listOper: false,
        formOperShow: false,
        formOperEdit: false
    }
];
// 按钮权限
const buttonColumns = [
    {
        title: '启用',
        dataIndex: 'use',
        align: 'center',
        width: 80,
        scopedSlots: { customRender: 'use' }
    },
    {
        title: '名称',
        dataIndex: 'name',
        align: 'center'
    },
    {
        title: '编码',
        dataIndex: 'encoding',
        align: 'center'
    },
    {
        title: '权限控制',
        dataIndex: 'powerControl',
        align: 'center'
    }
];
const buttonData = [
    {
        key: '1',
        use: false,
        name: '新增',
        encoding: 'add',
        powerControl: '可见'
    },
    {
        key: '2',
        use: false,
        name: '编辑',
        encoding: 'update',
        powerControl: '可见'
    },
    {
        key: '3',
        use: false,
        name: '删除',
        encoding: 'delete',
        powerControl: '可见'
    },
    {
        key: '4',
        use: false,
        name: '批量删除',
        encoding: 'batch_delete',
        powerControl: '可见'
    },
    {
        key: '5',
        use: false,
        name: '导出',
        encoding: 'export',
        powerControl: '可见'
    },
    {
        key: '6',
        use: false,
        name: '导入',
        encoding: 'import',
        powerControl: '可见'
    },
    {
        key: '7',
        use: false,
        name: '提交流程',
        encoding: 'bpm',
        powerControl: '可见'
    },
    {
        key: '8',
        use: false,
        name: '高级查询',
        encoding: 'super_query',
        powerControl: '可见'
    }
];
// 数据权限
const dataColumns = [
    {
        title: '启用',
        dataIndex: 'invoke',
        width: 80,
        align: 'center',
        scopedSlots: { customRender: 'invoke' }
    },
    {
        title: '规则名称',
        dataIndex: 'ruleName',
        align: 'center'
    },
    {
        title: '规则描述',
        dataIndex: 'ruleExplain',
        align: 'center'
    },
    {
        title: '操作',
        dataIndex: 'handle',
        width: 120,
        align: 'center'
    }
];
const dataPrivilege = [];

// 代码生成 子表信息
const sublist = [];
const sublistData = [];

import { getOnlineFormPage, checkOnlyTable, createForm, updateForm, indexSearch, fieldSearch, delOnlineForm, doDbSynch, removeRecord, deleteBatch } from '@/api/onlineForm';
import { getBtnFormPage, AddBtnForm, deleteButton, btnDeleteBatch, EditBtnForm, tableInfo, codeGenerate, downGenerateCode } from '@/api/onlineFormCtmBtn';
import { JavaByButtonCode, enhanceJava, addenhanceJava, queryTables, activityBtn } from '@/api/javaEnhance';
import CodeMirrorForJs from '@/components/codeMirrorForJs';

require('codemirror/lib/codemirror');
require('codemirror/mode/sql/sql');
require('codemirror/addon/hint/show-hint');
require('codemirror/addon/hint/sql-hint');
let CodeMirror = require('codemirror/lib/codemirror');
let sqlKeyWords = CodeMirror.resolveMode('text/x-mysql').keywords;

export default {
    components: {
        'v-code-mirror': CodeMirrorForJs
    },
    props: ['canDo'],
    watch: {
        canDo(val) {
            if (val) {
                this.getTemplateList();
            }
        }
    },
    data() {
        return {
            // btnType:{

            // },
            sqlForm: {
                sqlPageBtn: '',
                sqlCode: '',
                sqlExp: ''
            },
            visibleTwelve: false,
            allFormValue: '',
            coupon: '',
            codeList: '',
            hostSub: '',
            jspModeListOne: '',
            jspModeList: '',
            hostTableFormInfo: '',
            changeValue: '',
            sublist,
            sublistData,
            visibleEleven: false,
            upper: '',
            filePath: '',
            visibleTen: false,
            tableFormInfo: '',
            editBtnData: '',
            btnData,
            BtnFormList: [],
            dataPrivilege,
            dataColumns,
            buttonData,
            buttonColumns,
            disabled: true,
            disabledShow: true,
            disabledEdit: true,
            fieldsData,
            fieldsColumns,
            visibleOpen: false,
            buttonWidth: 70,
            valueText: '',
            data,
            addColumns1,
            addColumns2,
            addColumns3,
            addColumns4,
            addColumns5,
            addColumns6,
            columns1,
            btnColumns,
            dataForm,
            advancedForm: this.$form.createForm(this),
            columnsForm,
            textFields,
            fieldShowTypeList,
            fieldValidTypeList,
            queryShowTypeList,
            btnSelectedRowKeys: [],
            selectedRowKeys: [], //  模板表格选中的keys
            selectedRowsto: [],
            addSelectedRowKeys: [], //  字段选中的keys
            indexSelectedRowKeys: [], //  外键选中的keys
            selectedRows: [],
            pagination: {
                size: 'small',
                total: 100,
                current: 1,
                pageSize: 10,
                'show-size-changer': true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} 共 ${total} 条`
            },
            templateLoading: false,
            loading: false,
            loading2: false,
            loading3: false,
            loading4: false,
            loading5: false,
            loading8: false,
            visible: false,
            visible1: false,
            visible2: false,
            visible3: false,
            visible4: false,
            visible5: false,
            visible7: false,
            visible8: false,
            visible9: false,
            saveData,
            saveColumns,
            loading6: false,
            visible6: false,
            formLayout: 'inline',
            addBodyStyle: {
                height: 'calc(100vh - 108px)',
                overflow: 'auto'
            },
            addDialogStyle: {
                height: '100%',
                top: 0,
                flex: 1,
                padding: 0,
                'min-width': '1200px'
            },
            count: 7,
            indexsCount: 1,
            indexs: [],
            head: {
                formCategory: '',
                formTemplate: '1',
                idType: 'UUID',
                isCheckbox: 'Y',
                isPage: 'Y',
                isTree: 'N',
                queryMode: 'single',
                scroll: 'Y',
                tableName: '',
                tableTxt: '',
                tableType: 1,
                relationType: 0,
                tabOrderNum: 1,
                themeTemplate: 'normal',
                treeParentIdField: 'pid',
                treeIdField: 'has_child',
                treeFieldname: ''
            },
            headTemp,
            fields,
            fieldsTemp,
            formCategoryList,
            formItemLayu: {
                labelCol: {
                    sm: { span: 5 }
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 16 }
                }
            },
            FormItmLyut: {
                wrapperCol: {
                    sm: {
                        span: 16,
                        offset: 8
                    }
                }
            },
            searchData: {
                tableName: '',
                tableType: '',
                tableTxt: '',
                formCategory: '',
                isDbSynch: '',
                createTime: ''
            },
            jsCode: '',
            editStatus: false,
            amendStatus: false,

            headRules: {
                tableName: [
                    { required: true, message: '请输入表名！', trigger: 'blur' },
                    { validator: this.checkOnlyTableName, trigger: 'blur' }
                ],
                tableTxt: [{ required: true, message: '请输入表说明！', trigger: 'blur' }],
                tabOrderNum: [{ required: true, message: '请输入序号！', trigger: 'blur' }],
                treeParentIdField: [{ required: true, message: '请输入树表单父ID！', trigger: 'blur' }],
                treeFieldname: [{ required: true, message: '请输入树开表单列字段名！', trigger: 'blur' }]
            },
            dbSynchVisible: false,
            dbSynchObj: {
                code: '',
                synMethod: 'normal'
            },
            dbSynchloading: false,
            deleteFieldIds: [],
            deleteIndexIds: [],
            orderColumn: 'createTime',
            orderOrder: 'desc',
            formRule: {
                name: '',
                region: undefined,
                ruleField: undefined,
                ruleValue: '',
                resource: 'a'
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入规则名称！',
                        trigger: 'change'
                    }
                ],
                region: [
                    {
                        required: true,
                        message: '请选择条件规则！',
                        trigger: 'change'
                    }
                ],
                ruleValue: [
                    {
                        required: true,
                        message: '请输入规则值！',
                        trigger: 'change'
                    }
                ]
            },
            priceForm: {
                catalog: '',
                style: '',
                explain: '',
                formName: '',
                entityClass: '',
                packetName: '',
                codeStyle: '业务分层'
            },
            system: {
                catalog: [{ required: true, message: '请选择代码生成目录！', trigger: ['change', 'blur'] }],
                formName: [{ required: true, message: '请输入表名！', trigger: ['change', 'blur'] }],
                entityClass: [{ required: true, message: '请输入实体类名！', trigger: ['change', 'blur'] }],
                packetName: [{ required: true, message: '请输入包名！', trigger: ['change', 'blur'] }]
            },
            hostForm: {
                catalog: '',
                style: '',
                explain: '',
                formName: '',
                entityClass: '',
                packetName: '',
                codeStyle: '业务分层'
            },
            host: {
                catalog: [{ required: true, message: '请选择代码生成目录！', trigger: ['change', 'blur'] }],
                formName: [{ required: true, message: '请输入表名！', trigger: ['change', 'blur'] }],
                entityClass: [{ required: true, message: '请输入实体类名！', trigger: ['change', 'blur'] }],
                packetName: [{ required: true, message: '请输入包名！', trigger: ['change', 'blur'] }]
            },
            sonForm: {},
            pageBtnType: 'add'
        };
    },
    computed: {
        hasSelected() {
            return this.selectedRowKeys.length > 0;
        },
        Selected() {
            return this.btnSelectedRowKeys.length > 0;
        },
        formItemLayout() {
            const { formLayout } = this;
            return formLayout === 'inline'
                ? {
                      labelCol: { span: 8 },
                      wrapperCol: { span: 14 }
                  }
                : {};
        },
        rowSelection() {
            return {
                selectedRowKeys: this.addSelectedRowKeys,
                onChange: (selectedRowKeys, selectedRows) => {
                    this.addSelectedRowKeys = selectedRowKeys;
                    this.selectedRows = selectedRows;
                },
                getCheckboxProps: (record) => ({
                    props: {
                        disabled: record.dbFieldName === 'id' // Column configuration not to be checked
                    }
                })
            };
        },
        // 导入数据库--表格
        rowSelectionData() {
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
    created() {
        this.form = this.$form.createForm(this, { name: 'register' });
        if (this.canDo) {
            this.getTemplateList();
        }
    },
    methods: {
        //  表格 初始加载和搜索
        getTemplateList(page) {
            this.templateLoading = true;
            let _this = this;
            // console.log(this.searchData);
            getOnlineFormPage({
                pageNo: page == 1 ? 1 : this.pagination.current,
                pageSize: this.pagination.pageSize,
                tableName: this.searchData.tableName,
                tableType: this.searchData.tableType || '',
                formCategory: this.searchData.formCategory,
                isDbSynch: this.searchData.isDbSynch,
                tableTxt: this.searchData.tableTxt,
                createTime: this.searchData.createTime,
                column: this.orderColumn,
                order: this.orderOrder,
                copyType: 0,
                tableTypeStr: ''
            })
                .then((res) => {
                    console.log(res);
                    this.templateLoading = false;
                    let page = res.result;
                    this.data = page?.records;
                    Object.assign(this.pagination, {
                        current: page.current,
                        pageSize: page.size,
                        total: page.total
                    });
                })
                .catch((err) => {
                    console.log(err);
                    this.templateLoading = false;
                    this.$message.error(err);
                });
        },
        //  重置搜索
        restTempPage() {
            Object.assign(this.searchData, {
                tableName: '',
                tableType: '',
                formCategory: '',
                isDbSynch: '',
                tableTxt: '',
                createTime: ''
            });
            this.getTemplateList(1);
        },
        //  翻页
        handlSearchPage(page, filters, sorter) {
            this.orderColumn = sorter.order ? sorter.field : 'createTime';
            this.orderOrder = sorter.order == 'ascend' ? 'asc' : 'desc';
            Object.assign(this.pagination, {
                current: page.current,
                pageSize: page.pageSize
            });
            this.getTemplateList();
        },
        log(e) {},
        //  表格
        start() {
            this.loading = true;
            // ajax request after empty completing
            this.loading = false;
            this.selectedRowKeys = [];
        },
        //  初始展示表格勾选
        onSelectChange(selectedRowKeys, selectedRows) {
            this.selectedRowsto = selectedRows;
            this.selectedRowKeys = selectedRowKeys;
            // console.log(selectedRowKeys);
        },
        //  新增模态框
        showModal() {
            this.visible = true;
        },
        //
        changeHeadTableType(value) {
            if (value == 3) {
                this.head.relationType = 0;
                this.tabOrderNum = 1;
            }
        },
        //  新增modal点击确定
        addHandleOk(e) {
            if (this.editStatus) {
                this.editTableTemplate();
            } else {
                this.addTableTemplate();
            }
        },
        //  新增 创建表单接口
        addTableTemplate() {
            this.$refs.headForm.validate((valid) => {
                if (valid) {
                    let addTemplate = {};
                    addTemplate.indexs = this.indexs;
                    addTemplate.fields = this.fields;
                    addTemplate.head = this.head;
                    addTemplate.head.scroll = addTemplate.head.scroll == 'Y' ? 1 : 0;
                    if (addTemplate.head.tableType !== 3) {
                        delete addTemplate.head.relationType;
                    }
                    if (addTemplate.head.isTree == 'N') {
                        delete addTemplate.head.treeParentIdField;
                        delete addTemplate.head.treeIdField;
                        delete addTemplate.head.treeFieldname;
                    }
                    let checks = false;
                    for (let i = 0; i < addTemplate.fields.length; i++) {
                        let element = addTemplate.fields[i];
                        element.dbIsKey = element.dbIsKey == '1' || element.dbIsKey == true ? 1 : 0;
                        element.dbIsNull = element.dbIsNull == '1' || element.dbIsNull == true ? 1 : 0;
                        element.isShowForm = element.isShowForm == '1' || element.isShowForm == true ? 1 : 0;
                        element.isShowList = element.isShowList == '1' || element.isShowList == true ? 1 : 0;
                        element.sortFlag = element.sortFlag == '1' || element.sortFlag == true ? 1 : 0;
                        element.isReadOnly = element.isReadOnly == '1' || element.isReadOnly == true ? 1 : 0;
                        element.isQuery = element.isQuery == '1' || element.isQuery == true ? 1 : 0;
                        element.fieldMustInput = element.fieldMustInput == '1' || element.fieldMustInput == true ? 1 : 0;
                        element.queryConfigFlag = element.queryConfigFlag == '1' || element.queryConfigFlag == true ? 1 : 0;
                        element.orderNum = element.key;
                        if (element.dbFieldName_clicked || element.dbFieldTxt_clicked || element.fieldShowType_clicked) {
                            checks = true;
                            continue;
                        }
                        delete element.id;
                        delete element.key;
                        delete element.clicked;
                        delete element.dbFielNameCheck;
                        delete element.dbFieldName_clicked;
                        delete element.dbFielNameChecked;
                        delete element.dbFieldTxt_clicked;
                        delete element.fieldShowTypeCheck;
                        delete element.fieldShowType_clicked;
                    }
                    if (checks) {
                        return false;
                    }
                    for (let i = 0; i < addTemplate.indexs.length; i++) {
                        let element = addTemplate.indexs[i];
                        element.indexField = element.indexField.join(',');
                    }
                    createForm(addTemplate)
                        .then((res) => {
                            this.$message.success(res.message);
                            this.resetAddTemp();
                            this.visible = false;
                            this.getTemplateList();
                        })
                        .catch((err) => {
                            this.$message.error(err);
                        });
                } else {
                    this.$message.error('请填选正确信息!!');
                    return false;
                }
            });
        },
        editTableTemplate() {
            this.$refs.headForm.validate((valid) => {
                if (valid) {
                    let editTmplate = {};
                    editTmplate.indexs = this.indexs;
                    editTmplate.fields = this.fields;
                    editTmplate.head = this.head;
                    if (editTmplate.head.tableType !== 3) {
                        delete editTmplate.head.relationType;
                    }
                    if (editTmplate.head.isTree == 'N') {
                        delete editTmplate.head.treeParentIdField;
                        delete editTmplate.head.treeIdField;
                        delete editTmplate.head.treeFieldname;
                    }
                    editTmplate.head.scroll = editTmplate.head.scroll == 'Y' ? 1 : 0;
                    let checks = false;
                    for (let i = 0; i < editTmplate.fields.length; i++) {
                        let element = editTmplate.fields[i];
                        element.dbIsKey = element.dbIsKey == '1' || element.dbIsKey == true ? 1 : 0;
                        element.dbIsNull = element.dbIsNull == '1' || element.dbIsNull == true ? 1 : 0;
                        element.isShowForm = element.isShowForm == '1' || element.isShowForm == true ? 1 : 0;
                        element.isShowList = element.isShowList == '1' || element.isShowList == true ? 1 : 0;
                        element.sortFlag = element.sortFlag == '1' || element.sortFlag == true ? 1 : 0;
                        element.isReadOnly = element.isReadOnly == '1' || element.isReadOnly == true ? 1 : 0;
                        element.isQuery = element.isQuery == '1' || element.isQuery == true ? 1 : 0;
                        element.fieldMustInput = element.fieldMustInput == '1' || element.fieldMustInput == true ? 1 : 0;
                        element.queryConfigFlag = element.queryConfigFlag == '1' || element.queryConfigFlag == true ? 1 : 0;
                        if (element.dbFieldName_clicked || element.dbFieldTxt_clicked || element.fieldShowType_clicked) {
                            checks = true;
                            continue;
                        }
                        delete element.key;
                        delete element.clicked;
                        delete element.dbFielNameCheck;
                        delete element.dbFieldName_clicked;
                        delete element.dbFielNameChecked;
                        delete element.dbFieldTxt_clicked;
                        delete element.fieldShowTypeCheck;
                        delete element.fieldShowType_clicked;
                    }
                    if (checks) {
                        console.log('checks', checks);
                        return false;
                    }
                    for (let i = 0; i < editTmplate.indexs.length; i++) {
                        let element = editTmplate.indexs[i];
                        element.indexField = element.indexField.join(',');
                    }
                    editTmplate.deleteFieldIds = this.deleteFieldIds;
                    editTmplate.deleteIndexIds = this.deleteIndexIds;
                    console.log(editTmplate.deleteIndexIds);
                    updateForm(editTmplate)
                        .then((res) => {
                            this.$message.success(res.message);
                            this.resetAddTemp();
                            this.visible = false;
                            this.getTemplateList();
                        })
                        .catch((err) => {
                            console.log(err);
                            this.$message.error(err);
                        });
                } else {
                    this.$message.error('请填选正确信息!!');
                    return false;
                }
            });
        },
        //  新增modal点击取消
        addHandleCancel(e) {
            this.resetAddTemp();
        },
        //  重置新增modal的数据
        resetAddTemp() {
            this.$refs.headForm.clearValidate();
            this.deleteFieldIds = [];
            this.deleteIndexIds = [];
            this.fields = JSON.parse(JSON.stringify(this.fieldsTemp));
            this.addSelectedRowKeys = [];
            this.selectedRows = [];
            this.count = 7;
            this.indexs = [];
            this.indexSelectedRowKeys = [];
            this.indexsCount = 1;
            this.head = JSON.parse(JSON.stringify(this.headTemp));
            this.editStatus = false;
        },
        callback(key) {},
        //  新增 表格新增空白列
        addOneRow() {
            const { count, fields } = this;
            let newData = {
                key: count,
                id: count,
                dbFieldName: '',
                dbFieldTxt: '',
                dbLength: 32,
                dbPointLength: 0,
                dbIsKey: false,
                dbIsNull: true,
                dbDefaultVal: '',
                dbType: 'String',
                isShowForm: '1',
                isShowList: '1',
                sortFlag: '0',
                isReadOnly: '0',
                fieldShowType: 'text',
                fieldLength: '120',
                isQuery: '0',
                queryMode: 'single',
                fieldDefaultValue: '',
                fieldExtendJson: '',
                converter: '',
                fieldHref: '',
                fieldValidType: '',
                fieldMustInput: '0',
                dictTable: '',
                dictField: '',
                dictText: '',
                mainTable: '',
                mainField: '',
                queryShowType: 'text',
                queryDictTable: '',
                queryDictField: '',
                queryDictText: '',
                queryDefVal: '',
                queryConfigFlag: ''
            };
            this.fields = [...fields, newData];
            this.count = count + 1;
        },
        //  新增 删除选择的表格列
        delAddRows() {
            let newRows = [];
            this.fields.forEach((item) => {
                if (this.addSelectedRowKeys.indexOf(item.key) == -1) {
                    newRows.push(item);
                } else {
                    this.deleteFieldIds.push(item.id);
                }
            });
            newRows.map((item, index) => {
                item.key = index + 1 + '';
            });
            this.addSelectedRowKeys = [];
            this.count = newRows.length + 1;
            this.fields = newRows;
        },
        //  新增 清楚表格选择项
        clearSelectKeys() {
            (this.addSelectedRowKeys = []), (this.selectedRows = []);
        },
        handleChange(value, key, col) {
            const newData = [...this.fields];
            const target = newData.filter((item) => key === item.id)[0];
            let check = false;
            let checked = false;
            if (col == 'dbFieldName') {
                if (sqlKeyWords[value]) {
                    check = true;
                }
                const data = newData.filter((item) => value === item.dbFieldName);
                if (data.length > 0) {
                    checked = true;
                }
            }
            if (target) {
                target[col] = value;
                if (checked) {
                    target.dbFielNameChecked = true;
                } else {
                    target.dbFielNameChecked = false;
                }
                if (check) {
                    target.dbFielNameCheck = true;
                } else {
                    target.dbFielNameCheck = false;
                }
                this.data = newData;
            }
        },
        //  新增 选择字段类型时重新默认对应的字段长度
        handleSelectChange(value, key, col) {
            const newData = [...this.fields];
            const target = newData.filter((item) => key === item.id)[0];
            console.log(key);
            if (target) {
                target[col] = value;
                if ('dbType' == col) {
                    if (value == 'String') {
                        target['dbLength'] = 32;
                    } else if (value == 'int' || value == 'double' || value == 'BigDecimal') {
                        target['dbLength'] = 10;
                    } else if (value == 'Date' || value == 'Text' || value == 'Blob') {
                        target['dbLength'] = 0;
                    }
                    if (value == 'Date') {
                        target['fieldShowType'] = 'date';
                    }
                }
                if ('fieldShowType' == col) {
                    if (value == 'date' || value == 'datetime') {
                        if (target.dbType !== 'Date') {
                            target.fieldShowTypeCheck = true;
                        } else {
                            target.fieldShowTypeCheck = false;
                        }
                    }
                }
                this.data = newData;
            }
        },
        //  新增 改变表格数据
        handleIndexChange(value, key, col) {
            const newData = [...this.indexs];
            const target = newData.filter((item) => key === item.key)[0];

            if (target) {
                target[col] = value;
                this.indexs = newData;
            }
        },
        //  新增 选择字段类型时重新默认对应的字段长度
        handleIndexSelectChange(value, key, col) {
            const newData = [...this.indexs];
            const target = newData.filter((item) => key === item.key)[0];

            if (target) {
                target[col] = value;
                if ('dbType' == col) {
                    if (value == 'String') {
                        target['dbLength'] = 32;
                    } else if (value == 'int' || value == 'double' || value == 'BigDecimal') {
                        target['dbLength'] = 10;
                    } else if (value == 'Date' || value == 'Text' || value == 'Blob') {
                        target['dbLength'] = 0;
                    }
                    if (value == 'Date') {
                        target['fieldShowType'] = 'date';
                    }
                }
                if ('fieldShowType' == col) {
                    if (value == 'date' || value == 'datetime') {
                        if (target.dbType !== 'Date') {
                            target.fieldShowTypeCheck = true;
                        } else {
                            target.fieldShowTypeCheck = false;
                        }
                    }
                }
                this.indexs = newData;
            }
        },
        //  新增 当是否树选择为是时 添加表格数据
        changeIsTree(value) {
            let count = this.count;
            if (value == 'Y') {
                let pid = {
                    key: count + '',
                    id: count + '',
                    dbFieldName: 'pid',
                    dbFieldTxt: '父级节点',
                    dbLength: 32,
                    dbPointLength: 0,
                    dbIsKey: false,
                    dbIsNull: true,
                    dbDefaultVal: '',
                    dbType: 'String',
                    isShowForm: '1',
                    isShowList: '0',
                    sortFlag: '0',
                    isReadOnly: '0',
                    fieldShowType: 'text',
                    fieldLength: '120',
                    isQuery: '0',
                    queryMode: 'single',
                    fieldDefaultValue: '',
                    fieldExtendJson: '',
                    converter: '',
                    fieldHref: '',
                    fieldValidType: '',
                    fieldMustInput: '0',
                    dictTable: '',
                    dictField: '',
                    dictText: '',
                    mainTable: '',
                    mainField: '',
                    queryShowType: 'text',
                    queryDictTable: '',
                    queryDictField: '',
                    queryDictText: '',
                    queryDefVal: '',
                    queryConfigFlag: ''
                };
                count++;
                let hasChild = {
                    key: count + '',
                    id: count + '',
                    dbFieldName: 'has_child',
                    dbFieldTxt: '是否有子节点',
                    dbLength: 32,
                    dbPointLength: 0,
                    dbIsKey: false,
                    dbIsNull: true,
                    dbDefaultVal: '',
                    dbType: 'String',
                    isShowForm: '0',
                    isShowList: '0',
                    sortFlag: '0',
                    isReadOnly: '0',
                    fieldShowType: 'select',
                    fieldLength: '120',
                    isQuery: '0',
                    queryMode: 'single',
                    fieldDefaultValue: '',
                    fieldExtendJson: '',
                    converter: '',
                    fieldHref: '',
                    fieldValidType: '',
                    fieldMustInput: '0',
                    dictTable: '',
                    dictField: '',
                    dictText: '',
                    mainTable: '',
                    mainField: '',
                    queryShowType: 'text',
                    queryDictTable: '',
                    queryDictField: '',
                    queryDictText: '',
                    queryDefVal: '',
                    queryConfigFlag: ''
                };
                this.count = ++count;
                this.fields = [...this.fields, pid, hasChild];
            } else {
                let newFields = this.fields;
                for (let index = newFields.length - 1; index >= 0; index--) {
                    let element = newFields[index];
                    if (element.dbFieldName == 'pid' || element.dbFieldName == 'has_child') {
                        newFields.splice(index, 1);
                        continue;
                    }
                }
            }
        },
        //  外键 表格新增空白列
        addIndexRow() {
            const { indexsCount, indexs } = this;
            let newData = {
                key: indexsCount,
                indexName: '',
                indexField: '',
                indexType: 'normal'
            };
            this.indexs = [...indexs, newData];
            this.indexsCount = indexsCount + 1;
        },
        //  外键 删除选择的表格列
        delIndexRows() {
            let newRows = [];
            this.indexs.forEach((item) => {
                if (this.indexSelectedRowKeys.indexOf(item.key) == -1) {
                    newRows.push(item);
                } else {
                    this.deleteIndexIds.push(item.id);
                }
            });
            newRows.map((item, index) => {
                item.key = index + 1 + '';
            });
            this.indexSelectedRowKeys = [];
            this.indexsCount = newRows.length + 1;
            this.indexs = newRows;
        },
        // 自定义按钮
        ctmBtn() {
            if (this.selectedRowKeys.length == 1) {
                this.visible1 = true;
                this.getBtnForm(this.selectedRowKeys);
            } else {
                this.$message.warning('请先选中一条记录');
            }
        },
        // 根模板code查询自定义按钮接口
        getBtnForm(code) {
            getBtnFormPage({ code: code })
                .then((res) => {
                    this.BtnFormList = res.result.records;
                    this.btnData = res.result.records;
                })
                .catch((err) => {
                    this.$message.error(err);
                });
        },
        // 自定义按钮--模态框
        btnHandleOk(e) {
            this.visible1 = true;
        },
        // 自定义按钮模态框--初始化表格勾选
        selectChange(btnSelectedRowKeys) {
            this.btnSelectedRowKeys = btnSelectedRowKeys;
            // console.log(this.btnSelectedRowKeys);
        },
        // 自定义按钮模态框--取消
        open() {
            this.loading2 = true;
            // ajax request after empty completing
            this.loading2 = false;
            this.btnSelectedRowKeys = [];
        },
        // 自定义按钮--新增
        btnAdd() {
            this.visible3 = true;
            setTimeout(() => {
                this.form.setFieldsValue({
                    optType: 'link',
                    buttonStyle: 'js',
                    buttonStatus: 1
                });
            }, 200);
        },
        // 自定义按钮--新增模态框
        btnAddHandleOk(e) {
            this.loading3 = true;
        },
        backCancel(e) {
            this.visible3 = false;
        },
        // JS增强
        jsEnhance() {
            if (this.selectedRowKeys.length == 1) {
                this.visible2 = true;
            } else {
                this.$message.warning('请先选中一条记录');
            }
        },
        // JS增强--模态框
        jsHandleOk(e) {
            this.visible2 = false;
        },
        jsCancel() {
            this.visible2 = false;
        },
        // 在线代码编辑器
        getCode(val) {},
        // java增强
        javaEnhance() {
            if (this.selectedRowKeys.length == 1) {
                this.visible4 = true;
                setTimeout(() => {
                    this.form.setFieldsValue({
                        pageBtn: 'add',
                        eventState: 'end',
                        eventType: 'spring',
                        judge: '1',
                        pageContent: ''
                    });
                }, 20);
                this.getFormBtn();
            } else {
                this.$message.warning('请先选中一条记录');
            }
        },
        getFormBtn() {
            JavaByButtonCode({ formId: this.selectedRowKeys[0], buttonCode: this.pageBtnType })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                    // this.$message.error(err);
                });
        },
        // 事件状态选择--修改java增强接口
        onChoose(e) {
            console.log('radio checked', e.target.value);
            let javaFormValue = this.form.getFieldsValue();
            javaFormValue.id = this.selectedRowKeys[0];
            javaFormValue.eventType = e.target.value;
            if (javaFormValue.pageContent) {
                javaFormValue.pageContent = '';
                this.form.setFieldsValue({
                    pageContent: ''
                });
            }
            this.allFormValue = javaFormValue;

            enhanceJava({ formId: this.selectedRowKeys[0], obj: this.allFormValue })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                    this.$message.error(err);
                });
        },
        javaHandleOk(e) {
            // this.visible4 = false;
            // this.loading5 = false;
        },
        javaCancel() {
            this.visible4 = false;
        },
        // java增强新增接口
        javaSubmit(e) {
            e.preventDefault();
            this.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    addenhanceJava({
                        formId: this.selectedRowKeys[0],
                        buttonCode: values.pageBtn,
                        event: values.eventState,
                        cgJavaType: values.eventType,
                        cgJavaValue: values.pageContent,
                        activeStatus: values.judge
                    })
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err) => {
                            console.log(err);
                            this.$message.warning(err);
                        });
                    this.visible4 = false;
                    this.loading5 = false;
                }
            });
        },
        // 导入数据库表--模态框
        databaseModal() {
            this.visible5 = true;
            queryTables({})
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                    this.$message.error(err);
                });
        },
        // 导入数据库表--生成表单
        handleSubmit() {
            this.visible5 = false;
        },
        // 导入数据库表--关闭
        handleBack(e) {
            this.visible5 = false;
        },
        selecChange(value) {
            this.pageBtnType = value;
            this.getFormBtn();
            console.log(`selected ${value}`);
        },
        // 自定义按钮--展示表格勾选
        onSelect(btnSelectedRowKeys) {
            this.btnSelectedRowKeys = btnSelectedRowKeys;
        },
        // 自定义按钮模态框--确定
        hadSubmit(e) {
            if (this.amendStatus) {
                this.submitEditForm(e);
            } else {
                this.submitAddForm(e);
            }
        },
        submitAddForm(e) {
            const _this = this;
            e.preventDefault();
            this.form.validateFieldsAndScroll((err, values) => {
                console.log(values);
                if (!err) {
                    AddBtnForm({
                        cgformHeadId: _this.selectedRowKeys[0],
                        buttonCode: values.buttonCode,
                        buttonName: values.buttonName,
                        buttonStyle: values.buttonStyle,
                        optType: values.optType,
                        exp: values.exp,
                        buttonStatus: values.buttonStatus,
                        orderNum: values.orderNum,
                        buttonIcon: values.buttonIcon,
                        optPosition: '2'
                    })
                        .then((res) => {
                            this.visible3 = false;
                            this.$message.success(res.message);
                            this.getBtnForm(this.selectedRowKeys);
                        })
                        .catch((err) => {
                            this.$message.error(err);
                        });
                    // console.log('Received values of form: ', values);
                }
            });
        },
        submitEditForm(e) {
            e.preventDefault();
            this.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    const editBtnData = this.editBtnData;
                    values.id = editBtnData.id;
                    values.cgformHeadId = editBtnData.cgformHeadId;
                    values.optPosition = editBtnData.optPosition;
                    EditBtnForm(values)
                        .then((res) => {
                            this.visible3 = false;
                            this.getBtnForm(this.selectedRowKeys);
                            this.$message.success(res.message);
                        })
                        .catch((err) => {
                            this.$message.error(err);
                        });
                    // console.log('Received values of form: ', values);
                }
            });
        },
        checkbox() {},
        typtCheckbox() {},
        // JS增加的语句
        getCode(val) {
            this.jsCode = val;
        },
        // 表格编辑
        editTableTemp(record) {
            this.editStatus = true;
            this.head = record;
            this.head.scroll = scroll == 1 ? 'Y' : 'N';
            this.showModal();
            indexSearch({ headId: record.id })
                .then((res) => {
                    this.indexs = res.result;
                    this.indexsCount = res.result.length + 1;
                })
                .catch((err) => {
                    this.$message.error(err);
                });
            fieldSearch({ headId: record.id })
                .then((res) => {
                    this.fields = res.result;
                    this.fields.map((item, index) => {
                        item.key = index + 1;
                    });
                    this.count = res.result.length + 1;
                })
                .catch((err) => {
                    this.$message.error(err);
                });
        },
        // 验证表名是否已存在
        checkOnlyTableName(rule, value, callback) {
            if (value) {
                let id = '';
                if (this.editStatus) {
                    callback();
                    id = this.head.id;
                    return;
                } else {
                    checkOnlyTable({ tbname: value, id: id })
                        .then((res) => {
                            if (res.result > 0) {
                                callback();
                            } else {
                                callback('该表名已被使用!');
                            }
                        })
                        .catch((err) => {
                            this.$message.error(err);
                        });
                }
            }
        },
        // 表格点击删除确定
        delConfirm(record) {
            console.log('删除', record);
            this.removeConfirm(record);
        },
        // 批量删除
        showConfirm() {
            const _this = this;
            const modal = this.$confirm({
                maskClosable: true,
                width: '466px',
                title: '提示',
                content: (h) => (
                    <div class="layout">
                        <div>
                            <p>移除只会删除表单配置，删除会删除对应的数据库表。</p>
                            <p>请确认？</p>
                        </div>
                        <div class="footer-btn">
                            <div>
                                <a-button
                                    onClick={() => {
                                        modal.destroy();
                                    }}
                                >
                                    取消
                                </a-button>
                                <a-button
                                    type="primary"
                                    onClick={() => {
                                        _this.removeBatch(_this.selectedRowKeys, 0);
                                        modal.destroy();
                                    }}
                                >
                                    移除
                                </a-button>
                                <a-button
                                    type="primary"
                                    onClick={() => {
                                        _this.removeBatch(_this.selectedRowKeys, 1);
                                        modal.destroy();
                                    }}
                                >
                                    删除
                                </a-button>
                            </div>
                        </div>
                    </div>
                ),

                okButtonProps: {
                    style: { display: 'none' }
                },
                cancelButtonProps: {
                    style: { display: 'none' }
                },
                onOk() {
                    console.log('OK');
                },
                onCancel() {
                    console.log('Cancel');
                },
                class: 'testConfirm'
            });
        },
        // 删除接口
        removeConfirm(record) {
            delOnlineForm({ id: record.id })
                .then((res) => {
                    this.$message.success('删除成功');
                    this.getTemplateList();
                })
                .catch((err) => {
                    this.$message.error(err);
                });
        },
        // 移除接口{
        removeUndock(record) {
            let _this = this;
            this.$confirm({
                title: '确认要移除此记录?',
                onOk() {
                    removeRecord({ id: record.id })
                        .then((res) => {
                            _this.$message.success('移除成功');
                            _this.getTemplateList();
                        })
                        .catch((err) => {
                            console.log(err);
                            _this.$message.error(err);
                        });
                },
                onCancel() {
                    // console.log('Cancel');
                },
                class: 'test'
            });
        },
        // 批量操作--移除和删除接口
        removeBatch(selectedRowKeys, num) {
            deleteBatch({ ids: selectedRowKeys.join(','), flag: num })
                .then((res) => {
                    this.$message.success('删除成功');
                    this.selectedRowKeys = [];
                    this.getTemplateList();
                })
                .catch((err) => {
                    console.log(err);
                    this.$message.error(err);
                });
        },
        // 高级查询
        advancedSearch() {
            this.visible6 = true;
            setTimeout(() => {
                this.advancedForm.setFieldsValue({ pairing: '1', algorithm: '1' });
            }, 300);
        },
        //高级查询模态框--查询
        handleSearch(e) {
            this.visible6 = false;
            this.loading6 = false;
        },
        // 高级查询模态框--关闭
        handleShut(e) {
            this.visible6 = false;
        },
        // 重置
        handleReset() {},
        // 保存查询条件
        saveCondition() {},
        changePairing(value) {
            console.log(`selected ${value}`);
        },
        // 表格=>更多=>功能测试
        funcTest(record) {
            this.$router.push({ name: 'OnlineFormFuncTest', params: { id: record.id, isTree: record.isTree } });
        },
        // 同步数据库
        toDoDbSynch(record) {
            this.dbSynchVisible = true;
            Object.assign(this.dbSynchObj, {
                code: record.id
            });
        },
        // 同步
        dbSynchHandleOk() {
            this.dbSynchloading = true;
            doDbSynch(this.dbSynchObj)
                .then((res) => {
                    this.$message.success(res.message);
                    Object.assign(this.dbSynchObj, {
                        code: '',
                        synMethod: 'normal'
                    });
                    this.getTemplateList();
                    this.dbSynchVisible = false;
                    this.dbSynchloading = false;
                })
                .catch((err) => {
                    this.$message.error(err);
                    this.dbSynchloading = false;
                });
        },
        // 取消同步
        dbSynchHandleCancel() {
            Object.assign(this.dbSynchObj, {
                code: '',
                synMethod: 'normal'
            });
            this.dbSynchVisible = false;
        },
        changeTextArea() {},
        // 配置地址--模态框控制
        setSite() {
            this.visible7 = true;
        },
        siteCancel() {
            this.visible7 = false;
        },
        copyOk() {
            this.visible7 = false;
        },
        //权限控制
        afterVisibleChange(val) {
            // console.log('visible', val);
        },
        openDrawer() {
            this.visibleOpen = true;
        },
        onClose() {
            this.visibleOpen = false;
        },
        call(key) {
            // console.log(key);
        },
        // 列表控制
        onfollow(e, record) {
            record.listOper = e.target.checked;
            // console.log(e.target.checked);
        },
        // 表单控制--多选--可见
        formShow(e, record) {
            record.formOperShow = e.target.checked;
        },
        // 表单控制--多选--可编辑
        formEdit(e, record) {
            record.formOperEdit = e.target.checked;
        },
        // 权限控制--启用
        onOpen(checked, record, index) {
            record.using = checked;
            record.listOper = true;
            this.disabled = !this.disabled;
            console.log(record);
        },
        // 按钮控制
        onControl(checked, record) {
            // console.log(checked, record);
            record.use = checked;
        },
        // 数据权限--新增模态框
        addBtn() {
            this.visible8 = true;
        },
        // 数据权限--新增模态框--取消
        handleReturn(e) {
            this.visible8 = false;
            this.$refs.ruleForm.resetFields();
        },
        // 数据权限--新增模态框--确定
        OkHandle() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.loading8 = true;
                    setTimeout(() => {
                        this.visible8 = false;
                        this.loading8 = false;
                    }, 500);
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        // 气泡确认框 确定
        ratify(e, record) {
            deleteButton({ id: record.id })
                .then((res) => {
                    this.$message.success(res.message);
                    this.getBtnForm(this.selectedRowKeys);
                })
                .catch((err) => {
                    console.log(err);
                    this.$message.error(err);
                });
        },
        // 自定义按钮 批量删除
        deleteConfirm() {
            const code = this.btnSelectedRowKeys;
            const _this = this;
            console.log(code);
            this.$confirm({
                title: '确认删除',
                content: (h) => <div>是否删除选择数据？</div>,
                onOk() {
                    btnDeleteBatch({ ids: code.join(',') })
                        .then((res) => {
                            _this.$message.success(res.message);
                            _this.getBtnForm(_this.selectedRowKeys);
                        })
                        .catch((err) => {
                            console.log(err);
                            _this.$message.error(err);
                        });
                },
                onCancel() {
                    console.log('Cancel');
                },
                class: 'test'
            });

            // console.log(this.btnSelectedRowKeys);
        },
        // 自定义按钮  编辑
        compile(record) {
            setTimeout(() => {
                this.form.setFieldsValue({
                    buttonCode: record.buttonCode,
                    buttonName: record.buttonName,
                    buttonStyle: record.buttonStyle,
                    optType: record.optType,
                    exp: record.exp,
                    buttonStatus: record.buttonStatus == '1' ? '激活' : '未激活',
                    orderNum: record.orderNum,
                    buttonIcon: record.buttonIcon,
                    optPosition: '2'
                });
            }, 50);
            this.editBtnData = record;
            this.amendStatus = true;
            this.visible3 = true;
        },
        // 代码生成
        codeCreate() {
            if (this.selectedRowsto[0].tableType == '1') {
                this.singleTable();
            } else if (this.selectedRowsto[0].tableType == '2') {
                this.hostTable();
            } else if (this.selectedRowsto[0].tableType == '3') {
                this.$message.warning('请选中该表对应的主表生成代码！');
            }
        },
        // 单表--查询要生成的模板的信息
        getTableInfo() {
            let _this = this;
            tableInfo({ code: this.selectedRowKeys[0] })
                .then((res) => {
                    console.log(res);
                    this.tableFormInfo = res.result;
                    this.jspModeListOne = res.result.jspModeList;
                    let formInfo = res.result;
                    let upperStr = formInfo.main.tableName;
                    this.upper = upperStr;
                    function translateTableNameToEntityName(data) {
                        let datas = data.split('_');
                        let str = '';
                        datas.map((d) => {
                            str += d.replace(d[0], d[0].toUpperCase());
                        });
                        return str;
                    }
                    this.newObj = Object.assign(this.priceForm, {
                        catalog: formInfo.projectPath,
                        style: formInfo.jspModeList[0].note,
                        explain: formInfo.main.tableTxt,
                        formName: formInfo.main.tableName,
                        entityClass: translateTableNameToEntityName(upperStr)
                    });
                })
                .catch((err) => {
                    console.log(err);
                    this.$message.error(err);
                });
        },
        // 主表--查询要生成的模板的信息
        getHostTableInfo() {
            let _this = this;
            tableInfo({ code: this.selectedRowKeys[0] })
                .then((res) => {
                    console.log(res);
                    this.hostTableFormInfo = res.result;
                    let hostFormInfo = res.result;
                    let hostSub = JSON.parse(JSON.stringify(hostFormInfo.sub));
                    let upperStr = hostFormInfo.main.tableName;
                    let hostValue = [];
                    function translateTableNameToEntityName(data) {
                        let datas = data.split('_');
                        let str = '';
                        datas.map((d) => {
                            str += d.replace(d[0], d[0].toUpperCase());
                        });
                        return str;
                    }
                    Object.assign(this.hostForm, {
                        catalog: hostFormInfo.projectPath,
                        style: hostFormInfo.jspModeList[0].note,
                        explain: hostFormInfo.main.tableTxt,
                        formName: hostFormInfo.main.tableName,
                        entityClass: translateTableNameToEntityName(upperStr)
                    });
                    for (let index = 0; index < hostSub.length; index++) {
                        hostValue.push({
                            sonTableName: hostSub[index].tableName,
                            sonTableEntity: translateTableNameToEntityName(hostSub[index].tableName),
                            sonExplain: hostSub[index].tableTxt
                        });
                    }
                    Object.assign(this.sonForm, {
                        sonSub: hostValue
                    });
                    let codeList = [];
                    this.jspModeList = hostFormInfo.jspModeList;
                    let jspModeArr = hostFormInfo.jspModeList;
                    for (let j = 0; j < jspModeArr.length; j++) {
                        codeList.push(jspModeArr[j].code);
                    }
                    this.codeList = codeList;
                    // console.log(codeList);
                })
                .catch((err) => {
                    console.log(err);
                    this.$message.error(err);
                });
        },
        // 单表 代码生成
        singleTable() {
            if (this.selectedRowKeys.length == 1) {
                if (this.selectedRowsto[0].isDbSynch == 'Y') {
                    this.visible9 = true;
                    this.getTableInfo();
                } else {
                    this.$message.warning('请先同步数据库！');
                }
            } else {
                this.$message.warning('请先选中一条记录！');
            }
        },
        // 主表 代码生成
        hostTable() {
            if (this.selectedRowKeys.length == 1) {
                if (this.selectedRowsto[0].isDbSynch == 'Y') {
                    this.visibleEleven = true;
                    this.getHostTableInfo();
                } else {
                    this.$message.warning('请先同步数据库！');
                }
            } else {
                this.$message.warning('请先选中一条记录！');
            }
        },
        // 代码生成模态框--取消按钮
        codeCancel() {
            this.visible9 = false;
            this.$refs.codeForm.resetFields();
        },
        // 单表--代码生成模态框--生成代码按钮
        codeHandleOk() {
            this.$refs.codeForm.validate((valid) => {
                if (valid) {
                    this.visible9 = false;
                    let formValue = this.priceForm;
                    this.visibleTen = true;
                    codeGenerate({
                        code: this.selectedRowKeys[0],
                        codeTypes: 'controller,service,dao,mapper,entity,vue',
                        entityName: formValue.entityClass,
                        entityPackage: formValue.packetName,
                        ftlDescription: formValue.explain,
                        jformType: '1',
                        jspMode: this.tableFormInfo.jspModeList[0].code,
                        packageStyle: 'service',
                        projectPath: this.tableFormInfo.projectPath,
                        tableName: formValue.formName,
                        tableName_tmp: formValue.formName
                    })
                        .then((res) => {
                            this.filePath = res.result;
                        })
                        .catch((err) => {
                            console.log(err);
                            this.$message.error(err);
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        // 下载到本地
        download() {
            let list = [];
            this.filePath.map((item) => {
                list.push(encodeURI(item));
            });
            downGenerateCode({
                fileList: list
            })
                .then((res) => {
                    console.log(res);
                    let blob = new Blob([res.data], { type: 'application/zip' });
                    console.log(blob);
                    let fileName = '导到生成代码_' + this.upper + '_' + Date.parse(new Date()) + '.zip';
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = fileName;
                    link.click();
                })
                .catch((err) => {
                    // console.log(err);
                    // this.$message.error(err);
                });
        },
        confirmCancel() {
            this.visibleTen = false;
        },
        confirmShut() {
            this.visibleTen = false;
        },
        // 主表 取消按钮
        hostCancel() {
            this.visibleEleven = false;
        },
        // 主表 生成代码按钮
        hostHandleOk() {
            this.$refs.hostFormTable.validate((valid) => {
                if (valid) {
                    this.visibleEleven = false;
                    let formValue = this.hostForm;
                    console.log(formValue);
                    this.visibleTen = true;
                    codeGenerate({
                        code: this.selectedRowKeys[0],
                        codeTypes: 'controller,service,dao,mapper,entity,vue',
                        entityName: formValue.entityClass,
                        entityPackage: formValue.packetName,
                        ftlDescription: formValue.explain,
                        jformType: '2',
                        jspMode: this.jspModeList[this.coupon].code,
                        packageStyle: 'service',
                        projectPath: this.tableFormInfo.projectPath,
                        tableName: formValue.formName,
                        tableName_tmp: formValue.formName
                        // subList:
                    })
                        .then((res) => {
                            this.filePath = res.result;
                        })
                        .catch((err) => {
                            console.log(err);
                            this.$message.error(err);
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // SQL增强
        sqlEnhance() {
            if (this.selectedRowKeys.length == 1) {
                this.visibleTwelve = true;
                activityBtn({})
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                        this.$message.error(err);
                    });
            } else {
                this.$message.warning('请先选中一条记录');
            }
        },
        // SQL模态框取消和提交
        sqlHandleCancel(e) {
            this.visibleTwelve = false;
        },
        sqlHandleOk() {
            console.log(this.sqlForm);
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
#about {
    .header-search {
        display: flex;
    }
    .table-left,
    .table-middle,
    .table-right,
    .button {
        // padding-right: 24px;
        width: 320px;
        height: 56px;
    }
    .table-name {
        width: 240px;
        margin-left: 8px;
    }
    .table-type,
    .table-describe {
        width: 240px;
        margin-left: 8px;
    }
    .button {
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
        color: rgba(0, 0, 0, 0.65);
    }
    .ant-dropdown-menu {
        width: 103px;
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
    // 模态框样式
    .model-content {
        padding: 24px;
    }
}
#drawerSty {
    .ant-checkbox + span {
        padding: 0 4px !important;
    }
    .add-btn {
        color: #40a9ff;
        border: 1px solid #40a9ff;
        margin: 0 8px 8px 0;
    }
}
.hint {
    border: 1px solid red;
    box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.2);
}
.hint:hover {
    border: 1px solid red;
}
.hint:focus {
    border-color: red;
    box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.2);
}
.father {
    position: relative;
    .fullscreen {
        position: absolute;
        top: 14px;
        right: 8px;
    }
}

.border-top-e8e8e8 {
    border-top: 1px solid #e8e8e8;
}

.labelna {
    display: inline-block;
    width: 80px;
    text-align: right;
    line-height: 32px;
}
.augment {
    display: flex;
}
label {
    font-size: 12px;
}
.claify {
    font-size: 12px;
    width: 80px;
    text-align: right;
    padding-right: 8px;
    line-height: 32px;
}
// 页脚数据库
.model-footer {
    margin-top: 8px;
    .opabtn {
        height: 50px;
    }
    .btnn {
        margin-right: 8px;
    }
    .delbtn {
        background: #fff;
        color: rgb(107, 107, 107);
    }
}
.ant-advanced-search-form {
    padding: 24px;
    border-radius: 6px;
}
// #textStyle {
//     position: absolute;
//     top: 600px;
//     .ant-modal-title {
//         color: #fff;
//     }
// }

.ant-advanced-search-form .ant-form-item {
    display: flex;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
    flex: 1;
}

#components-form-demo-advanced-search .ant-form {
    max-width: none;
}
#components-form-demo-advanced-search .search-result-list {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
}
//  模态框样式
#about-modal {
    .ant-modal-content {
        height: 100%;
        .ant-col {
            padding: 6px 0;
        }
        .ant-form-item {
            margin-bottom: 0;
        }
        label {
            font-size: 12px;
        }
        .ant-advanced-search-form {
            padding: 0 24px;
        }
    }
    .noChoose {
        color: #333;
    }
    .ant-table-tbody tr td > div {
        padding: 10px 0;
    }
}
#components-popover-demo-placement .ant-btn {
    width: 70px;
    text-align: center;
    padding: 0;
    margin-right: 8px;
    margin-bottom: 8px;
}
// 自定义按钮模态框样式
#btn-model {
    .table-operator {
        margin-bottom: 18px;
    }
    .btnPlus {
        margin: 0 8px 8px 0;
    }
    .btn-total {
        height: 40px;
        background-color: #e6f7ff;
        border: 1px solid #91d5ff;
        padding: 8px 15px 8px 37px;
        margin-bottom: 16px;
        border-radius: 4px;
    }
    .btn-dele {
        margin-left: 24px;
    }
    .delete-btn {
        margin: 0 8px 8px;
    }
}
// 自定义按钮--新增模态框样式
#add-model {
    label {
        font-size: 12px;
    }
    .ant-input-number {
        width: 501px;
    }
    .form-icon {
        position: relative;
        .input-icon {
            position: absolute;
            top: 4px;
            right: 12px;
        }
    }
}
// 导入数据库--模态框样式
#importData-modal {
    .name-label {
        vertical-align: -5px;
    }
    .statistics {
        background-color: #e6f7ff;
        border: 1px solid #91d5ff;
        margin: 5px 0px;
        height: 30px;
        padding: 6px 10px;
        font-size: 12px;
        border-radius: 4px;
    }
    .empty {
        margin-left: 24px;
    }
}
th.column-money,
td.column-money {
    text-align: right !important;
}
// 高级查询--模态框
#advanced-modal {
    label {
        font-size: 12px;
    }
    .modal-content {
        display: flex;
        .modal-left {
            width: 754px;
            .ant-form-item {
                margin-bottom: 12px;
            }
            .field-form {
                width: 256px;
                padding: 0 8px;
            }
            .field {
                width: 240px;
            }
            .compare {
                padding: 0 6px;
            }
        }
        .modal-right {
            width: 198px;
            .ant-empty-normal {
                margin: 0;
            }
            .ant-table-thead > tr > th {
                font-size: 16px;
                padding: 4px 0;
            }
        }
    }
    .btn-footer {
        display: flex;
        justify-content: space-between;
    }
}
.testConfirm .ant-modal-confirm-content {
    margin: 8px 0 0 !important;
}
.testConfirm .ant-modal-body {
    padding: 24px 24px 0 !important;
}
.layout {
    // position: relative;
    height: 90px;
    display: flex;
    flex-flow: row wrap;
    align-content: space-between;
}
.footer-btn {
    width: 418px;
    display: flex;
    justify-content: flex-end;
}
.footer-btn button {
    // position: absolute;
    margin-left: 8px;
}
// 主表模态框
#hostModal {
    .ant-select {
        width: 383px !important;
        padding-left: 7px;
    }
    .title-list {
        padding-left: 75px;
    }
    .title-listTo {
        padding-left: 86px;
    }
    .a-input {
        width: 376px;
        margin-left: 5px;
    }
    .title-list3 {
        padding-left: 83px;
    }
    .title-list4 {
        padding-left: 80px;
    }
    .entity-class {
        width: 376px;
        margin-left: 3px;
    }
    .title-list5 {
        padding-left: 50px;
    }
    .p-col {
        margin-left: -5px;
        width: 590px;
    }
    .p-col1 {
        margin-left: 6px;
        width: 650px;
    }
    .p-col2 {
        margin-left: 58px;
        width: 100px;
        line-height: 38px;
        font-size: 14px;
        color: #000000d9;
    }
    .ant-table.ant-table-bordered .ant-table-title {
        color: #000000d9;
        font-size: 16px;
        padding-right: 24px;
        padding-left: 24px;
    }
    .son-table {
        width: 1150px;
        border: 1px solid #e8e8e8;
    }
    .p-text {
        padding: 16px 24px;
        font-size: 16px;
        color: #000000d9;
        border-bottom: 1px solid #e8e8e8;
    }
    .row-table {
        padding: 24px;
    }
}
</style>
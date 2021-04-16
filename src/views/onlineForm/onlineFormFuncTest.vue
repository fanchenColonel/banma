<template>
    <div id="functionTest">
        <!-- 搜索表单 -->
        <a-form :form="queryForm" class="ant-advanced-search-form" v-if="queryInfoList.length > 0" @submit="handleQuerySubmit">
            <!--:pagination="aa" v-if="sad.length > 0" v-for="item in asd" :key="item.id" v-if="item.view == 'select'" v-if="view == 'text'" v-model="name"-->
            <a-row>
                <template v-for="(value, index) in queryInfoList">
                    <a-col :span="6" :key="index" v-if="value.view !== 'popup'" :style="{ display: index < (expand ? queryInfoList.length : 2) ? 'block' : 'none', paddingRight: '12px' }">
                        <!-- 普通文本框字段 view: "text" -->
                        <a-form-item v-if="value.mode == 'single' && (value.view == 'umeditor' || value.view == 'markdown' || value.view == 'text' || value.view == 'password' || value.view == 'file' || value.view == 'image')" :label="value.label" :key="index">
                            <a-input v-decorator="[value.field]" :placeholder="'请输入' + value.label" allowClear />
                        </a-form-item>
                        <a-form-item v-if="value.mode == 'group' && (value.view == 'umeditor' || value.view == 'markdown' || value.view == 'text' || value.view == 'password' || value.view == 'file' || value.view == 'image')" :label="value.label" :key="index">
                            <a-input style="width: 46%" v-decorator="[value.field + '_begin']" :placeholder="'请输入开始' + value.label" allowClear />&nbsp;&nbsp;~&nbsp;&nbsp;
                            <a-input style="width: 46%" v-decorator="[value.field + '_end']" :placeholder="'请输入结束' + value.label" allowClear />
                        </a-form-item>

                        <!-- 数字文本框字段 view: "number" -->
                        <a-form-item v-if="value.view == 'number'" :label="value.label" :key="index">
                            <a-input-number v-decorator="[value.field]" :placeholder="'请输入' + value.label" />
                        </a-form-item>

                        <!-- 日期文本框 -->
                        <a-form-item v-if="value.mode == 'single' && value.view == 'date'" :label="value.label" :key="index">
                            <a-date-picker v-decorator="[value.field]" :placeholder="'请输入' + value.label" />
                        </a-form-item>
                        <a-form-item v-if="value.mode == 'group' && value.view == 'date'" :label="value.label" :key="index">
                            <a-date-picker style="width: 46%" v-decorator="[value.field + '_begin']" :placeholder="'开始日期'" />&nbsp;&nbsp;~&nbsp;&nbsp;
                            <a-date-picker style="width: 46%" v-decorator="[value.field + '_end']" :placeholder="'结束日期'" />
                        </a-form-item>

                        <!-- 日期时间文本框 -->
                        <a-form-item v-if="value.mode == 'single' && value.view == 'datetime'" :label="value.label" :key="index">
                            <a-date-picker show-time v-decorator="[value.field]" :placeholder="'请输入' + value.label" />
                        </a-form-item>
                        <a-form-item v-if="value.mode == 'group' && value.view == 'datetime'" :label="value.label" :key="index">
                            <a-date-picker show-time style="width: 46%" v-decorator="[value.field + '_begin']" :placeholder="'开始日期'" />&nbsp;&nbsp;~&nbsp;&nbsp;
                            <a-date-picker show-time style="width: 46%" v-decorator="[value.field + '_end']" :placeholder="'结束日期'" />
                        </a-form-item>

                        <!-- 时间文本框 -->
                        <a-form-item v-if="value.mode == 'single' && value.view == 'time'" :label="value.label" :key="index">
                            <a-time-picker v-decorator="[value.field]" :placeholder="'请输入' + value.label" />
                        </a-form-item>
                        <a-form-item v-if="value.mode == 'group' && value.view == 'time'" :label="value.label" :key="index">
                            <a-time-picker style="width: 46%" v-decorator="[value.field + '_begin']" :placeholder="'开始时间'" />&nbsp;&nbsp;~&nbsp;&nbsp;
                            <a-time-picker style="width: 46%" v-decorator="[value.field + '_end']" :placeholder="'结束时间'" />
                        </a-form-item>

                        <!-- select 下拉联动 文本框字段 view: "link_down" -->
                        <template>
                            <a-form-item v-if="value.view == 'link_down' || value.view == 'linkage'" :label="value.label" :key="index">
                                <a-select v-decorator="[value.field]" :placeholder="'请输入' + value.label"></a-select>
                            </a-form-item>

                            <a-form-item v-for="(cityArea, index) in value.others" :key="index" :label="cityArea.title">
                                <a-select v-decorator="[value.field]" :placeholder="'请输入' + cityArea.title"></a-select>
                            </a-form-item>
                        </template>

                        <!-- 下拉多选 字段 view: "list_multi"-->
                        <a-form-item v-if="value.view == 'list_multi' || value.view == 'multipleSelect' || value.view == 'checkbox'" :label="value.label" :key="index">
                            <a-select mode="multiple" v-decorator="[value.field]" :placeholder="'请输入' + value.label">
                                <a-select-option v-for="item in dictOptions[value.field]" :key="item.value" :value="item.value">{{ item.title }}</a-select-option>
                            </a-select>
                        </a-form-item>

                        <!-- 下拉搜索 字段 view: "sel_search"
                        <a-form-item v-if="value.view == 'sel_search' || value.view == 'searchSelect'" :label="value.label" :key="index">
                            <a-select 
                                show-search 
                                option-filter-prop="children" 
                                :filter-option="filterOption" 
                                @focus="handleFocus" @blur="handleBlur" @change="handleSelect" 
                                v-decorator="[value.field]" 
                                :placeholder="'请输入' + value.label"> 
                            </a-select>
                        </a-form-item> -->                                                                                                          
                        <a-form-item v-if="value.view == 'sel_search' || value.view == 'searchSelect'" 
                            :label="value.label" 
                            :key="index"
                            >
                            <a-select 
                                show-search 
                                option-filter-prop="children" 
                                :filter-option="filterOption" 
                                @focus="handleFocus(value.field)" @blur="handleBlur" @change="handleSelect" 
                                v-decorator="[value.field]" 
                                :placeholder="'请输入' + value.label"
                            >
                                   <!--  --> 
                                   <a-select-option 
                                        v-for="item in content" 
                                        :key="item.value" 
                                        :value="item.value"
                                    >
                                        {{ item.text }}
                                    </a-select-option>
                            </a-select>

                        </a-form-item>    

                        <!-- 下拉框 字段 view: "list" -->
                        <a-form-item v-if="value.view == 'list' || value.view == 'select' || value.view == 'radio'" :label="value.label" :key="index">
                            <a-select 
                                v-decorator="[value.field]" 
                                :placeholder="'请输入' + value.label"
                            >
                                <a-select-option 
                                    v-for="item in dictOptions[value.field]" 
                                    :key="item.value" 
                                    :value="item.value"
                                >
                                    {{ item.text }}
                                </a-select-option>
                            </a-select>
                        </a-form-item>

                        <!-- sel_tree -->
                        <a-form-item v-if="value.view == 'sel_tree'" :label="value.label" :key="index">
                            <a-tree-select
                                tree-data-simple-mode
                                :tree-data="value.treeData"
                                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                                v-decorator="[value.field]"
                                :placeholder="'请选择' + value.label"
                                :load-data="
                                    (treeNode) => {
                                        return onSearchLoadData(treeNode, value);
                                    }
                                "
                            >
                            </a-tree-select>
                        </a-form-item>

                        <!-- cat_tree -->
                        <a-form-item v-if="value.view == 'cat_tree'" :label="value.label" :key="index">
                            <a-tree-select
                                tree-data-simple-mode
                                :tree-data="value.treeData"
                                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                                v-decorator="[value.field]"
                                :placeholder="'请选择' + value.label"
                                :load-data="
                                    (treeNode) => {
                                        return onCatSearchLoadData(treeNode, value);
                                    }
                                "
                            >
                            </a-tree-select>
                        </a-form-item>

                        <!-- 选择用户 字段 view: "sel_user" -->
                        <a-form-item v-if="value.view == 'sel_user' || value.view == 'userChoose'" :label="value.label" :key="index">
                            <a-input :value="userValue" style="width: 250px; border-right: none; border-radius: 4px 0 0 4px" v-decorator="[value.field]" :read-only="true" :placeholder="'请输入' + value.label" />
                            <a-button style="border-radius: 0 4px 4px 0" @click="optionUser(value.field)">选择用户</a-button>
                        </a-form-item>

                        <!-- 选择部门  字段 view: "sel_depart"-->
                        <a-form-item v-if="value.view == 'sel_depart' || value.view == 'deptChoose'" :label="value.label" :key="index">
                            <j-select-depart class="queryDept" v-decorator="[value.field]" :multi="true" />
                        </a-form-item>
                    </a-col>
                </template>
                <a-col :span="6" :style="{ textAlign: 'left', padding: '4px 12px' }">
                    <a-button type="primary" html-type="submit" icon="search" > 查询 </a-button>
                    <a-button type="primary" :style="{ marginLeft: '8px' }" @click="resetTableData" icon="redo"> 重置 </a-button>
                    <a :style="{ marginLeft: '8px', fontSize: '14px' }" @click="toggle"> {{ expand ? '收起' : '展开' }} <a-icon :type="expand ? 'up' : 'down'" /> </a>
                </a-col>
            </a-row>
        </a-form>
        <!-- 按钮集合 -->
        <div class="btn">
            <a-button type="primary" icon="plus" @click="showModal">新增</a-button>
            <!-- 导入按钮 -->
            <a-upload name="file" :multiple="true" :file-list="fileLists" :before-upload="beforeFileUpload" :remove="handleFileRemove">
                <a-button type="primary" icon="upload" v-if="fileLists.length < 10">导入</a-button>
            </a-upload>
            <!-- 导出按钮 -->
            <a-button type="primary" icon="download">导出</a-button>
            <!-- 高级查询 -->
            <a-tooltip>
                <template slot="title" v-if="this.queryCondition.superQueryParams">以有高级查询条件生效<span style="margin: 0 6px">|</span> <a href="javascript:;" @click="emptySearch">清空</a></template>
                <a-button type="primary" :icon="queryCondition.superQueryParams && queryCondition.superQueryParams.length > 0 ? 'loading' : 'filter'" @click="highRanking" v-if="isTree !== 'Y'"> 高级查询 </a-button>
            </a-tooltip>
        </div>
        <!-- 高级查询--模态框 -->
        <a-modal id="inquire-modal" v-model="visible1" title="高级查询构造器" width="1000px" :mask="false">
            <template slot="footer">
                <div class="footer-btn">
                    <div class="btn-left">
                        <a-button key="reset" @click="Reset"> 重置 </a-button>
                        <a-button key="saCondition" :loading="loading3" @click="saCondition"> 保存查询条件 </a-button>
                    </div>
                    <div class="btn-right">
                        <a-button key="shut" @click="hanShut"> 关闭 </a-button>
                        <a-button key="searchSubmit" type="primary" :loading="loading2" @click="handleSearch"> 查询 </a-button>
                    </div>
                </div>
            </template>
            <a-form-model :model="amodelForm" :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
                <div class="content-modal">
                    <div class="left-modal">
                        <a-row>
                            <a-col :span="18">
                                <a-form-model-item label="过滤条件匹配:">
                                    <a-select style="width: 282px" v-model="superQueryMatchType">
                                        <a-select-option value="and"> AND（所有条件都要求匹配） </a-select-option>
                                        <a-select-option value="or"> OR（条件中的任意一个匹配） </a-select-option>
                                    </a-select>
                                </a-form-model-item>
                            </a-col>
                        </a-row>
                        <a-row v-for="(modelForm, i) in modelForms" :key="i">
                            <a-col :span="8">
                                <a-form-model-item class="form-field">
                                    <a-tree-select
                                        placeholder="选择查询字段"
                                        class="field"
                                        v-model="modelForm.field"
                                        show-search
                                        allow-clear
                                        treeDefaultExpandAll
                                        :tree-data="searchTreeData"
                                        option-filter-prop="children"
                                        :filter-option="filterOpt"
                                        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                                        @change="(value,label,extra)=>{
                                            searchContent = value;
                                            searchContentlabel = label;
                                            searchContentextra = extra;
                                            modelForm.type = extra.triggerNode.dataRef.view;
                                            modelForm.enum = extra.triggerNode.dataRef.enum;
                                            modelForm.val = undefined;
                                        }"
                                    >

                                        <!-- <template v-for="(titleValue, key) in formProps">
                                            <a-select-option v-if="titleValue.view == 'text' || titleValue.view == 'number' || titleValue.view == 'date' || titleValue.view == 'datetime' || titleValue.view == 'time' || titleValue.view == 'checkbox' || titleValue.view == 'select' || titleValue.view == 'list' || titleValue.view == 'radio' || titleValue.view == 'checkBox'" :key="key">
                                                {{ titleValue.title }}
                                            </a-select-option>
                                        </template> -->

                                    </a-tree-select>
                                </a-form-model-item>
                            </a-col>
                            
                            <a-col :span="4">
                                <a-form-model-item class="option-compare">
                                    <a-select style="width: 111px" v-model="modelForm.rule" @change="handleProvinceChange">
                                        <a-select-option v-for="selitem in itemList" :key="selitem.value" :value="selitem.value"> {{ selitem.title }} </a-select-option>
                                    </a-select>
                                </a-form-model-item>
                            </a-col>

                            <a-col :span="8">
                                <a-form-model-item>
                                    <a-input :placeholder="'请输入值'" v-if="modelForm.type == 'input' || modelForm.type == 'text' || modelForm.type == 'image' || modelForm.type == 'password' || modelForm.type == 'file' || modelForm.type == 'cat_tree' || modelForm.type == 'sel_tree' || modelForm.type == 'markdown' || modelForm.type == 'umeditor'" allowClear style="width: 240px" v-model="modelForm.val" />
                                    <a-input-number :placeholder="'请输入数字'" v-if="modelForm.type == 'number'" allowClear style="width: 240px" v-model="modelForm.val" />
                                    <a-date-picker :placeholder="'请选择日期'" v-if="modelForm.type == 'date'" allowClear style="width: 240px" v-model="modelForm.val" />
                                    <a-date-picker show-time :placeholder="'请选择日期时间'" v-if="modelForm.type == 'datetime'" allowClear style="width: 240px" v-model="modelForm.val" />
                                    <a-time-picker :placeholder="'请选择时间'" v-if="modelForm.type == 'time'" allowClear style="width: 240px" v-model="modelForm.val" />
                                    <a-select :options="modelForm.enum" :placeholder="'请选择值'" v-if="modelForm.type == 'checkbox' || modelForm.type == 'select' || modelForm.type == 'radio' || modelForm.type == 'list' || modelForm.type == 'list_multi' || modelForm.type == 'sel_search'" allowClear style="width: 240px" v-model="modelForm.val">
                                        <a-select-option v-for="item in modelForm.enum" :key="item.value" :value="item.value">{{ item.text }}</a-select-option>
                                    </a-select>
                                    <!-- <a-input v-if="modelForm.type == 'sel_user'" :placeholder="'请选择用户'" style="width: 240px" v-modal="modelForm.val" @click="optionUser(key)" :read-only="true" /> -->
                                    <!-- <a-form-item :placeholder="'请选择用户'" style="width: 500px"> -->
                                    <j-select-multi-user v-if="modelForm.type == 'sel_user'" :placeholder="'请选择用户'" style="width: 240px" v-modal="modelForm.val" :read-only="true" />
                                    <!-- {{ getFormFieldValue('users') }} v-decorator="['users']" -->
                                    <!-- </a-form-item> -->
                                    <j-select-depart
                                        class="queryDept"
                                        v-if="modelForm.type == 'sel_depart'"
                                        :value="modelForm.val"
                                        @change="
                                            (value) => {
                                                modelForm.val = value;
                                            }
                                        "
                                        style="width: 240px"
                                    />
                                </a-form-model-item>
                            </a-col>
                            
                            <a-col :span="4">
                                <a-form-model-item>
                                    <a-button class="addRow" @click="addQuery"><a-icon type="plus" /></a-button>
                                    <a-button class="subtract" @click="subQuery(modelForm.key)"><a-icon type="minus" /></a-button>
                                </a-form-model-item>
                            </a-col>
                        </a-row>
                    </div>
                    <div class="right-modal">
                        <a-table :columns="saColumns" :data-source="saData" bordered size="small">
                            <template slot="name" slot-scope="text">
                                <a>{{ text }}</a>
                            </template>
                        </a-table>
                    </div>
                </div>
            </a-form-model>
        </a-modal>
        <!-- 高级查询中的--保存查询条件模态框 -->
        <a-modal title="请输入保存的名称" :visible="visible2" @ok="confirmOk" @cancel="discardCancel">
            <a-input />
        </a-modal>
        <!-- 已选择项--操作-->
        <div class="option">
            <p>
                已选择
                <a href="javascript:;">0</a> 项
                <a href="javascript:;" class="empty">清空</a>
            </p>
        </div>
        <!-- 表格 -->
        <a-table 
            :row-selection="rowSelection" 
            :columns="columns" 
            :loading="templateLoading" 
            :data-source="msg" 
            bordered 
            :pagination="pagination" 
            @change="handleTableChange" 
            @expand="handleExpand"
        >
            <template slot="dateSlot" slot-scope="text, record">
                {{ text !== '' ? moment(text).format('YYYY-MM-DD') : '' }}
            </template>
            <template v-for="(t, key) in aHrefSlots" :slot="key" slot-scope="text, record">
                <div :key="t.key">
                    <a>{{ 111 + text }}</a>
                </div>
            </template>
            <template slot="operation" slot-scope="text, record">
                <a-row>
                    <a-col :span="9">
                        <span class="text" @click="redactModal(record)">编辑</span>
                    </a-col>
                    <a-col :span="5">
                        <span class="text-span">|</span>
                    </a-col>
                    <a-col :span="10">
                        <a-dropdown>
                            <span class="text ant-dropdown-link" @click="(e) => e.preventDefault()">
                                更多
                                <a-icon type="down" style="font-size: 11px" />
                            </span>
                            <a-menu slot="overlay">
                                <a-menu-item>
                                    <a href="javascript:;" @click="showDetail(record)">详情</a>
                                </a-menu-item>
                                <a-menu-item v-if="isTree == 'Y'">
                                    <a href="javascript:;" @click="addSub(record)">添加下级</a>
                                </a-menu-item>
                                <a-menu-item>
                                    <a-popconfirm title="确定删除吗?" ok-text="确定" cancel-text="取消" @confirm="confirm(record)" @cancel="cancelText">
                                        <a href="javascript:;">删除</a>
                                    </a-popconfirm>
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </a-col>
                </a-row>
            </template>
        </a-table>
        <!-- 新增  模态框 -->
        <a-modal id="more-modal" v-model="visible" :title="formStatus == 'show' ? '详情' : formStatus == 'edit' ? '修改' : '新增'" on-ok="onSubmit" :width="tablist ? '1100px' : '800px'">
            <template slot="footer">
                <a-button key="submit" type="primary" :loading="loading" @click="onSubmit" v-if="formStatus != 'show'">确定</a-button>
                <a-button key="back" @click="handleCancel">关闭</a-button>
            </template>
            <div :style="formStatus == 'show' ? 'cursor: not-allowed;' : ''">
                <a-form :form="addForm" :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }" :class="formStatus == 'show' ? 'form-disabled' : ''">
                    <template v-for="(value, key) in formProps">
                        <!-- 普通文本框字段 view: "text" -->
                        <a-form-item v-if="value.view == 'text'" :label="value.title" :key="key">
                            <a-input
                                v-decorator="[
                                    key,
                                    {
                                        rules: [
                                            {
                                                required: value.required,
                                                message: '请输入' + value.title
                                            },
                                            value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : '',
                                            value.pattern == 'only'
                                                ? validateOnly
                                                : value.pattern
                                                ? {
                                                      validator: function (r, val, callback) {
                                                          if (val) {
                                                              var reg = new RegExp(value.pattern);
                                                              if (reg.test(val)) {
                                                                  callback();
                                                              } else {
                                                                  callback(value.errorInfo);
                                                              }
                                                          }
                                                      }
                                                  }
                                                : ''
                                        ]
                                    }
                                ]"
                                :placeholder="'请输入' + value.title"
                                allowClear
                                style="width: 574px"
                            />
                        </a-form-item>
                        <!-- 密码文本框字段 view: "password" -->
                        <a-form-item v-if="value.view == 'password'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                            <a-input
                                type="password"
                                v-decorator="[
                                    key,
                                    {
                                        rules: [
                                            {
                                                required: value.required,
                                                message: '请输入' + value.title
                                            },
                                            value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : '',
                                            value.pattern == 'only'
                                                ? validateOnly
                                                : value.pattern
                                                ? {
                                                      validator: function (r, val, callback) {
                                                          if (val) {
                                                              var reg = new RegExp(value.pattern);
                                                              if (reg.test(val)) {
                                                                  callback();
                                                              } else {
                                                                  callback(value.errorInfo);
                                                              }
                                                          }
                                                      }
                                                  }
                                                : ''
                                        ]
                                    }
                                ]"
                                :placeholder="'请输入' + value.title"
                                allowClear
                                style="width: 574px"
                            />
                        </a-form-item>
                        <!-- Switch 开关字段 view: "Switch" -->
                        <a-form-item v-if="value.view == 'switch'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                            <a-switch
                                @change="switchChange"
                                v-decorator="[
                                    key,
                                    {
                                        valuePropName: 'checked',
                                        rules: [
                                            {
                                                required: value.required,
                                                message: '请输入' + value.title
                                            },
                                            value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                        ]
                                    }
                                ]"
                            />
                        </a-form-item>
                        <!-- 数字文本框字段 view: "number" -->
                        <a-form-item v-if="value.view == 'number'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                            <a-input-number
                                v-decorator="[
                                    key,
                                    {
                                        rules: [
                                            {
                                                required: value.required,
                                                message: '请输入' + value.title
                                            },
                                            value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                        ]
                                    }
                                ]"
                                :placeholder="'请输入' + value.title"
                                style="width: 576px"
                            />
                        </a-form-item>
                        <!-- 日期文本框 -->
                        <a-form-item v-if="value.view == 'date'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                            <a-date-picker
                                v-decorator="[
                                    key,
                                    {
                                        rules: [
                                            {
                                                required: value.required,
                                                message: '请输入' + value.title
                                            }
                                        ]
                                    }
                                ]"
                                :placeholder="'请输入' + value.title"
                            />
                        </a-form-item>
                        <!-- 日期时间文本框 -->
                        <a-form-item v-if="value.view == 'datetime'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                            <a-date-picker
                                show-time
                                v-decorator="[
                                    key,
                                    {
                                        rules: [
                                            {
                                                required: value.required,
                                                message: '请输入' + value.title
                                            }
                                        ]
                                    }
                                ]"
                                :placeholder="'请输入' + value.title"
                            />
                        </a-form-item>
                        <!-- 时间文本框 -->
                        <a-time-item v-if="value.view == 'time'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                            <a-time-picker
                                v-decorator="[
                                    key,
                                    {
                                        rules: [
                                            {
                                                required: value.required,
                                                message: '请输入' + value.title
                                            }
                                        ]
                                    }
                                ]"
                                :placeholder="'请输入' + value.title"
                            />
                        </a-time-item>
                        <a-form-item v-if="value.view.toLowerCase() == 'checkbox'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                            <a-checkbox-group
                                :options="value.enum"
                                v-decorator="[
                                    key,
                                    {
                                        rules: [
                                            {
                                                required: value.required,
                                                message: '请输入' + value.title
                                            },
                                            value.maxLength > 0
                                                ? {
                                                      transform: (value) => {
                                                          return value.join(',');
                                                      }
                                                  }
                                                : '',
                                            value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                        ],
                                        initialValue: value.defVal || undefined
                                    }
                                ]"
                                :placeholder="'请输入' + value.title"
                            ></a-checkbox-group>
                        </a-form-item>
                        <!-- select 下拉联动 文本框字段 view: "link_down" -->
                        <template>
                            <a-form-item v-if="value.view == 'link_down' || value.view == 'linkage'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                                <a-select
                                    v-decorator="[
                                        key,
                                        {
                                            rules: [
                                                {
                                                    required: value.required,
                                                    message: '请输入' + value.title
                                                },
                                                value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                            ]
                                        }
                                    ]"
                                    :placeholder="'请输入' + value.title"
                                    style="width: 576px"
                                    @change="changeLinkDown"
                                >
                                    <a-select-option :key="province.id" v-for="province in provinceData">
                                     {{province.label}}
                                    </a-select-option>    
                                </a-select>
                            </a-form-item>

                            <a-form-item v-for="(cityArea, index) in value.others" :key="index" :label="cityArea.title" :class="formStatus == 'show' ? 'form-disabled' : ''">
                                <a-select
                                    v-decorator="[
                                        cityArea.field,
                                        {
                                            rules: [
                                                {
                                                    required: value.required,
                                                    message: '请输入' + value.title
                                                },
                                                value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                            ]   
                                        }
                                    ]"
                                    :placeholder="'请输入' + cityArea.title"
                                    style="width: 576px"
                                    @change="changeLinkDown"
                                    @focus="changeData"
                                >
                                    <a-select-option  :key="city.id" v-for="city in cityData">
                                       {{city.label}}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>

                            <!--<a-form-item :key="key"  label="国家" :class="formStatus == 'show' ? 'form-disabled' : ''">
                                <a-select
                                    v-decorator="[
                                        key,
                                        {
                                            rules: [
                                                {
                                                    required: value.required,
                                                    message: '请输入' + value.title
                                                },
                                                value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                            ]
                                        }
                                    ]"
                                    :placeholder="'请输入' + value.title"
                                    style="width: 576px"
                                    @change="changeLinkDown"
                                >
                                    <a-select-option v-if="areaData == '' " :key="city.id" v-for="city in cityData">
                                       {{city.label}}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>-->

                        </template>
                        <!-- 上传文件 字段 view: "file"-->
                        <a-form-item v-if="value.view == 'file'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                            <a-upload
                                name="file"
                                :multiple="true"
                                :file-list="fileLists"
                                :before-upload="beforeFileUpload"
                                :remove="handleFileRemove"
                                v-decorator="[
                                    key,
                                    {
                                        rules: [
                                            {
                                                required: value.required,
                                                message: '请输入' + value.title
                                            },
                                            value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                        ]
                                    }
                                ]"
                            >
                                <a-button v-if="fileLists.length < 10"> <a-icon type="upload" />点击上传 </a-button>
                            </a-upload>
                        </a-form-item>
                        <!-- 上传图片 字段 view: "image"-->
                        <a-form-item v-if="value.view == 'image' || value.view == 'img'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                            <div class="clearfix">
                                <a-upload
                                    list-type="picture-card"
                                    :file-list="ImgObjs[key].ImgLists"
                                    :before-upload="
                                        (file) => {
                                            beforeImgUpload(file, key);
                                        }
                                    "
                                    :remove="
                                        (file) => {
                                            handleImgRemove(file, key);
                                        }
                                    "
                                >
                                    <div v-if="ImgObjs[key].ImgLists.length < 8">
                                        <a-icon type="plus" />
                                        <div class="ant-upload-text">点击上传</div>
                                    </div>
                                </a-upload>
                                <a-modal :visible="previewVisible" :footer="null">
                                    <img alt="example" style="width: 100%" :src="previewImage" />
                                </a-modal>
                            </div>
                        </a-form-item>
                        <!-- 单选 字段 view: "radio"-->
                        <a-form-item v-if="value.view == 'radio'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                            <a-radio-group
                                :options="value.enum"
                                v-decorator="[
                                    key,
                                    {
                                        rules: [
                                            {
                                                required: value.required,
                                                message: '请输入' + value.title
                                            },
                                            value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                        ],
                                        initialValue: value.defVal || undefined
                                    }
                                ]"
                            >
                                <!-- <a-radio v-for="(sex, index) in value.enum" :key="index" :value="sex.text"> {{ sex.text }} </a-radio> -->
                            </a-radio-group>
                        </a-form-item>
                        <!-- 下拉多选 字段 view: "list_multi"-->
                        <a-form-item v-if="value.view == 'list_multi' || value.view == 'multipleSelect'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                            <a-select
                                mode="multiple"
                                style="width: 576px"
                                v-decorator="[
                                    key,
                                    {
                                        rules: [
                                            {
                                                required: value.required,
                                                message: '请输入' + value.title
                                            },
                                            value.maxLength > 0
                                                ? {
                                                      transform: (value) => {
                                                          return value.join(',');
                                                      }
                                                  }
                                                : '',
                                            value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                        ]
                                    }
                                ]"
                                :placeholder="'请输入' + value.title"
                            >
                                <a-select-option v-for="item in value.enum" :key="item.value" :value="item.value">{{ item.title }}</a-select-option>
                            </a-select>
                        </a-form-item>
                        <!-- 下拉搜索 字段 view: "sel_search"-->

                        <a-form-item v-if="value.view == 'sel_search' || value.view == 'searchSelect'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                            <a-select
                                show-search
                                option-filter-prop="children"
                                style="width: 576px"
                                :filter-option="filterOption"
                                @focus="handleFocus"
                                @blur="handleBlur"
                                @change="handleSelect"
                                v-decorator="[
                                    key,
                                    {
                                        rules: [
                                            {
                                                required: value.required,
                                                message: '请输入' + value.title
                                            },
                                            value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                        ]
                                    }
                                ]"
                                :placeholder="'请输入' + value.title"
                            >
                                <a-select-option v-for="item in searchItems[key].selectValues" :key="item.value" :value="item.value">{{ item.text }}</a-select-option>
                            </a-select>
                        </a-form-item>

                        <!-- 下拉框 字段 view: "list" -->
                        <a-form-item v-if="value.view == 'list' || value.view == 'select'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                            <a-select
                                style="width: 576px"
                                v-decorator="[
                                    key,
                                    {
                                        rules: [
                                            {
                                                required: value.required,
                                                message: '请输入' + value.title
                                            },
                                            value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                        ],
                                        initialValue: value.defVal || undefined
                                    }
                                ]"
                                :placeholder="'请输入' + value.title"
                            >
                                <a-select-option v-for="item in value.enum" :key="item.value" :value="item.value">{{ item.text }}</a-select-option>
                            </a-select>
                        </a-form-item>
                        <!-- 选择用户 字段 view: "sel_user" -->
                        <a-form-item v-if="value.view == 'sel_user' || value.view == 'userChoose'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                            <a-input
                                :value="userValue"
                                style="width: 486px; border-right: none; border-radius: 4px 0 0 4px"
                                v-decorator="[
                                    key,
                                    {
                                        rules: [
                                            {
                                                required: value.required,
                                                message: '请输入' + value.title
                                            },
                                            value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                        ]
                                    }
                                ]"
                                :read-only="true"
                                :placeholder="'请输入' + value.title"
                            />
                            <a-button style="border-radius: 0 4px 4px 0" @click="optionUser(key)">选择用户</a-button>
                        </a-form-item>
                        <!-- 选择部门  字段 view: "sel_depart"-->
                        <a-form-item v-if="value.view == 'sel_depart' || value.view == 'deptChoose'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                            <a-form-item>
                                <j-select-depart v-decorator="[key]" style="width: 576px" :multi="true" />
                                <!-- {{ getFormFieldValue('bumen') }} -->
                            </a-form-item>
                        </a-form-item>
                        <!-- 自定义树形控件  字段 view: "sel_tree" -->
                        <a-form-item v-if="value.view == 'sel_tree'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                            <!-- <a-select
                                style="width: 576px"
                                v-decorator="[
                                    key,
                                    {
                                        rules: [
                                            {
                                                required: value.required,
                                                message: '请输入' + value.title
                                            },
                                            value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                        ]
                                    }
                                ]"
                                :placeholder="'请选择' + value.title"
                            >
                                <a-select-option v-for="item in selectTreeList[key]" :key="item.key" :value="item.key">{{ item.title }}</a-select-option>
                            </a-select> -->
                            <a-tree-select
                                style="width: 576px"
                                tree-data-simple-mode
                                :tree-data="selectTreeList[key]"
                                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                                v-decorator="[
                                    key,
                                    {
                                        rules: [
                                            {
                                                required: value.required,
                                                message: '请输入' + value.title
                                            },
                                            value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                        ]
                                    }
                                ]"
                                :placeholder="'请选择' + value.title"
                                :load-data="
                                    (treeNode) => {
                                        return onLoadData(treeNode, key);
                                    }
                                "
                            >
                            </a-tree-select>
                        </a-form-item>
                        <!-- 分类字典树形控件  字段 view: "cat_tree" -->
                        <a-form-item v-if="value.view == 'cat_tree'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                            <a-tree-select
                                style="width: 576px"
                                tree-data-simple-mode
                                :tree-data="selectTreeList[key]"
                                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                                v-decorator="[
                                    key,
                                    {
                                        rules: [
                                            {
                                                required: value.required,
                                                message: '请输入' + value.title
                                            },
                                            value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                        ]
                                    }
                                ]"
                                :placeholder="'请选择' + value.title"
                                :load-data="
                                    (treeNode) => {
                                        return onLoadData(treeNode, key);
                                    }
                                "
                            >
                            </a-tree-select>
                        </a-form-item>
                        <!-- <a-form-item v-if="value.view == 'cat_tree'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                            <a-tree-select
                                style="width: 576px"
                                allow-clear
                                v-decorator="[
                                    key,
                                    {
                                        rules: [
                                            {
                                                required: value.required,
                                                message: '请输入' + value.title
                                            },
                                            value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                        ]
                                    }
                                ]"
                                :placeholder="'请选择' + value.title"
                            >
                                <a-tree-select-node v-for="item in selectTreeList[key]" :key="item.key" :value="item.key" :title="item.title"></a-tree-select-node>
                            </a-tree-select>
                        </a-form-item> -->
                        <!-- MarkDown  字段 view: "MarkDown" -->
                        <a-form-item v-if="value.view == 'markdown'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                            <mavon-editor
                                :ref="key"
                                v-model="markdownValues[key]"
                                placeholder=" "
                                @imgAdd="
                                    (filename, file) => {
                                        imgAdd(filename, key, file);
                                    }
                                "
                            />
                            <a-input v-decorator="[key]" v-show="false"></a-input>
                        </a-form-item>
                    </template>
                </a-form>
                <!-- tab切换 字段 view: ""-->
                <a-tabs v-if="JSON.stringify(tablist) !== '{}'" :default-active-key="Object.keys(tablist)[0]" @change="tabCallback">
                    <a-tab-pane v-for="(record, index) in tablist" :key="index" :tab="record.describe">
                        <template v-if="record.columns">
                            <div class="opabtn" v-if="formStatus == 'show' ? false : true">
                                <a-button type="primary" icon="plus" class="btnn" @click="addOneRow(index, record.columns)">新增</a-button>
                                <a-button style="margin-left: 20px" type="primary" icon="minus" class="btnn" v-if="addSelectedRowKeys.length > 0" @click="delAddRows(index)">删除</a-button>
                                <a-button style="margin-left: 20px" type="primary" icon="delete" class="delbtn" v-if="addSelectedRowKeys.length > 0" @click="clearSelectKeys">清空选择</a-button>
                            </div>
                            <a-table :pagination="false" :row-selection="rowSelection1" :data-source="tableDatas[index]" :columns="record.columns" :class="formStatus == 'show' ? 'form-disabled' : ''">
                                <template v-for="(t, i) in record.columns" :slot="t.key" slot-scope="text, r, ind">
                                    <div :key="i">
                                        <span v-if="t.key == 'key'">{{ text }}</span>
                                        <a-input allowClear v-if="t.type == 'input'" style="margin: -50px 0" :value="text" :placeholder="t.placeholder" @change="(e) => handleChange(e.target.value, r.key, t.key, index)"></a-input>
                                        <a-select v-if="t.type == 'select'" :placeholder="t.placeholder" :value="text" style="width: 100%" @change="(e) => handleSelectChange(e, r.key, t.key, index)" allowClear>
                                            <a-select-option v-for="op in t.options" :title="op.text" :key="op.value" :value="op.value">{{ op.text }}</a-select-option>
                                        </a-select>
                                        <div v-if="t.type == 'image'">
                                            <div class="clearfix">
                                                <a-upload
                                                    list-type="picture-card"
                                                    :file-list="ImgObjs[record.keyName + '_' + t.key + '_' + ind].ImgLists"
                                                    :before-upload="
                                                        (file) => {
                                                            beforeImgUpload2(file, record.keyName + '_' + t.key + '_' + ind, r.key, t.key, index);
                                                        }
                                                    "
                                                    :remove="
                                                        (file) => {
                                                            handleImgRemove2(file, record.keyName + '_' + t.key + '_' + ind, r.key, t.key, index);
                                                        }
                                                    "
                                                >
                                                    <div v-if="ImgObjs[record.keyName + '_' + t.key + '_' + ind].ImgLists.length < 8">
                                                        <a-icon type="plus" />
                                                        <div class="ant-upload-text">点击上传</div>
                                                    </div>
                                                </a-upload>
                                                <a-modal :visible="previewVisible" :footer="null">
                                                    <img alt="example" style="width: 100%" :src="previewImage" />
                                                </a-modal>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </a-table>
                        </template>
                        <a-form v-if="record.properties" :form="tabForms[record.keyName]" :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }" :class="formStatus == 'show' ? 'form-disabled' : ''">
                            <template v-for="(value, key) in record.properties">
                                <!-- <a-form :form='creatFF' :key="key" :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }" :class="formStatus == 'show' ? 'form-disabled' : ''"> -->

                                <!-- 普通文本框字段 view: "text" -->
                                <a-form-item v-if="value.view == 'text'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                                    <a-input
                                        v-decorator="[
                                            key,
                                            {
                                                rules: [
                                                    {
                                                        required: value.required,
                                                        message: '请输入' + value.title
                                                    },
                                                    value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : '',
                                                    value.pattern == 'only'
                                                        ? validateOnly
                                                        : value.pattern
                                                        ? {
                                                              validator: function (r, val, callback) {
                                                                  if (val) {
                                                                      var reg = new RegExp(value.pattern);
                                                                      if (reg.test(val)) {
                                                                          callback();
                                                                      } else {
                                                                          callback(value.errorInfo);
                                                                      }
                                                                  }
                                                              }
                                                          }
                                                        : ''
                                                ]
                                            }
                                        ]"
                                        :placeholder="'请输入' + value.title"
                                        allowClear
                                        style="width: 574px"
                                    />
                                </a-form-item>

                                <!-- 密码文本框字段 view: "password" -->
                                <a-form-item v-if="value.view == 'password'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                                    <a-input
                                        type="password"
                                        v-decorator="[
                                            key,
                                            {
                                                rules: [
                                                    {
                                                        required: value.required,
                                                        message: '请输入' + value.title
                                                    },
                                                    value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : '',
                                                    value.pattern == 'only'
                                                        ? validateOnly
                                                        : value.pattern
                                                        ? {
                                                              validator: function (r, val, callback) {
                                                                  if (val) {
                                                                      var reg = new RegExp(value.pattern);
                                                                      if (reg.test(val)) {
                                                                          callback();
                                                                      } else {
                                                                          callback(value.errorInfo);
                                                                      }
                                                                  }
                                                              }
                                                          }
                                                        : ''
                                                ]
                                            }
                                        ]"
                                        :placeholder="'请输入' + value.title"
                                        allowClear
                                        style="width: 574px"
                                    />
                                </a-form-item>

                                <!-- Switch 开关字段 view: "Switch" -->
                                <a-form-item v-if="value.view == 'switch'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                                    <a-switch
                                        v-decorator="[
                                            key,
                                            {
                                                valuePropName: 'checked',
                                                rules: [
                                                    {
                                                        required: value.required,
                                                        message: '请输入' + value.title
                                                    },
                                                    value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                                ]
                                            }
                                        ]"
                                    />
                                </a-form-item>

                                <!-- 数字文本框字段 view: "number" -->
                                <a-form-item v-if="value.view == 'number'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                                    <a-input-number
                                        v-decorator="[
                                            key,
                                            {
                                                rules: [
                                                    {
                                                        required: value.required,
                                                        message: '请输入' + value.title
                                                    },
                                                    value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                                ]
                                            }
                                        ]"
                                        :placeholder="'请输入' + value.title"
                                        style="width: 576px"
                                    />
                                </a-form-item>

                                <!-- 日期文本框 -->
                                <a-form-item v-if="value.view == 'date'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                                    <a-date-picker
                                        v-decorator="[
                                            key,
                                            {
                                                rules: [
                                                    {
                                                        required: value.required,
                                                        message: '请输入' + value.title
                                                    }
                                                ]
                                            }
                                        ]"
                                        :placeholder="'请输入' + value.title"
                                    />
                                </a-form-item>

                                <!-- 日期时间文本框 -->
                                <a-form-item v-if="value.view == 'datetime'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                                    <a-date-picker
                                        show-time
                                        v-decorator="[
                                            key,
                                            {
                                                rules: [
                                                    {
                                                        required: value.required,
                                                        message: '请输入' + value.title
                                                    }
                                                ]
                                            }
                                        ]"
                                        :placeholder="'请输入' + value.title"
                                    />
                                </a-form-item>

                                <!-- 时间文本框 -->
                                <a-time-item v-if="value.view == 'time'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                                    <a-time-picker
                                        v-decorator="[
                                            key,
                                            {
                                                rules: [
                                                    {
                                                        required: value.required,
                                                        message: '请输入' + value.title
                                                    }
                                                ]
                                            }
                                        ]"
                                        :placeholder="'请输入' + value.title"
                                    />
                                </a-time-item>

                                <a-form-item v-if="value.view == 'checkbox'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                                    <a-checkbox-group
                                        :options="value.enum"
                                        v-decorator="[
                                            key,
                                            {
                                                rules: [
                                                    {
                                                        required: value.required,
                                                        message: '请输入' + value.title
                                                    },
                                                    value.maxLength > 0
                                                        ? {
                                                              transform: (value) => {
                                                                  return value.join(',');
                                                              }
                                                          }
                                                        : '',
                                                    value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                                ],
                                                initialValue: value.defVal || undefined
                                            }
                                        ]"
                                        :placeholder="'请输入' + value.title"
                                    ></a-checkbox-group>
                                </a-form-item>

                                <!-- select 下拉联动 文本框字段 view: "link_down" -->
                                <template>
                                    <a-form-item v-if="value.view == 'link_down'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                                        <a-select
                                            v-decorator="[
                                                key,
                                                {
                                                    rules: [
                                                        {
                                                            required: value.required,
                                                            message: '请输入' + value.title
                                                        },
                                                        value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                                    ]
                                                }
                                            ]"
                                            :placeholder="'请输入' + value.title"
                                            style="width: 576px"
                                        ></a-select>
                                    </a-form-item>

                                    <a-form-item v-for="(cityArea, index) in value.others" :key="index" :label="cityArea.title" :class="formStatus == 'show' ? 'form-disabled' : ''">
                                        <a-select
                                            v-decorator="[
                                                cityArea.field,
                                                {
                                                    rules: [
                                                        {
                                                            required: value.required,
                                                            message: '请输入' + value.title
                                                        },
                                                        value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                                    ]
                                                }
                                            ]"
                                            :placeholder="'请输入' + cityArea.title"
                                            style="width: 576px"
                                        ></a-select>
                                    </a-form-item>
                                </template>

                                <!-- 上传文件 字段 view: "file"-->
                                <a-form-item v-if="value.view == 'file'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                                    <a-upload
                                        name="file"
                                        :multiple="true"
                                        :file-list="fileLists"
                                        :before-upload="beforeFileUpload"
                                        :remove="handleFileRemove"
                                        v-decorator="[
                                            key,
                                            {
                                                rules: [
                                                    {
                                                        required: value.required,
                                                        message: '请输入' + value.title
                                                    },
                                                    value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                                ]
                                            }
                                        ]"
                                    >
                                        <a-button v-if="fileLists.length < 10"> <a-icon type="upload" />点击上传 </a-button>
                                    </a-upload>
                                </a-form-item>

                                <!-- 上传图片 字段 view: "image"-->
                                <a-form-item v-if="value.view == 'image' || value.view == 'img'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                                    <div class="clearfix" style="diplay: block">
                                        <a-upload
                                            v-decorator="[key]"
                                            list-type="picture-card"
                                            :file-list="ImgObjs[record.keyName + '_' + key].ImgLists"
                                            :before-upload="
                                                (file) => {
                                                    rebeforeImgUpload(file, record.keyName + '_' + key);
                                                }
                                            "
                                            :remove="
                                                (file) => {
                                                    handleImgRemove(file, record.keyName + '_' + key);
                                                }
                                            "
                                        >
                                            <div v-if="ImgObjs[record.keyName + '_' + key].ImgLists.length < 8">
                                                <a-icon type="plus" />
                                                <div class="ant-upload-text">点击上传</div>
                                            </div>
                                        </a-upload>
                                    </div>
                                </a-form-item>

                                <!-- 单选 字段 view: "radio"-->
                                <a-form-item v-if="value.view == 'radio'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                                    <a-radio-group
                                        :options="value.enum"
                                        v-decorator="[
                                            key,
                                            {
                                                rules: [
                                                    {
                                                        required: value.required,
                                                        message: '请输入' + value.title
                                                    },
                                                    value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                                ],
                                                initialValue: value.defVal || undefined
                                            }
                                        ]"
                                    >
                                        <!-- <a-radio v-for="(sex, index) in value.enum" :key="index" :value="sex.text"> {{ sex.text }} </a-radio> -->
                                    </a-radio-group>
                                </a-form-item>

                                <!-- 下拉多选 字段 view: "list_multi"-->
                                <a-form-item v-if="value.view == 'list_multi' || value.view == 'multipleSelect'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                                    <a-select
                                        mode="multiple"
                                        style="width: 576px"
                                        v-decorator="[
                                            key,
                                            {
                                                rules: [
                                                    {
                                                        required: value.required,
                                                        message: '请输入' + value.title
                                                    },
                                                    value.maxLength > 0
                                                        ? {
                                                              transform: (value) => {
                                                                  return value.join(',');
                                                              }
                                                          }
                                                        : '',
                                                    value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                                ]
                                            }
                                        ]"
                                        :placeholder="'请输入' + value.title"
                                    >
                                        <a-select-option v-for="item in value.enum" :key="item.value" :value="item.value">{{ item.title }}</a-select-option>
                                    </a-select>
                                </a-form-item>

                                <!-- 下拉搜索 字段 view: "sel_search"-->
                                <a-form-item v-if="value.view == 'sel_search' || value.view == 'searchSelect'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                                    <a-select
                                        show-search
                                        option-filter-prop="children"
                                        style="width: 576px"
                                        :filter-option="filterOption"
                                        @focus="handleFocus"
                                        @blur="handleBlur"
                                        @change="handleSelect"
                                        v-decorator="[
                                            key,
                                            {
                                                rules: [
                                                    {
                                                        required: value.required,
                                                        message: '请输入' + value.title
                                                    },
                                                    value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                                ]
                                            }
                                        ]"
                                        :placeholder="'请输入' + value.title"
                                    >
                                        <a-select-option v-for="item in searchItems[key].selectValues" :key="item.value" :value="item.value">{{ item.text }}</a-select-option>
                                    </a-select>
                                </a-form-item>

                                <!-- 下拉框 字段 view: "list" -->
                                <a-form-item v-if="value.view == 'list' || value.view == 'select'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                                    <a-select
                                        style="width: 576px"
                                        v-decorator="[
                                            key,
                                            {
                                                rules: [
                                                    {
                                                        required: value.required,
                                                        message: '请输入' + value.title
                                                    },
                                                    value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                                ],
                                                initialValue: value.defVal || undefined
                                            }
                                        ]"
                                        :placeholder="'请输入' + value.title"
                                    >
                                        <a-select-option v-for="item in value.enum" :key="item.value" :value="item.value">{{ item.text }}</a-select-option>
                                    </a-select>
                                </a-form-item>

                                <!-- 选择用户 字段 view: "sel_user" -->
                                <!-- <a-form-item v-if="value.view == 'sel_user' || value.view == 'userChoose'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                                    <a-input
                                        style="width: 248px; border-right: none; border-radius: 4px 0 0 4px"
                                        v-decorator="[
                                            key,
                                            {
                                                rules: [
                                                    {
                                                        required: value.required,
                                                        message: '请输入' + value.title
                                                    },
                                                    value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                                ]
                                            }
                                        ]"
                                        :placeholder="'请输入' + value.title"
                                    />
                                    <a-button style="border-radius: 0 4px 4px 0">选择用户</a-button>
                                </a-form-item> -->
                                <!-- 选择用户 字段 view: "sel_user" -->
                                <a-form-item v-if="value.view == 'sel_user' || value.view == 'userChoose'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                                    <a-input
                                        :value="userValue"
                                        style="width: 486px; border-right: none; border-radius: 4px 0 0 4px"
                                        v-decorator="[
                                            key,
                                            {
                                                rules: [
                                                    {
                                                        required: value.required,
                                                        message: '请输入' + value.title
                                                    },
                                                    value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                                ]
                                            }
                                        ]"
                                        :read-only="true"
                                        :placeholder="'请输入' + value.title"
                                    />
                                    <a-button style="border-radius: 0 4px 4px 0" @click="optionUser(key)">选择用户</a-button>
                                </a-form-item>
                                <!-- 选择部门  字段 view: "sel_depart"-->
                                <!-- <a-form-item v-if="value.view == 'sel_depart' || value.view == 'deptChoose'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                                    <a-input
                                        style="width: 576px"
                                        v-decorator="[
                                            key,
                                            {
                                                rules: [
                                                    {
                                                        required: value.required,
                                                        message: '请输入' + value.title
                                                    },
                                                    value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                                ]
                                            }
                                        ]"
                                        :placeholder="'请输入' + value.title"
                                        icon="apartment"
                                    />
                                </a-form-item> -->
                                <a-form-item v-if="value.view == 'sel_depart' || value.view == 'deptChoose'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                                    <a-form-item>
                                        <j-select-depart v-decorator="[key]" style="width: 576px" :multi="true" />
                                        <!-- {{ getFormFieldValue('bumen') }} -->
                                    </a-form-item>
                                </a-form-item>
                                <!-- 自定义树形控件  字段 view: "sel_tree" -->
                                <a-form-item v-if="value.view == 'sel_tree'" :label="value.title" :key="key" :class="formStatus == 'show' ? 'form-disabled' : ''">
                                    <a-select
                                        style="width: 576px"
                                        v-decorator="[
                                            key,
                                            {
                                                rules: [
                                                    {
                                                        required: value.required,
                                                        message: '请输入' + value.title
                                                    },
                                                    value.maxLength > 0 ? { max: value.maxLength, message: '超过最大长度' } : ''
                                                ]
                                            }
                                        ]"
                                        :placeholder="'请选择' + value.title"
                                    >
                                        <a-select-option v-for="item in selectTreeList[key]" :key="item.key" :value="item.key">{{ item.title }}</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </template>
                        </a-form>
                    </a-tab-pane>
                </a-tabs>
            </div>
        </a-modal>
        <!--  用户选择--模态框 -->
        <a-modal id="userModal" v-model="visible4" title="根据部门选择用户" on-ok="userOk" width="1250px">
            <template slot="footer">
                <a-button @click="userCancel"> 关闭 </a-button>
                <a-button type="primary" @click="userOk"> 确定 </a-button>
            </template>
            <div class="content">
                <div class="left-content">
                    <a-directory-tree v-if="userTreeData.length" :tree-data="userTreeData" multiple defaultExpandAll :replace-fields="replaceFields" @select="onUserSelect" @expand="onUserExpand"> </a-directory-tree>
                </div>
                <div class="right-content">
                    <div class="header">
                        <label for="" class="lable">用户账号：</label>
                        <a-input-search placeholder="请输入账号" style="width: 150px" @search="onAccountSearch" />
                        <a-button class="btn" icon="redo" @click="resetList">重置</a-button>
                    </div>
                    <div class="bable">
                        <a-table :row-selection="userSelection" :columns="userColumns" :data-source="userData" :pagination="userPagination" @click="userTableChange">
                            <template slot="username" slot-scope="text">
                                {{ text }}
                            </template>
                        </a-table>
                    </div>
                </div>
            </div>
        </a-modal>
    </div>
</template>
<script>
import {getDropCityData,getDropProvinceData, getAddData, getOnlineColumns, getQueryInfo, getFormItem, getTableData, deleteTable, redactTable, uploading, TreeData, getMainDetail, getTreeData, checkOnly, getOneDetail, loadTreeDatas, asyncLoadTreeDatas, loadDictItems, getDictItems, queryTreeList, getUserList, queryUserByDepId, asyncCatTreeloadTreeData, catTreeloadTreeData } from '@/api/onlineFormFuncTest';
import { baseUrl } from '@/assets/js/base-url';
import moment from 'moment';
import JSelectDepart from '@/components/jeecgbiz/JSelectDepart';
import JSelectMultiUser from '@/components/jeecgbiz/JSelectMultiUser';
// 高级查询--表格
const saColumns = [
    {
        title: '保存的查询',
        dataIndex: 'saveSearch',
        scopedSlots: { customRender: 'name' }
    }
];
const saData = [];
// 高级查询里的条件
const itemList = [
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
// 高级查询数据
const modelForms = [
    {
        key: 1,
        rule: 'eq',
        type: 'text',
        val: undefined,
        field: undefined,
        enum: []
    }
];
// 部门选择
const treeData = [];
// 用户选择 表格数据
const userColumns = [
    {
        title: '用户账号',
        dataIndex: 'username',
        scopedSlots: { customRender: 'username' }
    },
    {
        title: '用户姓名',
        dataIndex: 'realname'
    },
    {
        title: '性别',
        dataIndex: 'sex'
    },
    {
        title: '手机',
        dataIndex: 'phone'
    },
    {
        title: '部门',
        dataIndex: 'orgCode'
    }
];
const userData = [];
const userTreeData = [];

const x = 3;
const y = 2;
const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
    const preKey = _preKey || '0';
    const tns = _tns || gData;

    const children = [];
    for (let i = 0; i < x; i++) {
        const key = `${preKey}-${i}`;
        tns.push({ title: key, key, scopedSlots: { title: 'title' } });
        if (i < y) {
            children.push(key);
        }
    }
    if (_level < 0) {
        return tns;
    }
    const level = _level - 1;
    children.forEach((key, index) => {
        tns[index].children = [];
        return generateData(level, key, tns[index].children);
    });
};
generateData(z);

const dataList = [];
const generateList = (data) => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const key = node.key;
        dataList.push({ key, title: key });
        if (node.children) {
            generateList(node.children);
        }
    }
};
generateList(gData);

const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some((item) => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
};

// 自定义树控件
const treeDataCustom = [
    {
        title: 'Node1',
        value: '0-0',
        key: '0-0'
        // children: [
        //   {
        //     title: "Child Node2",
        //     value: "0-0-2",
        //     key: "0-0-2",
        //     children: [
        //       {
        //         title: "Child Node2-1",
        //         value: "0-1-2-1",
        //         key: "0-1-2-1",
        //       },
        //       {
        //         title: "Child Node2-2",
        //         value: "0-0-2-1",
        //         key: "0-0-2-2",
        //       },
        //     ],
        //   },
        //   {
        //     title: "Child Node3",
        //     value: "0-0-3",
        //     key: "0-0-3",
        //   },
        // ],
    }
    // {
    //   title: "Node2",
    //   value: "0-1",
    //   key: "0-1",
    // },
];
export default {
    props: ['canDo'],
    components: { 'j-select-depart': JSelectDepart, 'j-select-multi-user': JSelectMultiUser },
    watch: {
        canDo(val) {
            // console.log(val);
            if (val) {
                this.loadFormItem(this.$route.params.id);
                this.getColumns(this.$route.params.id);
                this.getQueryInfos(this.$route.params.id);

                if (this.$route.params.isTree == 'Y') {
                    this.getTreeTableData(this.$route.params.id);
                } else {
                    this.getData(this.$route.params.id);
                }
                this.code = this.$route.params.id;
                this.isTree = this.$route.params.isTree == 'Y' ? 'Y' : 'N';
            }
        }
    },
    data() {
        return {
            // 省市数据
            provinceData:'',
            cityData:'',
            areaData:'',
            // 存储搜索下拉框内容
            content:'',
            // 字段信息
            fieldInformation:'',
            
            // 高级查询，选择查询字段，输入框
            searchContent:"",
            searchContentlabel:'',
            searchContentextra:'',

            treeType: '',
            treeDataCustom,
            canSelTree: false,
            canCatTree: false,
            bumen: '',
            bumens: '',
            departKey: '',
            departValue: 'gg',
            gData,
            searchValue: '',
            checkedKeys: [],
            expandedKeys: [],
            userValue: 'vasd',
            userColumns,
            userData,
            replaceFields: {
                children: 'children',
                title: 'title'
            },
            userTreeData,
            departmentList: '',
            autoExpandParent: true,
            selectedKeys: [],
            treeData,
            searchTreeData: [],
            visible4: false,
            tabForms: {},
            msg: [],
            columns: [],
            id: 1,
            code: '',
            arr1: [],
            cloumnsResult: '',
            dataResult: '',
            formItemResult: '',
            formProps: '',
            formRequired: [],
            loading: false,
            loading2: false,
            loading3: false,
            visible: false,
            visible1: false,
            visible2: false,
            visible3: false,
            confirmLoading: false,
            addForm: this.$form.createForm(this),
            queryForm: this.$form.createForm(this),
            vanForm: this.$form.createForm(this),
            previewVisible: false,
            previewImage: '',
            fileLists: [],
            ImgObjs: {},
            code: '',
            tablist: {},
            pagination: {
                size: 'small',
                total: 100,
                current: 1,
                pageSize: 10,
                'show-size-changer': true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} 共 ${total} 条`
            },
            userPagination: {
                size: 'small',
                total: 100,
                current: 1,
                pageSize: 10,
                'show-size-changer': true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} 共 ${total} 条`
            },
            templateLoading: false,
            startValue: null,
            endValue: null,
            endOpen: false,
            showLine: true,
            showIcon: false,
            editData: {},
            formStatus: 'add',
            isTree: '',
            validateOnly: {
                validator: this.compareToValidateOnly
            },
            treeInfo: {},
            pidVal: '0',
            queryInfoList: [],
            expand: false,
            queryCondition: {},
            selectTreeList: {},
            saColumns,
            saData,
            itemList,
            modelForms,
            amodelForm: {},
            superQueryMatchType: 'and',
            modelKey: 1,
            tabRecords: {},
            addSelectedRowKeys: [],
            tableTemplateData: {},
            tableDatas: {},
            markdownValues: {},
            searchItems: {},
            fieldHrefSlots: [],
            aHrefSlots: {},
            // 部门信息的子信息
            departmentChilds: '',
            // 用户信息 表格的多选
            userSelectedRowKeys: [],
            userSelectedRows: [],
            selUserKey: '',
            userInFoData: '',
            resetSelectedRowKeys: [],
            checkedArrValue: '',
            checkedKeysArr: '',
            deparKey: '',
            canSelUser: false,
            canSelDepart: false,
            formItemValue: '',
            dictOptions: {}
        };
    },
    watch: {
        checkedKeys(val) {
            // this.checkedKeysArr = val.checked;
            // console.log(this.checkedKeysArr);
        }
    },
    beforeCreate() {
        this.form = this.$form.createForm(this, { name: 'register' });
    },
    created() {
        this.queryCondition.superQueryParams = '';
        this.modelForms = [
            {
                key: 1,
                rule: 'eq',
                type: 'text',
                val: undefined,
                field: undefined,
                enum: []
            }
        ];
        // console.log("loadFormItem前",this.searchItems)
        this.loadFormItem(this.$route.params.id);
        this.getColumns(this.$route.params.id);
        this.getQueryInfos(this.$route.params.id);
    },

    computed: {
        // 表格中的多选框
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
        },
        rowSelection1() {
            return {
                selectedRowKeys: this.addSelectedRowKeys,
                onChange: (selectedRowKeys, selectedRows) => {
                    this.addSelectedRowKeys = selectedRowKeys;
                    this.selectedRows = selectedRows;
                }
            };
        },
        creatFF() {
            return this.$form.createForm(this);
        },

        userSelection() {
            return {
                selectedRowKeys: this.resetSelectedRowKeys,
                onChange: (selectedRowKeys, selectedRows) => {
                    // console.log(selectedRows);
                    this.resetSelectedRowKeys = selectedRowKeys;
                    // console.log(this.resetSelectedRowKeys);
                    let str = '';
                    for (let index = 0; index < selectedRows.length; index++) {
                        str += selectedRows[index].username + ',';
                    }
                    this.userSelectedRows = str.substring(0, str.length - 1);
                    console.log(selectedRows);
                }
            };
        }
    },
   
    methods: {
        // 整合接口参数
         params(obj) {
           let result = '';
           let item;
          for (item in obj) {
             if (obj[item] && String(obj[item])) {
              result += `&${item}=${obj[item]}`;
          }
        }
        if (result) {
            result = '&' + result.slice(1);
        }
            return result;
        },
        switchChange(checked,event){

            console.log(checked,event)
        },
        changeData(){
            //  this.cityData = ''
            console.log("focus")
        },
        changeLinkDown(value,option){
            // console.log(this.formProps.province.config,"province")
            console.log(value,"changeLinkDown")
            console.log(option,"option")
            // console.log(this.dictOptions,"dictOptions")
            
            // 市的数据：
            const table = this.formProps.province.config.table
            const txt = this.formProps.province.config.txt
            const pidField = this.formProps.province.config.pidField
            const idField = this.formProps.province.config.idField
            const key = this.formProps.province.config.key

            const pidValue = value       
            getDropCityData({table,txt,pidField,pidValue,key,idField}).then(res=>{
                // console.log(res.result,"city")
                this.cityData = res.result
            })
        },
        moment,             
        searchChange(value,string){
            console.log("value:",value)
            console.log("string:",string)
        },
        input(){
            console.log("jj")
        },
        log(value) {
            console.log(value);
        },
        // 校验唯一值
        compareToValidateOnly(rule, value, callback) {
            if (value) {
                checkOnly({
                    tableName: this.formItemResult.head.tableName,
                    fieldName: rule.field,
                    fieldVal: value
                })
                    .then((res) => {
                        if (res.code == 200 && res.success == true) callback();
                    })
                    .catch((err) => {
                        callback('该值不可用，系统中已存在！');
                    });
            }
        },
        //
        getDataByTree(code, page) {
            if (this.isTree == 'Y') {
                this.getTreeTableData(code, page);
            } else {
                this.getData(code, page);
            }
        },
        // 选择当前时间
        disabledStartDate(startValue) {
            const endValue = this.endValue;
            if (!startValue || !endValue) {
                return false;
            }
            return startValue.valueOf() > endValue.valueOf();
        },
        disabledEndDate(endValue) {
            const startValue = this.startValue;
            if (!endValue || !startValue) {
                return false;
            }
            return startValue.valueOf() >= endValue.valueOf();
        },
        handleStartOpenChange(open) {
            if (!open) {
                this.endOpen = true;
            }
        },
        handleEndOpenChange(open) {
            this.endOpen = open;
        },
        // 翻页 、 排序
        handleTableChange(page,sorter) {
            console.log("jkjj")
            // 更改 表格排序，  利用点击排序时，会触发的回调函数，change(page,sorter)
            console.log("sorter:",sorter)


            Object.assign(this.pagination, {
                current: page.current,
                pageSize: page.pageSize
            });

            this.getDataByTree(this.code);
        },
        // 重置
        resetTableData() {
            Object.assign(this.pagination, {
                current: 1
            });
            this.getDataByTree(this.code);

            this.queryForm.validateFields((err, values) => {

                console.log("values:",values)

                // for (let key in values) {   
                //     // delete key
                //     console.log('key',key)
                // }

                values = ''
                this.queryCondition = values;
                this.getDataByTree(this.code);
            })
        },
        
        // 查询
        handleQuerySubmit(e) {
            // console.log("jj")
            e.preventDefault();
            this.queryForm.validateFields((err, values) => {
                // 更改  条件查询bug
                // values 输入框中的值
                console.log("values:",values)
                for (let key in values) {   
                    console.log('key',key)
                    console.log('values[key]:',values[key])
                    if (!values[key]) {
                        delete values[key];
                    }
                    // console.log('delete后：',values[key])
                }
                // console.log("deletevalues:",values)
                if(values.sex2){
                    console.log("values存在")
                    if(!values.sex2.length){
                       console.log("sex2")
                       delete values.sex2
                    }
                    this.queryCondition = values;
                    this.getDataByTree(this.code);
                }else{
                   this.queryCondition = values;
                   this.getDataByTree(this.code);
                }        
                if(values.t4_begin){
                    console.log(values.t4_begin)
                    values.t4_begin = this.formatDate(values.t4_begin)
                    console.log(values.t4_begin)
                }
                if(values.t4_end){
                    console.log(values.t4_end)
                    values.t4_end = this.formatDate(values.t4_end)
                    console.log(values.t4_end)
                }
                if(values.t5_begin){
                    console.log(values.t5_begin)
                    values.t5_begin = this.formatDate(values.t5_begin)
                    console.log(values.t5_begin)
                }
                if(values.t5_end){
                    console.log(values.t5_end)
                    values.t5_end = this.formatDate(values.t5_end)
                    console.log(values.t5_end)
                }
                if(values.t6){
                    console.log(values.t6)
                    values.t6 = this.formatTime(values.t6)
                    console.log(values.t6)
                }
                this.queryCondition = values;
                   this.getDataByTree(this.code);
            });
        },
        // 转换时间戳
        formatDate(date) {
            var date = new Date(date);
            var YY = date.getFullYear() + '-';
            var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
            var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            // console.log(YY + MM + DD )
            return YY + MM + DD ;
        },
        formatTime(date) {
            var date = new Date(date);
            var YY = date.getFullYear() + '-';
            var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
            var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            // console.log(YY + MM + DD )
            return hh + mm + ss ;
        },          
         // 时间戳转字符串
        getTimeStrTime(time) {
            let str = '';
            let date = new Date(time);
            let year = date.getFullYear();
            let month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
            let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
            let h = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
            let m = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
            let s = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
            str = year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s;
            return str;
        },                                                                                                                                                                                                                                                                                                  
                
        // 展开/收起
        toggle() {
            this.expand = !this.expand;
        },
      
        // 获取查询字段信息
        getQueryInfos(id) {
            getQueryInfo({ code: id })
                .then((res) => {
                    this.fieldInformation = res.result
                    // console.log("fieldInformation:",this.fieldInformation) 
                    let arrs = [];
                    res.result.map((t) => {
                        if (t.view == 'sel_tree') {
                            asyncLoadTreeDatas({
                                pid: t.pidValue,
                                pidField: 'pid',
                                tableName: 'sys_category',
                                // tableName: this.formItemResult.head.tableName,
                                text: 'name',
                                code: 'id',
                                hasChildField: 'has_child',
                                condition: '',
                            })
                                .then((res) => {
                                    let arr = [];
                                    res.result.forEach((item) => {
                                        arr.push({
                                            id: item.key,
                                            value: item.key,
                                            pId: item.parentId,
                                            title: item.title,
                                            isLeaf: item.leaf
                                        });
                                    });
                                    t.treeData = arr;
                                    arrs.push(t);
                                })
                                .catch((err) => {
                                    this.$message.error(err);
                                });
                        } else if (t.view == 'cat_tree') {
                            asyncCatTreeloadTreeData({
                                pid: '',
                                pcode: t.pcode || 0,
                                condition: ''
                            })
                                .then((res) => {
                                    let arr = [];
                                    res.result.forEach((item) => {
                                        arr.push({
                                            id: item.key,
                                            value: item.key,
                                            pId: item.parentId,
                                            title: item.title,
                                            isLeaf: item.leaf
                                        });
                                    });
                                    t.treeData = arr;
                                    arrs.push(t);
                                })
                                .catch((err) => {
                                    this.$message.error(err);
                                });
                        } else {
                            arrs.push(t);
                        }
                    });
                    // setTimeout(() => {
                    this.queryInfoList = arrs;
                    // console.log(this.queryInfoList)
                    // }, 300);
                })
                .catch((err) => {
                    this.$message.error(err);
                });
        },
        // 对接online新增表单
        loadFormItem(id) {
            // 获取 新增模态框中 表 里的值
            getFormItem({ code: id })
                .then((res) => {
                    this.formItemResult = res.result;
                    this.treeType = res.result.head.isTree;
                    this.formProps = res.result.schema.properties;
                    // console.log(this.formProps,"formProps")
                    this.formRequired = res.result.schema.required || [];
                    // console.log("resetFormItemData前",this.searchItems)
                    this.resetFormItemData();
                    if (res.result.head.isTree == 'Y') {
                        this.getTreeTableData(this.$route.params.id);
                    } else {
                        this.getData(this.$route.params.id);
                    }
                    this.code = this.$route.params.id;
                    this.isTree = res.result.head.isTree == 'Y' ? 'Y' : 'N';
                })
                .catch((err) => {
                    this.$message.error(err);
                });
        },

        // 处理返回值
        resetFormItemData() {
            
            console.log("this.formProps",this.formProps)

            let data = this.formProps;
            let tablist = {};
            let tableTemplateData = {};
            let arr = [];
            let marks = {};
            let searchItems = {};
            let ImgObjs = {};
            let selectTreeList = {};
            let searchArr = [];
            // console.log("this.formRequired:",this.formRequired)
            if (this.formRequired && this.formRequired.length > 0) {
                for (let key in data) {
                    let ite = {
                        key: key,
                        title: data[key].title,
                        value: key,
                        view: data[key].view,
                        enum: data[key].enum
                    };
                    this.formRequired.map((item) => {
                        if (item == key) {
                            data[key].required = true;
                        }
                    });
                    this.chuliEnum(data[key]);
                    if ('sel_search' == data[key].view) {
                        searchItems[key] = data[key];
                        if (searchItems[key].dictTable?.toLowerCase().indexOf('where') > -1) {
                            let dictTemp = searchItems[key].dictTable;
                            searchItems[key].dictTable = dictTemp.substring(0, dictTemp.indexOf('where') - 1).trim();
                            searchItems[key].dictCondition = encodeURI(dictTemp.substring(dictTemp.indexOf('where') + 5));
                        }
                    }
                    if ('image' == data[key].view) {
                        ImgObjs[key] = {
                            ImgLists: []
                        };
                    }
                    if ('sel_user' == data[key].view) {
                        this.canSelUser = true;
                    }
                    if ('sel_depart' == data[key].view) {
                        this.canSelDepart = true;
                    }
                    if ('cat_tree' == data[key].view) {
                        selectTreeList[key] = [];
                    }

                    if (data[key].view == 'tab') {
                        ite.title = data[key].describe;
                        ite.disabled = true;
                        let iteChildren = [];
                        for (let k in data[key].properties) {
                            iteChildren.push({
                                key: k,
                                title: ite.title + '-' + data[key].properties[k].title,
                                value: k,
                                view: data[key].properties[k].view,
                                enum: data[key].properties[k].enum
                            });
                            this.chuliEnum(data[key].properties[k]);
                            if (data[key].properties[k].view == 'markdown') {
                                marks[k] = '';
                            }
                            if ('sel_search' == data[key].properties[k].view) {
                                searchItems[k] = data[key].properties[k].view;
                                if (searchItems[key].dictTable?.toLowerCase().indexOf('where') > -1) {
                                    let dictTemp = searchItems[key].dictTable;
                                    searchItems[key].dictTable = dictTemp.substring(0, dictTemp.indexOf('where') - 1).trim();
                                    searchItems[key].dictCondition = encodeURI(dictTemp.substring(dictTemp.indexOf('where') + 5));
                                }
                            }
                            if ('image' == data[key].properties[k].view) {
                                ImgObjs[key + '_' + k] = {
                                    ImgLists: []
                                };
                            }
                            if ('sel_user' == data[key].properties[k].view) {
                                this.canSelUser = true;
                            }
                            if ('sel_depart' == data[key].properties[k].view) {
                                this.canSelDepart = true;
                            }
                            if ('sel_tree' == data[key].properties[k].view) {
                                selectTreeList[k] = [];
                            }
                            if ('cat_tree' == data[key].properties[k].view) {
                                selectTreeList[k] = [];
                            }
                            ite.children = iteChildren;
                        }
                        if (data[key].columns) {
                            console.log("columns:",data[key].columns)
                            let columnsData = {};
                            data[key].columns = [{ key: 'key', title: '#', width: 60 }, ...data[key].columns];
                            data[key].columns.map((v) => {
                                v.dataIndex = v.key;
                                v.scopedSlots = { customRender: v.key };
                                columnsData[v.key] = undefined;
                                if (v.key == 'key') {
                                    columnsData[v.key] = 1;
                                }
                                if (v.type == 'image') {
                                    ImgObjs[key + '_' + v.key] = {
                                        ImgLists: []
                                    };
                                }
                            });
                            tableTemplateData[key] = columnsData;
                            this.tableDatas[key] = [];
                        }
                        data[key].keyName = key;
                        tablist[key] = data[key];
                        this.tabForms[key] = this.$form.createForm(this);
                    }
                    if (data[key].view == 'sel_tree' && data[key].pidField) {
                        this.treeInfo = data[key];
                        this.treeInfo.keyName = key;
                        selectTreeList[key] = [];
                    }
                    if (data[key].view == 'markdown') {
                        marks[key] = '';
                    }
                    data[key].keyName = key;
                    arr.push(data[key]);
                    searchArr.push(ite);
                }
            } else {
                for (let key in data) {
                    let ite = {
                        key: key,
                        title: data[key].title,
                        value: key,
                        view: data[key].view,
                        enum: data[key].enum,
                        // type:data[key].type
                    };
                    // if(data[key].columns){
                    //     ite.enum = data[key].columns
                    // }
                    // console.log("ite:",ite)
                    // console.log("data[key]:",data[key])
                    // console.log("this.modelForms :",this.modelForms)
                    this.chuliEnum(data[key]);
                    if (data[key].view ==='sel_search') {
                        searchItems[key] = data[key];
                        if (searchItems[key].dictTable?.toLowerCase().indexOf('where') > -1) {
                            let dictTemp = searchItems[key].dictTable;
                            searchItems[key].dictTable = dictTemp.substring(0, dictTemp.indexOf('where') - 1).trim();
                            searchItems[key].dictCondition = encodeURI(dictTemp.substring(dictTemp.indexOf('where') + 5));
                        }
                    }
                    if (data[key].view === 'image') {
                        ImgObjs[key] = {
                            ImgLists: []
                        };
                    }
                    if (data[key].view == 'sel_tree' && data[key].pidField) {
                        this.treeInfo = data[key];
                        selectTreeList[key] = [];
                    }
                    if (data[key].view == 'markdown') {
                        marks[key] = '';
                    }
                    if (data[key].view === 'sel_user') {
                        this.canSelUser = true;
                    }
                    if (data[key].view === 'sel_depart') {
                        this.canSelDepart = true;
                    }
                    if (data[key].view === 'cat_tree') {
                        selectTreeList[key] = [];
                    }
                    if (data[key].view == 'tab') {
                        // console.log("tab",data[key])
                        ite.title = data[key].describe;
                        ite.disabled = true;
                        let iteChildren = [];
                        // 如果是  columns
                        for (let k in data[key].columns) {
                            // console.log("data[key].columns: ",data[key].columns[k])
                            iteChildren.push({
                                key: k,
                                title: ite.title + '-' + data[key].columns[k].title,
                                value: data[key].columns[k].key,
                                view: data[key].columns[k].type,
                                enum: data[key].columns[k].options,
                            });
                            this.chuliEnum(data[key].columns[k]);
                             
                            if (data[key].columns[k].view == 'markdown') {
                                marks[k] = '';
                            }
                            if ('sel_search' == data[key].columns[k].view) {
                                searchItems[k] = data[key].columns[k].view;
                                if (searchItems[key].dictTable?.toLowerCase().indexOf('where') > -1) {
                                    let dictTemp = searchItems[key].dictTable;
                                    searchItems[key].dictTable = dictTemp.substring(0, dictTemp.indexOf('where') - 1).trim();
                                    searchItems[key].dictCondition = encodeURI(dictTemp.substring(dictTemp.indexOf('where') + 5));
                                }
                            }
                            if ('image' == data[key].columns[k].view) {
                                ImgObjs[key + '_' + k] = {
                                    ImgLists: []
                                };
                            }
                            if ('sel_user' == data[key].columns[k].view) {
                                this.canSelUser = true;
                            }
                            if ('sel_depart' == data[key].columns[k].view) {
                                this.canSelDepart = true;
                            }
                            if ('sel_tree' == data[key].columns[k].view) {
                                selectTreeList[k] = [];
                            }
                            if ('cat_tree' == data[key].columns[k].view) {
                                selectTreeList[k] = [];
                            }
                            ite.children = iteChildren;
                        //    console.log("ite",ite)
                        }

                        // 如果在 properties 中
                        for (let k in data[key].properties) {
                            iteChildren.push({
                                key: k,
                                title: ite.title + '-' + data[key].properties[k].title,
                                value: k,
                                view: data[key].properties[k].view,
                                enum: data[key].properties[k].enum
                            });
                            this.chuliEnum(data[key].properties[k]);

                            if (data[key].properties[k].view == 'markdown') {
                                marks[k] = '';
                            }
                            if ('sel_search' == data[key].properties[k].view) {
                                searchItems[k] = data[key].properties[k].view;
                                if (searchItems[key].dictTable?.toLowerCase().indexOf('where') > -1) {
                                    let dictTemp = searchItems[key].dictTable;
                                    searchItems[key].dictTable = dictTemp.substring(0, dictTemp.indexOf('where') - 1).trim();
                                    searchItems[key].dictCondition = encodeURI(dictTemp.substring(dictTemp.indexOf('where') + 5));
                                }
                            }
                            if ('image' == data[key].properties[k].view) {
                                ImgObjs[key + '_' + k] = {
                                    ImgLists: []
                                };
                            }
                            if ('sel_user' == data[key].properties[k].view) {
                                this.canSelUser = true;
                            }
                            if ('sel_depart' == data[key].properties[k].view) {
                                this.canSelDepart = true;
                            }
                            if ('sel_tree' == data[key].properties[k].view) {
                                selectTreeList[k] = [];
                            }
                            if ('cat_tree' == data[key].properties[k].view) {
                                selectTreeList[k] = [];
                            }
                            ite.children = iteChildren;
                            // console.log("tabIte:",ite)  
                        }
                        if (data[key].columns) {
                            let columnsData = {};
                            data[key].columns = [{ key: 'key', title: '#', width: 60 }, ...data[key].columns];
                            data[key].columns.map((v) => {
                                v.dataIndex = v.key;
                                v.scopedSlots = { customRender: v.key };
                                columnsData[v.key] = v.defaultValue || undefined;
                                if (v.key == 'key') {
                                    columnsData[v.key] = 1;
                                }
                                if (v.type == 'image') {
                                    ImgObjs[key + '_' + v.key] = {
                                        ImgLists: []
                                    };
                                }
                            });
                            tableTemplateData[key] = columnsData;
                            this.tableDatas[key] = [];
                        }
                        this.tabForms[key] = this.$form.createForm(this);
                        data[key].keyName = key;
                        tablist[key] = data[key];
                    }
                    data[key].keyName = key;
                    arr.push(data[key]);
                    // console.log("searchArr:",searchArr)
                    // console.log("searchArrBegin",ite)
                    searchArr.push(ite);
                    // console.log("searchArrEnd",searchArr)
                }
            }
            arr.sort((a, b) => a.order - b.order);

            // 存储查询字段下拉框的内容
            this.searchTreeData = searchArr;
            // 遍历出高级查询中的选择  查询字段
            // console.log("this.searchTreeData:",this.searchTreeData)

            /* 通过输入框的回调函数，拿到输入框的内容，进行判断是属于哪个任务项中的
            将输入库中的内容拼接上任务项的字段
            如果输入框的内容 */

            this.tablist = tablist;
            this.tableTemplateData = tableTemplateData;
            // console.log(' ---- tablist : ', tablist);

            this.formProps = data;

            console.log("this.formProps0000:",this.formProps)

            this.markdownValues = marks;
            this.searchItems = searchItems;
            this.ImgObjs = ImgObjs;
            this.selectTreeList = selectTreeList;

            // console.log("resetFormItemData后",this.searchItems)

            this.getSearchItems()

            // console.log("getSearchItems后",this.searchItems)

        },

        // 处理枚举
        chuliEnum(text) {
            // console.log(text, 'text1111')
            if (text.view == 'radio' || text.view == 'list' || text.view == 'checkbox' || text.view == 'list_multi') {
                if (text && text.enum) {
                    text.enum.map((item) => {
                        item.label = item.title;
                    });
                }
            }
        },

        // 表格头部接口
        getColumns(id) {
            getOnlineColumns({ code: id })
                .then((res) => {
                    let dictOptions = res.result.dictOptions;
                    this.dictOptions = dictOptions;

                    let arr = [];
                    let fieldHrefSlots = res.result.fieldHrefSlots;
                    this.aHrefSlots = fieldHrefSlots
                    // 这里拿到链接跳转的必须品
                    // console.log("this.aHrefSlots:",this.aHrefSlots)
                    let aHrefSlots = {};
                    // console.log(this.fieldInformation)
                    this.columnsheader = res.result.columns
                    // console.log("columnsheader:",res.result.columns);
                    // console.log("fieldHrefSlots:",fieldHrefSlots)
                    res.result.columns.forEach((item) => {
                        // 链接跳转
                        // console.log("item:",item)

                        if(item.hrefSlotName){
                            // console.log("fieldHrefSlots:",fieldHrefSlots)
                            fieldHrefSlots.forEach(i=>{
                                // console.log("href:",i)
                                if(i.slotName === item.hrefSlotName){
                                    console.log(item.title)
                                    console.log(i.href)
                                }
                            })
                            console.log("item.hrefSlotName:",item.hrefSlotName)
                        }
                        if (item.customRender != null) {
                            let cust = item.customRender;
                            item.customRender = (value, row, index) => {
                                let para = JSON.parse(JSON.stringify(value));
                                for (let key in dictOptions) {
                                    if (key == cust) {
                                        let str = '';
                                        dictOptions[key].forEach((text) => {
                                            if (value.indexOf('' + text.value) != -1) {
                                                str += text.text + ',';
                                            }
                                        });
                                        value = str.substring(0, str.length - 1);
                                    }
                                }
                                if (item.hrefSlotName == null) {
                                    item.hrefSlotName = '';
                                } else {
                                    // fieldHrefSlots.forEach((t) => {
                                    //     if (t.slotName == item.hrefSlotName) {
                                    //         value = '<a href="' + baseUrl + t.href.substring(0, t.href.indexOf('${')) + row[t.href.substring(t.href.indexOf('${') + 2, t.href.length - 1)] + '" >' + value + '</a>';
                                    //         aHrefSlots[item.dataIndex] = {
                                    //             key: item.dataIndex,
                                    //             value: value
                                    //         };
                                    //     }
                                    // });
                                    // return value;
                                }
                                return { children: value };
                            };
                        } else {
                            delete item.customRender;
                            if (item.hrefSlotName == null) {
                                item.hrefSlotName = '';
                            } else {
                                item.scopedSlots = { customRender: 'hrefSlot' };
                                fieldHrefSlots.forEach((t) => {
                                    if (t.slotName == item.hrefSlotName) {
                                        t.keyName = item.dataIndex;
                                        t.href = baseUrl + item.href;
                                    }
                                });
                            }
                        }
                        item.dataIndex = item.dataIndex.toLowerCase();
                        if (!item.scopedSlots || item.scopedSlots == null) {
                            item.scopedSlots = { customRender: '' };
                        }
                        arr.push(item);
                    });
                    this.cloumnsResult = res.result;
                    this.fieldHrefSlots = fieldHrefSlots;
                    // 添加超链接
                    // item.customRender(text,value,index)=>{
                    //     console
                    // }

                    // arr.forEach((item, index) => {
                    //     item.customRender = (text, value, index) => {
                    //         console.log(text, value, index)
                    //         return <a href="http://baidu.com">{{text}}</a>
                    //         // return text
                    //         } 
                    // });

                    arr.push({ title: '操作', dataIndex: 'operation', align: 'center', width: 150, scopedSlots: { customRender: 'operation' } });
                    console.log(arr,"arr")
                    this.columns = arr;
                    this.aHrefSlots = aHrefSlots;
                })
                .catch((err) => {
                    this.$message.error(err);
                });
        },

        //新增按钮
        showModal() {
            // 获取省的下拉列表数据

            // 注释原因：不是联动组件 config会报未定义

            const table = this.formProps.province.config.table
            const txt = this.formProps.province.config.txt
            const pidField = this.formProps.province.config.pidField
            const idField = this.formProps.province.config.idField
            const key = this.formProps.province.config.key
            const condition = this.formProps.province.config.condition
            getDropProvinceData({table,txt,pidField,idField,key,condition}).then(res=>{
                console.log(res.result,"res")
                this.provinceData = res.result
            })
            // console.log(this.formProps.province.others,"this.formProps")

            let marks = this.markdownValues;
            if (marks) {
                for (let key in marks) {
                    marks[key] = '';
                }
            }

            this.addForm.resetFields();
            this.formStatus = 'add';
            this.loadTreeData();
            setTimeout(() => {
                this.visible = true;
            }, 200);

            this.restTabForms();
            // 获取下拉搜索框数据
            // this.getSearchItems();

            let typeView = this.formProps;
            if (this.canSelUser == true) {
                this.getUserInFoList();
            }
            if (this.canSelDepart == true) {
                this.getUserInFoList();
            }
            if (this.canCatTree == false) {
                this.customLoadTreeData();
            }
            // this.onLoadData();
        },

        // 选择用户，部门，获取用户列表数据接口
        getUserInFoList(value) {
            // console.log(value,"getvalue")
            getUserList({ username: '' })
                .then((res) => {
                    this.userInFoData = res.result;
                    let userInFoArr = res.result.records;
                    this.userData = userInFoArr;
                    let arrList = [];
                    for (let index = 0; index < userInFoArr.length; index++) {
                        if (value == userInFoArr[index].username) {
                            arrList.push(userInFoArr[index]);
                            this.userData = arrList;
                        }
                    }
                    Object.assign(this.userPagination, {
                        total: res.result.total
                    });
                })
                .catch((err) => {
                    console.log(err);
                    this.$message.error(err);
                });
        },
        // 获取表类型字典数据（新增下拉框搜索的值）接口
        getSearchItems() {
            let data = this.searchItems;
            for (let key in data) {
                getDictItems(data[key]).then((res) => {
                    data[key].selectValues = res.result;
                    this.content1 = res.result;
                });
            }
            this.searchItems = data;

            let item = this.searchItems
            for(let i in item){
                if(i === "t1"){
                    // this.show = true;
                    // this.showWhere = false;
                    getDictItems(item[i]).then((res) => {
                        this.content1 = res.result;
                        // console.log("this.content1:",this.content1,this.show,this.showWhere)
                    });
                    // return false
                }

                if(i === "t2"){
                    // this.show = false
                    // this.showWhere = true
                    getDictItems(item[i]).then((res) => {
                        this.content2 = res.result;
                        // console.log("this.content2:",this.content2,this.show,this.showWhere)
                    });
                    // return false
                }
            }

        },
        // 新增模态框 确定按钮--表单提交
        onSubmit() {
            let code = this.code;
            this.addForm.validateFields((err, values) => {
                for (let key in values) {
                    if (this.formProps[key]?.view == 'switch') {
                        if (this.formProps[key].extendOption) {
                            values[key] = values[key] == true ? this.formProps[key].extendOption[0] : this.formProps[key].extendOption[1];
                        } else {
                            values[key] = values[key] == true ? 'Y' : 'N';
                        }
                    }
                    if (this.formProps[key]?.view == 'date') {
                        values[key] = values[key] ? values[key].format('yyyy-MM-DD') : '';
                    } else if (this.formProps[key]?.view == 'datetime') {
                        values[key] = values[key] ? values[key].format('YYYY-MM-DD HH:mm:ss') : '';
                    } else if (this.formProps[key]?.view == 'time') {
                        values[key] = values[key] ? values[key].format('HH:mm:ss') : '';
                    } else if (this.formProps[key]?.view == 'markdown') {
                        values[key] = this.markdownValues[key];
                    } else if (this.formProps[key]?.view == 'checkbox' || this.formProps[key]?.view == 'list_multi') {
                        values[key] = values[key].join(',');
                    } else if (this.formProps[key]?.view == 'image') {
                        values[key] = '';
                        if (this.ImgObjs[key].ImgLists.length > 0) {
                            this.ImgObjs[key].ImgLists.forEach((item) => {
                                values[key] += item.url + ',';
                            });
                            values[key] = values[key].substring(0, values[key].length - 1);
                        }
                    }
                }
                for (let key in this.tabForms) {
                    if (this.formProps[key]?.view == 'tab' && this.formProps[key]?.properties) {
                        this.tabForms[key].validateFields((errs, val) => {
                            let arr = [];
                            for (let k in val) {
                                if (this.formProps[key].properties[k]?.view == 'switch') {
                                    if (this.formProps[key].properties[k].extendOption) {
                                        val[k] = val[k] == true ? this.formProps[key].properties[k].extendOption[0] : this.formProps[key].properties[k].extendOption[1];
                                    } else {
                                        val[k] = val[k] == true ? 'Y' : 'N';
                                    }
                                }
                                if (this.formProps[key].properties[k]?.view == 'date') {
                                    val[k] = val[k] ? val[k].format('yyyy-MM-DD') : '';
                                } else if (this.formProps[key].properties[k]?.view == 'datetime') {
                                    val[k] = val[k] ? val[k].format('YYYY-MM-DD HH:mm:ss') : '';
                                } else if (this.formProps[key].properties[k]?.view == 'time') {
                                    val[k] = val[k] ? val[k].format('HH:mm:ss') : '';
                                } else if (this.formProps[key].properties[k]?.view == 'checkbox' || this.formProps[key].properties[k]?.view == 'list_multi') {
                                    val[k] = val[k].join(',');
                                } else if (this.formProps[key].properties[k]?.view == 'image') {
                                    val[k] = '';
                                    if (this.ImgObjs[key + '_' + k].ImgLists.length > 0) {
                                        this.ImgObjs[key + '_' + k].ImgLists.forEach((item) => {
                                            val[k] += item.url + ',';
                                        });
                                        val[k] = val[k].substring(0, values[key].length - 1);
                                    }
                                }
                            }

                            arr.push(val);
                            values[key] = arr;
                        });
                    }
                    if (this.formProps[key]?.view == 'tab' && this.formProps[key]?.columns) {
                        values[key] = this.tableDatas[key];
                        this.formProps[key].columns.forEach((t, i) => {
                            if (t.type == 'image') {
                                values[key].forEach((r, ind) => {
                                    if (this.ImgObjs[key + '_' + t.key + '_' + ind].ImgLists.length > 0) {
                                        let s = '';
                                        this.ImgObjs[key + '_' + t.key + '_' + ind].ImgLists.forEach((one) => {
                                            s += one.url + ',';
                                        });
                                        r[t.key] = s.substring(0, s.length - 1);
                                    }
                                });
                            }
                        });
                    }
                }
                // return false;
                if (!err) {
                    // if (this.pidVal && this.isTree == 'Y') {
                    //     values.pid = this.pidVal;
                    // }
                    console.log(code,"code")
                    console.log(values,"values")
                
                    if (this.formStatus == 'add') {
                        getAddData({
                            code: code,
                            obj: values,
                        }).then((res) => {
                                this.$message.success(res.message);
                                this.getDataByTree(this.code);
                                this.restTabForms();
                                this.visible = false;
                            })
                            .catch((err) => {
                                this.$message.error(err);
                            });
                    } else if (this.formStatus == 'edit') {
                        values.id = this.editData.id;
                        redactTable({
                            code: code,
                            obj: values
                        })
                            .then((res) => {
                                this.$message.success(res.message);
                                this.getDataByTree(this.code);
                                this.visible = false;
                                this.restTabForms();
                            })
                            .catch((err) => {
                                this.$message.error(err);
                            });
                    }
                }
            });
        },
        // 重置所有表单 已经  表格清空
        restTabForms() {
            for (let key in this.tabForms) {
                this.tabForms[key].resetFields();
            }
            for (let key in this.tableDatas) {
                this.tableDatas[key] = [];
            }
            for (let key in this.ImgObjs) {
                this.ImgObjs[key].ImgLists = [];
            }
            this.tabRecords = {};
        },
        // 新增模态框 取消按钮
        handleCancel(e) {
            this.visible = false;
            this.restTabForms();
        },
        // 文件上传
        beforeFileUpload(file) {
            file.status = 'uploading';
            this.handleFileUpload(file);
            // return false;
        },
        handleFileUpload(file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('biz', '');
            this.uploading = true;
            uploading(formData)
                .then((res) => {
                    file.status = 'done';
                    file.url = baseUrl + '/sys/common/static/' + res.message;
                    this.fileLists = [...this.fileLists, file];
                })
                .catch((e) => {
                    this.$message.error('error:', e);
                });
        },
        // 文件移除
        handleFileRemove(file) {
            let fileList = [];
            this.fileLists.map((item) => {
                if (!(file.uid == item.uid || item.status == 'removed')) {
                    fileList.push(item);
                }
            });
            this.fileLists = [...fileList];
        },
        // 图片上传
        beforeImgUpload(file, key) {
            file.status = 'uploading';
            return this.handleImgUpload(file, key);
        },
        handleImgUpload(file, key) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('biz', '');
            this.uploading = true;
            uploading(formData)
                .then((res) => {
                    file.status = 'done';
                    file.url = baseUrl + '/sys/common/static/' + res.message;
                    let ImgObjs = this.ImgObjs;
                    ImgObjs[key].ImgLists = [...ImgObjs[key].ImgLists, file];
                    this.ImgObjs = ImgObjs;
                    return baseUrl + '/sys/common/static/' + res.message;
                })
                .catch((e) => {
                    this.$message.error('error:', e);
                });
        },
        // 图片移除
        handleImgRemove(file, key) {
            let fileList = [];
            let ImgObjs = this.ImgObjs;
            ImgObjs[key].ImgLists.map((item) => {
                if (!(file.uid == item.uid || item.status == 'removed')) {
                    fileList.push(item);
                }
            });
            ImgObjs[key].ImgLists = [...fileList];
            this.ImgObjs = ImgObjs;
        },
        // 图片上传
        beforeImgUpload2(file, key, a, col, k) {
            file.status = 'uploading';
            this.handleImgUpload2(file, key, a, col, k);
            return false;
        },
        handleImgUpload2(file, key, a, col, k) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('biz', '');
            this.uploading = true;
            uploading(formData)
                .then((res) => {
                    file.status = 'done';
                    file.url = baseUrl + '/sys/common/static/' + res.message;
                    let ImgObjs = this.ImgObjs;
                    ImgObjs[key].ImgLists = [...ImgObjs[key].ImgLists, file];
                    this.ImgObjs = ImgObjs;
                    let newData = JSON.parse(JSON.stringify(this.tableDatas));
                    const target = newData[k].filter((item) => a === item.key)[0];
                    if (target) {
                        target[col] = ImgObjs[key].ImgLists.join[','];
                        this.tableDatas = newData;
                    }
                })
                .catch((e) => {
                    this.$message.error('error:', e);
                });
        },
        // 图片移除
        handleImgRemove2(file, key, a, col, k) {
            let fileList = [];
            let ImgObjs = this.ImgObjs;
            ImgObjs[key].ImgLists.map((item) => {
                if (!(file.uid == item.uid || item.status == 'removed')) {
                    fileList.push(item);
                }
            });
            ImgObjs[key].ImgLists = [...fileList];
            this.ImgObjs = ImgObjs;
            let newData = JSON.parse(JSON.stringify(this.tableDatas));
            const target = newData[k].filter((item) => a === item.key)[0];
            if (target) {
                target[col] = ImgObjs[key].ImgLists.join[','];
                this.tableDatas = newData;
            }
        },
        // 下拉多选
        handleSelect(value) {},
        handleBlur() {},
        handleFocus(val) {
            let item = this.searchItems
            if(val === "t1"){
              for(let i in item){
                if(i === "t1"){
                        getDictItems(item[i]).then((res) => {
                        this.content = res.result;
                    });
                     return false
                }
              }   
            }
            if(val === "t2"){
              for(let i in item){
                if(i === "t2"){
                        getDictItems(item[i]).then((res) => {
                        this.content = res.result;
                    });
                     return false
                }
              }   
            }

            // for(let i in item){
            //     if(i === "t1"){
            //         getDictItems(item[i]).then((res) => {
            //             this.content = res.result;
            //         });
            //     }
            //     if(i === "t2"){
            //         getDictItems(item[i]).then((res) => {
            //             this.content = res.result;
            //         });
            //     }
            // }
        },
        filterOption(input, option) {
            return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        },
        // 获取表格数据
        getData(id, page) {
            // console.log(id,page)
            this.templateLoading = true;
            let params = {};
            if (this.queryCondition && this.queryCondition != null) {
                params = this.queryCondition;
            }
            
            params.superQueryMatchType = 'and';

            /* 尝试更改排序bug
            if(this.fieldInformation.title === this.columnsheader.label && this.columnsheader.sorter){
                params.column = this.fieldInformation,view;
            } */

            params.column = 'createTime';
            params.order = 'desc';
            params.pageNo = page == 1 ? 1 : this.pagination.current;
            params.pageSize = this.pagination.pageSize;
            // console.log("params:",params)
            getTableData(id, params)
                .then((res) => {
                    // 高级查询成功 模态框消失
                    this.visible1 = false,
                    this.dataResult = res.result;
                    this.msg = res.result.records;
                    Object.assign(this.pagination, {
                        total: res.result.total
                    });
                    this.templateLoading = false;
                    this.loading2 = false;
                })
                .catch((err) => {
                    this.$message.error(err);
                    this.templateLoading = false;
                });
        },
        // 删除气泡确认框
        confirm(record) {
            this.delTableData(this.code, record);
            this.$message.success('删除成功');
        },
        cancelText(e) {
            this.$message.error('Click on No');
        },
        // 删除接口
        delTableData(code, record) {
            deleteTable({ code: code, id: record.id })
                .then((res) => {
                    this.getDataByTree(this.code);
                })
                .catch((err) => {
                    this.$message.error(err);
                });
        },
        // tab切换
        tabCallback(key) {
            setTimeout(() => {
                this.tabForms[key].setFieldsValue(this.tabRecords[key]);
            }, 100);
        },
        // 编辑
        redactModal(record) {
            this.loadTreeData();
            this.getMainDatas(record, 'edit');
        },
        // 显示详情
        showDetail(record) {
            if (this.formItemResult.head.relationType == 1) {
                this.getOneDatas(record, 'show');
            } else {
                this.getMainDatas(record, 'show');
            }
        },
        // 获取一对一详情
        getOneDatas(record, type) {
            this.formStatus = type;
            this.visible = true;
            getOneDetail({
                code: this.code,
                mainId: record.id
            })
                .then((res) => {
                    this.editData = res.result;
                    for (let key in res.result) {
                        if (this.formProps[key]?.view == 'switch') {
                            if (this.formProps[key].extendOption) {
                                res.result[key] = res.result[key] == this.formProps[key].extendOption[0] ? true : false;
                            } else {
                                res.result[key] = res.result[key] == 'Y' ? true : false;
                            }
                        }
                        if (this.formProps[key]?.view == 'markdown') {
                            let marks = this.markdownValues;
                            marks[key] = res.result[key];
                            this.markdownValues = marks;
                        }
                    }
                    this.addForm.setFieldsValue(res.result);
                })
                .catch((err) => {
                    this.$message.error(err);
                });
        },
        // 获取主表或者一对多主表详情
        getMainDatas(record, type) {
            this.formStatus = type;
            this.visible = true;
            getMainDetail({
                code: this.code,
                id: record.id
            })
                .then((res) => {
                    this.editData = res.result;
                    let arr = {};
                    for (let key in res.result) {
                        if (this.formProps[key]?.view == 'switch') {
                            if (this.formProps[key].extendOption) {
                                res.result[key] = res.result[key] == this.formProps[key].extendOption[0] ? true : false;
                            } else {
                                res.result[key] = res.result[key] == 'Y' ? true : false;
                            }
                        }
                        if (this.formProps[key]?.view == 'markdown') {
                            let marks = this.markdownValues;
                            marks[key] = res.result[key];
                            this.markdownValues = marks;
                        }
                        if (typeof res.result[key] == 'object') {
                            if (this.formProps[key]?.properties) {
                                let val = res.result[key][0];
                                for (let k in val) {
                                    if (this.formProps[key].properties[k]?.view == 'switch') {
                                        if (this.formProps[key].properties[k].extendOption) {
                                            val[k] = val[k] == this.formProps[key].properties[k].extendOption[0] ? true : false;
                                        } else {
                                            val[k] = val[k] == 'Y' ? true : false;
                                        }
                                    }

                                    if (this.formProps[key].properties[k]?.view == 'date') {
                                        val[k] = val[k] ? moment(val[k]) : val[k];
                                    } else if (this.formProps[key].properties[k]?.view == 'datetime') {
                                        val[k] = val[k] ? moment(val[k]) : val[k];
                                    } else if (this.formProps[key].properties[k]?.view == 'time') {
                                        val[k] = val[k] ? moment(val[k]) : val[k];
                                    } else if (this.formProps[key].properties[k]?.view == 'image') {
                                        if (val[k].length > 0) {
                                            let imgs = val[k].split(',');
                                            let imgObjs = this.ImgObjs;
                                            let imgArr = [];
                                            imgs.forEach((item, index) => {
                                                imgArr.push({
                                                    uid: key + '_' + k + index,
                                                    url: item,
                                                    name: key + '_' + k + index
                                                });
                                            });
                                            imgObjs[key + '_' + k].ImgLists = imgArr;
                                            this.ImgObjs = imgObjs;
                                        }
                                    }
                                }
                                arr[key] = val;
                                this.tabForms[key].setFieldsValue(val);
                            }
                            if (this.formProps[key]?.columns) {
                                this.formProps[key].columns.forEach((one) => {
                                    if (one.type == 'image') {
                                        res.result[key].forEach((r, i) => {
                                            let imgs = r[one.key].split(',');
                                            let imgObjs = this.ImgObjs;
                                            let imgArr = [];
                                            if (imgs.length > 0) {
                                                imgs.forEach((item, index) => {
                                                    console.log(item);
                                                    imgArr.push({
                                                        uid: key + index,
                                                        url: item,
                                                        name: key + index
                                                    });
                                                });
                                            }
                                            imgObjs[key + '_' + one.key + '_' + i] = {
                                                ImgLists: imgArr
                                            };
                                            this.ImgObjs = imgObjs;
                                        });
                                    }
                                });
                                this.tableDatas[key] = res.result[key];
                            }
                        }

                        if (this.formProps[key]?.view == 'date') {
                            res.result[key] = res.result[key] ? moment(res.result[key]) : res.result[key];
                        } else if (this.formProps[key]?.view == 'datetime') {
                            res.result[key] = res.result[key] ? moment(res.result[key]) : res.result[key];
                        } else if (this.formProps[key]?.view == 'time') {
                            res.result[key] = res.result[key] ? moment(res.result[key]) : res.result[key];
                        } else if (this.formProps[key]?.view == 'image') {
                            if (res.result[key].length > 0) {
                                let imgs = res.result[key].split(',');
                                let imgObjs = this.ImgObjs;
                                let imgArr = [];
                                imgs.forEach((item, index) => {
                                    imgArr.push({
                                        uid: key + index,
                                        url: item,
                                        name: key + index
                                    });
                                });
                                imgObjs[key].ImgLists = imgArr;
                                this.ImgObjs = imgObjs;
                            }
                        }
                    }
                    this.tabRecords = arr;
                    console.log(res.result,"setFieldsValue")
                    this.addForm.setFieldsValue(res.result);
                })
                .catch((err) => {
                    this.$message.error(err);
                });
        },
        // 获取树表格数据
        getTreeTableData(id) {
            let params = {};
            if (this.queryCondition && this.queryCondition != null) {
                params = this.queryCondition;
            }
            params.hasQuery = false;
            getTreeData({ code: id, params })
                .then((res) => {
                    if (res && res.result) {
                        let recordList = JSON.parse(JSON.stringify(res.result.records));

                        let list = [];
                        let children = [];
                        recordList.map((item, index) => {
                            if (item.pid == '0') {
                                if (item.has_child == '1') {
                                    item.children = [];
                                }
                                list.push(item);
                            }
                        });
                        this.msg = list;
                        Object.assign(this.pagination, {
                            total: res.result.total
                        });
                    }
                })
                .catch((err) => {
                    this.$message.error(err);
                });
        },
        // 树表格展开
        handleExpand(expand, record) {
            if (expand) {
                getTreeData({ code: this.code, pid: record.id, has_child: record.has_child, hasQuery: false })
                    .then((res) => {
                        if (res && res.result) {
                            let recordList = JSON.parse(JSON.stringify(res.result.records));
                            let list = [];
                            let children = [];
                            recordList.map((item, index) => {
                                if (item.has_child == '1') {
                                    item.children = [];
                                }
                                list.push(item);
                            });
                            record.children = list;
                        }
                    })
                    .catch((err) => {
                        this.$message.error(err);
                    });
            }
        },
        // 添加表格超链接
        renderTarget(text, record, index){
            console.log(text, record, index, '2222')
        },
        // 加载树形数据
        loadTreeData(type) {
            let properValue = this.formItemResult.schema.properties;
            console.log("properValue",properValue)
            console.log("this.selectTreeList:",this.selectTreeList)
            let properName = this.formProps;
            let dictArr = [];
            for (const key in this.selectTreeList) {
                console.log("selectTreeList")
                let data = {};
                if (properValue[key].view == 'cat_tree') {
                    Object.assign(data, {
                        pid: properValue[key].pidValue,
                        pidField: 'PID',            
                        tableName: 'SYS_CATEGORY',
                        text: 'NAME',                
                        code: 'ID',
                        hasChildField: 'HAS_CHILD',
                        condition: '',
                    });
                } else {
                console.log("selectTreeList")
                    
                    dictArr[key] = properValue[key].dict.split(',');
                    Object.assign(data, {
                        pid: properValue[key].pidValue,
                        pidField: properValue[key].pidField,
                        tableName: dictArr[key][0],
                        text: dictArr[key][1],
                        code: dictArr[key][2],
                        hasChildField: properValue[key].hasChildField,
                        condition: '',
                    });
                }
                // formItemPid[key] = properValue[key].pidValue;
                console.log("loadTreeDatas:",data)
                loadTreeDatas(data)
                    .then((res) => {
                        let selectTreeList = this.selectTreeList;
                        let arr = [];
                        res.result.forEach((item) => {
                            // if (item.leaf == false) {
                            item.id = item.key;
                            item.isLeaf = item.leaf;
                            item.pId = item.parentId;
                            item.value = item.key;
                            arr.push({
                                id: item.key,
                                value: item.key,
                                pId: item.parentId,
                                title: item.title,
                                isLeaf: item.leaf
                            });
                            // }
                        });
                        selectTreeList[key] = arr;
                        this.selectTreeList = selectTreeList;
                        // this.treeDataCustom = res.result;
                    })
                    .catch((err) => {
                        this.$message.error(err);
                    });
            }
            this.canCatTree = true;
            // console.log(formItemPid);
            // this.formItemValue = formItemPid;

            // console.log(this.formItemValue);
            // console.log(this.formItemValue.pidValue);
        },
        // 自定义树形控件和分类字典树控件接口
        customLoadTreeData(type) {
            let properValue = this.formItemResult.schema.properties;
            console.log(this.formItemResult);
            let properName = this.formProps;
            let dictArr = [];
            for (const key in this.selectTreeList) {
                dictArr[key] = properValue[key].dict.split(',');
                // formItemPid[key] = properValue[key].pidValue;
                loadTreeDatas({
                    pid: properValue[key].pidValue,
                    pidField: properValue[key].pidField,
                    tableName: dictArr[key][0],
                    text: dictArr[key][1],
                    code: dictArr[key][2],
                    hasChildField: properValue[key].hasChildField,
                    condition: '',
                }).then((res) => {
                        let selectTreeList = this.selectTreeList;
                        let arr = [];
                        res.result.forEach((item) => {
                            // if (item.leaf == false) {
                            item.id = item.key;
                            item.isLeaf = item.leaf;
                            item.pId = item.parentId;
                            item.value = item.key;
                            arr.push({
                                id: item.key,
                                value: item.key,
                                pId: item.parentId,
                                title: item.title,
                                isLeaf: item.leaf
                            });
                            // }
                        });
                        selectTreeList[key] = arr;
                        this.selectTreeList = selectTreeList;
                        // this.treeDataCustom = res.result;
                    })
                    .catch((err) => {
                        this.$message.error(err);
                    });
            }
            this.canCatTree = true;
            // console.log(formItemPid);
            // this.formItemValue = formItemPid;

            // console.log(this.formItemValue);
            // console.log(this.formItemValue.pidValue);
        },
        // 新增的异步加载
        onLoadData(treeNode, pid) {
            return new Promise((resolve) => {
                const { id } = treeNode.dataRef;
                setTimeout(() => {
                    loadTreeDatas({
                        pid: id,
                        pidField: this.formItemResult.head.treeParentIdField || 'pid',
                        tableName: this.treeType == 'Y' ? this.formItemResult.head.tableName : 'sys_category',
                        // tableName: 'sys_category'this.treeType,
                        // tableName: this.formItemResult.head.tableName,
                        text: this.formItemResult.head.treeFieldname || 'name',
                        code: 'id',
                        hasChildField: this.formItemResult.head.treeIdField || 'has_child',
                        condition: ''
                    })
                        .then((res) => {
                            let selectTreeList = this.selectTreeList;
                            let arr = [];
                            res.result.forEach((item) => {
                                item.isLeaf = item.leaf;
                                item.pId = item.parentId;
                                item.id = item.key;
                                item.value = item.key;
                                arr.push({
                                    id: item.key,
                                    value: item.key,
                                    pId: item.parentId,
                                    title: item.title,
                                    isLeaf: item.leaf
                                });
                            });
                            selectTreeList[pid] = selectTreeList[pid].concat([...arr]);
                            this.selectTreeList = selectTreeList;
                        })
                        .catch((err) => {
                            this.$message.error(err);
                        });
                    resolve();
                }, 200);
            });
        },
        // 查询的异步加载 sel_tree
        onSearchLoadData(treeNode, value) {
            return new Promise((resolve) => {
                const { id } = treeNode.dataRef;
                setTimeout(() => {
                    loadTreeDatas({
                        pid: id,
                        pidField: this.formItemResult.head.treeParentIdField || 'pid',
                        tableName: 'sys_category',
                        // tableName: this.formItemResult.head.tableName,
                        text: this.formItemResult.head.treeFieldname || 'name',
                        code: 'id',
                        hasChildField: this.formItemResult.head.treeIdField || 'has_child',
                        condition: ''
                    })
                        .then((res) => {
                            let arr = [];
                            res.result.forEach((item) => {
                                item.isLeaf = item.leaf;
                                item.pId = item.parentId;
                                item.id = item.key;
                                item.value = item.key;
                                arr.push({
                                    id: item.key,
                                    value: item.key,
                                    pId: item.parentId,
                                    title: item.title,
                                    isLeaf: item.leaf
                                });
                            });
                            value.treeData = value.treeData.concat([...arr]);
                        })
                        .catch((err) => {
                            this.$message.error(err);
                        });
                    resolve();
                }, 200);
            });
        },
        // 查询的异步加载 cat_tree
        onCatSearchLoadData(treeNode, value) {
            return new Promise((resolve) => {
                const { id } = treeNode.dataRef;
                setTimeout(() => {
                    catTreeloadTreeData({
                        pid: id,
                        condition: ''
                    })
                        .then((res) => {
                            let arr = [];
                            res.result.forEach((item) => {
                                item.isLeaf = item.leaf;
                                item.pId = item.parentId;
                                item.id = item.key;
                                item.value = item.key;
                                arr.push({
                                    id: item.key,
                                    value: item.key,
                                    pId: item.parentId,
                                    title: item.title,
                                    isLeaf: item.leaf
                                });
                            });
                            value.treeData = value.treeData.concat([...arr]);
                        })
                        .catch((err) => {
                            this.$message.error(err);
                        });
                    resolve();
                }, 200);
            });
        },
        // 添加子数据
        addSub(record) {
            this.pidVal = record.id;
            this.treeInfo.pidValue = record.pid;
            if (record.id && record.id != '0') {
                this.loadDictItem(record.id);
            }
            this.showModal();
        },
        loadDictItem(pid = '0') {
            loadDictItems({
                dict: this.treeInfo.dict,
                key: pid,
                sign: ''
            })
                .then((res) => {})
                .catch((err) => {
                    this.$message.error(err);
                });
        },
        // 高级查询按钮
        highRanking() {
            this.visible1 = true;
        },
        //高级查询模态框--查询
        handleSearch(e) {
            this.loading2 = true;
            this.templateLoading = true;
            console.log("field:",this.modelForms.field)
            console.log("this.modelForms",this.modelForms)
            console.log("searchContent:",this.searchContent)
            console.log("searchContentlabel:",this.searchContentlabel)
            console.log("searchContentextra:",this.searchContentextra.triggerNode.$parent)

            // 树行节点父节点
            // console.log("searchContentextra:",this.searchContentextra.triggerNode.$parent.value)
                                           
            if (!this.modelForms[0].field || !this.modelForms[0].val) {
                this.loading2 = false;
                this.templateLoading = false;
                this.$message.warning('不能空条件查询！');
                return false;
            } else {
                setTimeout(() => {
                    this.loading2 = false;
                    this.getData(this.code, 1);
                }, 500);
            }
            this.queryCondition.superQueryMatchType = this.superQueryMatchType;

            // if(this.searchContent === "scsjshwssj"  || this.searchContent === "img" || this.searchContent === "sfpbfzshwrcs" || this.searchContent ==="fzwrcssfzcsy"){    
            //     this.modelForms[0].field = this.searchContentextra.triggerNode.$parent.value + "," + this.searchContent 
            // }
            // 如果选择的树型节点的父节点有chiidren，那就进行拼接，主要利用了树选择组件的 change  api
            if(!this.searchContentextra.triggerNode.$parent.children){    
                this.modelForms[0].field = this.searchContentextra.triggerNode.$parent.value + "," + this.searchContent 
            }
            
            console.log("modelForms:",this.modelForms)

            let form = JSON.parse(JSON.stringify(this.modelForms));
            form.forEach((item) => {
                delete item.enum;
                delete item.key;
            });

            console.log("form:",form)

            // 高级查询的  参数
            this.queryCondition.superQueryParams = encodeURI(JSON.stringify(form));
            this.searchContent = '';
            // console.log(this.queryCondition.superQueryParams);

        },
        // 清空查询条件
        emptySearch() {
            this.queryCondition.superQueryParams = '';
            this.modelForms = [
                {
                    key: 1,
                    rule: 'eq',
                    type: 'text',
                    val: undefined,
                    field: undefined,
                    enum: []
                }
            ];
            this.getData(this.code, 1);
        },
        Pairing(value) {
            // console.log(`selected ${value}`);
        },
        // 重置
        Reset() {
            let list = [
                {
                    key: 1,
                    rule: 'eq',
                    type: 'text',
                    val: undefined,
                    field: undefined
                }
            ];
            this.modelForms = list;
        },
        // 保存查询条件
        saCondition() {
            this.visible2 = true;
        },
        // 高级查询模态框--关闭
        hanShut(e) {
            this.visible1 = false;
        },
        // 下拉搜索
        filterOpt(input, option) {
            return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        },
        handleCge(value) {
            console.log(`selected ${value}`);
        },
        handleProvinceChange(value) {},
        addQuery() {
            this.modelForms.push({
                key: this.modelKey + 1,
                rule: 'eq',
                type: 'text',
                val: undefined,
                field: undefined,
                enum: []
            });
            this.modelKey = this.modelKey + 1;
        },
        subQuery(key) {
            let list = [];
            if (this.modelForms.length <= 1) {
                this.$message.error('必须存在一条数据');
                return false;
            }
            this.modelForms.map((item) => {
                if (item.key != key) {
                    list.push(item);
                }
            });
            this.modelForms = list;
        },
        confirmOk(e) {
            this.visible2 = false;
        },
        discardCancel(e) {
            console.log('Clicked cancel button');
            this.visible2 = false;
        },
        // 新增 里面的附表表格
        //  新增 表格新增空白列
        addOneRow(key, columns) {
            let obj = JSON.parse(JSON.stringify(this.tableDatas));
            let arr = obj[key] || [];
            let newData = JSON.parse(JSON.stringify(this.tableTemplateData[key]));
            let imgObjs = this.ImgObjs;
            columns.forEach((item) => {
                if (item.type == 'image') {
                    console.log(key + '_' + item.key + '_' + this.tableDatas[key].length);
                    imgObjs[key + '_' + item.key + '_' + this.tableDatas[key].length] = {
                        ImgLists: []
                    };
                }
            });
            this.ImgObjs = imgObjs;
            newData.key = this.tableDatas[key].length + 1;
            obj[key] = [...arr, newData];
            this.tableDatas = obj;
            console.log(this.ImgObjs);
        },
        //  新增 删除选择的表格列
        delAddRows(k) {
            let newRows = [];
            let newData = JSON.parse(JSON.stringify(this.tableDatas));

            newData[k].forEach((item) => {
                if (this.addSelectedRowKeys.indexOf(item.key) == -1) {
                    newRows.push(item);
                }
            });
            newRows.map((item, index) => {
                item.key = index + 1 + '';
            });
            newData[k] = newRows;
            this.addSelectedRowKeys = [];
            this.tableDatas = newData;
        },
        //  新增 清楚表格选择项
        clearSelectKeys() {
            (this.addSelectedRowKeys = []), (this.selectedRows = []);
        },
        //  新增 改变表格数据
        handleChange(value, key, col, k) {
            let newData = JSON.parse(JSON.stringify(this.tableDatas));
            const target = newData[k].filter((item) => key === item.key)[0];

            if (target) {
                target[col] = value;
                this.tableDatas = newData;
            }
        },
        handleSelectChange(value, key, col, k) {
            let newData = JSON.parse(JSON.stringify(this.tableDatas));
            const target = newData[k].filter((item) => key === item.key)[0];
            if (target) {
                target[col] = value;
                this.tableDatas = newData;
            }
        },
        // 新增--选择部门--模态框
        dptChange(key) {
            this.departKey = key;
            this.checkedKeys = [];
            this.visible3 = true;
        },
        // 选择部门--模态框关闭
        partCancel() {
            this.visible3 = false;
        },
        // 选择部门--模态框确定
        partOk() {
            let checkedStr = '';
            for (let index = 0; index < this.checkedArrValue.length; index++) {
                checkedStr += this.checkedArrValue[index] + ',';
            }
            this.checkedArrValue = checkedStr.substring(0, checkedStr.length - 1);
            this.departValue = this.checkedArrValue;
            console.log(this.departValue);
            let obj = this.addForm.getFieldsValue();
            obj[this.departKey] = this.departValue;

            this.addForm.setFieldsValue(obj);
            this.visible3 = false;
        },
        // 选择部门--搜索
        onSearch(e) {
            const value = e.target.value;
            console.log(value);
            const expandedKeys = dataList
                .map((item) => {
                    if (item.title.indexOf(value) > -1) {
                        return getParentKey(item.key, gData);
                    }
                    return null;
                })
                .filter((item, i, self) => item && self.indexOf(item) === i);
            Object.assign(this, {
                expandedKeys,
                searchValue: value,
                autoExpandParent: true
            });
        },
        imgAdd(filename, key, file) {
            let $editotVM = this.$refs[key][0];
            const formData = new FormData();
            formData.append('file', file);
            formData.append('biz', '');
            this.uploading = true;
            uploading(formData)
                .then((res) => {
                    let miniurl = baseUrl + '/sys/common/static/' + res.message;
                    $editotVM.$img2Url(filename, miniurl);
                })
                .catch((e) => {
                    this.$message.error(e);
                    console.log(e);
                });
        },
        // 用户选择--模态框
        optionUser(key) {
            // console.log(key);
            this.visible4 = true;
            this.selUserKey = key;
            this.getQueryTreeList();
            this.getUserInFoList();
        },
        // 查出所有部门,树结构数据 接口
        getQueryTreeList() {
            queryTreeList()
                .then((res) => {
                    this.departmentList = res.result;
                    let departmentMsg = res.result;
                    this.userTreeData = departmentMsg;
                    this.gData = departmentMsg;
                })
                .catch((err) => {
                    console.log(err);
                    this.$message.error(err);
                });
        },
        userCancel() {
            this.visible4 = false;
        },
        userOk() {
            this.userValue = this.userSelectedRows;
            let obj = this.addForm.getFieldsValue();
            let queryObj = this.queryForm.getFieldsValue();
            obj[this.selUserKey] = this.userValue;
            queryObj[this.selUserKey] = this.userValue;
            this.addForm.setFieldsValue(obj);
            this.queryForm.setFieldsValue(queryObj);
            this.visible4 = false;
        },
        // 用户选择
        onUserSelect(keys, event) {
            console.log('Trigger Select', keys);
            let id = keys;
            queryUserByDepId({ id: keys })
                .then((res) => {
                    let userBableList = [];
                    res.result.map((item, index) => {
                        if (item.sex == '1' && item.sex != null) {
                            item.sex = '男';
                        } else if (item.sex != '1' && item.sex != null) {
                            item.sex = '女';
                        }
                        userBableList.push(item);
                    });
                    this.userData = userBableList;
                })
                .catch((err) => {
                    console.log(err);
                    this.$message.error(err);
                });
        },
        onUserExpand() {
            console.log('Trigger Expand');
        },

        // 部门选择
        onExpand(expandedKeys) {
            this.expandedKeys = expandedKeys;
            this.autoExpandParent = false;
        },
        onCheck(checkedKeys) {
            console.log('onCheck', checkedKeys);
            this.checkedKeys = checkedKeys;
        },
        departChecked(keys, event) {
            let checkedValue = event.checkedNodes;
            // let checkedArr = [];
            // for (let index = 0; index < checkedValue.length; index++) {
            //     checkedArr.push(checkedValue[index].data.props.departName);
            // }
            console.log(keys);
            // this.checkedKeys = keys;
            // console.log(checkedArr);
            // this.checkedArrValue = this.checkedKeysArr;
            this.checkedArrValue = keys;

            // console.log(this.checkedArrValue);
        },
        // 搜索
        onAccountSearch(value) {
            // console.log(value);
            this.getUserInFoList(value);
        },
        // 重置
        resetList() {
            this.getUserInFoList();
            this.resetSelectedRowKeys = [];
            Object.assign(this.userPagination, {
                current: 1
            });
            // console.log(this.resetSelectedRowKeys);
        },
        // 用户选择 翻页
        userTableChange(page) {
            console.log('ffff');
        },
        // getFormFieldValue(field) {
        //     console.log(field);
        //     return this.addForm.getFieldValue(field);
        // }
        // 自定义树控件，展开
        treeExpandOpen(expandedKeys) {
            console.log(expandedKeys);
        }
    }
};
</script>
<style lang="less">
p {
    margin: 0;
}
.form-disabled {
    pointer-events: none !important;
}
#functionTest {
    .searchBtn {
        margin-right: 10px;
    }
    .btn {
        display: flex;
        margin: 0 0 8px;
        button {
            margin: 0 8px 8px 0;
        }
    }
    .option {
        background-color: #e6f7ff;
        border: 1px solid #91d5ff;
        border-radius: 4px;
        margin-bottom: 16px;
        font-size: 14px;
        padding: 8px 15px 8px 37px;
        .empty {
            margin-left: 24px;
        }
    }
    .text {
        color: #1890ff;
    }
    .text:hover {
        cursor: pointer;
    }
    .text-span {
        color: #e8e8e8;
    }
    .ant-advanced-search-form {
        border-radius: 6px;
    }

    .ant-advanced-search-form .ant-form-item {
        display: flex;
    }

    .ant-advanced-search-form .ant-form-item-control-wrapper {
        flex: 1;
    }

    .ant-form {
        max-width: none;
    }
    .search-result-list {
        border-radius: 6px;
        min-height: 200px;
        text-align: center;
        padding-top: 80px;
    }
}
// 高级查询--模态框
#inquire-modal {
    label {
        font-size: 12px;
    }
    .content-modal {
        display: flex;
        .left-modal {
            width: 754px;
            .ant-form-item {
                margin-bottom: 12px;
            }
            .form-field {
                width: 256px;
                padding: 0 8px;
            }
            .field {
                width: 240px;
            }
            .option-compare {
                padding: 0 6px;
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
        }
        .right-modal {
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
    .footer-btn {
        width: 965px;
        display: flex;
        justify-content: space-between;
    }
}
// 新增--模态框
#more-modal {
    .ant-input-affix-wrapper .ant-input:not(:first-child) {
        height: 32px;
    }
}
.opabtn {
    height: 50px;
}
// 用户选择模态框
#userModal {
    .ant-modal-wrap {
        z-index: 1001;
    }
    .content {
        display: flex;
        justify-content: space-between;
        padding: 10px 15px;
        margin: -10px;
        background-color: rgb(236, 236, 236);
        .left-content {
            width: 290px;
            padding: 24px;
            background-color: #fff;
        }
    }
    .right-content {
        width: 890px;
        padding: 24px;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        .header {
            display: flex;
            height: 32px;
            line-height: 32px;
        }
        .lable {
            font-size: 14px;
            width: 70px;
        }
        .btn {
            margin-left: 20px;
        }
        .header-input {
            width: 150px;
            padding: 4px 30px 4px 11px;
        }
    }
}
// 部门选择模态
#section-modal {
    .ant-modal-body {
        height: 430px;
    }
}
// 高级查询的部门选择样式
.queryDept {
    .ant-input-affix-wrapper .ant-input:not(:first-child) {
        height: 30px;
    }
}
</style>
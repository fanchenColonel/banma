import { ajaxSend } from '@/assets/js/http';

/**
 *
 * 新增数据
 */
export function getAddData({ code, obj }) {
    return ajaxSend({
        url: '/online/cgform/api/form/' + code,
        type: 'POST',
        body: obj
    });
}

/**
 *
 * 查询该模板的一些字段信息 online列表加载
 */
export function getOnlineColumns({ code }) {
    return ajaxSend({
        url: '/online/cgform/api/getColumns/' + code,
        type: 'GET'
    });
}

/**
 *
 * online表单加载
 */
export function getFormItem({ code }) {
    return ajaxSend({
        url: '/online/cgform/api/getFormItem/' + code,
        type: 'GET'
    });
}

/**
 *
 * 表格数据
 */
export function getTableData(code, queryCondition) {
    return ajaxSend({
        url: '/online/cgform/api/getData/' + code,
        type: 'GET',
        params: queryCondition
    });
}

/**
 *
 * 根据表名——显示字段-存储字段 pid 加载树形数据
 */
export function getQueryInfo({ code }) {
    return ajaxSend({
        url: '/online/cgform/api/getQueryInfo/' + code,
        type: 'GET'
    });
}

/**
 *
 * 删除
 */
export function deleteTable({ code, id }) {
    return ajaxSend({
        url: '/online/cgform/api/form/' + code + '/' + id,
        type: 'DELETE'
    });
}

/**
 *
 * 编辑
 */
export function redactTable({ code, obj }) {
    return ajaxSend({
        url: '/online/cgform/api/form/' + code,
        type: 'PUT',
        body: obj
    });
}

/**
 *
 * 文件/图片下载
 */
export function download({ imagename }) {
    return ajaxSend({
        url: '/sys/common/static/' + imagename,
        type: 'GET'
    });
}

/**
 *
 * 文件/图片上传
 */
export function uploading(formData) {
    return ajaxSend({
        url: '/sys/common/upload',
        type: 'POST',
        body: formData
    });
}

/**
 * 树形表格数据
 */
export function getTreeData({ code, pid, has_child, hasQuery, params }) {
    //
    return ajaxSend({
        url: '/online/cgform/api/getTreeData/' + code,
        type: 'GET',
        params: pid
            ? {
                  code,
                  pid,
                  has_child,
                  hasQuery
              }
            : params
    });
}

/**
 *
 * 主表的数据和一对多的数据从这个表里取
 */
export function getMainDetail({ code, id }) {
    return ajaxSend({
        url: '/online/cgform/api/form/' + code + '/' + id,
        type: 'GET'
    });
}

/**
 *
 * 一对一关系调用的接口
 */
export function getOneDetail({ code, mainId }) {
    return ajaxSend({
        url: '/online/cgform/api/subform/' + code + '/' + mainId,
        type: 'GET'
    });
}

/**
 *
 * 唯一值校验
 */
export function checkOnly({ tableName, fieldName, fieldVal }) {
    return ajaxSend({
        url: '/sys/duplicate/check',
        type: 'GET',
        params: {
            tableName,
            fieldName,
            fieldVal
        }
    });
}

/**
 *
 * 根据表名——显示字段-存储字段 pid 加载树形数据
 */

export function loadTreeDatas({ pid, pidField, tableName, text, code, hasChildField, condition }) {
    return ajaxSend({
        url: '/sys/dict/loadTreeData',
        type: 'GET',
        params: {
            pid,
            pidField,
            tableName,
            text,
            code,
            hasChildField,
            condition,
        }
    });
}

/**
 *
 * 根据表名——显示字段-存储字段 pid 加载树形数据
 */

export async function asyncLoadTreeDatas({ pid, pidField, tableName, text, code, hasChildField, condition }) {
    return ajaxSend({
        url: '/sys/dict/loadTreeData',
        type: 'GET',
        params: {
            pid,
            pidField,
            tableName,
            text,
            code,
            hasChildField,
            condition
        }
    });
}

/**
 *
 * 根据表名——显示字段-存储字段 pid 加载树形数据
 */
export function loadDictItems({ dict, key, sign }) {
    return ajaxSend({
        url: '/sys/dict/loadDictItem/' + dict,
        type: 'GET',
        params: {
            key,
            sign
        }
    });
}
/**
 *
 * 获取表类型字典数据（新增下拉框的值）
 */
export function getDictItems({ dictCode, dictTable, dictText, dictCondition }) {
    return ajaxSend({
        url: '/sys/dict/getDictItems/' + dictTable + ',' + dictText + ',' + dictCode + (dictCondition ? ',' + dictCondition : ''),
        type: 'GET'
    });
}
/**
 *
 * 查出所有部门,树结构数据
 */
export function queryTreeList() {
    return ajaxSend({
        url: '/sys/sysDepart/queryTreeList',
        type: 'GET'
    });
}
/**
 *
 * 获取用户列表数据
 */
export function getUserList({ username }) {
    return ajaxSend({
        url: '/sys/user/list',
        type: 'GET',
        params: {
            username
        }
    });
}
/**
 *
 * 根据部门id查询用户信息
 */
export function queryUserByDepId({ id }) {
    return ajaxSend({
        url: '/sys/user/queryUserByDepId',
        type: 'GET',
        params: {
            id
        }
    });
}
/**
 *
 * 根据部门id查询用户信息
 */
export function catTreeloadTreeData(obj) {
    return ajaxSend({
        url: '/sys/category/loadTreeData',
        type: 'GET',
        params: obj
    });
}
/**
 *
 * 根据部门id查询用户信息
 */
export async function asyncCatTreeloadTreeData(obj) {
    return ajaxSend({
        url: '/sys/category/loadTreeData',
        type: 'GET',
        params: obj
    });
}


// 原有基础上增加

// 导入
// export function 

// 这些参数必填，还有两个不是必填  如何处理？

export function getDropProvinceData({table,txt,key,idField,pidField,condition,}) {
    return ajaxSend({
        url:"/online/cgform/api/querySelectOptions", 
        type:"GET",
        params:{
            table,txt,key,idField,pidField,condition
        }
    })
}
export function getDropCityData({table,txt,key,idField,pidField,pidValue}) {
    return ajaxSend({
        url:"/online/cgform/api/querySelectOptions", 
        type:"GET",
        params:{
            table,txt,key,idField,pidField,pidValue
        }
    })
}
/**
 * @function 参数拼接
 * @param {object} obj 只支持非嵌套的对象
 * @returns {string}
 * @author 码云笔记 2020-4-24
 */
export function params(obj) {
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
  }
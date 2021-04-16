import { ajaxSend } from '@/assets/js/http';

/**
 *
 * 查询模板接口
 */
export function getOnlineFormPage({ pageNo, pageSize, tableName, tableType, formCategory, isDbSynch, tableTxt, createTime, column, order, copyType, tableTypeStr }) {
    let data = {
        pageNo,
        pageSize,
        column,
        copyType,
        order
    };
    if (tableName && tableName.length > 0) {
        data.tableName = tableName;
    }
    if (tableType && tableType.length > 0) {
        data.tableType = tableType;
    }
    if (formCategory && formCategory.length > 0) {
        data.formCategory = formCategory;
    }
    if (isDbSynch && isDbSynch.length > 0) {
        data.isDbSynch = isDbSynch;
    }
    if (tableTxt && tableTxt.length > 0) {
        data.tableTxt = tableTxt;
    }
    if (createTime && createTime.length > 0) {
        data.isDbSynch = createTime;
    }
    if (tableTypeStr && tableTypeStr.length > 0) {
        data.tableTypeStr = tableTypeStr;
    }
    return ajaxSend({
        url: '/online/cgform/head/list',
        type: 'GET',
        params: data
    });
}

/**
 *
 * 创建表单
 */
export function createForm({ indexs, head, fields }) {
    return ajaxSend({
        url: '/online/cgform/api/addAll',
        type: 'POST',
        body: {
            indexs,
            head,
            fields
        }
    });
}

/**
 *
 * 更新接口
 */
export function updateForm({ deleteFieldIds, deleteIndexIds, fields, head, indexs }) {
    return ajaxSend({
        url: '/online/cgform/api/editAll',
        type: 'PUT',
        body: {
            deleteFieldIds,
            deleteIndexIds,
            fields,
            head,
            indexs
        }
    });
}

/**
 *
 * 删除表单
 */
export function delOnlineForm({ id }) {
    return ajaxSend({
        url: '/online/cgform/head/delete',
        type: 'DELETE',
        params: {
            id
        }
    });
}

/**
 *
 * 检查表名是否重复
 */
export function checkOnlyTable({ tbname, id }) {
    return ajaxSend({
        url: '/online/cgform/api/checkOnlyTable',
        type: 'GET',
        params: {
            tbname,
            id
        }
    });
}

/**
 *
 * 更新时表单索引查询
 */
export function indexSearch({ headId }) {
    return ajaxSend({
        url: '/online/cgform/index/listByHeadId',
        type: 'GET',
        params: {
            headId
        }
    });
}

/**
 *
 * 更新时表单字段查询
 */
export function fieldSearch({ headId }) {
    return ajaxSend({
        url: '/online/cgform/field/listByHeadId',
        type: 'GET',
        params: {
            headId
        }
    });
}

/**
 *
 * 同步数据库
 */
export function doDbSynch({ code, synMethod }) {
    return ajaxSend({
        url: '/online/cgform/api/doDbSynch/' + code + '/' + synMethod,
        type: 'POST'
        // body: {
        //     code,
        //     synMethod
        // }
    });
}

/**
 *
 * 移除
 */
export function removeRecord({ id }) {
    return ajaxSend({
        url: '/online/cgform/head/removeRecord',
        type: 'DELETE',
        params: {
            id
        }
    });
}

/**
 *
 * 批量操作中的移除和删除
 */
export function deleteBatch({ ids, flag }) {
    return ajaxSend({
        url: '/online/cgform/head/deleteBatch',
        type: 'DELETE',
        params: {
            ids,
            flag
        }
    });
}

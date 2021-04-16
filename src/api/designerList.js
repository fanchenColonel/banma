import { ajaxSend } from '@/assets/js/http';

/**
 *
 * 获取表单数据
 */
export function getdesFormList({ pageNo, pageSize, formTableId, queryId }) {
    return ajaxSend({
        url: '/formTable/base/getList',
        type: 'GET',
        params: {
            pageNo,
            pageSize,
            formTableId
        }
    });
}

/**
 *
 * 获取动态表的名称和对应字段名称类型
 */
export function getdesFormFields({ formTableId }) {
    return ajaxSend({
        url: '/formTable/base/getDymTable',
        type: 'GET',
        params: {
            formTableId
        }
    });
}

/**
 *
 * 动态表单添加数据
 */
export function addVariation(obj) {
    return ajaxSend({
        url: '/formTable/base/addAll',
        type: 'POST',
        body: obj
    });
}

/**
 *
 * 修改动态生成表的数据
 */
export function editUpdateAll(obj) {
    return ajaxSend({
        url: '/formTable/base/updateAll',
        type: 'POST',
        body: obj
    });
}

/**
 *
 * 删除表单中对应id数据
 */
export function deleteById({ formTableId, ids }) {
    return ajaxSend({
        url: '/formTable/base/deleteById',
        type: 'GET',
        params: {
            formTableId,
            ids
        }
    });
}

/**
 *
 * 通过id查询对应表单数据
 */
export function selectById({ formTableId, tableId }) {
    return ajaxSend({
        url: '/formTable/base/selectById',
        type: 'GET',
        params: {
            formTableId,
            tableId
        }
    });
}

/**
 *
 * 获取当前选择框的选项值（下拉框值）
 */
export function selectValue({ tableName, key }) {
    return ajaxSend({
        url: '/formTable/base/getSelectValue',
        type: 'GET',
        params: {
            tableName,
            key
        }
    });
}

/**
 *
 * 导出excel
 */
export function excelExport({ formTableId, exportName, pageSize, pageNo }) {
    return ajaxSend({
        url: '/formTable/base/excelExport',
        type: 'GET',
        params: {
            formTableId,
            exportName,
            pageSize,
            pageNo
        }
        // responseType: 'file'
    });
}

/**
 *
 * 导入
 */
export function excelImport(formData) {
    return ajaxSend({
        url: '/formTable/base/excelImport',
        type: 'POST',
        body: formData
    });
}

import { ajaxSend } from '@/assets/js/http';

/**
 *
 * 表单设计表单查询,获取表格初始化数据
 */
export function formTable({ name, encode, pageNo, pageSize }) {
    return ajaxSend({
        url: '/formTable/list',
        type: 'GET',
        params: {
            name,
            encode,
            pageNo,
            pageSize
        }
    });
}

/**
 *
 * 在线表单添加
 */
export function addFormTable({ name, encode }) {
    return ajaxSend({
        url: '/formTable/add',
        type: 'POST',
        body: {
            name,
            encode
        }
    });
}

/**
 *
 * 查询encode是否存在
 */
export function selectEncode({ encode }) {
    return ajaxSend({
        url: '/formTable/selectEncode',
        type: 'GET',
        params: {
            encode
        }
    });
}

/**
 *
 * 根据id删除在线表单
 */
export function delTableData({ id }) {
    return ajaxSend({
        url: '/formTable/delete',
        type: 'GET',
        params: {
            id
        }
    });
}

/**
 *
 * 批量删除表单
 */
export function batchDelete({ ids }) {
    return ajaxSend({
        url: '/formTable/batchDelete',
        type: 'GET',
        params: {
            ids
        }
    });
}

/**
 *
 * 修改表单
 */
export function updateTableData({ id, name }) {
    return ajaxSend({
        url: '/formTable/update',
        type: 'POST',
        body: {
            id,
            name
        }
    });
}

/**
 *
 * 表单设计根据id查询表单内容(点击表单设计时走的接口)
 */
export function getById({ id }) {
    return ajaxSend({
        url: '/formTable/getById',
        type: 'GET',
        params: {
            id
        }
    });
}

/**
 *
 * 通过组件创建或者修改表单(保存的功能)
 */
export function createForm({ formTableId, list, config }) {
    return ajaxSend({
        url: '/formTable/base/create',
        type: 'POST',
        body: {
            formTableId,
            list,
            config
        }
    });
}

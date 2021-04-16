import { ajaxSend } from '@/assets/js/http';

// java增强

/**
 *
 * 根据按钮类型查询java增强
 */
export function JavaByButtonCode({ formId, buttonCode }) {
    return ajaxSend({
        url: '/online/cgform/head/enhanceJavaByButtonCode/' + formId,
        type: 'GET',
        params: {
            buttonCode
        }
    });
}
/**
 *
 * 修改java增强
 */
export function enhanceJava({ formId, obj }) {
    return ajaxSend({
        url: '/online/cgform/head/enhanceJava/' + formId,
        type: 'PUT',
        body: obj
    });
}
/**
 *
 * 新增java增强
 */
export function addenhanceJava({ formId, buttonCode, event, cgJavaType, cgJavaValue, activeStatus }) {
    return ajaxSend({
        url: '/online/cgform/head/enhanceJava/' + formId,
        type: 'POST',
        body: {
            buttonCode,
            event,
            cgJavaType,
            cgJavaValue,
            activeStatus
        }
    });
}
/**
 *
 * 根据id查询该按钮
 */
export function queryById({}) {
    return ajaxSend({
        url: '/online/cgform/button/queryById',
        type: 'GET',
        params: {}
    });
}
/**
 * 导入数据库
 *
 * 导入数据库表 查询接口所有数据
 */
export function queryTables({}) {
    return ajaxSend({
        url: '/online/cgform/head/queryTables',
        type: 'GET'
    });
}
/**
 *
 * 查询自定义按钮 状态是激活的  接口有问题
 */
export function activityBtn({}) {
    return ajaxSend({
        url: '/online/cgform/head/enhanceButton',
        type: 'GET'
    });
}

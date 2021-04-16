import { ajaxSend } from '@/assets/js/http';

/**
 *
 * 根据模板code查询自定义按钮
 */
export function getBtnFormPage({ code }) {
    return ajaxSend({
        url: '/online/cgform/button/list/' + code,
        type: 'GET'
    });
}

/**
 *
 * 自定义按钮中的新增
 */
export function AddBtnForm({ cgformHeadId, buttonCode, buttonName, buttonStyle, optType, exp, buttonStatus, orderNum, buttonIcon, optPosition }) {
    return ajaxSend({
        url: '/online/cgform/button/add',
        type: 'POST',
        body: {
            cgformHeadId,
            buttonCode,
            buttonName,
            buttonStyle,
            optType,
            exp,
            buttonStatus,
            orderNum,
            buttonIcon,
            optPosition
        }
    });
}
/**
 *
 * 删除按钮
 */
export function deleteButton({ id }) {
    return ajaxSend({
        url: '/online/cgform/button/delete',
        type: 'DELETE',
        params: {
            id
        }
    });
}

/**
 *
 * 批量删除
 */
export function btnDeleteBatch({ ids }) {
    return ajaxSend({
        url: '/online/cgform/button/deleteBatch',
        type: 'DELETE',
        params: {
            ids
        }
    });
}

/**
 *
 * 修改
 */
export function EditBtnForm(obj) {
    return ajaxSend({
        url: '/online/cgform/button/edit',
        type: 'PUT',
        body: obj
    });
}

/**
 *
 * 代码生成   查询要生成的模板的信息
 */
export function tableInfo({ code }) {
    return ajaxSend({
        url: '/online/cgform/head/tableInfo',
        type: 'GET',
        params: {
            code
        }
    });
}

/**
 *
 * 代码生成
 */
export function codeGenerate({ code, codeTypes, entityName, entityPackage, ftlDescription, jformType, jspMode, packageStyle, projectPath, tableName, tableName_tmp, subList }) {
    if (jformType == '1') {
        return ajaxSend({
            url: '/online/cgform/api/codeGenerate',
            type: 'POST',
            body: {
                code,
                codeTypes,
                entityName,
                entityPackage,
                ftlDescription,
                jformType,
                jspMode,
                packageStyle,
                projectPath,
                tableName,
                tableName_tmp
            }
        });
    } else {
        return ajaxSend({
            url: '/online/cgform/api/codeGenerate',
            type: 'POST',
            body: {
                code,
                codeTypes,
                entityName,
                entityPackage,
                ftlDescription,
                jformType,
                jspMode,
                packageStyle,
                projectPath,
                tableName,
                tableName_tmp,
                subList
            }
        });
    }
}
/**
 *
 * 下载代码
 */
export function downGenerateCode({ fileList }) {
    return ajaxSend({
        url: '/online/cgform/api/downGenerateCode',
        type: 'POST',
        body: { fileList },
        responseType: 'file'
    });
}

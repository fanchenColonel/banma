import { ajaxSend } from '@/assets/js/http';

// 解析sql
export function getSql(sql){
    return ajaxSend({
        url:"/online/cgreport/head/parseSql",
        type:'post',
        body:{
            sql
        }
    })
}

// 报表查询
export function searchStatement(code,name) {
    return ajaxSend({
        url:"/online/cgreport/head/list",
        type:'get',
        params:{
            code,name
        }
    })
}

// 新增报表数据
export function addStatement({head,params,items}){
    // console.log(head,params,items)
    return ajaxSend({
        url:"/online/cgreport/head/add",
        type:'post',
        body:{
            head,
            params,
            items
        }
    })
}
// 删除报表数据
export function deleteStatement(id){
    return ajaxSend({
        url:"/online/cgreport/head/delete",
        type:"delete",
        params:{id}
    })
}
// 批量删除报表数据
export function batchDelete(ids){
    return ajaxSend({
        url:"/online/cgreport/head/deleteBatch",
        type:"delete",
        params:{ids}
    })
}
 //加载报表模块数据    id,name,code,cgrSql,dbSource_dictText,createTime,action
export function getReportFormPage({ pageNo,pageSize,column,order}) {
    let data = {
        pageNo,
        pageSize,
        column,
        order
    };
    // if (tableName && tableName.length > 0) {
    //     data.tableName = tableName;
    // }
    // if (tableType && tableType.length > 0) {
    //     data.tableType = tableType;
    // }
    // if (formCategory && formCategory.length > 0) {
    //     data.formCategory = formCategory;
    // }
    // if (isDbSynch && isDbSynch.length > 0) {
    //     data.isDbSynch = isDbSynch;
    // }
    // if (tableTxt && tableTxt.length > 0) {
    //     data.tableTxt = tableTxt;
    // }
    // if (createTime && createTime.length > 0) {
    //     data.isDbSynch = createTime;
    // }
    // if (tableTypeStr && tableTypeStr.length > 0) {
    //     data.tableTypeStr = tableTypeStr;
    // }
    return ajaxSend({
        url: '/online/cgreport/head/list',
        type: 'GET',
        params: data
    });
}

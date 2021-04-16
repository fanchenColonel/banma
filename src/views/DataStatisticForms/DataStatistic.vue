<template>
    <div id="table">
        <h2>省际入浙防疫检查情况日报表</h2>
        <p>报送日期:</p>
        <a-table :columns="columns" :data-source="data" bordered size="small" :pagination="false" />
        <p class="text">报送要求: 由省际入浙防疫检查站点于每日下午15时30 分前报送，统计范围为前日中午12时至本日中午12时期间相关情况。</p>
    </div>
</template>
<script>
const columns = [
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: 130,
        align: 'center'
    },
    {
        title: '检查情况',
        children: [
            {
                title: '船舶数量',
                dataIndex: 'shipNumber',
                key: 'shipNumber',
                align: 'center',
                width: 80
            },
            {
                title: '留观船舶数量',
                dataIndex: 'observeNumber',
                key: 'observeNumber',
                align: 'center',
                width: 100
            },
            {
                title: '总人数',
                dataIndex: 'totalNumber',
                key: 'totalNumber',
                align: 'center',
                width: 80
            },
            {
                title: '其中',
                children: [
                    {
                        title: '发热人数',
                        dataIndex: 'feverNumber',
                        key: 'feverNumber',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '采取措施人数',
                        dataIndex: 'disposeNumber',
                        key: 'disposeNumber',
                        align: 'center',
                        width: 80
                    }
                ]
            }
        ]
    },
    {
        title: '触动人员及设备数量(辆、艘、件)',
        children: [
            {
                title: '交通',
                children: [
                    {
                        title: '人数',
                        dataIndex: 'personNumber',
                        key: 'personNumber',
                        align: 'center',
                        width: 60
                    },
                    {
                        title: '车船仪器',
                        dataIndex: 'apparatus',
                        key: 'apparatus',
                        align: 'center',
                        width: 100
                    }
                ]
            },
            {
                title: '公安',
                children: [
                    {
                        title: '人数',
                        dataIndex: 'policeNumber',
                        key: 'policeNumber',
                        align: 'center',
                        width: 60
                    },
                    {
                        title: '车船仪器',
                        dataIndex: 'policeApparatus',
                        key: 'policeApparatus',
                        align: 'center',
                        width: 80
                    }
                ]
            },
            {
                title: '卫健',
                children: [
                    {
                        title: '人数',
                        dataIndex: 'WeiJianNumber',
                        key: 'WeiJianNumber',
                        align: 'center',
                        width: 60
                    },
                    {
                        title: '车船仪器',
                        dataIndex: 'WeiJianApparatus',
                        key: 'WeiJianApparatus',
                        align: 'center',
                        width: 80
                    }
                ]
            }
        ]
    },
    {
        title: '发放资料（份）、防疫物资（件）',
        dataIndex: 'goods',
        key: 'goods',
        align: 'center',
        width: 180
    }
];

const data = [
    {
        key: '1',
        name: '嘉善红旗塘',
        shipNumber: '',
        totalNumber: '',
        feverNumber: '',
        disposeNumber: '',
        personNumber: '',
        apparatus: '',
        policeNumber: '',
        policeApparatus: '',
        WeiJianNumber: '',
        WeiJianApparatus: '',
        goods: ''
    },
    {
        key: '2',
        name: '平湖新埭',
        shipNumber: '',
        totalNumber: '',
        feverNumber: '',
        disposeNumber: '',
        personNumber: '',
        apparatus: '',
        policeNumber: '',
        policeApparatus: '',
        WeiJianNumber: '',
        WeiJianApparatus: '',
        goods: ''
    },
    {
        key: '3',
        name: '嘉兴思古桥',
        shipNumber: '',
        totalNumber: '',
        feverNumber: '',
        disposeNumber: '',
        personNumber: '',
        apparatus: '',
        policeNumber: '',
        policeApparatus: '',
        WeiJianNumber: '',
        WeiJianApparatus: '',
        goods: ''
    },
    {
        key: '4',
        name: '嘉兴王江泾',
        shipNumber: '',
        totalNumber: '',
        feverNumber: '',
        disposeNumber: '',
        personNumber: '',
        apparatus: '',
        policeNumber: '',
        policeApparatus: '',
        WeiJianNumber: '',
        WeiJianApparatus: '',
        goods: ''
    },
    {
        key: '5',
        name: '湖州南浔',
        shipNumber: '',
        totalNumber: '',
        feverNumber: '',
        disposeNumber: '',
        personNumber: '',
        apparatus: '',
        policeNumber: '',
        policeApparatus: '',
        WeiJianNumber: '',
        WeiJianApparatus: '',
        goods: ''
    },
    {
        key: '6',
        name: '湖州太湖',
        shipNumber: '',
        totalNumber: '',
        feverNumber: '',
        disposeNumber: '',
        personNumber: '',
        apparatus: '',
        policeNumber: '',
        policeApparatus: '',
        WeiJianNumber: '',
        WeiJianApparatus: '',
        goods: ''
    },
    {
        key: '7',
        name: '长兴洪桥',
        shipNumber: '',
        totalNumber: '',
        feverNumber: '',
        disposeNumber: '',
        personNumber: '',
        apparatus: '',
        policeNumber: '',
        policeApparatus: '',
        WeiJianNumber: '',
        WeiJianApparatus: '',
        goods: ''
    },
    {
        key: '8',
        name: '合计',
        shipNumber: '',
        totalNumber: '',
        feverNumber: '',
        disposeNumber: '',
        personNumber: '',
        apparatus: '',
        policeNumber: '',
        policeApparatus: '',
        WeiJianNumber: '',
        WeiJianApparatus: '',
        goods: ''
    },
    {
        key: '9',
        name: '累计',
        shipNumber: '',
        totalNumber: '',
        feverNumber: '',
        disposeNumber: '',
        personNumber: '',
        apparatus: '',
        policeNumber: '',
        policeApparatus: '',
        WeiJianNumber: '',
        WeiJianApparatus: '',
        goods: ''
    }
];

export default {
    data() {
        return {
            data,
            columns
        };
    }
};
</script>
<style lang="less">
#table {
    h2 {
        text-align: center;
        font-size: 34px;
        color: #333;
        margin: 20px 0 20px 0;
    }
    p {
        margin: 0 0 6px 40px;
        font-size: 18px;
    }
    .text {
        margin: 20px 0 0 90px;
    }
    .ant-table-body {
        margin: 0;
        font-size: 16px;
    }
    .ant-table-small {
        border: 1px solid #676767;
    }
    .ant-table-row-cell-break-word {
        border: 1px solid #676767;
        padding: 12px 8px;
    }
    .ant-table-small.ant-table-bordered .ant-table-content {
        border: none;
    }
    .ant-table-bordered .ant-table-thead > tr:not(:last-child) > th {
        border: 1px solid #676767;
    }
}
</style>

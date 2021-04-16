// import Vue from 'vue'
// import { axios } from '@/utils/request'
import { ajaxSend } from '@/assets/js/http';

//get
export function getAction(url, parameter) {
    return ajaxSend({
        url: url,
        method: 'get',
        params: parameter
    });
}

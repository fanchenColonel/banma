import axios from 'axios';
import { baseUrl } from './base-url';
import { Modal } from 'ant-design-vue';

// 添加请求拦截器
axios.interceptors.request.use(
    function(config) {
        // 在发送请求之前做些什么

        let token = sessionStorage.getItem('token');
        if (token) config.headers['X-Access-Token'] = token;
        // if (token) config.headers["Authorization"] = "X-Access-Token";
        // let token = localStorage.getItem("token");
        // if (token) config.headers["token"] = token;

        return config;
    },
    function(error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);
// 添加响应拦截器
axios.interceptors.response.use(
    (response) => {
        // 对响应数据做点什么
        return response;
    },
    (error) => {
        // 对响应错误做点什么
        if (error.response) {
            if (error.response.data.status === 500 && error.response.data.message == 'Token失效，请重新登录') {
                Modal.error({
                    title: '登录已过期',
                    content: '很抱歉，登录过期，请重新登录',
                    okText: '重新登录',
                    mask: false,
                    onOk: () => {
                        sessionStorage.removeItem('token');
                        localStorage.removeItem('userInfo');
                        window.location.href = '#/';
                    }
                });
                return Promise.reject('登录超时！');
            } else if (error.response.data.status === 500 && error.response.data.message.indexOf('操作失败') > -1) {
                return Promise.reject('长时间未操作，请刷新页面！');
            }
        }
        return Promise.reject(error);
    }
);
/**
 * api说明
 * 1.发送get请求时 参数使用params
 * 2.发送post请求时 参数使用body
 * 默认使用get请求
 *
 * 添加参数需说明 如下附加即可
 * url: 请求地址 必传
 * type: 请求类型 必传
 * params: get请求参数, Query String
 * body: post请求参数
 * pathVar:不需要写
 */
export const ajaxSend = ({ url, type = 'get', params, body, responseType }) => {
    url = baseUrl + url; // 拼接服务器地址
    return new Promise((resovle, reject) => {
        if (type === 'get' || type === 'GET') {
            if (params) {
                // 有get参数 附加在url后
                url = urlParams(params, url);
            }
            axios
                .get(url)
                .then((res) => {
                    // 可以对反回值做统一处理

                    let handle = success(res.data);
                    handle.code === 0 || handle.code === 200 ? resovle(handle.data) : reject(handle.message);
                })
                .catch((err) => {
                    // 对错误做统一处理
                    // message.error('服务器出错，请稍后再试！'); //这里填写错误信息
                    error(err);
                    reject(err);
                });
        } else if (type === 'post' || type === 'POST') {
            // 对参数进行处理
            if (body) {
                bodyInit(body);
            }
            if (responseType == 'file') {
                axios
                    .post(url, body, { responseType: 'blob' })
                    .then((res) => {
                        resovle(res);
                    })
                    .catch((err) => {
                        // message.error('服务器出错，请稍后再试！'); //这里填写错误信息
                        error(err);
                        reject(err);
                    });
            } else {
                axios
                    .post(url, body)
                    .then((res) => {
                        let handle = success(res.data);
                        handle.code === 0 || handle.code === 200 ? resovle(handle.data) : reject(handle.message);
                    })
                    .catch((err) => {
                        // message.error('服务器出错，请稍后再试！'); //这里填写错误信息
                        error(err);
                        reject(err);
                    });
            }
        } else if (type == 'delete' || type == 'DELETE') {
            if (params) {
                // 有get参数 附加在url后
                url = urlParams(params, url);
            }
            axios
                .delete(url)
                .then((res) => {
                    // 可以对反回值做统一处理

                    let handle = success(res.data);
                    handle.code === 0 || handle.code === 200 ? resovle(handle.data) : reject(handle.message);
                })
                .catch((err) => {
                    // message.error('服务器出错，请稍后再试！'); //这里填写错误信息
                    error(err);
                    reject(err);
                });
        } else if (type === 'put' || type === 'PUT') {
            // 对参数进行处理
            if (body) {
                bodyInit(body);
            }
            axios
                .put(url, body)
                .then((res) => {
                    let handle = success(res.data);
                    handle.code === 0 || handle.code === 200 ? resovle(handle.data) : reject(handle.message);
                })
                .catch((err) => {
                    // message.error('服务器出错，请稍后再试！'); //这里填写错误信息
                    error(err);
                    reject(err);
                });
        }
    });
};
/***
 * 处理get参数
 * params: 需要携带的参数
 * url: 需要拼接的url
 */
function urlParams(params, url) {
    url += '?';
    for (let item in params) {
        url += item + '=' + params[item] + '&';
    }
    url.substring(0, url.length - 1);
    return url;
}
/**
 * 对post请求参数处理
 * @param {*} body
 */
function bodyInit(body) {}

/**
 * 对成功返回的数据进行统一处理
 * @param {*} res
 */
function success(res) {
    if (res.code === 0 || res.code === 200) {
        // 处理成功
        return {
            code: 0,
            data: res
        };
    } else if (res.code === 500 && res.message == 'Token失效，请重新登录') {
        sessionStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        window.location.href = '#/';
        return {
            code: res.code,
            message: res.message
        };
    } else {
        // 处理警告

        return {
            code: res.code,
            message: res.message
        };
    }
}
/**
 * 对返回失败请求进行统一处理
 * @param {*} err
 */
function error(err) {
    return err;
}

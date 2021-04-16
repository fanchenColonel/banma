import { ajaxSend } from '@/assets/js/http';

export function doLogin({ username, password }) {
    return ajaxSend({
        url: '/sys/login',
        type: 'POST',
        Authorization: 'X - Access - Token',
        body: {
            username,
            password
        }
    });
}

export function getToken({ rTUrl }) {
    return ajaxSend({
        url: '/online/universalityToken/getToken',
        type: 'GET',
        params: {
            rTUrl
        }
    });
}

export function getUrlList() {
    return ajaxSend({
        url: '/online/universalityToken/urlList',
        type: 'GET',
        params: {}
    });
}

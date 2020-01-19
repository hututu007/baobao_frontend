import request from '@/utils/request'
const baseURL = 'http://localhost:3000'

export function fetchList(params){
    return request({
        params,
        url: `${baseURL}/playlist/list`,
        method: 'get'
    })
}

export function update(params) {
    return request({
        url: `${baseURL}/playlist/updatePlaylist`,
        data: {
            ...params
        },
        method: 'post',
    })
}

export function onAdd(params) {
    return request({
        url: `${baseURL}/playlist/onAddPlaylist`,
        data: {
            ...params
        },
        method: 'post',
    })
}

export function del(params) {
    return request({
        params,
        url: `${baseURL}/playlist/del`,
        method: 'get',
    })
}
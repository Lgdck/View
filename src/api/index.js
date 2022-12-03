import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};

export function fetchForm (query){
    return request({
        url: './send/sh',
        method: 'post',
        data: query
    });
};


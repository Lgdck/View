import instance from "../network";

export const fetchDataT = query => {
    return instance({
       url:"/dataPiechart",
        method: 'get',
        params: query
    });
};

/*export function fetchDataT (query)  {
    return instance({
        url:"/dataPiechart",
        method: 'get',
        params: query
    });
};*/

export function fetchFormT (query){
    return instance({
        url: '/selectGrouname',
        method: 'post',
        data:JSON.stringify(query)
    });
};

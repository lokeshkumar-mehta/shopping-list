import doHttpRequest from "./doHttpRequest";

export const getList = () => {
    return doHttpRequest('list', 'GET');
};

export const addList = (body) => {
    return doHttpRequest('list', 'POST', body)
};
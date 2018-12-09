import axios from 'axios';

const ROOT_URL = 'http://127.0.0.1:8082/ContextAPI/categories';

export const fetchCategoryListApi = () => {
    return axios({
        method : 'get',
        url : `${ROOT_URL}`
    });
}

export const fetchCategoryElementApi = (id) => {
    return axios({
        method : 'get',
        url : `${ROOT_URL}/${id}`
    });
}
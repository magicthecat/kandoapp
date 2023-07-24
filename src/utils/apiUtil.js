
export class ApiUtil {

    static fetchData = ({ endpoint }) => {
        return fetch(`http://localhost:3002/${endpoint}`).then((response) => response.json());
    };


    static fetchDataByQueryParam = ({ endpoint, queryParam, value }) => {
        return fetch(`http://localhost:3002/${endpoint}?${queryParam}=${value}`).then((response) => response.json());
    };


}


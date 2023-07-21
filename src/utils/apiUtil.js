export class ApiUtil {

    static fetchData = ({ endpoint }) => {
        return fetch(`http://localhost:3002/${endpoint}`).then((response) => response.json());
    };


}
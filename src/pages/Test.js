import { useEffect, useState } from "react";
import { ApiUtil } from "../utils/apiUtil";
import { Link } from "wouter";
import { NavigationItem } from "../components/navigationComponents/navigationComponents";

const DataList = ({ queryParam, value }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data using the fetchDataByQueryParam method from ApiUtil
        ApiUtil.fetchDataByQueryParam({ endpoint: 'epics', queryParam, value })
            .then((responseData) => {
                setData(responseData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [queryParam, value]);

    return (
        <div>
            <h1>Data List</h1>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export const TestPage = () => {

    return (
        <>
            <DataList queryParam='projectId' value="1" />
        </>

    )
}
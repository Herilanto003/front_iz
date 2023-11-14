import React from 'react';
import axios from 'axios';
import { useRefresh } from '../context/useRefresh';

const UseFetch = (link) => {
    const [data, setData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [success, setSuccess] = React.useState(false);
    const { isRefresh } = useRefresh();

    console.log('ref', isRefresh);

    React.useEffect(() => {
        setIsLoading(true)
        axios.get(link)
                .then(response => {
                    console.log(response);
                    setData(response.data)
                    setIsLoading(false);
                    setSuccess(true);
                })  
                .catch(error => {
                    console.log(error);
                    setIsLoading(false);
                    setSuccess(false)
                })
    }, [isRefresh]);

    return {
        data,
        isLoading,
        success
    };
}

export default UseFetch;

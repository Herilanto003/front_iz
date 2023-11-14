import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import { useRefresh } from '../context/useRefresh';

const UseUpdate = (link) => {
    const [loading, setLoading] = React.useState(true);
    const [success, setSuccess] = React.useState(false);
    const { handleRefresh } = useRefresh();

    const handleUpdate = async (data) => {
        await axios.put(link, data)
                .then(response => {
                    console.log(response);
                    setSuccess(true);
                    toast.success(response.data.message, { theme: "colored" })
                })
                .catch(error => {
                    console.log(error);
                    setSuccess(false)
                    toast.error(error.response.data.message, { theme: "colored" })
                })
                .finally(() => {
                    setLoading(false)
                    handleRefresh();
                })
        return success;
    }

    return {
        loading,
        success,
        handleUpdate
    };
}

export default UseUpdate;

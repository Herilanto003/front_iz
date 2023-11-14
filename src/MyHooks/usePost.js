import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import { useRefresh } from '../context/useRefresh';

const UsePost = (link) => {
    const [loading, setLoading] = React.useState(true);
    const [success, setSuccess] = React.useState(false);
    const { handleRefresh } = useRefresh();
    let isSuccess = false

    const handlePost = async (data) => {
        await axios.post(link, data)
                .then(response => {
                    console.log(response);
                    isSuccess = true;
                    toast.success(response.data.message, { theme: "colored" })
                })
                .catch(error => {
                    isSuccess = false;
                    setSuccess(false)
                    toast.error(error.response.data.message, { theme: "colored" })
                })
                .finally(() => {
                    setLoading(false)
                    handleRefresh();
                })
        return isSuccess;
    }

    return {
        loading,
        success,
        handlePost
    };
}

export default UsePost;

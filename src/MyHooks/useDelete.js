import React from 'react';
import axios from 'axios';

const UseDelete = () => {

    const handleDelete = async (link) => {
        await axios.delete(link)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
    }

    return {
        handleDelete
    };
}

export default UseDelete;

import { Box } from '@mui/material';
import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import UseFetch from '../../MyHooks/useFetch';

const CandidatTotal = () => {

    const { data } = UseFetch('/dashboard/candidats');
    console.log("my data", data);

    return (
        <Box>
            <BarChart width={1024} height={250} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nom_sport" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
        </Box>
    );
}

export default CandidatTotal;

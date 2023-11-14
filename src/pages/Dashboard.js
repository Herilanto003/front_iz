import React from 'react';
import MyContainer from '../components/MyContainer';
import CandidatTotal from '../components/dashboard/CandidatTotal';

const Dashboard = () => {
    return (
        <MyContainer>
            {/** total candidat par sport */}
            <CandidatTotal />
        </MyContainer>
    );
}

export default Dashboard;

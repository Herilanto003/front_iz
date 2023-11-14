import React from 'react';
import MyContainer from '../components/MyContainer';
import HeadPage from '../components/HeadPage';
import { FaBaseballBall } from 'react-icons/fa';
import AddSport from '../components/sports/AddSport';
import ListSport from '../components/sports/ListSport';

const Sport = () => {
    // DEBUT STATES

    const [openAdd, setOpenAdd] = React.useState(false)

    // FIN STATES

    return (
        <MyContainer>
            {/** title */}
            <HeadPage title={"Sports"} icon={<FaBaseballBall />} handleOpenAdd={() => setOpenAdd(true)} />

            {/** formulaire d'ajout */}
            <AddSport open={openAdd} handleClose={() => setOpenAdd(false)} />

            {/** liste des sports */}
            <ListSport />
        </MyContainer>
    );
}

export default Sport;

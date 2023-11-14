import React from 'react';
import MyContainer from '../components/MyContainer';
import HeadPage from '../components/HeadPage';
import { FaSchool } from 'react-icons/fa';
import AddCentre from '../components/centre/AddCentre';
import ListCentre from '../components/centre/ListCentre';

const Centre = () => {
    // DEBUT STATE

    const [openAdd, setOpenAdd] = React.useState(false);

    // FIN STATE

    return (
        <MyContainer>
            {/** title */}
            <HeadPage title={'Les centres'} icon={<FaSchool />} handleOpenAdd={() => setOpenAdd(true)} />

            {/** formulaire d'ajout d'un nouveau centre */}
            <AddCentre open={openAdd} handleClose={() => setOpenAdd(false)} />

            {/** LISTE des centres */}
            <ListCentre />
        </MyContainer>
    );
}

export default Centre;

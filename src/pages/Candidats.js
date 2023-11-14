import React from 'react';
import MyContainer from '../components/MyContainer';
import AddCandidat from '../components/candidats/AddCandidat';
import ListCandidat from '../components/candidats/ListCandidat';
import { FaUsers } from 'react-icons/fa';
import HeadPage from '../components/HeadPage';

const Candidats = () => {
    // DEBUT DE TOUS LES STATES UTILISES
    
    const [openAdd, setOpenAdd] = React.useState(false);

    // FIN DE TOUS LES STATES UTILISES


    return (
        <MyContainer>
            {/** title */}
            <HeadPage handleOpenAdd={() => setOpenAdd(true)} icon={<FaUsers />} title={"Candidats"} />

            {/** MODAL D AJOUT */}
            <AddCandidat open={openAdd} handleClose={() => setOpenAdd(false)} />

            {/** LISTE DES CANDIDATS */}
            <ListCandidat />
        </MyContainer>
    );
}

export default Candidats; 

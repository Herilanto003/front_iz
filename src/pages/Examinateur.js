import React from 'react';
import MyContainer from '../components/MyContainer';
import HeadPage from '../components/HeadPage';
import { FaClipboard } from 'react-icons/fa';
import AddExaminateur from '../components/examinateur/AddExaminateur';
import ListExaminateur from '../components/examinateur/ListExaminateur';

const Examinateur = () => {
    // début tous les states

    const [openAdd, setOpenAdd] = React.useState(false)

    // fin tous les states

    return (
        <MyContainer>
            {/** title */}
            <HeadPage title={"Examinateur"} icon={<FaClipboard />} handleOpenAdd={() => setOpenAdd(true)} />

            {/** Formulaire d'ajout d'un nouveau examinateur */}
            <AddExaminateur open={openAdd} handleClose={() => setOpenAdd(false)} />

            {/** liste des examinateurs */}
            <ListExaminateur />
        </MyContainer>
    );
}

export default Examinateur;

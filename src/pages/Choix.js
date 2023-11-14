import React from 'react';
import MyContainer from '../components/MyContainer';
import HeadPage from '../components/HeadPage';
import { FaClipboardList } from 'react-icons/fa';
import AddChoix from '../components/choix/AddChoix';
import ListChoix from '../components/choix/ListChoix';

const Choix = () => {
    // début tous states

    const [openAdd, setOpenAdd] = React.useState(false);

    // fin tous states

    return (
        <MyContainer>
            {/** title */}
            <HeadPage title={"Choix"} icon={<FaClipboardList />} handleOpenAdd={() => setOpenAdd(true)} />

            {/** formulaire d ajout */}
            <AddChoix open={openAdd} handleClose={() => setOpenAdd(false)} />

            {/** liste */}
            <ListChoix />
        </MyContainer>
    );
}

export default Choix;

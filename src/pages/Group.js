import React from 'react';
import MyContainer from '../components/MyContainer';
import HeadPage from '../components/HeadPage';
import { FaLayerGroup } from 'react-icons/fa';
import AddGroup from '../components/group/AddGroup';
import ListGroup from '../components/group/ListGroup';

const Group = () => {
    // DEBUT STATE

    const [openAdd, setOpenAdd] = React.useState(false);

    // FIN STATE

    return (
        <MyContainer>
            {/** title */}
            <HeadPage title={"Les groupes"} icon={<FaLayerGroup />} handleOpenAdd={() => setOpenAdd(true)} />

            {/** formulaire */}
            <AddGroup open={openAdd} handleClose={() => setOpenAdd(false)} />

            {/** list */}
            <ListGroup />
        </MyContainer>
    );
}

export default Group;

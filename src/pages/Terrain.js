import React from 'react';
import MyContainer from '../components/MyContainer';
import HeadPage from '../components/HeadPage';
import { FaHome } from 'react-icons/fa';
import AddTerrain from '../components/terrain/AddTerrain';
import ListTerrain from '../components/terrain/ListTerrain';

const Terrain = () => {
    // DEBUT STATE

    const [openAdd, setOpenAdd] = React.useState(false);

    // FIN STATE

    return (
        <MyContainer>
            {/** title */}
            <HeadPage title={"Les terrains"} icon={<FaHome />} handleOpenAdd={() => setOpenAdd(true)} />

            {/** formulaire */}
            <AddTerrain open={openAdd} handleClose={() => setOpenAdd(false)} />

            {/** list */}
            <ListTerrain />
        </MyContainer>
    );
}

export default Terrain;

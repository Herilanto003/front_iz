import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { FaPlusCircle } from 'react-icons/fa';

const HeadPage = ({ handleOpenAdd, icon, title }) => {
    return (
        <Box component={"div"} sx={styles.header} >
            <Typography variant='h4' display={'flex'} alignItems={'center'} gap={2}> {icon} {title} </Typography>
            <Button variant="contained" size="medium" onClick={handleOpenAdd} startIcon={<FaPlusCircle />} >Nouveau</Button>
        </Box>
    );
}

/** @type import('@mui/material').SxProps */
const styles = {
    header: {
        width: "100%",
        height: "60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }
}

export default HeadPage;

import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import React from 'react';

const MyCustomToolbar = () => {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarQuickFilter />
        </GridToolbarContainer>
    );
}

export default MyCustomToolbar;

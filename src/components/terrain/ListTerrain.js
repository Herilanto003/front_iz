import React from 'react';
import {
    DataGrid
} from '@mui/x-data-grid';
import { Box, IconButton } from '@mui/material';
import MyCustomToolbar from '../MyCustomToolbar';
import { FaEdit, FaTrash } from 'react-icons/fa';
import UseFetch from '../../MyHooks/useFetch';
import { useRefresh } from '../../context/useRefresh';
import DialogConfrim from '../DialogConfrim';
import EditTerrain from './EditTerrain';

const ListTerrain = () => {
    // pour selection id
    const [selectId, setSelectId] = React.useState(null);

    // pour suppression
    const [openDelete, setOpenDelete] = React.useState(false);

    // pour edit
    const [openEdit, setOpenEdit] = React.useState(false);
    const [editData, setEditData] = React.useState({
        nom_terrain: '',
        id_centre: '',
    })

    // obtenir tous les données
    const { data, isLoading, success } = UseFetch('/terrain');
    const { isRefresh } = useRefresh();
    const [rows, setRows] = React.useState([])

    React.useEffect(() => {
        const terrain = data.map(elem => ({
            id: elem.id_terrain,
            id_centre: elem.id_centre,
            nom_terrain: elem.nom_terrain
        }))

        setRows(terrain);
    }, [isRefresh, isLoading]);

    // rows
    // const rows = [
    //     {id: 1, nom_terrain: 'Hery', id_centre: 'INDIVIDUEL'},
    //     {id: 2, nom_terrain: 'lanto', id_centre: 'INDIVIDUEL'},
    //     {id: 3, nom_terrain: 'andry', id_centre: 'INDIVIDUEL'},
    //     {id: 4, nom_terrain: 'nasolo', id_centre: 'INDIVIDUEL'},
    //     {id: 5, nom_terrain: 'louis', id_centre: 'INDIVIDUEL'},
    //     {id: 6, nom_terrain: 'denis', id_centre: 'INDIVIDUEL'},
    //     {id: 7, nom_terrain: 'larissa', id_centre: 'INDIVIDUEL'},
    //     {id: 8, nom_terrain: 'samba', id_centre: 'INDIVIDUEL'},
    //     {id: 9, nom_terrain: 'zafy', id_centre: 'INDIVIDUEL'},
    //     {id: 10, nom_terrain: 'bienvenu', id_centre: 'INDIVIDUEL'},
    // ]

    // les colonnes
    const columns = [
        {field: 'id', headerName: 'Id terrain', flex: 1, editable: false},
        {field: 'nom_terrain', headerName: 'Nom du terrain', flex: 1, editable: false},
        {field: 'id_centre', headerName: 'ID centre associé', flex: 1, editable: false},
        {field: 'actions', headerName: 'Actions', flex: 1, editable: false,
            renderCell: (params) => {
                /** modification */
                const handleEdit = () => {
                    console.log('edit', params);
                    setSelectId(params.id);
                    setOpenEdit(true);
                    setEditData({
                        nom_terrain: params.row.nom_terrain,
                        id_centre: params.row.id_centre,
                    })
                }

                /** supprimer */
                const handleDelete = () => {
                    console.log('supp', params);
                    setSelectId(params.id);
                    setOpenDelete(true)
                }

                return (
                    <Box display={'flex'} justifyContent={'start'} alignItems={'center'} gap={2}>
                        <IconButton onClick={handleDelete} color='error'>
                            <FaTrash />
                        </IconButton>
                        <IconButton onClick={handleEdit} color='success'> 
                            <FaEdit />
                        </IconButton>
                    </Box>
                )
            }
        }
    ]

    return (
        <Box>
            <EditTerrain 
                open={openEdit}
                handleClose={() => setOpenEdit(false)}
                data={editData}
                link={`/terrain/${selectId}`}
            />

            <DialogConfrim 
                open={openDelete}
                handleClose={() => setOpenDelete(false)}
                title={`SUPPRESSION DU TERRAIN AVEC ID : ${selectId}`}
                link={`/terrain/${selectId}`}
            />

            <DataGrid
                columns={columns}
                rows={rows}
                disableRowSelectionOnClick
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                sx={styles.tableContainer}
                slots={{ toolbar: MyCustomToolbar }}
                autoHeight
            />
        </Box>
    );
}

/** @type import('@mui/material').SxProps */
const styles = {
    tableContainer: {
        boxShadow: 15,
        borderRadius: 0,
        borderColor: '#44444480',

        '& .MuiDataGrid-columnHeaders': {
            color: '#090a44',
            background: '#0ea22430',
            borderRadius: 0
        },

        '& .MuiDataGrid-footerContainer': {
            color: '#090a00',
            background: '#0ea22430',
            borderRadius: 0
        },
        width: 'auto',
    }
}

export default ListTerrain;

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
import EditSport from './EditSport';

const ListSport = () => {
    // for select id
    const [selectId, setSelectId] = React.useState(null);

    // for delete
    const [openDelete, setOpenDelete] = React.useState(false);

    // for edit
    const [openEdit, setOpenEdit] = React.useState(false);
    const [editData, setEditData] = React.useState({
        nom_sport: '',
        type: ''
    });

    // obtenir tous les données
    const { data, isLoading, success } = UseFetch('/sport');
    const { isRefresh } = useRefresh();
    const [rows, setRows] = React.useState([])

    React.useEffect(() => {
        const centre = data.map(elem => ({
            id: elem.id_sport,
            nom_sport: elem.nom_sport,
            type: elem.type
        }))

        setRows(centre);
    }, [isRefresh, isLoading]);
    // rows
    // const rows = [
    //     {id: 1, nom_sport: 'Hery', type: 'INDIVIDUEL'},
    //     {id: 2, nom_sport: 'lanto', type: 'INDIVIDUEL'},
    //     {id: 3, nom_sport: 'andry', type: 'INDIVIDUEL'},
    //     {id: 4, nom_sport: 'nasolo', type: 'INDIVIDUEL'},
    //     {id: 5, nom_sport: 'louis', type: 'INDIVIDUEL'},
    //     {id: 6, nom_sport: 'denis', type: 'INDIVIDUEL'},
    //     {id: 7, nom_sport: 'larissa', type: 'INDIVIDUEL'},
    //     {id: 8, nom_sport: 'samba', type: 'INDIVIDUEL'},
    //     {id: 9, nom_sport: 'zafy', type: 'INDIVIDUEL'},
    //     {id: 10, nom_sport: 'bienvenu', type: 'INDIVIDUEL'},
    // ]

    // les colonnes
    const columns = [
        {field: 'id', headerName: 'Id centre', flex: 1, editable: false},
        {field: 'nom_sport', headerName: 'Nom du sport', flex: 1, editable: false},
        {field: 'type', headerName: 'Type du sport', flex: 1, editable: false},
        {field: 'actions', headerName: 'Actions', flex: 1, editable: false,
            renderCell: (params) => {
                /** modification */
                const handleEdit = () => {
                    console.log('edit', params);
                    setSelectId(params.id)
                    setOpenEdit(true)
                    setEditData({
                        nom_sport: params.row.nom_sport,
                        type: params.row.type
                    });
                }

                /** supprimer */
                const handleDelete = () => {
                    console.log('supp', params);
                    setSelectId(params.id);
                    setOpenDelete(true);
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
            <EditSport 
                open={openEdit}
                handleClose={() => setOpenEdit(false)}
                data={editData}
                link={`/sport/${selectId}`}    
            />

            <DialogConfrim 
                title={`SUPPRESSION DU SPORT AVEC ID : ${selectId}`}
                open={openDelete}
                handleClose={() => setOpenDelete(false)}
                link={`/sport/${selectId}`}
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

export default ListSport;

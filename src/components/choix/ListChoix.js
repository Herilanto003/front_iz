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
import EditChoix from './EditChoix';

const ListChoix = () => {
    // pour selction id
    const [selectId, setSelectId] = React.useState(null);

    // pour suppression
    const [openDelete, setOpenDelete] = React.useState(false);

    // pour edit
    const [openEdit, setOpenEdit] = React.useState(false);
    const [editData, setEditData] = React.useState({
        id_candidat: '',
        id_sport: '',
    })

    // obtenir tous les données
    const { data, isLoading, success } = UseFetch('/choix');
    const { isRefresh } = useRefresh();
    const [rows, setRows] = React.useState([])

    React.useEffect(() => {
        const choix = data.map(elem => ({
            id: elem.id_choix,
            id_candidat: elem.id_candidat,
            id_sport: elem.id_sport
        }))

        setRows(choix);
    }, [isRefresh, isLoading]);
    // rows
    // const rows = [
    //     {id: 1, id_candidat: 'Hery', id_sport: 'INDIVIDUEL'},
    //     {id: 2, id_candidat: 'lanto', id_sport: 'INDIVIDUEL'},
    //     {id: 3, id_candidat: 'andry', id_sport: 'INDIVIDUEL'},
    //     {id: 4, id_candidat: 'nasolo', id_sport: 'INDIVIDUEL'},
    //     {id: 5, id_candidat: 'louis', id_sport: 'INDIVIDUEL'},
    //     {id: 6, id_candidat: 'denis', id_sport: 'INDIVIDUEL'},
    //     {id: 7, id_candidat: 'larissa', id_sport: 'INDIVIDUEL'},
    //     {id: 8, id_candidat: 'samba', id_sport: 'INDIVIDUEL'},
    //     {id: 9, id_candidat: 'zafy', id_sport: 'INDIVIDUEL'},
    //     {id: 10, id_candidat: 'bienvenu', id_sport: 'INDIVIDUEL'},
    // ]

    // les colonnes
    const columns = [
        {field: 'id', headerName: 'Id choix', flex: 1, editable: false},
        {field: 'id_candidat', headerName: 'Id candidat associé', flex: 1, editable: false},
        {field: 'id_sport', headerName: 'ID sport associé', flex: 1, editable: false},
        {field: 'actions', headerName: 'Actions', flex: 1, editable: false,
            renderCell: (params) => {
                /** modification */
                const handleEdit = () => {
                    console.log('edit', params);
                    setSelectId(params.id);
                    setOpenEdit(true);
                    setEditData({
                        id_candidat: params.row.id_candidat,
                        id_sport: params.row.id_sport
                    })
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
            <EditChoix 
                open={openEdit}
                handleClose={() => setOpenEdit(false)}
                data={editData}
                link={`/choix/${selectId}`}
            />

            <DialogConfrim 
                open={openDelete}
                handleClose={() => setOpenDelete(false)}
                title={`SUPPRESSION DU CHOIX PORTANT ID : ${selectId}`}
                link={`/choix/${selectId}`}
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

export default ListChoix;

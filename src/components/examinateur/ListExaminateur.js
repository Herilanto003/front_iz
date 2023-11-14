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
import EditExaminateur from './EditExaminateur';

const ListExaminateur = () => {
    // suppression
    const [selectId, setSelectId] = React.useState(null);
    const [openDelete, setOpenDelete] = React.useState(false);

    // edit
    const [openEdit, setOpenEdit] = React.useState(false);
    const [editData, setEditData] = React.useState({
        nom_examinateur: ''
    })

    // obtenir tous les données
    const { data, isLoading, success } = UseFetch('/examinateur');
    const { isRefresh } = useRefresh();
    const [rows, setRows] = React.useState([])

    React.useEffect(() => {
        const candidat = data.map(elem => ({
            id: elem.id_examinateur,
            nom_examinateur: elem.nom_examinateur
        }))

        setRows(candidat);
    }, [isRefresh, isLoading]);

    // rows
    // const rows = [
    //     {id: 1, nom_examinateur: 'Hery'},
    //     {id: 2, nom_examinateur: 'lanto'},
    //     {id: 3, nom_examinateur: 'andry'},
    //     {id: 4, nom_examinateur: 'nasolo'},
    //     {id: 5, nom_examinateur: 'louis'},
    //     {id: 6, nom_examinateur: 'denis'},
    //     {id: 7, nom_examinateur: 'larissa'},
    //     {id: 8, nom_examinateur: 'samba'},
    //     {id: 9, nom_examinateur: 'zafy'},
    //     {id: 10, nom_examinateur: 'bienvenu'},
    // ]

    // les colonnes
    const columns = [
        {field: 'id', headerName: 'Id examinateur', flex: 1, editable: false},
        {field: 'nom_examinateur', headerName: 'Nom de l\'examinateur', flex: 1, editable: false},
        {field: 'actions', headerName: 'Actions', flex: 1, editable: false,
            renderCell: (params) => {
                /** modification */
                const handleEdit = () => {
                    console.log('edit', params);
                    setSelectId(params.id);
                    setOpenEdit(true);
                    setEditData({
                        nom_examinateur: params.row.nom_examinateur
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
            <EditExaminateur 
                open={openEdit}
                handleClose={() => setOpenEdit(false)}
                data={editData}
                link={`/examinateur/${selectId}`}
            />

            <DialogConfrim 
                title={`SUPPRESSION DE L' EXAMINATEUR ID : ${selectId}`}
                open={openDelete}
                handleClose={() => setOpenDelete(false)}
                link={`/examinateur/${selectId}`}
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

export default ListExaminateur;

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
import EditCentre from './EditCentre';

const ListCentre = () => {
    // for select id
    const [selectId, setSelectId] = React.useState(null)

    // delete
    const [openDelete, setOpenDelete] = React.useState(false);

    // for edit
    const [editData, setEditData] = React.useState({
        lieu: '',
    });
    const [openEdit, setOpenEdit] = React.useState(false)

    // obtenir tous les données
    const { data, isLoading, success } = UseFetch('/centre');
    const { isRefresh } = useRefresh();
    const [rows, setRows] = React.useState([])

    React.useEffect(() => {
        const centre = data.map(elem => ({
            id: elem.id_centre,
            lieu: elem.lieu
        }))

        setRows(centre);
    }, [isRefresh, isLoading]);
    // rows
    // const rows = [
    //     {id: 1, lieu: 'Hery'},
    //     {id: 2, lieu: 'lanto'},
    //     {id: 3, lieu: 'andry'},
    //     {id: 4, lieu: 'nasolo'},
    //     {id: 5, lieu: 'louis'},
    //     {id: 6, lieu: 'denis'},
    //     {id: 7, lieu: 'larissa'},
    //     {id: 8, lieu: 'samba'},
    //     {id: 9, lieu: 'zafy'},
    //     {id: 10, lieu: 'bienvenu'},
    // ]

    // les colonnes
    const columns = [
        {field: 'id', headerName: 'Id centre', flex: 1, editable: false},
        {field: 'lieu', headerName: 'Lieux', flex: 1, editable: false},
        {field: 'actions', headerName: 'Actions', flex: 1, editable: false,
            renderCell: (params) => {
                /** modification */
                const handleEdit = () => {
                    console.log('edit', params);
                    setSelectId(params.id);
                    setOpenEdit(true);
                    setEditData({
                        lieu: params.row.lieu
                    })
                }

                /** supprimer */
                const handleDelete = () => {
                    console.log('supp', params);
                    setSelectId(params.id)
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
            <EditCentre 
                open={openEdit}
                handleClose={() => setOpenEdit(false)}
                data={editData}
                link={`/centre/${selectId}`}
            />

            <DialogConfrim 
                title={`SUPPRESSION DU CENTRE AVEC ID : ${selectId}`}
                open={openDelete}
                handleClose={() => setOpenDelete(false)}
                link={`/centre/${selectId}`}
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

export default ListCentre;

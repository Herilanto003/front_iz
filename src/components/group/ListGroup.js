import React from 'react';
import {
    Box,
    IconButton
} from '@mui/material';
import {
    DataGrid,
} from '@mui/x-data-grid';
import MyCustomToolbar from '../MyCustomToolbar';
import { FaEdit, FaTrash } from 'react-icons/fa';
import UseFetch from '../../MyHooks/useFetch';
import { useRefresh } from '../../context/useRefresh';
import DialogConfrim from '../DialogConfrim';
import EditGroup from './EditGroup';

const formatDate = (date) => {
    const maDate = new Date(date); // Remplacez cela par votre objet DateTime

    // Obtenez les composants de la date
    const annee = maDate.getFullYear();
    const mois = maDate.getMonth() + 1; // Les mois commencent à partir de zéro, ajoutez 1 pour obtenir le mois réel
    const jour = maDate.getDate();

    // Formatez la date comme "YYYY-MM-DD"
    const dateFormatee = annee + '-' + (mois < 10 ? '0' : '') + mois + '-' + (jour < 10 ? '0' : '') + jour;

    return dateFormatee;
}

const ListGroup = () => {
    // pour selction id
    const [selectId, setSelectId] = React.useState(null);

    // pour suppression
    const [openDelete, setOpenDelete] = React.useState(false);

    // pour edit
    const [openEdit, setOpenEdit] = React.useState(false);
    const [editData, setEditData] = React.useState({
        id_examinateur: '',
        terrainId: '',
        numero: '',
        date_epreuve: '',
        temps: '',
        heure: ''
    })

    // obtenir tous les données
    const { data, isLoading, success } = UseFetch('/groupe');
    const { isRefresh } = useRefresh();
    const [rows, setRows] = React.useState([])

    React.useEffect(() => {
        const choix = data.map(elem => ({
            id: elem.id_groupe,
            id_examinateur: elem.id_examinateur,
            terrainId: elem.terrainId,
            numero: elem.numero,
            date_epreuve: formatDate(elem.date_epreuve),
            temps: elem.temps,
            heure: elem.heure
        }))

        setRows(choix);
    }, [isRefresh, isLoading]);
    // les lignes de la table
    // const rows = [
    //     {id: 1, numero: '001', date_epreuve: 'Hery', temps: 'Lanto', heure: '2023-01-01', id_examinateur: 'false', terrainId: 2},
    //     {id: 2, numero: '001', date_epreuve: 'Hery', temps: 'Lanto', heure: '2023-01-01', id_examinateur: 'false', terrainId: 2},
    //     {id: 3, numero: '001', date_epreuve: 'Hery', temps: 'Lanto', heure: '2023-01-01', id_examinateur: 'true', terrainId: 2},
    //     {id: 4, numero: '001', date_epreuve: 'Hery', temps: 'Lanto', heure: '2023-01-01', id_examinateur: 'false', terrainId: 2},
    //     {id: 5, numero: '001', date_epreuve: 'Hery', temps: 'Lanto', heure: '2023-01-01', id_examinateur: 'true', terrainId: 2},
    //     {id: 6, numero: '001', date_epreuve: 'Hery', temps: 'Lanto', heure: '2023-01-01', id_examinateur: 'true', terrainId: 2},
    //     {id: 7, numero: '001', date_epreuve: 'Hery', temps: 'Lanto', heure: '2023-01-01', id_examinateur: 'false', terrainId: 2},
    //     {id: 8, numero: '001', date_epreuve: 'Hery', temps: 'Lanto', heure: '2023-01-01', id_examinateur: 'false', terrainId: 2},
    // ]

    // les colonnes
    const columns = [
        {field: 'id', headerName: "Id group", width: 90, editable: false},
        {field: 'numero', headerName: "Numéro", flex: 1, editable: false},
        {field: 'date_epreuve', headerName: 'Date epreuve', flex: 1, editable: false},
        {field: 'temps', headerName: 'Temps', flex: 1, editable: false},
        {field: 'heure', headerName: 'Heure', flex: 1, editable: false},
        {field: 'id_examinateur', headerName: 'Id examinateur associé', flex: 1, editable: false},
        {field: 'terrainId', headerName: 'Id terrain associé', flex: 1, editable: false},
        {field: 'actions', headerName: 'Actions', flex: 1, editable: false,
            renderCell: (params) => {

                // pour le bouton supprimer
                const handleDelete = () => {
                    console.log('supp', params);
                    setOpenDelete(true);
                    setSelectId(params.id);
                }

                // pour le bouton modifier
                const handleEdit = () => {
                    console.log('edit', params);
                    setSelectId(params.id)
                    setOpenEdit(true);
                    setEditData({
                        id_examinateur: params.row.id_examinateur,
                        terrainId: params.row.terrainId,
                        numero: params.row.numero,
                        date_epreuve: formatDate(params.row.date_epreuve),
                        temps: params.row.temps,
                        heure: params.row.heure
                    })
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
            <DialogConfrim 
                open={openDelete}
                handleClose={() => setOpenDelete(false)}
                title={`SUPPRESSION DU GROUPE AVEC ID : ${selectId}`}
                link={`/groupe/${selectId}`}
            />

            <EditGroup 
                open={openEdit}
                handleClose={() => setOpenEdit(false)}
                data={editData}
                link={`/groupe/${selectId}`}
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

export default ListGroup;

import React from 'react';
import {
    Box,
    Chip,
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
import EditCandidat from './EditCandidat';

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

const ListCandidat = () => {
    // select id
    const [selectId, setSelectId] = React.useState(null);

    // ouvrir et fermer confirm
    const [openConfirm, setOpenConfirm] = React.useState(false);
    
    // pour edit
    const [openEdit, setOpenEdit] = React.useState(false);
    const [initialData, setInitialData] = React.useState({
        numeroInscription: '',
        nom: '',
        prenoms: '',
        date_naissance: '',
        sexe: 'HOMME',
        isApte: true
    });

    // obtenir tous les données
    const { data, isLoading, success } = UseFetch('/candidats');
    const { isRefresh } = useRefresh();
    const [rows, setRows] = React.useState([])

    React.useEffect(() => {
        const candidat = data.map(elem => ({
            id: elem.id_candidat,
            numeroInscription: elem.numeroInscription,
            nom: elem.nom,
            prenoms: elem.prenoms,
            date_naissance: elem.date_naissance,
            isApte: elem.isApte,
            sexe: elem.sexe
        }))

        setRows(candidat);
    }, [isRefresh, isLoading]);

    // les colonnes
    const columns = [
        {field: 'id', headerName: "Id candidat", flex: 1, editable: false},
        {field: 'numeroInscription', headerName: "N° Inscription", flex: 1, editable: false},
        {field: 'nom', headerName: 'Nom', flex: 1, editable: false},
        {field: 'prenoms', headerName: 'Prénoms', flex: 1, editable: false},
        {field: 'date_naissance', headerName: 'Date de naissance', flex: 1, editable: false, renderCell: (params => {
            return formatDate(params.value)
        })},
        {field: 'sexe', headerName: 'Sexe', flex: 1, editable: false},
        {field: 'isApte', headerName: 'status', width: 90, editable: false,
            renderCell: (params) => {
                return params.value ? <Chip color="info" label="Apte" /> : <Chip color='warning' label="inapte" />
            }
        },
        {field: 'actions', headerName: 'Actions', flex: 1, editable: false,
            renderCell: (params) => {

                // pour le bouton supprimer
                const handleDelete = () => {
                    console.log('supp', params);
                    setSelectId(params.id);
                    setOpenConfirm(true)
                }

                // pour le bouton modifier
                const handleEdit = () => {
                    console.log('edit', params);
                    setSelectId(params.id)
                    const date_naissance = new Date(params.row.date_naissance);
                    console.log(date_naissance.toDateString());
                    setInitialData({
                        numeroInscription: params.row.numeroInscription,
                        nom: params.row.nom,
                        prenoms: params.row.prenoms,
                        date_naissance: formatDate(params.row.date_naissance),
                        sexe: params.row.sexe,
                        isApte: params.row.isApte
                    })
                    setOpenEdit(true)
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
            <EditCandidat 
                open={openEdit}
                handleClose={() => setOpenEdit(false)}
                data={initialData}
                link={`/candidats/${selectId}`}
            />

            <DialogConfrim
                title={`SUPPRESSION DU CANDIDAT ID : ${selectId}`}
                open={openConfirm}
                handleClose={() => setOpenConfirm(false)}
                link={`/candidats/${selectId}`}
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

export default ListCandidat;

import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    DialogContentText
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import UseUpdate from '../../MyHooks/useUpdate';
import { useBackDrop } from '../../context/useBack';
import axios from 'axios';

const EditChoix = ({ open, handleClose, data, link }) => {
    const { handleUpdate } = UseUpdate(link);
    const { handleOpenBackDrop, handleCloseBackDrop } = useBackDrop();

    // obtenirs les candidats et les sports
    const [candidat, setCandidat] = React.useState([]);
    const [sport, setSport] = React.useState([]);
    React.useEffect(() => {
        axios.get('/candidats')
                .then(response => {
                    setCandidat(response.data);
                })
                .catch(error => {
                    console.log(error);
                })

        axios.get('/sport')
                .then(response => {
                    setSport(response.data)
                })
                .catch(error => {
                    console.log(error);
                })
    })

    // validation formik ******************************

    const validationSchema = yup.object({
        id_candidat: yup.string().required('Veuillez selectionner le candidat'),
        id_sport: yup.string().required('Veuillez selectionner le sport du candidat'),
    })

    const formik = useFormik({
        initialValues: data,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log('values', values);
            handleOpenBackDrop();
            const response = await handleUpdate(values)
            handleCloseBackDrop();
            console.log(response);
            if(response){
                handleClose();
            }
        },
        enableReinitialize: true
    })

    // fin validation formik ******************************
    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle> Nouveau candidat </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Veuillez ajouter un choix et chaque champ ne doit pas être vide
                </DialogContentText>

                <FormControl fullWidth size="small" margin="dense">
                    <InputLabel id='id_candidat'> Candidat </InputLabel>
                    <Select label="Candidat" labelId='id_candidat' name='id_candidat' fullWidth 
                        value={formik.values.id_candidat} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        error={formik.touched.id_candidat && Boolean(formik.errors.id_candidat)}
                    >
                        {
                            candidat.map(elem => (
                                <MenuItem key={elem.id_candidat} value={elem.id_candidat}> Numéro inscription : {elem.numeroInscription} </MenuItem>
                            ))
                        }
                    </Select>
                    {
                        formik.touched.id_candidat && <FormHelperText sx={{ color: 'error.main' }}> {formik.errors.id_candidat} </FormHelperText>
                    }
                </FormControl>
                

                <FormControl fullWidth size="small" margin='dense'>
                    <InputLabel id='id_sport'> Sport </InputLabel>
                    <Select label="Sport" labelId='id_sport' name='id_sport' fullWidth 
                        value={formik.values.id_sport} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        error={formik.touched.id_sport && Boolean(formik.errors.id_sport)}
                    >
                        {
                            sport.map(elem => (
                                <MenuItem key={elem.id_sport} value={elem.id_sport}> {elem.nom_sport} </MenuItem>
                            ))
                        }
                    </Select>
                    {
                        formik.touched.id_sport && <FormHelperText sx={{ color: 'error.main' }}> {formik.errors.id_sport} </FormHelperText>
                    }
                </FormControl>

            </DialogContent>

            <DialogActions>
                <Button color="error" variant="contained" size="small" onClick={handleClose} >Fermer</Button>
                <Button color="primary" variant="contained" size="small" onClick={formik.handleSubmit} >modifier</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditChoix;

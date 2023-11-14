import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import UseUpdate from '../../MyHooks/useUpdate';
import { useBackDrop } from '../../context/useBack';
import axios from 'axios';

const EditTerrain = ({ open, handleClose, data, link }) => {
    const { handleUpdate } = UseUpdate(link);
    const { handleOpenBackDrop, handleCloseBackDrop } = useBackDrop();

    // obtenir les centres
    const [ centre, setCentre ] = React.useState([]);
    React.useEffect(() => {
        axios.get('/centre')
                .then(response => {
                    setCentre(response.data)
                })
                .catch(error => {
                    console.log(error);
                })
    }, []);

    // validation formik ******************************

    const validationSchema = yup.object({
        nom_terrain: yup.string().required('Le nom du terrain est obligatoire'),
        id_centre: yup.string().required('Veuillez selection un centre'),
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

                <TextField name="nom_terrain" type="text" label="Nom du terrain" fullWidth size="small" sx={{ marginTop: 2 }} 
                    value={formik.values.nom_terrain}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.nom_terrain && Boolean(formik.errors.nom_terrain)}
                    helperText={formik.touched.nom_terrain && formik.errors.nom_terrain}
                />

                <FormControl fullWidth size="small" sx={{ marginTop: 2 }}>
                    <InputLabel id='id_centre'> Centre </InputLabel>
                    <Select label="Centre" labelId='id_centre' name='id_centre' fullWidth 
                        value={formik.values.id_centre} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        error={formik.touched.id_centre && Boolean(formik.errors.id_centre)}
                    >
                    {
                        centre.map(elem => (
                            <MenuItem key={elem.id_centre} value={elem.id_centre}> { elem.lieu } </MenuItem>
                        ))
                    }
                    </Select>
                    {
                        formik.touched.id_centre && <FormHelperText sx={{ color: 'error.main' }}> {formik.errors.id_centre} </FormHelperText>
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

export default EditTerrain;

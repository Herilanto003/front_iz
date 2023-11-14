import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import UseUpdate from '../../MyHooks/useUpdate';
import { useBackDrop } from '../../context/useBack';

const EditSport = ({ open, handleClose, data, link }) => {
    const { handleUpdate } = UseUpdate(link);
    const { handleOpenBackDrop, handleCloseBackDrop } = useBackDrop();

    console.log("mofi", data);

    // validation formik ******************************

    const validationSchema = yup.object({
        nom_sport: yup.string().required('Le nom du sport est obligatoire'),
        type: yup.string(),
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

                <TextField name="nom_sport" type="text" label="Numero du sport" fullWidth size="small" sx={{ marginTop: 2 }} 
                    value={formik.values.nom_sport}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.nom_sport && Boolean(formik.errors.nom_sport)}
                    helperText={formik.touched.nom_sport && formik.errors.nom_sport}
                />

                <FormControl fullWidth size="small" sx={{ marginTop: 2 }}>
                    <RadioGroup row name='type' 
                        value={formik.values.type}
                        onChange={formik.handleChange}
                    >
                        <FormControlLabel control={<Radio value={"INDIVIDUEL"} />} label="INDIVIDUEL" />
                        <FormControlLabel control={<Radio value={"COLLECTIF"} />} label="COLLECTIF" />
                        <FormControlLabel control={<Radio value={"COURSE_FOND"} />} label="COURSE_FOND" />
                    </RadioGroup>
                </FormControl>

            </DialogContent>

            <DialogActions>
                <Button color="error" variant="contained" size="small" onClick={handleClose} >Fermer</Button>
                <Button color="primary" variant="contained" size="small" onClick={formik.handleSubmit} >Ajouter</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditSport;

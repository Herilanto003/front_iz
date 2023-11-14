import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Button,
    TextField
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FaPlus } from 'react-icons/fa';
import UsePost from '../../MyHooks/usePost';
import { useBackDrop } from '../../context/useBack';

const AddExaminateur = ({ open, handleClose }) => {
    const { handlePost } = UsePost('/centre');
    const { handleOpenBackDrop, handleCloseBackDrop } = useBackDrop();
    // DEBUT FORMIK
    const initialValues = {
        nom_examinateur: '' 
    };
    const validationSchema = yup.object({
        nom_examinateur: yup.string().required('Veuillez entrer le nom de l\'éxaminateur')
    });
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log('valus', values);
            handleOpenBackDrop();
            await handlePost(values)
            handleCloseBackDrop();
            formik.handleReset();
        },
        onReset: () => {
            console.log('RESET');
            handleClose();
        }
    })
    // FIN FORMIK

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle sx={{ display: 'flex', alignItems: "center", gap: 2 }}> <FaPlus /> Nouveau examinateur </DialogTitle>

            <DialogContent>
                <TextField name='nom_examinateur' label="Nom de l' examinateur" type='text' fullWidth sx={{ marginY: 2 }} variant='standard'
                    value={formik.values.nom_examinateur}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.nom_examinateur && Boolean(formik.errors.nom_examinateur)}
                    helperText={formik.touched.nom_examinateur && formik.errors.nom_examinateur}
                />
            </DialogContent>

            <DialogActions>
                <Button variant='contained' color='error' size='small' onClick={formik.handleReset} > fermer </Button>
                <Button variant='contained' color='primary' autoFocus size='small' onClick={formik.handleSubmit} > enregistrer </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddExaminateur;

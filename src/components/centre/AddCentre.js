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

const AddCentre = ({ open, handleClose }) => {
    const { handlePost } = UsePost('/centre');
    const { handleOpenBackDrop, handleCloseBackDrop } = useBackDrop();

    // DEBUT FORMIK
    const initialValues = {
        lieu: ''
    };
    const validationSchema = yup.object({
        lieu: yup.string().required('Veuillez entrer le lieu du centre')
    });
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log('valus', values);
            handleOpenBackDrop();
            const response = await handlePost(values)
            handleCloseBackDrop();
            console.log(response);
            if(response){
                formik.handleReset();
            }
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
            <DialogTitle sx={{ display: 'flex', alignItems: "center", gap: 2 }}> <FaPlus /> Nouveau centre </DialogTitle>

            <DialogContent>
                <TextField name='lieu' label="Lieu" type='text' fullWidth sx={{ marginY: 2 }} variant='standard'
                    value={formik.values.lieu}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lieu && Boolean(formik.errors.lieu)}
                    helperText={formik.touched.lieu && formik.errors.lieu}
                />
            </DialogContent>

            <DialogActions>
                <Button variant='contained' color='error' size='small' onClick={formik.handleReset} > fermer </Button>
                <Button variant='contained' color='primary' autoFocus size='small' onClick={formik.handleSubmit} > enregistrer </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddCentre;

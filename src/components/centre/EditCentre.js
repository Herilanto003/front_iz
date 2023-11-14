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
import UseUpdate from '../../MyHooks/useUpdate';
import { useBackDrop } from '../../context/useBack';

const EditCentre = ({ open, handleClose, data, link }) => {
    const { handleUpdate } = UseUpdate(link);
    const { handleOpenBackDrop, handleCloseBackDrop } = useBackDrop();

    // DEBUT FORMIK
    const validationSchema = yup.object({
        lieu: yup.string().required('Veuillez entrer le lieu du centre')
    });
    const formik = useFormik({
        initialValues: data,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log('valus', values);
            handleOpenBackDrop();
            const response = await handleUpdate(values)
            handleCloseBackDrop();
            if(response){
                handleClose();
            }
        },
        enableReinitialize: true
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
                <Button variant='contained' color='error' size='small' onClick={handleClose} > fermer </Button>
                <Button variant='contained' color='primary' autoFocus size='small' onClick={formik.handleSubmit} > modifier </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditCentre;

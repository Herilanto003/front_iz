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
    Switch,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import UsePost from '../../MyHooks/usePost';
import { useBackDrop } from '../../context/useBack';

const AddCandidat = ({ open, handleClose }) => {
    const { handlePost } = UsePost('/candidats')
    const { handleOpenBackDrop, handleCloseBackDrop } = useBackDrop();

    // validation formik ******************************

    const initialValues = {
        numeroInscription: '',
        nom: '',
        prenoms: '',
        date_naissance: '',
        sexe: 'HOMME',
        isApte: true
    }

    const validationSchema = yup.object({
        numeroInscription: yup.string().required('Le numero d\'inscription est obligatoire'),
        nom: yup.string().required('Le nom est obligatoire'),
        prenoms: yup.string(),
        date_naissance: yup.date().required('La date de naissance est obligatoire'),
        sexe: yup.string().required('Choisissez son sexe'),
        isApte: yup.boolean()
    })

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const date_naissance = new Date(values.date_naissance)
            const data = {
                numeroInscription: parseInt(values.numeroInscription),
                nom: values.nom,
                prenoms: values.prenoms,
                date_naissance: date_naissance.toISOString(),
                isApte: values.isApte,
                sexe: values.sexe
            }
            console.log(data);
            console.log('values', values);
            handleOpenBackDrop();
            await handlePost(data)
            handleCloseBackDrop();
            formik.handleReset();
        },
        onReset: () => {
            console.log("RESET");
            handleClose();
        }
    })

    // fin validation formik ******************************

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle> Nouveau candidat </DialogTitle>

            <DialogContent>

                <TextField name="numeroInscription" type="number" label="Numero d'inscription" fullWidth size="small" sx={{ marginTop: 2 }} 
                    InputProps={{ inputMode: 'numeric' }}
                    value={formik.values.numeroInscription}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.numeroInscription && Boolean(formik.errors.numeroInscription)}
                    helperText={formik.touched.numeroInscription && formik.errors.numeroInscription}
                />

                <TextField name="nom" type="text" label="Nom du candidat" fullWidth size="small" sx={{ marginTop: 2 }}
                    value={formik.values.nom}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.nom && Boolean(formik.errors.nom)}
                    helperText={formik.touched.nom && formik.errors.nom}
                />

                <TextField name="prenoms" type="text" label="Prénoms du candidat" fullWidth size="small" sx={{ marginTop: 2 }}
                    value={formik.values.prenoms}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.prenoms && Boolean(formik.errors.prenoms)}
                    helperText={formik.touched.prenoms && formik.errors.prenoms}
                />

                <TextField name="date_naissance" type="date" label="Date de naissance du candidat" fullWidth size="small" sx={{ marginTop: 2 }} InputLabelProps={{ shrink: true }}
                    value={formik.values.date_naissance}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.date_naissance && Boolean(formik.errors.date_naissance)}
                    helperText={formik.touched.date_naissance && formik.errors.date_naissance}
                />

                <FormControl fullWidth size="small" sx={{ marginTop: 2 }}>
                    <RadioGroup row name='sexe' 
                        value={formik.values.sexe}
                        onChange={formik.handleChange}
                    >
                        <FormControlLabel control={<Radio value={"HOMME"} />} label="HOMME" />
                        <FormControlLabel control={<Radio value={"FILLE"} />} label="FILLE" />
                    </RadioGroup>
                </FormControl>

                <FormControl fullWidth size="small" sx={{ marginTop: 2 }}>
                    <FormControlLabel control={<Switch checked={formik.values.isApte} onChange={formik.handleChange} name='isApte' />} label="est-il apte ?" />
                </FormControl>

            </DialogContent>

            <DialogActions>
                <Button color="error" variant="contained" size="small" onClick={formik.handleReset} >Fermer</Button>
                <Button color="primary" variant="contained" size="small" onClick={formik.handleSubmit} >Ajouter</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddCandidat;

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
    DialogContentText,
    TextField
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import UsePost from '../../MyHooks/usePost';
import { useBackDrop } from '../../context/useBack';
import axios from 'axios';

const AddGroup = ({ open, handleClose }) => {
    const { handlePost } = UsePost('/groupe');
    const { handleOpenBackDrop, handleCloseBackDrop } = useBackDrop();

    // obtenir les examinateurs et les terrains
    const [exam, setExam] = React.useState([]);
    const [terrain, setTerrain] = React.useState([]);

    React.useEffect(() => {
        axios.get('/examinateur')
                .then(response => {
                    setExam(response.data)
                })
                .catch(error => {
                    console.log(error);
                })
        axios.get('/terrain')
                .then(response => {
                    setTerrain(response.data)
                })
                .catch(error => {
                    console.log(error);
                })
    }, [])

    // validation formik ******************************

    const initialValues = {
        id_examinateur: '',
        terrainId: '',
        numero: '',
        date_epreuve: '',
        temps: '',
        heure: ''
    }

    const validationSchema = yup.object({
        id_examinateur: yup.string().required('Veuillez selectionner le terrain'),
        terrainId: yup.string().required('Veuillez selectionner l\'examinateur'),
        numero: yup.number().required('Le numéro est obligatoire'),
        date_epreuve: yup.date().required('La date est obligatoire'),
        heure: yup.string().required('L\'heure est obligatoire'),
        temps: yup.string().required('Le temps et obligatoire')
    })

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log('values', values);
            const date_epreuve = new Date(values.date_epreuve);
            const dataRequest = {
                id_examinateur: values.id_examinateur,
                terrainId: values.terrainId,
                numero: values.numero,
                date_epreuve: date_epreuve.toISOString(),
                temps: values.temps,
                heure: values.heure
            }
            handleOpenBackDrop();
            const response = await handlePost(dataRequest)
            handleCloseBackDrop();
            console.log(response);
            if(response){
                formik.handleReset();
            }
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
                <DialogContentText>
                    Veuillez ajouter un choix et chaque champ ne doit pas être vide
                </DialogContentText>

                <TextField label="Numero" name='numero' type='number' size='small' margin='dense' fullWidth
                    InputProps={{
                        inputMode: 'numeric'
                    }}
                    value={formik.values.numero}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.numero && Boolean(formik.errors.numero)}
                    helperText={formik.touched && formik.errors.numero}
                />

                <TextField label="Date de l'epreuve" name='date_epreuve' type='date' size='small' margin='dense' fullWidth 
                    value={formik.values.date_epreuve}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.date_epreuve && Boolean(formik.errors.date_epreuve)}
                    helperText={formik.touched && formik.errors.date_epreuve}
                    InputLabelProps={{ shrink: true }}
                />

                <TextField label="Heure de l'epreuve" name='heure' type='time' size='small' margin='dense' fullWidth 
                    value={formik.values.heure}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.heure && Boolean(formik.errors.heure)}
                    helperText={formik.touched && formik.errors.heure}
                    InputLabelProps={{ shrink: true }}
                />

                <FormControl fullWidth size="small" margin="dense">
                    <InputLabel id='temps'> Temps </InputLabel>
                    <Select label="Temps" labelId='temps' name='temps' fullWidth 
                        value={formik.values.temps} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        error={formik.touched.temps && Boolean(formik.errors.temps)}
                    >
                        <MenuItem value="MATIN"> MATIN </MenuItem>
                        <MenuItem value="APRES_MIDI"> APRES_MIDI </MenuItem>
                    </Select>
                    {
                        formik.touched.temps && <FormHelperText sx={{ color: 'error.main' }}> {formik.errors.temps} </FormHelperText>
                    }
                </FormControl>

                <FormControl fullWidth size="small" margin="dense">
                    <InputLabel id='id_examinateur'> L' examinateur </InputLabel>
                    <Select label="L' examinateur" labelId='id_examinateur' name='id_examinateur' fullWidth 
                        value={formik.values.id_examinateur} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        error={formik.touched.id_examinateur && Boolean(formik.errors.id_examinateur)}
                    >
                    {
                        exam.map(elem => (
                            <MenuItem key={elem.id_examinateur} value={elem.id_examinateur}> { elem.nom_examinateur } </MenuItem>
                        ))
                    }
                    </Select>
                    {
                        formik.touched.id_examinateur && <FormHelperText sx={{ color: 'error.main' }}> {formik.errors.id_examinateur} </FormHelperText>
                    }
                </FormControl>
                

                <FormControl fullWidth size="small" margin='dense'>
                    <InputLabel id='terrainId'> Le terrain </InputLabel>
                    <Select label="Le terrain" labelId='terrainId' name='terrainId' fullWidth 
                        value={formik.values.terrainId} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        error={formik.touched.terrainId && Boolean(formik.errors.terrainId)}
                    >
                    {
                        terrain.map(elem => (
                            <MenuItem key={elem.id_terrain} value={elem.id_terrain}> { elem.nom_terrain } </MenuItem>
                        ))
                    }
                    </Select>
                    {
                        formik.touched.terrainId && <FormHelperText sx={{ color: 'error.main' }}> {formik.errors.terrainId} </FormHelperText>
                    }
                </FormControl>

            </DialogContent>

            <DialogActions>
                <Button color="error" variant="contained" size="small" onClick={formik.handleReset} >Fermer</Button>
                <Button color="primary" variant="contained" size="small" onClick={formik.handleSubmit} >Ajouter</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddGroup;

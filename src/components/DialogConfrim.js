import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import {toast} from 'react-toastify';
import { useRefresh } from '../context/useRefresh';
import { useBackDrop } from '../context/useBack';

const DialogConfrim = ({ title, open, handleClose, link }) => {

    const { handleRefresh } = useRefresh();

    const { handleOpenBackDrop, handleCloseBackDrop } = useBackDrop();

    const handleDeleteOne = async () => {
        handleOpenBackDrop();
        await axios.delete(link)
                .then(response => {
                    console.log(response.data);
                    toast.success(response.data.message, { theme: 'colored' })
                    handleRefresh();
                    handleClose()
                })
                .catch(error => {
                    console.log(error);
                    toast.error(error.response.data.message, { theme: 'colored' })
                })
        handleCloseBackDrop();
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Suppression définitivement
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color='error' onClick={handleClose}>annuler</Button>
                    <Button onClick={handleDeleteOne} autoFocus>
                        continuer
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default DialogConfrim;

import React from 'react';
import {
    Box,
    Card,
    CardActions,
    Button,
    CardContent
} from '@mui/material';
import { BsPersonWorkspace } from 'react-icons/bs'

const MyCard = ({ title }) => {
    return (
        <Card>
            <CardContent>
                <BsPersonWorkspace />
            </CardContent>

            <CardActions>
                <Button></Button>
            </CardActions>
        </Card>
    );
}

export default MyCard;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Acceuil from './pages/Acceuil';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import Candidats from './pages/Candidats';
import Examinateur from './pages/Examinateur';
import Centre from './pages/Centre';
import Sport from './pages/Sport';
import Terrain from './pages/Terrain';
import Choix from './pages/Choix';
import Group from './pages/Group';
import { Backdrop, CircularProgress } from '@mui/material';
import { useBackDrop } from './context/useBack';
import Dashboard from './pages/Dashboard';

const App = () => {
    const { openBack } = useBackDrop();

    return (
        <Router>
            <Backdrop 
                open={openBack}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}           
            >
                <CircularProgress color='inherit' />
            </Backdrop>
        
            <Routes>
                {/** ROUTE POUR LES LOGIN, SIGNUP ET HOM */}
                <Route path='/' element={<Acceuil />} />
                <Route path='/accueil' element={<Acceuil />} />

                {/** CONNEXION */}
                <Route path='/connexion' element={<Connexion />} />

                {/** INSCRIPTION */}
                <Route path='/inscription' element={<Inscription />} />

                {/** ROUTES FOR USERS REGISTERED */}
                <Route path='/mon-compte/'>
                    {/** routes dashboard */}
                    <Route path='' element={<Dashboard />} />
                    <Route path='tableau-bord' element={<Dashboard />} />
                    {/** route candidats */}
                    <Route path='candidats' element={<Candidats />} />
                    {/** route examinateur */}
                    <Route path='examinateurs' element={<Examinateur />} />
                    {/** route center */}
                    <Route path='centre' element={<Centre />} />
                    {/** route sports */}
                    <Route path='sports' element={<Sport />} />
                    {/** route terrain */}
                    <Route path='terrain' element={<Terrain />} />
                    {/** route choix */}
                    <Route path='choix' element={<Choix />} />
                    {/** route groupes */}
                    <Route path='groupes' element={<Group />} />
                </Route>

            </Routes>
        
        </Router>
    );
}

export default App;

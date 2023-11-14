import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { FaBasketballBall, FaClipboardList, FaDashcube, FaLayerGroup, FaLocationArrow, FaSchool, FaUser } from 'react-icons/fa';

const drawerWidth = 240;


function MyContainer(props) {
    const links = [
        {
            name: "Tableau de bord",
            path: "/mon-compte",
            icon: <FaDashcube />
        },
        {
            name: "Candidats",
            path: "/mon-compte/candidats",
            icon: <FaUser />
        },
        {
            name: "Examinateurs",
            path: "/mon-compte/examinateurs",
            icon: <FaUser />
        },
        {
            name: "Centre",
            path: "/mon-compte/centre",
            icon: <FaSchool />
        },
        {
            name: "Sports",
            path: "/mon-compte/sports",
            icon: <FaBasketballBall />
        },
        {
            name: "Terrain",
            path: "/mon-compte/terrain",
            icon: <FaLocationArrow />
        },
        {
            name: "Choix",
            path: "/mon-compte/choix",
            icon: <FaClipboardList />
        },
        {
            name: "Groupes",
            path: "/mon-compte/groupes",
            icon: <FaLayerGroup />
        }
    ]
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
                <List>
                    {links.map((elem, index) => (
                        <Link key={index} to={elem.path} style={{ textDecoration: 'none', color: 'black' }}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {elem.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={elem.name} sx={{ marginLeft: -2 }} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}
                </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton>
                    <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
        </div>
    );

    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
            position="fixed"
            sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            }}
        >
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                
            </IconButton>
            <Typography variant="h6" noWrap component="div">
                Responsive drawer
            </Typography>
            </Toolbar>
        </AppBar>
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            >
            {drawer}
            </Drawer>
            <Drawer
            variant="permanent"
            sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
            >
            {drawer}
            </Drawer>
        </Box>
        <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
            <Toolbar />
            {props.children}
        </Box>
        </Box>
  );
}

MyContainer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default MyContainer;
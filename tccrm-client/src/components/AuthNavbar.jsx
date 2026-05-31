import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../auth/authContext';

const AuthNavbar = ({ onMenuClick}) => {
    const { logout, isAuthed } = useAuth();
    const nav = useNavigate();

    return (
        <AppBar
            position='static'
            elevation={0}
        >
            <Toolbar
                sx={{
                    gap: 2,
                }}
            >
                <Typography
                    variant='h2'
                    sx={{
                        flexGrow: 1,
                    }}
                >
                    Toll Collection CRM
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Button
                        color='inherit'
                        component={ Link }
                        to='/agent_dashboard'
                    >
                        Dashboard
                    </Button>
                    <Button
                        color='inherit'
                        component={ Link }
                        to='/new_contact'
                    >
                        New Contact
                    </Button>
                    <Button
                        color='inherit'
                    >
                        Customer Contacts
                    </Button>
                    { isAuthed && (
                        <Button
                            color='inherit'
                            onClick={ () => {
                                logout();
                                nav('/');
                            }}
                        >
                            Logout
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default AuthNavbar;
import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const UnauthNavbar = ({ onMenuClick}) => {
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
                        to='/'
                    >
                        Login
                    </Button>
                    <Button
                        color='inherit'
                        component={ Link }
                        to='/reset_password'
                    >
                        Reset Password
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default UnauthNavbar;
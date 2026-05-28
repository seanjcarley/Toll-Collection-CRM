import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { useAuth } from '../auth/authContext';
import { Link, useNavigate } from "react-router-dom";

export default function AgentDashboardPage() {
    const { logout, isAuthed } = useAuth();
    const nav = useNavigate();
    return(
        <>
            <Typography
                variant='h2'
                align='center'
                color='primary'
                sx={{
                    mt: 2,
                }}
            >
                Agent Dashboard
            </Typography>
            <Button
                variant='contained'
                color='primary'
                sx={{
                    my: 1,
                }}
                onClick={() => {
                    logout();
                    nav('/');
                }}
            >
                Logout
            </Button>
        </>
    )
}
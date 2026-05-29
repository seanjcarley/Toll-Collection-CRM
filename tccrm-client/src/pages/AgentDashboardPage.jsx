import React, { useState, useEffect } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useAuth } from '../auth/authContext';
import { apiFetch } from "../api/client";
import { Link, useNavigate } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar";

export default function AgentDashboardPage() {
    const { logout, isAuthed } = useAuth();
    const nav = useNavigate();

    // setting variables for error msgs ,loading sate etc...
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // variable for agent details
    const [agentDetails, setAgentDetails] = useState([]);

    // set the token and id variables
    const token = localStorage.getItem('token');
    const agentId = localStorage.getItem('id')

    // get agent details
    useEffect (() => {
        async function fetchAgentDetails(e) {
            // console.log('In fetchAgentDetails!');
            setError('');
            setLoading(true);

            try {
                const payload = {
                    id: agentId,
                }
                // console.log(payload);
                const data = await apiFetch('/api/auth/agent_details', {
                    method: 'POST',
                    auth: true,
                    body: payload
                });
                setAgentDetails(data.results[0][0]);
            } catch (err) {
                setError(err.message || 'Failed to retrieve agent details!')
            } finally {
                setLoading(false);
            }
        }
        fetchAgentDetails();
    }, []);

    if (loading) return <Box sx={{ textAlign: 'center', mt: 10,  }} >
        <CircularProgress />
    </Box>

    return(
        <>
            <AuthNavbar onMenuClick={ () => StereoPannerNode(true) }/>
            <Typography
                variant='h2'
                align='center'
                color='secondary'
                sx={{
                    mt: 2,
                }}
            >
                Agent Dashboard
            </Typography>
            <Typography
                variant="h4"
                align="center"
                color="secondary"
                sx={{
                    mt:2,
                }}
            >
                Hello {agentDetails.FIRSTNAME} {agentDetails.SURNAME}
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
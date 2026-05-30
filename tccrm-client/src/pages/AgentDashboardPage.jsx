import React, { useState, useEffect } from "react";
import { Box, Button, Card, CircularProgress, Container, Grid, Paper, 
    Typography } from "@mui/material";
import { useAuth } from '../auth/authContext';
import { apiFetch } from "../api/client";
import { Link, useNavigate } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function AgentDashboardPage() {
    const { logout, isAuthed } = useAuth();
    const nav = useNavigate();

    // setting variables for error msgs ,loading sate etc...
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // variable for agent details
    const [agentDetails, setAgentDetails] = useState([]);
    const [agentStats, setAgentStats] = useState([]);
    const [globalStats, setGlobalStats] = useState([]);

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
            
        async function fetchGlobalStats(e) {
            setError('');
            setLoading(true);

            try {
                const data = await apiFetch('/api/contacts/fetch_global', {
                    method: 'POST',
                    auth: true,
                });
                // console.log(data.results);
                setGlobalStats(data.results);
            } catch (err) {
                setError(err.message || 'Failed to retrieve global stats!');
            } finally {
                setLoading(false);
            }
        }
        fetchGlobalStats();

        async function fetchAgentStats(e) {
            setError('');
            setLoading(true);

            try {
                const payload = {
                    id: agentId,
                }

                const data = await apiFetch('/api/contacts/fetch_agent', {
                    method: 'POST',
                    auth: true,
                    body: payload,
                });
                console.log(data.results);
                setAgentStats(data.results);
            } catch (err) {
                setError(err.message || 'Failed to retrieve global stats!');
            } finally {
                setLoading(false);
            }
        }
        fetchAgentStats();
    }, []);

    if (loading) return <Box sx={{ textAlign: 'center', mt: 10,  }} >
        <CircularProgress />
    </Box>

    return(
        <>
            <AuthNavbar onMenuClick={ () => StereoPannerNode(true) }/>
            <Box
                align='center'
                sx={{
                    width: '100%',
                    mt: 2,
                    placeItems: 'center',
                    mx: 'auto'
                }}
            >
                <Paper
                    sx={{
                        p: 5,
                    }}
                >
                    <Typography
                        variant='h4'
                        align='center'
                        color='secondary'
                        sx={{
                            mt: 1,
                        }}
                    >
                        Agent Dashboard
                    </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        color="secondary"
                        sx={{
                            mt:2,
                        }}
                    >
                        Hello {agentDetails.FIRSTNAME} {agentDetails.SURNAME}
                    </Typography>
                </Paper>
            </Box>
            <Grid
                container
                spacing={1}
                sx={{
                    mt: 2,
                }}
            >
                <Grid size={{xs: 12, sm:6}}>
                    <Card
                        align='center'
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                            height: '100%',
                            alignItems: 'center',
                        }}
                    >
                        <TableContainer
                            component={Paper}
                            sx={{
                                width: '90%',
                                m: 1,
                            }}
                            key='crd1_table_container'
                        >
                            <Table key='crd1_table'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell 
                                            colSpan={4}
                                            align='center'
                                            sx={{
                                                py: 1
                                            }}
                                        >
                                            <Typography 
                                                variant='h5'
                                                sx = {{
                                                    mt: 1,
                                                }}
                                            >
                                                Global Stats
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                            <TableCell>
                                                <Typography
                                                    variant='body1'
                                                    align='center'
                                                >
                                                    Status
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant='body1'
                                                    align='center'
                                                >
                                                    Contact Channel
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant='body1'
                                                    align='center'
                                                >
                                                    Events Assigned
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant='body1'
                                                    align='center'
                                                >
                                                    Events Unassigned
                                                </Typography>
                                            </TableCell>
                                    </TableRow>
                                    {globalStats.map((stats) => (
                                        <TableRow>
                                            <TableCell>
                                                <Typography
                                                    variant='body2'
                                                    align='center'
                                                >
                                                    {stats.Status}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant='body2'
                                                    align='center'
                                                >
                                                    {stats.ActivityChannel}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant='body2'
                                                    align='center'
                                                >
                                                    {stats.Assigned}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant='body2'
                                                    align='center'
                                                >
                                                    {stats.Unassigned}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Grid>
                <Grid size={{xs: 12, sm:6}}>
                    <Card
                        align='center'
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                            height: '100%',
                            alignItems: 'center',
                        }}
                    >
                        <TableContainer
                            component={Paper}
                            sx={{
                                width: '90%',
                                m: 1,
                            }}
                            key='crd1_table_container'
                        >
                            <Table key='crd1_table'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell 
                                            colSpan={4}
                                            align='center'
                                            sx={{
                                                py: 1
                                            }}
                                        >
                                            <Typography 
                                                variant='h5'
                                                sx = {{
                                                    mt: 1,
                                                }}
                                            >
                                                {agentDetails.FIRSTNAME} {agentDetails.SURNAME}'s Stats
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Typography
                                                variant='body1'
                                                align='center'
                                            >
                                                Status
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                variant='body1'
                                                align='center'
                                            >
                                                Contact Channel
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                variant='body1'
                                                align='center'
                                            >
                                                Events Assigned
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    {agentStats.map((stats) => (
                                        <TableRow>
                                            <TableCell>
                                                <Typography
                                                    variant='body1'
                                                    align='center'
                                                >
                                                    {stats.Status}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant='body1'
                                                    align='center'
                                                >
                                                    {stats.ActivityChannel}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant='body1'
                                                    align='center'
                                                >
                                                    {stats.Assigned}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box>
                            <Button>
                                Go to List
                            </Button>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}
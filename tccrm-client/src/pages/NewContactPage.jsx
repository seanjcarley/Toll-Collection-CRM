import React, { useState, useEffect} from "react";
import { Box, Button, Card, CircularProgress, Container, Grid, MenuItem, 
    Paper, Stack, Select, TextareaAutosize, TextField, 
    Typography } from "@mui/material";
import { useAuth } from '../auth/authContext';
import { apiFetch } from "../api/client";
import { Link, useNavigate } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar";

export default function NewContactPage() {
    const { logout, isAuthed } = useAuth();
    const nav = useNavigate();

    // setting variables for error msgs ,loading state etc...
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState();

    // set the token and id variables
    const token = localStorage.getItem('token');
    const agentId = localStorage.getItem('id');

    //variables
    const [contactChannels, setContactChannels] = useState([]);
    const [channel, setChannel] = useState('');

    const handleSelectChange = (e) => {
        setChannel(e.target.value);
    };

    useEffect (() => {
            async function fetchContactChannels(e) {
                setError('');
                setLoading(true);
    
                try {
                    const data = await apiFetch('/api/contacts/fetch_channels', {
                        method: 'POST',
                        auth: true,
                    });
                    // console.log(data.results)
                    setContactChannels(data.results);
                } catch (err) {
                    setError(err.message || 'Failed to retrieve channel details!')
                } finally {
                    setLoading(false);
                }
            }
            fetchContactChannels();
            // console.log(contactChannels);
        }, []);

    async function onSubmit (e) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // console.log('Username: ',username)
            // console.log('Password: ',password)
            await login(username, password);
            nav(``);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <Box sx={{ textAlign: 'center', mt: 10,  }} >
        <CircularProgress />
    </Box>

    return (
        <>
            <AuthNavbar onMenuClick={ () => setOpen(true) }/>
            <Box
                align='center'
                sx={{
                    width: '100%',
                    mt: 2,
                    placeItems: 'center',
                    mx: 'auto',
                }}
            >
                <Paper
                    sx={{
                        p: 5
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
                        New Customer Contact
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
                        <Stack
                            component='form'
                            spacing={1}
                            onSubmit={ onSubmit }
                            sx={{
                                m: 2,
                            }}
                        >
                            <Typography
                                variant='h5'
                                align='left'
                                color='primary'
                                sx={{
                                    mt: 2,
                                }}
                            >
                                Customer Information:
                            </Typography>
                            <TextField
                                fullWidth
                                sx={{
                                    mt: 3,
                                }}
                                label='Email Address'
                                required
                            />
                            <TextField
                                fullWidth
                                sx={{
                                    mt: 3,
                                }}
                                label='Phone Number'
                            />
                            <TextField
                                fullWidth
                                sx={{
                                    mt: 3,
                                }}
                                label='First Name'
                            />
                            <TextField
                                fullWidth
                                sx={{
                                    mt: 3,
                                }}
                                label='Surname'
                            />
                            <Typography
                                variant='h5'
                                align='left'
                                color='primary'
                                sx={{
                                    mt: 2,
                                }}
                            >
                                Vehicle Registration Number:
                            </Typography>
                            <TextField
                                fullWidth
                                sx={{
                                    mt: 3,
                                }}
                                label='Vehicle Registration Number'
                                required
                            />
                            <Button
                                id="vehicle-search-btn"
                                variant="contained"
                                color="primary"
                            >
                                Check Vehicle Details
                            </Button>
                        </Stack>
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
                        <Box
                            sx={{
                                width: '90%',
                            }}
                        >
                            <Typography
                                variant='h5'
                                align='left'
                                color='primary'
                                sx={{
                                    mt: 2,
                                }}
                            >
                                Customer's Query:
                            </Typography>
                            <TextareaAutosize
                                minRows={8}
                                maxRows={20}
                                defaultValue="Enter the details relating to the customer's query"
                                style={{width: '80%'}}
                            />
                            <Select
                                label='Channel'
                                onChange={handleSelectChange}
                                sx={{
                                    width: '80%',
                                    mt: 2,
                                }}
                            >
                                {contactChannels.map((channels) => (
                                    <MenuItem value={channels.MEDADATADESC}>
                                        {channels.MEDADATADESC}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};
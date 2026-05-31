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
    const [email,setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [fname, setFname] = useState('');
    const [surname, setSurname] = useState('');
    const [vrn, setVrn] = useState('');
    const [query, setQuery] = useState('');

    // get the list of contact channels
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

    // set the list of contact channels
    const handleSelectChange = (e) => {
        setChannel(e.target.value);
    };

    async function submitContact (e) {
        // e.preventDefault();
        setError('');
        setLoading(true);

        try {
            console.log(email);
            console.log(vrn);
            console.log(channel);
            
            if (email !== '' && vrn !== '' && channel !== 'select') {
                const payload = {
                    email: email,
                    phone: phone,
                    fname: fname,
                    surname: surname,
                    vrn: vrn,
                    query: query,
                    channel: channel,
                    id: agentId,
                }
                console.log(payload);
                await apiFetch('/api/contacts/submit_contact', {
                    method: 'POST',
                    auth: true,
                    body: payload,
                })
            }
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
                                onChange={ e => setEmail(e.target.value) }
                            />
                            <TextField
                                fullWidth
                                sx={{
                                    mt: 3,
                                }}
                                label='Phone Number'
                                onChange={ e => setPhone(e.target.value) }
                            />
                            <TextField
                                fullWidth
                                sx={{
                                    mt: 3,
                                }}
                                label='First Name'
                                onChange={ e => setFname(e.target.value) }
                            />
                            <TextField
                                fullWidth
                                sx={{
                                    mt: 3,
                                }}
                                label='Surname'
                                onChange={ e => setSurname(e.target.value) }
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
                                onChange={ e => setVrn(e.target.value) }
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
                                onChange={ e => setQuery(e.target.value) }
                            />
                            <br/>
                            <TextField
                                select
                                label='Channel'
                                style={{width: '80%'}}
                                onChange={handleSelectChange}
                                defaultValue={'select'}
                                align='left'
                                sx={{
                                    mt:2,
                                }}
                                helperText='Please select the method of contact'
                            >
                                <MenuItem key='select' value={'select'}>
                                    Select
                                </MenuItem>
                                {contactChannels.map((channels) => (
                                    <MenuItem key={channels.MEDADATADESC} value={channels.MEDADATADESC}>
                                        {channels.MEDADATADESC}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        <Button
                                variant="contained"
                                color="secondary"
                                sx={{
                                    m: 2,
                                }}
                                onClick={submitContact}
                            >
                                Add Contact
                            </Button>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};
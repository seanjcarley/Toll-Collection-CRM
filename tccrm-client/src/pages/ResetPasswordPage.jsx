import React, { useState } from "react";
import { Alert, Button, Container, Paper, Stack, TextField, 
    Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext"
import { apiFetch } from "../api/client"
import UnauthNavbar from "../components/UnauthNavbar";
import Validator from "validator";

export default function ResetPasswordPage() {
    const { logout } = useAuth();
    const nav = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const id = localStorage.getItem('id');
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');

    async function onSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try{
            if (confirmPassword === Password) {
                const payload = {
                    password: password,
                    id: id,
                }

                await apiFetch('/api/auth/reset_password', {
                    method: 'POST',
                    body: payload,
                })

                await logout();
                nav('/');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <UnauthNavbar />
            
            <Container
                maxWidth='md'
                sx={{
                    mx: 'auto',
                    mt: 10,
                }}
                align='center'
            >
                <Paper
                    sx={{
                        p: 5,
                    }}
                >
                    <Typography
                        variant='h3'
                        align='canter'
                        color='primary'
                        sx={{
                            mt: 2,
                        }}
                    >
                        Reset Password
                    </Typography>
                    <Typography
                        variant="caption"
                        align="center"
                        color="secondary"
                        sx={{
                            mt:2,
                        }}
                    >
                        Enter your new password below.
                    </Typography>

                    { error && (
                        <Alert severity='error' sx={{ mt: 2, }}>{error}</Alert>
                    )}

                    <Stack
                        component='form'
                        spacing={2}
                        onSubmit={ onSubmit }
                        sx={{
                            mt: 2,
                        }}
                    >
                        <TextField
                            fullWidth
                            required
                            sx={{
                                mt: 3,
                            }}
                            type='password'
                            label='Password'
                            onChange={ e => setPassword(e.target.value) }
                        />
                        <TextField
                            fullWidth
                            required
                            sx={{
                                mt: 3,
                            }}
                            label='Confirm Password'
                            type='password'
                            onChange={ e => setConfirmPassword(e.target.value) }
                        />
                        <Button
                            variant='contained'
                            color='secondary'
                            sx={{
                                mt: 2,
                            }}
                            type='submit'
                            disabled={ loading }
                        >
                            { loading ? 'Submitting...' : 'Submit'}
                        </Button>
                    </Stack>
                </Paper>
            </Container>
        </>
    );
}
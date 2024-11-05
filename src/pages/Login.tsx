import { Button, Card, CardActions, CardContent, CardHeader, Divider, TextField, Typography } from "@mui/material"
import { FormLayout } from "./FormLayout"
import { useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useSnackbar } from "providers/SnackbarProvider";
export const LoginPage = () => {
    
    const { open, setMessage } = useSnackbar();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const token = queryClient.getQueryData(['userToken']);
        if (token) {
            navigate('/');
            return;
        }

        const response = await fetch('http://localhost:8080/users/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        if (response.status !== 200) {
            const result = await response.json();
            setError(result.message ?? result.details ?? '');
            setMessage(result.message ?? result.details ?? '');
            open();
            return;
        }
        if (!response.ok) {
            setError("서버 오류");
            setMessage("서버 오류");
            open();
            return;
        }

        const result = await response.json();
        queryClient.setQueryData(['userToken'], result.token);
        setMessage(result.message);
        open();
        navigate('/');
    };

    useEffect(() => {
        if (error) {
            setEmail('');
            setPassword('');
        }
    }, [error]);

    return <FormLayout>
        <form onSubmit={handleLogin}>
            <Card sx={{ width: 'min(300px,100vw)' }}>
                <CardHeader title="Login Todo" />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }} >
                    <TextField id="user-id" label="Id" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField id="user-password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {
                        error &&
                        <Typography color="red">{error}</Typography>
                    }
                </CardContent>
                <Divider />
                <CardActions sx={{ display: "flex", flexDirection: 'row', padding: '16px' }}>
                    <Button variant="contained" sx={{ flex: 1 }} onClick={() => navigate('/auth/signup')}>
                        Sign Up
                    </Button>
                    <Button variant="contained" sx={{ flex: 1 }} type="submit">
                        Login
                    </Button>
                </CardActions>
            </Card>
        </form>
    </FormLayout>;
}
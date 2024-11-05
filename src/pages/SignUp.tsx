import { Button, Card, CardActions, CardContent, CardHeader, Divider, TextField, Typography } from "@mui/material"
import { FormLayout } from "./FormLayout"
import { useSignUpForm } from "hooks/useSignUpForm";
import { useSnackbar } from "providers/SnackbarProvider";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "providers/AuthProvider";

export const SignUpPage = () => {
    const { token, setUser } = useAuth();

    const navigate = useNavigate();

    const { setMessage } = useSnackbar();

    if (token) {
        setMessage("성공적으로 로그인 했습니다")
        navigate('/');
    }

    const queryClient = useQueryClient();

    const {
        id,
        setId,
        errorId,
        password,
        setPassword,
        errorPassword,
        confirmPass,
        setConfirmPass,
        errorConfirm,
        disabled
    } = useSignUpForm();

    const handleSignup = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8080/users/create', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: id, password }),
        });

        if (response.status !== 200) {
            const result = await response.json();
            setMessage(result.details);
            return;
        }

        if (!response.ok) {
            setMessage("서버 오류");
            return;
        }

        const result = await response.json();
        queryClient.setQueryData(['userToken'], result.token);
        
        setUser((prev) => ({ ...prev, email: id, token: result.token }));
        
        setMessage(result.message);
        navigate('/');
    };


    return (<FormLayout>
        <form onSubmit={handleSignup}>
            <Card sx={{ width: 'min(300px,100vw)' }}>
                <CardHeader title="Sign Up Todo" />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }} >

                    <TextField id="user-id" label="Id" value={id} onChange={(e) => setId(e.target.value)} />
                    {
                        errorId !== ''
                        && <Typography color="red">{errorId}</Typography>
                    }
                    <TextField id="user-password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {
                        errorPassword !== ''
                        && <Typography color="red">{errorPassword}</Typography>
                    }
                    <TextField id="user-password-confirm" label="Password Confirm" type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
                    {
                        errorConfirm !== ''
                        && <Typography color="red">{errorConfirm}</Typography>
                    }
                </CardContent>
                <Divider />
                <CardActions sx={{ display: "flex", flexDirection: 'row', padding: '16px' }}>
                    <Button variant="contained" sx={{ flex: 1 }} disabled={disabled} type="submit">
                        Sign Up
                    </Button>
                </CardActions>
            </Card>
        </form>
    </FormLayout>)
}
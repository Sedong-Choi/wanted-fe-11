import { Button, Card, CardActions, CardContent, CardHeader, Divider, TextField, Typography } from "@mui/material"
import { FormLayout } from "./FormLayout"
import { useSignUpForm } from "hooks/useSignUpForm";
import { useCallback } from "react";

export const SignUpPage = () => {

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

    const handleSignup = useCallback(async () => {
        if (!disabled) {
            const response = await fetch('http://localhost:8080/users/create', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: id,
                    password: password // todo encrypt
                }),

            });

            const result = await response.json();
            if (result.message === '계정이 성공적으로 생성되었습니다') {
                // TODO use tanstack query persist
                window.localStorage.setItem(`${id}_token`, result.token);
                // TODO open global snakbar and redirect main page
            }
        }
    }, [disabled, id, password]);


    return (<FormLayout>
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
                <Button variant="contained" sx={{ flex: 1 }} disabled={disabled} onClick={handleSignup}>
                    Sign Up
                </Button>
            </CardActions>
        </Card>
    </FormLayout>)
}
import { Button, Card, CardActions, CardContent, CardHeader, Divider, TextField, Typography } from "@mui/material"
import { FormLayout } from "./FormLayout"
import { useSignUp } from "hooks/useSignUp";

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
    } = useSignUp();


   
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
                <Button variant="contained" sx={{ flex: 1 }} disabled={disabled}>
                    Sign Up
                </Button>
            </CardActions>
        </Card>
    </FormLayout>)
}
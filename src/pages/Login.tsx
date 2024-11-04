import { Button, Card, CardActions, CardContent, CardHeader, Divider, TextField } from "@mui/material"
import { FormLayout } from "./FormLayout"

export const LoginPage = () => <FormLayout>
    <Card sx={{ width: 'min(300px,100vw)' }}>
        <CardHeader title="Login Todo" />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }} >
            <TextField id="user-id" label="Id" />
            <TextField id="user-password" label="Password" />
        </CardContent>
        <Divider />
        <CardActions sx={{ display: "flex", flexDirection: 'row', padding: '16px' }}>
            <Button variant="contained" sx={{ flex: 1 }}>
                Sign Up
            </Button>
            <Button variant="contained" sx={{ flex: 1 }}>
                Login
            </Button>
        </CardActions>
    </Card>
</FormLayout>
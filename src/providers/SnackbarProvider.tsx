import { PropsWithChildren } from 'react';
import { createContext, useContext, useState } from "react"
import Snackbar from '@mui/material/Snackbar';
type SnackbarData = {
    open: () => void;
    close?: () => void;
    setMessage: (message: string) => void;
    setDuration: (duration: number) => void;
}
const initSnackbarData = {
    open: () => { },
    setMessage: () => { },
    setDuration: () => { },
    close: () => { }
}

const SnackBarContext = createContext<SnackbarData>(initSnackbarData);

export const SnackbarProvider = ({ children }: PropsWithChildren) => {
    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [duration, setDuration] = useState<number>(3000);



    return <SnackBarContext.Provider value={{
        open: () => setOpen(true),
        close: () => setOpen(false),
        setMessage: (message: string) => setMessage(message),
        setDuration: (duration: number) => setDuration(duration)
    }}>
        {children}
        <Snackbar
            open={open}
            autoHideDuration={duration}
            onClose={() => setOpen(false)}
            message={message}
        // action={action}
        />
    </SnackBarContext.Provider>
}



export const useSnackbar = () => {
    const context = useContext(SnackBarContext);
    if (!context) {
        const error = new Error(`[SnackBarContext]: Provider not found.`);
        throw error;
    }
    return context
} 

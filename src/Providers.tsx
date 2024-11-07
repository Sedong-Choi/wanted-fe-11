import { AuthProvider } from 'providers/AuthProvider';
import { QueryProvider } from './providers/QueryProvider';
import { SnackbarProvider } from './providers/SnackbarProvider';
export const Providers = ({ children }) => {
    return <QueryProvider>
        <SnackbarProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </SnackbarProvider>
    </QueryProvider>
}
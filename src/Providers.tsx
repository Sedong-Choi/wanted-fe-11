import { QueryProvider } from './providers/QueryProvider';
import { SnackbarProvider } from './providers/SnackbarProvider';
export const Providers = ({ children }) => {
    return <QueryProvider>
        <SnackbarProvider>
            {children}
        </SnackbarProvider>
    </QueryProvider>
}
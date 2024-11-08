import { AuthProvider } from "providers/AuthProvider";
import { QueryProvider } from "providers/QueryProvider";
import { SnackbarProvider } from "providers/SnackbarProvider";
import { ReactNode } from "react";
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { routerConfig } from "router";




export function TestProviders({ children }: { children: ReactNode }) {
    const router = createMemoryRouter(routerConfig, {
        initialEntries: ['/']
    })
    return <QueryProvider>
        <SnackbarProvider>
            <AuthProvider>
                <RouterProvider router={router} />
                {children}
            </AuthProvider>
        </SnackbarProvider>
    </QueryProvider>
};

export function clearCache() { }
import { ReactNode } from "react";
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { routerConfig } from "router";

export function Providers({ children }: { children: ReactNode }) {
    const router = createMemoryRouter(routerConfig, {
        initialEntries: ['/']
    })
    return <>
        <RouterProvider router={router} />
        {children}
    </>
};

export function clearCache() { }
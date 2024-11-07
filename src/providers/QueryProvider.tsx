import { QueryClient } from "@tanstack/react-query"
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { ReactNode, useCallback, useMemo } from "react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export const QueryProvider = ({ children }: { children: ReactNode }) => {

    const queryClient = useMemo(() => new QueryClient({
        defaultOptions: {
            queries: {
                gcTime: 1000 * 60 * 60 * 24, // 24 hours
            },
        },
    }), []);

    const persister = createSyncStoragePersister({
        storage: localStorage,
    });

    // localstorage sync 성공시 event 실행
    const handleOnSuccess = useCallback(() => {
        const event = new Event('syncWithLocalStorage');
        dispatchEvent(event);
    }, []);

    return <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
        onSuccess={handleOnSuccess}
    >
        <ReactQueryDevtools initialIsOpen />
        {children}
    </PersistQueryClientProvider>
}
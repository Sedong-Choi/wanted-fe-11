
import { QueryProvider } from '../providers/QueryProvider';
export const Providers = ({ children }) => {
    return <QueryProvider>
        
            {children}
        
    </QueryProvider>
}
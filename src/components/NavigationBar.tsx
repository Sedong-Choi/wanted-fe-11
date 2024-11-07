import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { RouteChildren, routerConfig } from 'router';

export const NavigationBar = () => {

    const routerList: RouteItem[] = useMemo(() => {
        return getRouteItems(routerConfig);
    }, []);

    return <nav style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/">Home</Link>
        <div style={{ display: "flex", gap: '10px' }}>
            {
                routerList.map((router) => router.path !== '/' && <Link to={router.path} >{router.name}</Link>)
            }
        </div>
    </nav>
}


type RouteItem = {
    name: string,
    path: string
}

function getRouteItems(children: RouteChildren[], parentPath?: string): RouteItem[] {
    const paths = [];
    for (const route of children) {
        if (route.children) {
            paths.push(...getRouteItems(route.children, route.path?.replaceAll(/\/+/g, '/')));
        } else {
            const {
                path,
                name,
            } = route;

            paths.push({ path: `${![undefined, '/'].includes(parentPath) ? parentPath + '/' : ''}${path}`, name: name ?? '' })
        }
    }
    return paths;
}
import { useAuth } from 'providers/AuthProvider';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { RouteChildren, routerConfig } from 'router';

export const NavigationBar = () => {
    const { isLogin } = useAuth();
    const routerList: RouteItem[] = useMemo(() => {
        return getRouteItems(isLogin, routerConfig);
    }, [isLogin]);


    const navButtons = useMemo(() => routerList.map((router) => router.path !== '/' && <Link key={router.path} to={router.path} >{router.name}</Link>)
        , [routerList]);
    return <nav style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/">Home</Link>
        <div style={{ display: "flex", gap: '10px' }}>
            {navButtons}
        </div>
    </nav>
}


type RouteItem = {
    name: string,
    path: string
}

function getRouteItems(isLogin: boolean, children: RouteChildren[], parentPath?: string): RouteItem[] {
    const paths = [];
    for (const route of children) {
        if (route.children) {
            paths.push(...getRouteItems(isLogin, route.children, route.path?.replaceAll(/\/+/g, '/')));
        } else {
            const {
                path,
                name,
                protect
            } = route;
            if (isLogin && protect === isLogin) {
                paths.push({ path: `${![undefined, '/'].includes(parentPath) ? parentPath + '/' : ''}${path}`, name: name ?? '' })
            }
            if (!isLogin && protect === undefined) {
                paths.push({ path: `${![undefined, '/'].includes(parentPath) ? parentPath + '/' : ''}${path}`, name: name ?? '' })
            }
        }
    }
    return paths;
}
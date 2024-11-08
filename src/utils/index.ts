import { CustomRouteObject } from "router";

export const routerFilterByAuth = (isLogin: boolean, routerConfig: CustomRouteObject[]): CustomRouteObject[] => {
    const result = [] as CustomRouteObject[];
    for (const route of routerConfig) {
        const updated = { ...route };
        if (route.children) {
            updated.children = routerFilterByAuth(isLogin, route.children) as CustomRouteObject[];
        }
        if (!route.protect || route.protect === isLogin) {
            result.push(updated);
        }
    }
    return result;
}
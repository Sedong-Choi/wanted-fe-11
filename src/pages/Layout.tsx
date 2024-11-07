import { NavigationBar } from "components/NavigationBar"
import { Outlet } from "react-router"

export const Layout = () => {
    return <>
        <NavigationBar />
        <Outlet />
    </>
}
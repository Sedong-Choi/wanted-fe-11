import { Container, CssBaseline } from "@mui/material"
import { Providers } from "Providers"
import { useAuth } from "providers/AuthProvider";
import { useMemo } from "react";
import { RouterProvider } from "react-router"
import { createBrowserRouter } from "react-router-dom";
import { routerConfig } from "router"
import { routerFilterByAuth } from "utils";

function App() {
  const { isLogin } = useAuth();
  const filteredRouter = useMemo(() =>
    routerFilterByAuth(isLogin, routerConfig),
    [isLogin]);
  return <Providers>
    <CssBaseline />
    <Container>
      <RouterProvider router={createBrowserRouter(filteredRouter)} />
    </Container>
  </Providers>
}

export default App

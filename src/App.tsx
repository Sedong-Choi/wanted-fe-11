import { Container, CssBaseline } from "@mui/material"
import { Providers } from "Providers"
import { RouterProvider } from "react-router"
import { createBrowserRouter } from "react-router-dom";
import { routerConfig } from "router"

function App() {
  return <Providers>
    <CssBaseline />
    <Container>
      <RouterProvider router={createBrowserRouter(routerConfig)} />
    </Container>
  </Providers>
}

export default App

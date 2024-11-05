import { Container, CssBaseline } from "@mui/material"
import { Providers } from "Providers"
import { RouterProvider } from "react-router-dom"
import { router } from "router"

function App() {
  return <Providers>
    <CssBaseline />
    <Container>
      <RouterProvider router={router} />
    </Container>
  </Providers>
}

export default App

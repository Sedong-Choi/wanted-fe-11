import Container from '@mui/material/Container/Container';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router';
import { router } from 'router';
import { Providers } from 'Providers';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <CssBaseline />
      <Container>
        <RouterProvider router={router} />
      </Container>
    </Providers>
  </StrictMode>,
)

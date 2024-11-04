import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import { Container } from '@mui/material';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <Container>
      <RouterProvider router={router} />
    </Container>
  </StrictMode>,
)

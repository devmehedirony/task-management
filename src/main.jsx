import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import router from './routes/Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthContext from './Contexts/AuthContext';


const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContext>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
   </AuthContext>
  </StrictMode>,
)

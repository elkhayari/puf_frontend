import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { StyledEngineProvider } from '@mui/material';

import { ContextProvider } from './contexts/ContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextProvider>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </ContextProvider>
);

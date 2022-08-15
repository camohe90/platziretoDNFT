import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';


import App from './components/App';
import { NFTProvider } from './components/NFTContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <NFTProvider>
        <App />
      </NFTProvider>
    </ChakraProvider>
  </React.StrictMode>
);

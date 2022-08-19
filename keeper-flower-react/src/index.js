import React from 'react'
import { createRoot } from 'react-dom/client'

// Components
import App from './App'

const container = document.getElementById('app')
const root = createRoot(container)
root.render(<App />)

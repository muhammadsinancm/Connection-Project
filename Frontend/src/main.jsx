import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextBrowser from './Contect/ContextBrowser.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ContextBrowser>
      <App />
    </ContextBrowser>
  </BrowserRouter>


)

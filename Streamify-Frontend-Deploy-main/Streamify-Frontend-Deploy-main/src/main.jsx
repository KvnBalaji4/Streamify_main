import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Homepage from './pages/Homepage.jsx'
import Navbar from './components/Navbar.jsx'
import SignIn from './components/Signin.jsx'
import MovieCard from './components/MovieCard.jsx'

import LandingPage from './pages/LandingPage.jsx'
import DetailsPage from './pages/DetailsPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* This is for Player Testing Purpose */}
     {/* <MoviePlayer fileId="1RkMo4lluZbyRegO-sgASy_Idwt7Gf2q8" onBack={() => navigate(-1)} />   */}
    
    <App /> 
  </StrictMode>,
)


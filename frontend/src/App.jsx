import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Contacts from './pages/Contacts/Contacts.jsx'
import NotFound from './pages/404_page/NotFound.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Login from './pages/Authentication/Login/Login.jsx'
import Register from './pages/Authentication/Register/Register.jsx'
import RegisterToCompany from './pages/Authentication/RegisterToCompany/RegisterToCompany.jsx'
import { useLocation } from 'react-router-dom'

import Chatbot from './components/Chatbot/Chatbot.jsx'

function Main() {
  const location = useLocation();

  return (
    <>
      <Chatbot />

      {location.pathname !== "/login" && location.pathname !== "/" && location.pathname !== "/registerToCompany" && location.pathname !== "/register" && <Navbar />}
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Login />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/registerToCompany" element={<RegisterToCompany />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <Router>
      <Main />
    </Router>
  )
}

export default App
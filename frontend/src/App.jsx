import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Contacts from './pages/Contacts/Contacts.jsx'
import NotFound from './pages/404_page/NotFound.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Login from './pages/Authentication/Login/Login.jsx'
import { useLocation } from 'react-router-dom'

import Chatbot from './components/Chatbot/Chatbot.jsx'

function Main() {
  const location = useLocation();

  return (
    <>
      <Chatbot />

      {location.pathname !== "/login" && <Navbar />}
      <Routes>
        {/* Authentication */}
        <Route path="/login" element={<Login />} /> 
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
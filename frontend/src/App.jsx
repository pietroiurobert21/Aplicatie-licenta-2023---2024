import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Contacts from './pages/Contacts/Contacts.jsx'
import NotFound from './pages/404_page/NotFound.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Login from './pages/Authentication/Login/Login.jsx'
import Register from './pages/Authentication/Register/Register.jsx'
import RegisterToCompany from './pages/Authentication/RegisterToCompany/RegisterToCompany.jsx'
import Profile from './pages/profile/Profile.jsx'
import Team from './pages/Team/Team.jsx'
import Deals from './pages/Deals/Deals.jsx'
import Tasks from './pages/Tasks/Tasks.jsx'
import Organization from './pages/Organization/Organization.jsx'
import Leads from './pages/Leads/Leads.jsx'
import { useLocation } from 'react-router-dom'

import CheckToken from './middlewares/CheckToken.jsx'
import Chatbot from './components/Chatbot/Chatbot.jsx'
import { useEffect } from 'react';


function Main() {
  const location = useLocation()

  return (
    <>
      <Chatbot />

      {location.pathname !== "/login" && location.pathname !== "/" && location.pathname !== "/registerToCompany" && location.pathname !== "/register" 
        && location.pathname !== "*" && <Navbar />}
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Login />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/registerToCompany" element={<RegisterToCompany />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/team" element={<Team />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <Router>
      <Main />
      {/* <p style={{color:'red'}}> <h1>todo</h1>:  customer satisfaction (model, back, front); update/delete for contacts/leads/customers; delete for deals; tasks page reworked; users/organizations leaderboard  </p> */}
    </Router>
  )
}

export default App
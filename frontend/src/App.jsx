import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Contacts from './pages/Contacts/Contacts.jsx'
import TabsContact from './pages/TabsContacts/TabsContacts.jsx'
import TabsProfile from './pages/TabsProfile/TabsProfile.jsx'

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
import TabsOrganization from './pages/TabsOrganization/TabsOrganization.jsx'
import Leads from './pages/Leads/Leads.jsx'
import { useLocation } from 'react-router-dom'

import CheckToken from './middlewares/CheckToken.jsx'
import ReactSimpleChatbot from './components/ReactSimpleChatbot/ReactSimpleChatbot.jsx'
import { useEffect, useState } from 'react';


function Main() {
  let location = useLocation()

  const navbarPaths = [
    '/dashboard',
    '/contacts',
    '/leads',
    '/profile',
    '/team',
    '/deals',
    '/tasks',
    '/organization',
  ];

  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(()=>{
    setShowNavbar(navbarPaths.includes(location.pathname))
  }, [location])

  return (
    <>  
      { showNavbar && <Navbar/> }
      { showNavbar && <ReactSimpleChatbot/> }
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Login />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/registerToCompany" element={<RegisterToCompany />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contacts" element={<TabsContact />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/profile" element={<TabsProfile />} />
        <Route path="/team" element={<Team />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/organization" element={<TabsOrganization />} />
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
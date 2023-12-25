import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Contacts from './pages/Contacts/Contacts.jsx'
import NotFound from './pages/404_page/NotFound.jsx'
import Navbar from './components/Navbar/Navbar.jsx'

function App() {
  return (
    <>
      <Router>
      <Navbar />

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

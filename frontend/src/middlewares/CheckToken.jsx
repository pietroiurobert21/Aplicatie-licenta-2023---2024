import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toaster } from 'evergreen-ui'

export default function CheckToken() {
    const navigate = useNavigate()
    
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) {
            navigate("/login")
            toaster.danger("You must be logged in to access this page")
        }
    }, [])

    return null
}
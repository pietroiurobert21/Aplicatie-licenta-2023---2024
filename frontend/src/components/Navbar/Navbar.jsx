import { useNavigate } from 'react-router-dom';
import reactLogo from '../../assets/react.svg';
import style from './Navbar.module.css';
import { useEffect } from 'react';
export default function Navbar() {
    const navigate = useNavigate();
    const location = window.location.pathname;

    useEffect(() => {
        const active_li = document.querySelectorAll("li");
        active_li.forEach((li) => {
            if (li.textContent.toLowerCase().trim() === location.trim().substring(1)) {
                li.classList.add(style.active);
            } else {
                li.classList.remove(style.active);
            }
        });
    }, [location]);

    return (
        <>
            <div className={style.navbar}>
                <img src={reactLogo} alt="React Logo" />
                <ul>
                    <li onClick={()=>{navigate('/leads')}}> Leads </li>
                    <li onClick={()=>{navigate('/contacts')}}> Contacts </li>
                    <li onClick={()=>{navigate('/tasks')}}> Tasks </li>
                    <li onClick={()=>{navigate('/reports')}}> Reports </li>
                    <li onClick={()=>{navigate('/dashboard')}}> Dashboard </li>
                    <li onClick={()=>{navigate('/deals')}}> Deals </li>
                </ul>

                <img src="https://avatars.githubusercontent.com/u/81866624?v=4" alt="User" id={style.profile}/>
            </div>
        </>
    )
}
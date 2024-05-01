import { Avatar } from 'evergreen-ui'
import { useNavigate } from 'react-router-dom';
import reactLogo from '../../assets/react.svg';
import style from './Navbar.module.css';
import { useEffect, useState, useRef } from 'react';

import { Popover, Position, Menu, toaster, Button } from 'evergreen-ui' // components
import { UserIcon, LogOutIcon } from 'evergreen-ui' // icons

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import { useToggle } from "@uidotdev/usehooks";

function myFunction() {

}

export default function Navbar() {
    const navigate = useNavigate();
    const location = window.location.pathname;

    const [ userData, setUserData ] = useState({})
    const [ isLoading, setIsLoading ] = useState(true)
    const [ role, setRole ] = useState('')

    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("accessToken")

    const getUserById = async () => {
        const res = await fetch(`http://localhost:3000/users/getUserJWT`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        
        const responseCode = res.status
        if (responseCode === 200) {
            const data = await res.json()
            setUserData(data)
            setIsLoading(false)
        }
    }

    const emptyLocalstorage = () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("userId")
        localStorage.removeItem("organizationId")
        navigate("/")
        toaster.notify("Logged out Successfully", {id:"logout_success"})
    }

    const getEmployeeRole = async () => {
        const res = await fetch(`http://localhost:3000/employees/getEmployeeJWT`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const responseCode = res.status
        if (responseCode === 200) {
            const data = await res.json()
            setRole(data.userOrganization.role)
        }
    }

    useEffect(()=>{
        getUserById()
        getEmployeeRole()
    }, [])

    
    const [ on, toggle ] = useToggle(false);
    
    const divRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (divRef.current && !divRef.current.contains(event.target)) {
            toggle(false);
          }
        };
    
        const handleClickInside = (event) => {
          if (divRef.current && divRef.current.contains(event.target) && event.target.tagName === 'LI') {
            toggle(false);
          }
        };
    
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('click', handleClickInside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
          document.removeEventListener('click', handleClickInside);
        };
      }, [toggle]);
    
    return (
        <>
            <div ref={divRef} className={on ? `${style.navbar} ${style.responsive}` : style.navbar}>
                <div className={style.logoNavbar}>
                    <img src={reactLogo} alt="React Logo" />
                    <p>Node CRM</p>
                </div>
                <ul>
                    <li className={style.icon} onClick={toggle}>
                        <FontAwesomeIcon icon={faBars}/>
                    </li>
                    <li onClick={()=>{navigate('/leads')}}> Leads </li>
                    <li onClick={()=>{navigate('/contacts')}}> Customers </li>
                    <li onClick={()=>{navigate('/tasks')}}> Tasks </li>
                    {/* <li onClick={()=>{navigate('/reports')}}> Reports </li> */}
                    <li onClick={()=>{navigate('/dashboard')}}> Dashboard </li>
                    <li onClick={()=>{navigate('/deals')}}> Deals </li>
                    <li onClick={()=>{navigate('/team')}}> Team </li>
                    {
                        role=='administrator' && <li id={style.organizationLI} onClick={()=>{navigate('/organization')}}> Organization </li>
                    }
                    <li onClick={()=>{navigate('/profile')}} className={style.profile}> Profile </li>
                    <li onClick={()=>{emptyLocalstorage()}} className={style.profile}> Logout </li>
                </ul>


                {
                    isLoading ? <p>loading</p> : (
                
                <Popover position={Position.BOTTOM_LEFT} content={
                    <Menu>
                        <Menu.Group>
                            <Menu.Item icon={UserIcon} onSelect={()=>{navigate('/profile')}}> Profile </Menu.Item>
                            <Menu.Item icon={LogOutIcon} onSelect={()=>{emptyLocalstorage()}}> LogOut </Menu.Item>
                        </Menu.Group>
                    </Menu>
                }>
                    {/* <img src="https://avatars.githubusercontent.com/u/81866624?v=4" alt="User" id={style.profile} 
                        onClick={()=>{navigate('/profile')}}/> */}
                    <Avatar id={style.profile} name={`${userData.user.firstName} ${userData.user.lastName}`} size={35.93} onClick={()=>{navigate('/profile')}}/>


                </Popover>   
                    )}
            </div>
        </>
    )
}
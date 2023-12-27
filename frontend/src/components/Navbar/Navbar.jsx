import { useNavigate } from 'react-router-dom';
import reactLogo from '../../assets/react.svg';
import style from './Navbar.module.css';
import { useEffect } from 'react';

import { Popover, Position, Menu, toaster, Button } from 'evergreen-ui' // components
import { UserIcon, LogOutIcon } from 'evergreen-ui' // icons

export default function Navbar() {
    const navigate = useNavigate();
    const location = window.location.pathname;

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


                <Popover position={Position.BOTTOM_LEFT} content={
                    <Menu>
                        <Menu.Group>
                            <Menu.Item icon={UserIcon} onSelect={()=>{navigate('/profile')}}> Profile </Menu.Item>
                            <Menu.Item icon={LogOutIcon} onSelect={()=>{toaster.notify("LogOut Successful", {duration: 1.5}); navigate("/")}}> LogOut </Menu.Item>
                        </Menu.Group>
                    </Menu>
                }>
                    <img src="https://avatars.githubusercontent.com/u/81866624?v=4" alt="User" id={style.profile} 
                        onClick={()=>{navigate('/profile')}}/>
                 </Popover>   
            </div>
        </>
    )
}
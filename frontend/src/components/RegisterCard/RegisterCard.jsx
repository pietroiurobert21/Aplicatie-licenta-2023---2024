import style from './RegisterCard.module.css';
import { TextInput, Button } from 'evergreen-ui';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Registercard(props) {
    return (
        <>
            <div className={style.card}>
            <h1>Register</h1>
            <TextInput name="text-input-firstname" placeholder="First Name"/>
            <TextInput name="text-input-lastname" placeholder="Last Name"/>
            <TextInput name="text-input-username" placeholder="Username" />
            <TextInput name="text-input-email" placeholder="Email" />
            <TextInput name="text-input-password" type="password" placeholder="Password"/>

            <Button appearance="primary" intent="success" style={{width: "17.5rem", fontSize:"1rem"}}> Next </Button>
            <Button appearance="default" intent="success" style={{width: "17.5rem", fontSize:"1rem"}}
                onClick={props.onClick}> Back </Button>
            </div>
        </>
    )
}
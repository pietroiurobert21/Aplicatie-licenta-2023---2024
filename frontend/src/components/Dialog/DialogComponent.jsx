import { Dialog, TextInputField, Button, toaster, Pane } from 'evergreen-ui' 
import Rating from '@mui/material/Rating';
import { useState } from 'react';

import sendEmail from "../ElasticEmail/ElasticEmail.js"

export default function DialogComponent(props) {

    const profileData = props.data
    const isShown = props.isShown

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        props.setNewContact({ ...props.data, [name]: value });
    };

    return (
        <>
            <Dialog
                    isShown={isShown}
                    title={props.title}
                    onConfirm={()=>{props.handleConfirm(), props.setIsShown(false)}}
                    onCloseComplete={() => props.setIsShown(false)}
                    onCancel={()=> props.setIsShown(false)}
                    shouldCloseOnOverlayClick={false}
                    >
                        <Pane height="90" width="90">
                        <TextInputField
                            label="First name"
                            placeholder="First name"
                            name="firstName"
                            defaultValue={profileData.firstName}
                            onChange={handleInputChange}
                        />
                        <TextInputField
                            label="Last name"
                            placeholder="Last name"
                            name="lastName"
                            defaultValue={profileData.lastName}
                            onChange={handleInputChange}
                        />
                        <TextInputField
                            label="Professional Title"
                            placeholder="Professional title"
                            name="professionalTitle"
                            defaultValue={profileData.professionalTitle}
                            onChange={handleInputChange}
                        />
                        <TextInputField
                            label="Email Address"
                            placeholder="Email address"
                            name="emailAddress"
                            defaultValue={profileData.emailAddress}
                            onChange={handleInputChange}
                        />
                        <TextInputField
                            label="Home Address"
                            placeholder="Home address"
                            name="homeAddress"
                            defaultValue={profileData.homeAddress}
                            onChange={handleInputChange}
                        />
                        <TextInputField
                            label="Phone Number"
                            placeholder="Phone number"
                            name="phoneNumber"
                            defaultValue={profileData.phoneNumber}
                            onChange={handleInputChange}
                        />
                        <TextInputField
                            label="Company Name"
                            placeholder="Company name"
                            name="companyName"
                            defaultValue={profileData.companyName}
                            onChange={handleInputChange}
                        />
                        </Pane>
            </Dialog>
        </>
    )
}
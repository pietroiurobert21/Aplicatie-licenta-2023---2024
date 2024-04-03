import { Dialog, TextInputField, Button, toaster } from 'evergreen-ui' 
import Rating from '@mui/material/Rating';
import { useState } from 'react';

import sendEmail from "../ElasticEmail/ElasticEmail.js"

export default function DialogComponent(props) {

    const profileData = props.data
    const isShown = props.isShown

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        props.setNewContact({ ...props.newContact, [name]: value });
    };

    const handleEmailSender = async (emailAddress, content) => {
        try {
            await sendEmail(emailAddress, "CRMLite Survey", content)
            toaster.success("email sent successfully!")   
        } catch (error) {
            toaster.warning("email could not be sent!")   
        }
    }

    const [ratingValue, setRatingValue] = useState(4)
    return (
        <>
            <Dialog
                    isShown={isShown}
                    title={props.title}
                    onConfirm={()=>{props.handleConfirm(), props.setIsShown(false)}}
                    onCloseComplete={() => props.setIsShown(false)}
                    >

                        <TextInputField
                            label="First name"
                            placeholder="First name"
                            name="firstName"
                            value={profileData.firstName}
                            onChange={handleInputChange}
                        />
                        <TextInputField
                            label="Last name"
                            placeholder="Last name"
                            name="lastName"
                            value={profileData.lastName}
                            onChange={handleInputChange}
                        />
                        <TextInputField
                            label="Professional Title"
                            placeholder="Professional title"
                            name="professionalTitle"
                            value={profileData.professionalTitle}
                            onChange={handleInputChange}
                        />
                        <TextInputField
                            label="Email Address"
                            placeholder="Email address"
                            name="emailAddress"
                            value={profileData.emailAddress}
                            onChange={handleInputChange}
                        />
                        <TextInputField
                            label="Home Address"
                            placeholder="Home address"
                            name="homeAddress"
                            value={profileData.homeAddress}
                            onChange={handleInputChange}
                        />
                        <TextInputField
                            label="Phone Number"
                            placeholder="Phone number"
                            name="phoneNumber"
                            value={profileData.phoneNumber}
                            onChange={handleInputChange}
                        />
                        <TextInputField
                            label="Company Name"
                            placeholder="Company name"
                            name="companyName"
                            value={profileData.companyName}
                            onChange={handleInputChange}
                        />
            </Dialog>
        </>
    )
}
import { ApiClient, EmailsApi } from '@elasticemail/elasticemail-client';

export default function sendEmail(emailAddress, subject, content) {
    return new Promise((resolve, reject) => {
        let defaultClient = ApiClient.instance;
            
        let apikey = defaultClient.authentications['apikey'];
        apikey.apiKey = import.meta.env.VITE_emailApiId
            
        let api = new EmailsApi()

        const emailData = 
        {
            Recipients: 
                emailAddress.map(email => {
                    return {
                        Email: email.emailAddress,
                        Fields: {
                            name: email.firstName
                        }
                    }
                }),            
            Content: {
                Body: [
                    {
                        ContentType: "HTML",
                        Charset: "utf-8",
                        Content: content
                    },
                    {
                        ContentType: "PlainText",
                        Charset: "utf-8",
                        Content: "Mail content."
                    }
                ],
                From: import.meta.env.VITE_fromEmail,
                Subject: subject
            }
        }
                    
        var callback = function(error, data, response) {
            if (error) {
                reject(error);
                console.log(error)
            } else {
                resolve(response)
            }
        };
        
        api.emailsPost(emailData, callback);
    })
}


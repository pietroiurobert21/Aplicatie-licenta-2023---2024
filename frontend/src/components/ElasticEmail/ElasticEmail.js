import { ApiClient, EmailsApi, EmailMessageData, EmailRecipient, BodyPart } from '@elasticemail/elasticemail-client';

export default function sendEmail(emailAddress, subject, content) {
    return new Promise((resolve, reject) => {
        let defaultClient = ApiClient.instance;
            
        let apikey = defaultClient.authentications['apikey'];
        apikey.apiKey = import.meta.env.VITE_emailApiId
            
        let api = new EmailsApi()

        const emailData =  
        !Array.isArray(emailAddress) ?
        {
            Recipients: {
                To: [ 
                    emailAddress 
                ]
            },
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
                From: "resourcewise70@gmail.com",
                Subject: subject
            }
        } :
        {
            Recipients: 
                emailAddress.map(email => {
                    return {
                        Email: email.emailAddress,
                        Fields: {
                            name: email.firstName // You can change this value if needed
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
                From: "resourcewise70@gmail.com",
                Subject: subject
            }
        }
                    
        var callback = function(error, data, response) {
            if (error) {
                reject(error);
            } else {
                resolve(response)
            }
        };
        
        !Array.isArray(emailAddress) ? api.emailsTransactionalPost(emailData, callback) : api.emailsPost(emailData, callback);
    })
}
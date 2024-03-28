import { ApiClient, EmailsApi, EmailMessageData, EmailRecipient, BodyPart } from '@elasticemail/elasticemail-client';

export default function sendEmail(emailAddress, subject, content) {
    return new Promise((resolve, reject) => {
        let defaultClient = ApiClient.instance;
            
        let apikey = defaultClient.authentications['apikey'];
        apikey.apiKey = "1EB808870A7BA065254A9CAC8B7A5E26CF4F6FEABC07CD7EEAD2ACD1D345146C793F62E2D26AC5BCD7320E7C3CD68777"
            
        let api = new EmailsApi()

        const emailData = {
            Recipients: {
                To: [emailAddress]
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
        };
                    
        var callback = function(error, data, response) {
            if (error) {
                reject(error);
            } else {
                resolve(response)
            }
        };
        
        api.emailsTransactionalPost(emailData, callback);
    })
}
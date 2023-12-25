import React, { useEffect } from 'react'
 
const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'
    script.async = true
    document.body.appendChild(script)
 
    script.onload = () => {
      window.botpressWebChat.init({
        botId: '11e2b658-cb75-4ec2-8b3b-a315559f6743',
        hostUrl: 'https://cdn.botpress.cloud/webchat/v1',
        messagingUrl: 'https://messaging.botpress.cloud',
        clientId: '11e2b658-cb75-4ec2-8b3b-a315559f6743',
      })
    }
  }, [])
 
  return <div id="webchat" />
}
 
export default Chatbot
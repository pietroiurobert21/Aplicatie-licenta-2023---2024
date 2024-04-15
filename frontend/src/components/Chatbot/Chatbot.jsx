import React, { useEffect } from 'react'
 
const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'
    script.async = true
    document.body.appendChild(script)
 
    script.onload = () => {
      window.botpressWebChat.init({
        composerPlaceholder: "Chat with CRM Guide",
        botConversationDescription: "Your CRM Guide",
        botId: import.meta.env.VITE_botID,
        hostUrl: "https://cdn.botpress.cloud/webchat/v1",
        messagingUrl: "https://messaging.botpress.cloud",
        clientId: import.meta.env.VITE_clientId,
        webhookId: import.meta.env.VITE_webhookId,
        lazySocket: true,
        themeName: "prism",
        botName: "NodeBot",
        frontendVersion: "v1",
        useSessionStorage: true,
        enableConversationDeletion: true,
        showPoweredBy: true,
        theme: "prism",
        themeColor: "#bea925"
      })
      window.botpressWebChat.mergeConfig({ useSessionStorage: true })
    }
  }, [])
 
  return <div id="botpressWebChat" />
}
 
export default Chatbot


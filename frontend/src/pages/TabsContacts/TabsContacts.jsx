import { Pane, Tablist, Tab, Paragraph } from 'evergreen-ui'
import { useState } from 'react'

import Contacts from '../Contacts/Contacts'
import MarketingCampaigns from "../MarketingCampaigns/MarketingCampaigns.jsx"
import EmailEditor from '../../components/EmailEditor/EmailEditor.jsx'

import style from "./TabsContacts.module.css"

export default function TabsContact() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [tabs] = useState(['Customers list', 'Template editor', 'Marketing campaigns'])
  return (
    <Pane className={style.mainPane}>
      <Tablist paddingTop="2vh" className={style.tablist}>
        {tabs.map((tab, index) => (
          <Tab style={{fontFamily:'inter, sans-serif', fontWeight:'500', fontSize:'0.8rem', height:'2rem'}} className={style.mainTab}
            aria-controls={`panel-${tab}`}
            direction="vertical"
            isSelected={index === selectedIndex}
            key={tab}
            onSelect={() => setSelectedIndex(index)}
          >
            {tab}
          </Tab>
        ))}
      </Tablist>

      <Pane flex="1">
        {tabs.map((tab, index) => (
          <Pane
            aria-labelledby={tab}
            aria-hidden={index !== selectedIndex}
            display={index === selectedIndex ? 'block' : 'none'}
            key={tab}
            role="tabpanel"
          >
            {tab == 'Customers list' && <Contacts/>}
            {tab == 'Template editor' && <EmailEditor/>}
            {tab == 'Marketing campaigns' && <MarketingCampaigns/>}
          </Pane>
        ))}
      </Pane>
    </Pane>
  )
}
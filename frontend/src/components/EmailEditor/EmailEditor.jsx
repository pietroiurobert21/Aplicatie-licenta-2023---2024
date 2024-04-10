import { useEffect, useRef, useState } from 'react';
import EmailEditor from 'react-email-editor';

 //todo move it to components
import EmailTemplates from "../../pages/EmailTemplates/EmailTemplates.jsx"
import { TextInput, toaster } from 'evergreen-ui'

export default function EmailTemplate(props) {
  const [ templateName, setTemplateName ] = useState(props.templateName || '')

  const emailEditorRef = useRef(null);
  const [ shownTemplateId, setShowTemplateId ] = useState(-1)
  const [ shownTemplate, setShowTemplate ] = useState("")

  const exportTemplate = async () => {
    if (templateName != '') {
      emailEditorRef.current.editor.exportHtml((data) => {
        const { design, html } = data;
        saveTemplateToDatabase(design, html)
      });
      toaster.success('Template design saved successfully!')
    } else {
      toaster.warning('Template design name required!')
    }
  };

  const accessToken = localStorage.getItem('accessToken')

  const saveTemplateToDatabase = async (design, html) => { 
    await fetch(`http://localhost:3000/templates`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({design: JSON.stringify(design), name: templateName, html: html, organizationId: organizationId})
    })
  }

  const getTemplateById = async (id) => {
    await fetch(`http://localhost:3000/templates/template/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(data=>data.json())
    .then(data=>{setShowTemplate(data.template.name); setTemplateName(data.template.name);  emailEditorRef.current.editor.loadDesign(JSON.parse(data.template.design))})
  }

  const onLoad = () => {
    // editor instance is created
    // you can load your template here;
    const templateJson = {};
    emailEditorRef.current.editor.loadDesign(templateJson);
  }

  const onReady = () => {
    // editor is ready
    console.log('onReady');
  };

  useEffect(()=>{
    getTemplateById(shownTemplateId)
  }, [shownTemplateId])

  useEffect(()=>{

  }, [templateName])

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <EmailTemplates setShowTemplateId={setShowTemplateId}/>

        <div style={{display:'flex'}}>
          <TextInput name="template-input-name" defaultValue={shownTemplate} placeholder="Template name..." onChange={(e)=>setTemplateName(e.target.value)}/>
          <button onClick={exportTemplate}>
            save design
          </button>
        </div>
      </div>

      
      <EmailEditor
        ref={emailEditorRef}
        onLoad={onLoad}
        onReady={onReady}
      />
    </div>
  );
};
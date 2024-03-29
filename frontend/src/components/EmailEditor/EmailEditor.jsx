import { useRef, useState } from 'react';
import EmailEditor from 'react-email-editor';
import { TextInput, toaster } from 'evergreen-ui'

export default function EmailTemplate(props) {
  const [ templateName, setTemplateName ] = useState(props.templateName || '')

  const emailEditorRef = useRef(null);

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
  const organizationId = localStorage.getItem('organizationId')

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

  return (
    <div>
      <div>
        <TextInput name="template-input-name" defaultValue={props.templateName} placeholder="Template name..." onChange={(e)=>setTemplateName(e.target.value)}/>
        <button onClick={exportTemplate}> Save template design </button>
      </div>
      
      <EmailEditor
        ref={emailEditorRef}
        onLoad={onLoad}
        onReady={onReady}
      />
    </div>
  );
};
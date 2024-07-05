import { useEffect, useRef, useState } from 'react';
import EmailEditor from 'react-email-editor';

 //todo move it to components
import EmailTemplates from "../../pages/EmailTemplates/EmailTemplates.jsx"
import { TextInput, toaster, CubeAddIcon, DeleteIcon, SavedIcon } from 'evergreen-ui'
import style from './EmailEditor.module.css'

export default function EmailTemplate(props) {
  const [ templateName, setTemplateName ] = useState(props.templateName || '')

  const emailEditorRef = useRef(null);
  const [ shownTemplateId, setShowTemplateId ] = useState(-1)
  const [ shownTemplate, setShowTemplate ] = useState("")

  const [effect, setEffect] = useState()


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

  const [organizationId, setOrganizationId] = useState(-1)
  const getOrganization = async () => {
    await fetch(`http://localhost:3000/organizations/getByUserIdJWT`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(data=>data.json())
    .then(data=>{
        setOrganizationId(data.organization.id);
    })
}

  const saveTemplateToDatabase = async (design, html) => { 
    await fetch(`http://localhost:3000/templates`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({design: JSON.stringify(design), name: templateName, html: html, organizationId: organizationId})
    })
    setEffect(Math.floor(Math.random()*1000));
  }

  const [templateID, settemplateID] = useState()
  const getTemplateById = async (id) => {
    await fetch(`http://localhost:3000/templates/template/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(data=>data.json())
    .then(data=>{setShowTemplate(data.template.name); settemplateID(data.template.id); setTemplateName(data.template.name);  emailEditorRef.current.editor.loadDesign(JSON.parse(data.template.design))})
  }

  const onLoad = () => {
    // editor instance is created
    // you can load your template here;
    const templateJson = {};
    emailEditorRef.current.editor.loadDesign(templateJson);
  }

  const onReady = () => {
    // editor is ready
  };

  useEffect(()=>{
    getOrganization()
  }, [])

  useEffect(()=>{
    organizationId!=-1 && getTemplateById(shownTemplateId)
  }, [shownTemplateId])


  const deleteTemplate = async () => {
    if (templateID) {
      const res = await fetch(`http://localhost:3000/templates/${templateID}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      })
      if (res.ok) {
        toaster.success("template was successfully deleted");
        settemplateID(null);
        setEffect(Math.floor(Math.random()*1000));
        resetEditor();
      } else {
        toaster.danger("error deleting the template");
      }
    } else {
      toaster.danger("a template has to be selected first!");
    }
  }

  const resetEditor = () => {
    // Clear the editor design
    const design = {"counters":{"u_column":1,"u_row":1},"body":{"id":"hVP3-joaJj","rows":[{"id":"KIsWgQP3Wj","cells":[1],"columns":[{"id":"_E0YnaFqv0","contents":[],"values":{"backgroundColor":"","padding":"0px","border":{},"borderRadius":"0px","_meta":{"htmlID":"u_column_1","htmlClassNames":"u_column"}}}],"values":{"displayCondition":null,"columns":false,"backgroundColor":"","columnsBackgroundColor":"","backgroundImage":{"url":"","fullWidth":true,"repeat":"no-repeat","size":"custom","position":"center","customPosition":["50%","50%"]},"padding":"0px","anchor":"","hideDesktop":false,"_meta":{"htmlID":"u_row_1","htmlClassNames":"u_row"},"selectable":true,"draggable":true,"duplicatable":true,"deletable":true,"hideable":true}}],"headers":[],"footers":[],"values":{"popupPosition":"center","popupWidth":"600px","popupHeight":"auto","borderRadius":"10px","contentAlign":"center","contentVerticalAlign":"center","contentWidth":"500px","fontFamily":{"label":"Arial","value":"arial,helvetica,sans-serif"},"textColor":"#000000","popupBackgroundColor":"#FFFFFF","popupBackgroundImage":{"url":"","fullWidth":true,"repeat":"no-repeat","size":"cover","position":"center"},"popupOverlay_backgroundColor":"rgba(0, 0, 0, 0.1)","popupCloseButton_position":"top-right","popupCloseButton_backgroundColor":"#DDDDDD","popupCloseButton_iconColor":"#000000","popupCloseButton_borderRadius":"0px","popupCloseButton_margin":"0px","popupCloseButton_action":{"name":"close_popup","attrs":{"onClick":"document.querySelector('.u-popup-container').style.display = 'none';"}},"backgroundColor":"#F7F8F9","preheaderText":"","linkStyle":{"body":true,"linkColor":"#0000ee","linkHoverColor":"#0000ee","linkUnderline":true,"linkHoverUnderline":true},"backgroundImage":{"url":"","fullWidth":true,"repeat":"no-repeat","size":"custom","position":"center"},"_meta":{"htmlID":"u_body","htmlClassNames":"u_body"}}},"schemaVersion":16}
    emailEditorRef.current.editor.loadDesign(design);
    setTemplateName(''); // Reset the template name
    setShowTemplate(''); // Reset the shown template
  };
  
  useEffect(()=>{
    
  }, [templateName])

  return (
    <div style={{paddingTop: '2vh', paddingRight: '2vw'}}>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <EmailTemplates setShowTemplateId={setShowTemplateId} effect={effect}/>

        <div style={{display:'flex', gap:'1%',paddingBottom: '2%'}}>
          <TextInput name="template-input-name" defaultValue={shownTemplate} placeholder="Template name..." onChange={(e)=>setTemplateName(e.target.value)}/>
          <button onClick={()=>resetEditor()} id={style.newButton}>
            <CubeAddIcon/>
            new template
          </button>
          <button onClick={exportTemplate} id={style.confirmButton}>
            <SavedIcon/>
            save design
          </button>
          <button id={style.cancelButton} onClick={deleteTemplate}>
            <DeleteIcon/>
            delete design
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
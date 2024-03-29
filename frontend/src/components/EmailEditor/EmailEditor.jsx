import { useRef } from 'react';
import EmailEditor from 'react-email-editor';

export default function EmailTemplate(props) {
  const emailEditorRef = useRef(null);

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log('exportHtml', html);
    });
  };

  const onLoad = () => {
    // editor instance is created
    // you can load your template here;
    // const templateJson = {};
    // emailEditorRef.current.editor.loadDesign(templateJson);
  }

  const onReady = () => {
    // editor is ready
    console.log('onReady');
  };

  return (
    <div>
      <div>
        <button onClick={exportHtml}>Export HTML</button>
      </div>
      
      <EmailEditor
        ref={emailEditorRef}
        onLoad={onLoad}
        onReady={onReady}
      />
    </div>
  );
};
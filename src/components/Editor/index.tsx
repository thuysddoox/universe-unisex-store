import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React from 'react';

const Editor = ({ value, onChange }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      config={{
        cloudServices: {
          tokenUrl: 'https://93930.cke-cs.com/token/dev/an9T2aI24vbZH54x7wkJsrKoMaBNw8dEdDrb?limit=10',
          uploadUrl: 'https://93930.cke-cs.com/easyimage/upload/',
        },
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
};

export default Editor;

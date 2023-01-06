import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { TextArea } from '@ui/input';
import React, { useState, useEffect } from 'react';
const Editor = ({ value, onChange }) => {
  return (
    <CKEditor
      className="min-h-[300px]"
      editor={ClassicEditor}
      data={value}
      config={{
        cloudServices: {
          tokenUrl: 'https://94658.cke-cs.com/token/dev/p74d7yAwphDyu2cHrjEfYZu12uOtcTRkgW6A?limit=10',
          uploadUrl: 'https://94658.cke-cs.com/easyimage/upload/',
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

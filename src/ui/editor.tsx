import { Editor as MyEditor } from '@tinymce/tinymce-react';

interface TextEditorProps {
  value?: string;
  onChange?: (val: string) => void;
  minHeight?: number;
}

export const TextEditor = (props: TextEditorProps) => {
  return (
    <MyEditor
      apiKey="vctuu13ydnk4oz6unmi6uvwhai5esgsl22v2jxnzck8irsro"
      value={props.value}
      init={{
        min_height: props.minHeight || 400,
        menubar: false,
        plugins: [
          'autoresize',
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
        ],
        init_instance_callback: function (editor) {
          var freeTiny = document.querySelector<HTMLElement>(
            '.tox .tox-notification--in'
          );
          if (freeTiny) {
            freeTiny.style.display = 'none';
          }
        },
        file_picker_types: 'file image media',
        file_picker_callback: function (cb, value, meta) {
          var input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.onchange = function () {
            // @ts-ignore
            var file = this.files[0];

            var reader = new FileReader();
            reader.onload = function () {
              var id = 'blobid' + new Date().getTime();
              // @ts-ignore
              var blobCache = tinymce.activeEditor.editorUpload.blobCache;
              // @ts-ignore
              var base64 = reader.result.split(',')[1];
              var blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);

              /* call the callback and populate the Title field with the file name */
              cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
          };

          input.click();
        },
        toolbar:
          'undo redo | formatselect| fontsizeselect | bold italic backcolor | \
            image media | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help',
        content_style:
          'h1,h2,h3,h4,h5,h6 {font-family: "Source Code Variable", sans-serif} body {font-family: "Futura", sans-serif}',
      }}
      onEditorChange={props.onChange}
    />
  );
};

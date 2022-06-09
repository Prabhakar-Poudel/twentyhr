import ReactQuill from 'react-quill'

interface Props {
  value?: string
  placeholder?: string
}

function RichTextView({ value = '', placeholder = '' }: Props) {
  return <ReactQuill theme="snow" modules={{ toolbar: false }} readOnly value={value} placeholder={placeholder} />
}

export default RichTextView

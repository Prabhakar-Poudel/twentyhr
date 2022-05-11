import { MonacoEditorOptions } from 'src/types/editorConfig'

const defaultEditorOptions: MonacoEditorOptions = {
  bracketPairColorization: {
    enabled: true,
  },
  codeLens: false,
  cursorBlinking: 'solid',
  cursorStyle: 'block',
  cursorSmoothCaretAnimation: true,
  fontLigatures: true,
  fontSize: 16,
  fontWeight: 'regular',
  formatOnType: true,
  largeFileOptimizations: false,
  maxTokenizationLineLength: 5000,
  minimap: {
    enabled: false,
  },
  scrollbar: {
    arrowSize: 5,
    horizontalScrollbarSize: 7,
    verticalScrollbarSize: 7,
  },
  smoothScrolling: true,
}

export const SUPPORTED_LANGUAGES = ['javascript', 'typescript', 'ruby', 'python', 'java', 'csharp', 'cpp', 'c', 'go', 'rust', 'scala', 'php', 'haskell', 'pgsql']

export default defaultEditorOptions

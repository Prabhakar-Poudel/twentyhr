import axios from 'axios'
import { SUPPORTED_LANGUAGES } from 'src/config/editorConfig'

interface SwitchOption {
  name: string
  'display-flags': string
  'display-name': string
}
interface CompilerSwitch {
  type: string
  name: string
  'display-name': string
  'display-flags': string
  default: boolean
  options: SwitchOption[]
}
interface CompilerMeta {
  name: string
  version: string
  language: string
  'display-name': string
  templates: string
  'compiler-option-raw': boolean
  'runtime-option-raw': boolean
  'display-compile-command': string
  switches: CompilerSwitch[]
}

const _compilers: Record<string, CompilerMeta> = {}

const initializeCompilers = async () => {
  const compiltersReponse = await axios
    .get<CompilerMeta[]>('https://wandbox.org/api/list.json')
    .then((response) => response.data)

  SUPPORTED_LANGUAGES.forEach((lang) => {
    const compiler = compiltersReponse.find((compiler) => compiler.language.toLowerCase() === lang)
    if (compiler) _compilers[lang] = compiler
  })
}

const getCompiler = async (language: string) => {
  if (!_compilers[language]) {
    await initializeCompilers()
  }
  return _compilers[language]
}

interface WandboxResult {
  status: string
  compiler_output: string
  compiler_error: string
  compiler_message: string
  program_output: string
  program_error: string
  program_message: string
}

export const runCode = async (code: string, language: string) => {
  const compilerMeta = await getCompiler(language)
  const compiler = compilerMeta.name

  return axios
    .post<WandboxResult>('https://wandbox.org/api/compile.json', { code, compiler })
    .then(({ data }) => data.compiler_error || data.program_error || data.program_output)
    .catch(() => '')
}

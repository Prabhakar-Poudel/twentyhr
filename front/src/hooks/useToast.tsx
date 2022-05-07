import { Stack } from '@mui/material'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import { createPortal } from 'react-dom'
import { Toast, ToastProps } from 'src/lib/global-components'

interface ToastProviderProps {
  children: ReactNode
}

type CreateToastParams = Omit<ToastProps, 'id' | 'open'>

interface ToastContextProps {
  toasts: ToastProps[]
  createToast: (params: CreateToastParams) => void
  removeToast: (id: string) => void
}

export const ToastContext = createContext<ToastContextProps>({
  toasts: [],
  createToast: () => {},
  removeToast: () => {}
})

const ToastList = ({ toasts, removeToast }: ToastContextProps) =>
  <Stack spacing={1} className="bottom-2 absolute">
    {toasts.map((toast) => (
      <Toast key={toast.id} {...toast} onClose={removeToast} />
    ))}
  </Stack>

const ToastConsumer = () => (
  <ToastContext.Consumer>
    {(params: ToastContextProps) => createPortal(<ToastList {...params} />, document.body)}
  </ToastContext.Consumer>
)

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const createToast = useCallback((params: CreateToastParams) => {
    setToasts((toasts) => [...toasts, { ...params, id: crypto.randomUUID(), open: true }])
    return toasts
  }, [])

  const removeToast = (toastId: string) =>  setToasts((toasts) => toasts.filter((toast) => toastId !== toast.id))

  const value = useMemo(() => ({ toasts, createToast, removeToast }), [toasts])

  return (
    <ToastContext.Provider value={value}>
      <ToastConsumer />
      {children}
    </ToastContext.Provider>
  )
}

const useToast = () => useContext<ToastContextProps>(ToastContext).createToast

export default useToast

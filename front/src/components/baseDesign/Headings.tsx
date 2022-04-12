import { ReactNode } from 'react'

interface HeadingProps {
  children: ReactNode
}

export const H1 = ({ children, ...props }: HeadingProps) => {
  return (
    <h1 className='font-bold text-gray-900 text-3xl' {...props}>{children}</h1>
  )
}

export const H2 = ({ children, ...props }: HeadingProps) => {
  return (
    <h2 className='font-bold text-gray-900 text-2xl' {...props}>{children}</h2>
  )
}

export const H3 = ({ children, ...props }: HeadingProps) => {
  return (
    <h3 className='font-bold text-gray-900 text-xl' {...props}>{children}</h3>
  )
}

export const H4 = ({ children, ...props }: HeadingProps) => {
  return (
    <h4 className='font-bold text-gray-900 text-lg' {...props}>{children}</h4>
  )
}

export const H5 = ({ children, ...props }: HeadingProps) => {
  return (
    <h5 className='font-bold text-gray-900 text-base' {...props}>{children}</h5>
  )
}

export const H6 = ({ children, ...props }: HeadingProps) => {
  return (
    <h6 className='font-bold text-gray-900 text-sm' {...props}>{children}</h6>
  )
}

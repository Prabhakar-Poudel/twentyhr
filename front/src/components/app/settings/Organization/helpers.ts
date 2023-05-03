import { GridValueGetterParams } from '@mui/x-data-grid'

export const roleGetter = ({ value }: GridValueGetterParams) => value.name || value.email

export const getCellClassName = () => 'focus:!outline-none focus-within:!outline-none cursor-pointer'

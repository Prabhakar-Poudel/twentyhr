import { GridValueGetterParams } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const creatorGetter = ({ value }: GridValueGetterParams) => value.name || value.email

export const absoluteToRelativeTime = ({ value }: GridValueGetterParams) => dayjs(value).fromNow()

export const getCellClassName = () => 'focus:!outline-none focus-within:!outline-none cursor-pointer'

import { GridValueGetterParams } from '@mui/x-data-grid'

export const creatorGetter = ({ row }: GridValueGetterParams) => {
  return row.creator.name || row.creator.email
}

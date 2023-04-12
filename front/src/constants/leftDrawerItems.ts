import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import BusinessIcon from '@mui/icons-material/Business'
import TimelineIcon from '@mui/icons-material/Timeline'
import { ComponentType } from 'react'

export type LeftDrawerItemLabelType = 'account' | 'organization' | 'usage'
interface LeftDrawerItemType {
  label: LeftDrawerItemLabelType
  Icon: ComponentType
  path: string
}

export const leftDraweritems: LeftDrawerItemType[] = [
  { label: 'account', Icon: PersonOutlineIcon, path: '/settings/account' },
  { label: 'organization', Icon: BusinessIcon, path: '/settings/organization' },
  { label: 'usage', Icon: TimelineIcon, path: '/settings/usage' },
]

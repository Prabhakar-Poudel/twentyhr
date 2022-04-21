import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin'
import { useTheme } from '@mui/material/styles'
import PersonIcon from '@mui/icons-material/Person'
import CorporateFareIcon from '@mui/icons-material/CorporateFare'
import Dashboard from 'src/components/admin/dashboard/Dashboard'
import { UserCreate, UserList } from 'src/components/admin/resources/User'
import {
	OrganizationCreate,
	OrganizationList,
} from 'src/components/admin/resources/Organization'
import dataProvider from './dataProvider'

const AdminHome = () => {
	const theme = useTheme()

	return (
		<Admin
			title="THR Admin"
			basename="/admin"
			theme={theme}
			dataProvider={dataProvider}
			dashboard={Dashboard}
		>
			<Resource
				icon={PersonIcon}
				name="users"
				list={UserList}
				create={UserCreate}
			/>
			<Resource
				icon={CorporateFareIcon}
				name="organizations"
				list={OrganizationList}
				create={OrganizationCreate}
			/>
		</Admin>
	)
}

export default AdminHome

import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin'
import { useTheme } from '@mui/material/styles'
import PersonIcon from '@mui/icons-material/Person'
import CorporateFareIcon from '@mui/icons-material/CorporateFare'
import Dashboard from 'src/components/admin/dashboard/Dashboard'
import {
	UserCreate,
	UserEdit,
	UserList,
} from 'src/components/admin/resources/User'
import {
	OrganizationCreate,
	OrganizationEdit,
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
				edit={UserEdit}
			/>
			<Resource
				icon={CorporateFareIcon}
				name="organizations"
				list={OrganizationList}
				create={OrganizationCreate}
				edit={OrganizationEdit}
			/>
		</Admin>
	)
}

export default AdminHome

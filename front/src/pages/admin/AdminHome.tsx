import { Admin, Resource } from 'react-admin'
import { useTheme } from '@mui/material/styles'
import PersonIcon from '@mui/icons-material/Person'
import CorporateFareIcon from '@mui/icons-material/CorporateFare'
import Dashboard from 'src/components/admin/dashboard/Dashboard'
import {
	UserCreate,
	UserEdit,
	UserList,
	UserShow,
} from 'src/components/admin/resources/User'
import {
	OrganizationCreate,
	OrganizationEdit,
	OrganizationList,
	OrganizationShow,
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
				show={UserShow}
			/>
			<Resource
				icon={CorporateFareIcon}
				name="organizations"
				list={OrganizationList}
				create={OrganizationCreate}
				edit={OrganizationEdit}
				show={OrganizationShow}
			/>
		</Admin>
	)
}

export default AdminHome

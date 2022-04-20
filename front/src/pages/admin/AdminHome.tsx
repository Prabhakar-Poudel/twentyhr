import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin'
import { useTheme } from '@mui/material/styles'
import { UserList } from 'src/components/admin/resources/User'
import dataProvider from './dataProvider'

const AdminHome = () => {
	const theme = useTheme()

	return (
		<Admin basename="/admin" theme={theme} dataProvider={dataProvider}>
			<Resource name="accounts" list={UserList} create={EditGuesser} />
			<Resource name="organizations" list={ListGuesser} create={EditGuesser} />
		</Admin>
	)
}

export default AdminHome

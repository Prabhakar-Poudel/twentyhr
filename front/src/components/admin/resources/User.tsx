import { ReferenceField } from 'react-admin'
import { List, Datagrid, TextField, EmailField } from 'react-admin'

export const UserList = () => (
	<List>
		<Datagrid rowClick="edit">
			<TextField source="id" />
			<ReferenceField source="organizationId" reference="organizations">
				<TextField source="id" />
			</ReferenceField>
			<TextField source="firstName" />
			<TextField source="lastName" />
			<EmailField source="email" />
		</Datagrid>
	</List>
)

import {
	AutocompleteInput,
	Create,
	ReferenceField,
	ReferenceInput,
	SimpleForm,
	TextInput,
} from 'react-admin'
import { List, Datagrid, TextField } from 'react-admin'

export const OrganizationList = () => (
	<List>
		<Datagrid rowClick="edit">
			<TextField source="id" />
			<ReferenceField
				label="Account manager"
				source="accountManager"
				reference="users"
			>
				<TextField source="email" />
			</ReferenceField>
			<TextField source="name" />
		</Datagrid>
	</List>
)

export const OrganizationCreate = () => (
	<Create>
		<SimpleForm>
			<TextInput source="name" label="Organization's Name" required />
			<ReferenceInput
				label="Account manager"
				source="accountManagerId"
				reference="users"
			>
				<AutocompleteInput optionText="email" />
			</ReferenceInput>
		</SimpleForm>
	</Create>
)

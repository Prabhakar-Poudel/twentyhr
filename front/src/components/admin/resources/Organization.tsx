import {
	AutocompleteInput,
	Create,
	Edit,
	ReferenceField,
	ReferenceInput,
	SimpleForm,
	TextInput,
	List,
	Datagrid,
	TextField,
} from 'react-admin'

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
				<AutocompleteInput optionText="email" fullWidth />
			</ReferenceInput>
		</SimpleForm>
	</Create>
)

export const OrganizationEdit = () => (
	<Edit>
		<SimpleForm>
			<TextInput source="name" label="Organization's Name" required />
			<ReferenceInput
				label="Account manager"
				source="accountManagerId"
				reference="users"
			>
				<AutocompleteInput optionText="email" fullWidth />
			</ReferenceInput>
		</SimpleForm>
	</Edit>
)

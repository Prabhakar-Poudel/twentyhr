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
	EmailField,
} from 'react-admin'

export const UserList = () => (
	<List>
		<Datagrid rowClick="edit">
			<TextField source="id" />
			<ReferenceField source="organization" reference="organizations">
				<TextField source="id" />
			</ReferenceField>
			<TextField source="firstName" />
			<TextField source="lastName" />
			<EmailField source="email" />
		</Datagrid>
	</List>
)

const organizationOption = ({ name, id }: any) => `${name} - ${id}`

export const UserCreate = () => (
	<Create>
		<SimpleForm>
			<TextInput source="firstName" label="First Name" />
			<TextInput source="lastName" label="Last Name" />
			<TextInput type="email" source="email" label="Email" required />
			<ReferenceInput
				label="Organization"
				source="organizationId"
				reference="organizations"
			>
				<AutocompleteInput optionText={organizationOption} fullWidth />
			</ReferenceInput>
		</SimpleForm>
	</Create>
)

export const UserEdit = () => (
	<Edit>
		<SimpleForm>
			<TextInput source="firstName" label="First Name" />
			<TextInput source="lastName" label="Last Name" />
			<TextInput type="email" source="email" label="Email" required />
			<ReferenceInput
				label="Organization"
				source="organizationId"
				reference="organizations"
			>
				<AutocompleteInput optionText={organizationOption} fullWidth />
			</ReferenceInput>
		</SimpleForm>
	</Edit>
)

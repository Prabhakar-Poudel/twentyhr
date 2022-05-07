import {
	Create,
	Edit,
	SimpleForm,
	TextInput,
	List,
	Show,
	Datagrid,
	TextField,
	SimpleShowLayout,
} from 'react-admin'

export const OrganizationList = () => (
	<List>
		<Datagrid rowClick="edit">
			<TextField source="id" />
			<TextField source="name" />
		</Datagrid>
	</List>
)

export const OrganizationCreate = () => (
	<Create redirect="show">
		<SimpleForm>
			<TextInput source="name" label="Organization's Name" required />
		</SimpleForm>
	</Create>
)

export const OrganizationEdit = () => (
	<Edit redirect="show">
		<SimpleForm>
			<TextInput source="name" label="Organization's Name" required />
		</SimpleForm>
	</Edit>
)

export const OrganizationShow = () => (
	<Show>
		<SimpleShowLayout>
			<TextField label="name" source="name" />
		</SimpleShowLayout>
	</Show>
)

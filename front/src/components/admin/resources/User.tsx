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
  Show,
  SimpleShowLayout,
} from 'react-admin'

export function UserList() {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <ReferenceField source="organization_id" reference="organizations">
          <TextField source="Name" />
        </ReferenceField>
        <TextField source="first_name" />
        <TextField source="last_name" />
        <EmailField source="email" />
      </Datagrid>
    </List>
  )
}

const organizationOption = ({ name, id }: any) => `${name} - ${id}`

export function UserCreate() {
  return (
    <Create redirect="show">
      <SimpleForm>
        <TextInput source="first_name" label="First Name" />
        <TextInput source="last_name" label="Last Name" />
        <TextInput type="email" source="email" label="Email" required />
        <ReferenceInput label="Organization" source="organization_id" reference="organizations">
          <AutocompleteInput optionText={organizationOption} fullWidth />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  )
}

export function UserEdit() {
  return (
    <Edit redirect="show">
      <SimpleForm>
        <TextInput source="first_name" label="First Name" />
        <TextInput source="last_name" label="Last Name" />
        <TextInput type="email" source="email" label="Email" required />
        <ReferenceInput label="Organization" source="organization_id" reference="organizations">
          <AutocompleteInput optionText={organizationOption} fullWidth />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  )
}

export function UserShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="first_name" label="First Name" />
        <TextField source="last_name" label="Last Name" />
        <TextField source="email" label="Email" />
      </SimpleShowLayout>
    </Show>
  )
}

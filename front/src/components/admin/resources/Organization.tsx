import { Create, Edit, SimpleForm, TextInput, List, Show, Datagrid, TextField, SimpleShowLayout } from 'react-admin'

export function OrganizationList() {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
      </Datagrid>
    </List>
  )
}

export function OrganizationCreate() {
  return (
    <Create redirect="show">
      <SimpleForm>
        <TextInput source="name" label="Organization's Name" required />
      </SimpleForm>
    </Create>
  )
}

export function OrganizationEdit() {
  return (
    <Edit redirect="show">
      <SimpleForm>
        <TextInput source="name" label="Organization's Name" required />
      </SimpleForm>
    </Edit>
  )
}

export function OrganizationShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField label="name" source="name" />
      </SimpleShowLayout>
    </Show>
  )
}

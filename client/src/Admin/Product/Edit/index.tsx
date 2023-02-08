import { Edit, ReferenceInput, SimpleForm, TextInput } from "react-admin";

export const ProductEdit = () => (
  <Edit mutationMode="optimistic">
    <SimpleForm>
      <TextInput source="id" disabled label="Id" />
      <TextInput source="name" />
      <TextInput source="description" />
      <TextInput source="size" />
      <TextInput source="price" />
      <TextInput source="show_in_shop" />
      <TextInput source="image" />
    </SimpleForm>
  </Edit>
);

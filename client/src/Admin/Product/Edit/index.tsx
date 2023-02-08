import {
  Edit,
  ReferenceInput,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
} from "react-admin";

const colors = [
  { id: "white", name: "Blanco" },
  { id: "black", name: "Negro" },
];
const show_in_show = [
  { id: "true", name: "Si" },
  { id: "false", name: "No" },
];

export const ProductEdit = () => (
  <Edit mutationMode="optimistic">
    <SimpleForm>
      <TextInput source="id" disabled label="Id" />
      <TextInput source="name" />
      <TextInput source="description" />
      <SelectInput source="color" choices={colors} />
      <TextInput source="size" />
      <NumberInput source="price" />
      <SelectInput source="show_in_show" choices={show_in_show} />
      <TextInput source="image" />
    </SimpleForm>
  </Edit>
);

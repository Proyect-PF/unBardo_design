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

export const ProductEdit = () => (
  <Edit mutationMode="optimistic">
    <SimpleForm>
      <TextInput source="id" disabled label="Id" />
      <TextInput source="name" />
      <TextInput source="description" />
      <SelectInput source="color" choices={colors} />
      <TextInput source="size" />
      <NumberInput source="price" />
      <TextInput source="show_in_shop" />
      <TextInput source="image" />
    </SimpleForm>
  </Edit>
);

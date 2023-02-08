import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  required,
} from "react-admin";

const colors = [
  { id: "white", name: "Blanco" },
  { id: "black", name: "Negro" },
];
const show_in_show = [
  { id: "true", name: "Si" },
  { id: "false", name: "No" },
];

export const ProductCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={[required()]} />
      <TextInput
        source="description"
        multiline={true}
        label="Description"
        validate={[required()]}
        fullWidth
      />
      <SelectInput source="color" choices={colors} validate={[required()]} />
      <TextInput source="size" validate={[required()]} />
      <NumberInput source="price" validate={[required()]} />
      <TextInput source="image" validate={[required()]} />
      <SelectInput
        source="show_in_show"
        choices={show_in_show}
        validate={[required()]}
      />
    </SimpleForm>
  </Create>
);

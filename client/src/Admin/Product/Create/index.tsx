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

export const ProductCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={[required()]} />
      <TextInput
        source="description"
        multiline={true}
        label="Short description"
        validate={[required()]}
        fullWidth
      />
      <SelectInput source="color" choices={colors} />
      <TextInput source="size" validate={[required()]} />
      <NumberInput source="price" validate={[required()]} />
      <TextInput source="image" validate={[required()]} />
      <TextInput source="show_in_shop" validate={[required()]} />
    </SimpleForm>
  </Create>
);

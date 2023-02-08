import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  required,
} from "react-admin";

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
      <TextInput source="size" validate={[required()]} />
      <TextInput source="price" validate={[required()]} />
      <TextInput source="image" validate={[required()]} />
      <TextInput source="show_in_shop" validate={[required()]} />
    </SimpleForm>
  </Create>
);

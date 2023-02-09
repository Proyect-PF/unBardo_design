import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  required,
  ImageInput,
  ImageField,
} from "react-admin";
import CloudinaryInput from "../Inputs/Cloudinary";
import UploadImage from "../Inputs/ImgInput/ImgInput";

const colors = [
  { id: "white", name: "Blanco" },
  { id: "black", name: "Negro" },
];
const show_in_shop = [
  { id: true, name: "Si" },
  { id: false, name: "No" },
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
      <div className="flex gap-12">
        <NumberInput source="S" validate={[required()]} />
        <NumberInput source="M" validate={[required()]} />
        <NumberInput source="L" validate={[required()]} />
        <NumberInput source="XL" validate={[required()]} />
      </div>
      <NumberInput source="price" validate={[required()]} />
      {/* <TextInput source="image" validate={[required()]} /> */}
      <SelectInput
        source="show_in_shop"
        choices={show_in_shop}
        validate={[required()]}
      />
      <UploadImage source="image" label="Subir imagen" />
    </SimpleForm>
  </Create>
);

import {
  Edit,
  ReferenceInput,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
} from "react-admin";
import UploadImage from "../Inputs/ImgInput/ImgInput";

const colors = [
  { id: "white", name: "Blanco" },
  { id: "black", name: "Negro" },
];
const show_in_shop = [
  { id: true, name: "Si" },
  { id: false, name: "No" },
];

export const ProductEdit = () => (
  <Edit mutationMode="optimistic">
    <SimpleForm>
      <TextInput source="id" disabled label="Id" />
      <TextInput source="name" />
      <TextInput source="description" />
      <SelectInput source="color" choices={colors} />
      <div className="flex gap-12">
        <NumberInput source="S" />
        <NumberInput source="M" />
        <NumberInput source="L" />
        <NumberInput source="XL" />
      </div>
      <NumberInput source="price" />
      <SelectInput source="show_in_shop" choices={show_in_shop} />
      <UploadImage source="image" label="images" />
    </SimpleForm>
  </Edit>
);

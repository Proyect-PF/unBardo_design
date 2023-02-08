import {
  List,
  Datagrid,
  TextField,
  ImageField,
  NumberField,
} from "react-admin";

export const ProductList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <TextField source="color" />
      <NumberField source="price" />
      <NumberField source="S" />
      <NumberField source="M" />
      <NumberField source="L" />
      <NumberField source="XL" />
      <TextField source="show_in_shop" />
      <ImageField source="image" />
    </Datagrid>
  </List>
);

import { List, Datagrid, TextField, ImageField } from "react-admin";

export const ProductList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <TextField source="size" />
      <TextField source="show_in_shop" />
      <TextField source="price" />
      <ImageField source="image" />
    </Datagrid>
  </List>
);

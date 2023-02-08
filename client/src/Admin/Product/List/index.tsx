import {
  List,
  Datagrid,
  TextField,
  ImageField,
  NumberField,
} from "react-admin";

import { TableHead, TableRow, TableCell } from "@mui/material";

const DatagridHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell></TableCell>
      <TableCell key="id" className=" border-x">
        Id
      </TableCell>
      <TableCell key="name" className=" border-x">
        Nombre
      </TableCell>
      <TableCell key="description" className=" border-x">
        Descripcion
      </TableCell>
      <TableCell key="color" className=" border-x">
        Color
      </TableCell>
      <TableCell key="price" className=" border-x">
        Precio
      </TableCell>
      <TableCell key="S" className=" border-x">
        Stock S:
      </TableCell>
      <TableCell key="M" className=" border-x">
        Stock M:
      </TableCell>
      <TableCell key="L" className=" border-x">
        Stock L:
      </TableCell>
      <TableCell key="XL" className=" border-x">
        Stock XL:
      </TableCell>
      <TableCell key="show_in_shop" className=" border-x">
        Disponible:
      </TableCell>
      <TableCell key="image" className=" border-x">
        Preview:
      </TableCell>
    </TableRow>
  </TableHead>
);

export const ProductList = () => (
  <List>
    <Datagrid rowClick="edit" header={<DatagridHeader />}>
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

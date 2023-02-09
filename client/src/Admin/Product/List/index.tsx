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
    <TableRow className="text-center ">
      <TableCell></TableCell>
      <TableCell key="id" className="w-8 border-x ">
        Id
      </TableCell>
      <TableCell key="name" className="w-80 border-x">
        Nombre
      </TableCell>
      <TableCell key="description" className="border-x w-96">
        Descripcion
      </TableCell>
      <TableCell key="color" className="w-20 border-x">
        Color
      </TableCell>
      <TableCell key="price" className="w-20 border-x">
        Precio
      </TableCell>
      <TableCell key="S" className="w-20 border-x">
        S
      </TableCell>
      <TableCell key="M" className="w-20 border-x">
        M
      </TableCell>
      <TableCell key="L" className="w-20 border-x">
        L
      </TableCell>
      <TableCell key="XL" className="w-20 border-x">
        XL
      </TableCell>
      <TableCell key="show_in_shop" className=" border-x w-36">
        Disponible
      </TableCell>
      <TableCell key="image" className=" border-x">
        Preview
      </TableCell>
    </TableRow>
  </TableHead>
);

export const ProductList = () => (
  <List pagination={<></>}>
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

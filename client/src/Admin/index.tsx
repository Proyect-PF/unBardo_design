import jsonServerProvider from "ra-data-json-server";
import { Admin, EditGuesser, Resource } from "react-admin";
import { ProductCreate } from "./Product/Create";
import { ProductEdit } from "./Product/Edit";
import { ProductList } from "./Product/List";

const dataProdiver = jsonServerProvider(`http://localhost:3700`);

const AdminPanel = () => (
  <Admin basename="/admin" dataProvider={dataProdiver}>
    <Resource
      name="products"
      list={ProductList}
      edit={ProductEdit}
      create={ProductCreate}
    />
  </Admin>
);

export default AdminPanel;

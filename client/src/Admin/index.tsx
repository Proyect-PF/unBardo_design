import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { ProductList } from "./Product/List";

const dataProdiver = jsonServerProvider("http://localhost:3700");

const AdminPanel = () => (
  <Admin basename="/admin" dataProvider={dataProdiver}>
    <Resource name="products" list={ProductList} />
  </Admin>
);

export default AdminPanel;

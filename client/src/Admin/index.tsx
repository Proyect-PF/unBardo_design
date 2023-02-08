import { Admin, ListGuesser, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";

const dataProdiver = jsonServerProvider("http://localhost:3700/");

const AdminPanel = () => (
  <Admin dataProvider={dataProdiver}>
    <Resource name="products" list={ListGuesser} />
  </Admin>
);

export default AdminPanel;

import { useEffect, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "../../../components/Buttons/Button/Button";
import Input from "../../../components/Inputs/Input";
import { State } from "../../../state/reducers";
import { adminActions } from "../../AdminRedux";

type Props = {
  className: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
};

const ListOrders = ({ className, setSelected, setId }: Props): JSX.Element => {
  const { allOrders, ordersCount } = useSelector((state: State) => state.admin);

  const dispatch = useDispatch();
  const { ADMfetch_orders } = bindActionCreators(adminActions, dispatch);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    search: "",
    status: "",
    dispatched: "",
    order: "",
    sort: "",
  });

  useEffect(() => {
    ADMfetch_orders(
      `search=${query.search}&status=${query.status}&dispatched=${query.dispatched}&page=${query.page}&limit=${query.limit}`
    );
  }, [query]);

  const handlePag = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const button: HTMLButtonElement = event.currentTarget;
    if (button.id === "-" && query.page !== 1)
      setQuery({ ...query, page: query.page - 1 });
    if (button.id === "+" && Math.ceil(ordersCount / query.limit) > query.page)
      setQuery({ ...query, page: query.page + 1 });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setQuery({ ...query, search: search });
  };

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = event.target;
    if (name === "sort") {
      setQuery({
        ...query,
        sort: "id",
        order: value,
      });
    } else {
      setQuery({
        ...query,
        [name]: value,
      });
    }
  };
  return (
    <div>
      <div className="flex flex-col mx-8">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row justify-around gap-8">
            <Input
              id="searchOrderAdmin"
              type="text"
              onChange={handleSearch}
              placeholder="Buscar una orden..."
              name="searchOrderAdmin"
              value={search}
              onBlur={handleSearch}
              className="my-4 w-80"
            />
            <div className="my-auto">
              <select
                className={`inline-flex items-start p-2 pr-4 mb-2 ml-6 text-base border-b border-black h-fit justify-center`}
                id="status"
                name="status"
                onChange={handleFilter}
                value={query.status}
              >
                <option value="" selected>
                  Status
                </option>
                <option value="approved">Aprobadas</option>
                <option value="rejected">Rechadazas</option>
              </select>
            </div>
            <div className="my-auto">
              <select
                className={`inline-flex items-start p-2 pr-4 mb-2 ml-6 text-base border-b border-black h-fit justify-center`}
                id="dispatched"
                name="dispatched"
                onChange={handleFilter}
                value={query.dispatched}
              >
                <option value="" selected>
                  Envio
                </option>
                <option value="true">Despachadas</option>
                <option value="false">Por Despachar</option>
              </select>
            </div>
            {/* <div className="my-auto">
              <select
                className={`inline-flex items-start p-2 pr-4 mb-2 ml-6 text-base border-b border-black h-fit justify-center`}
                id="sort"
                name="sort"
                onChange={handleFilter}
                value={query.order}
              >
                <option value="" selected>
                  Orden
                </option>
                <option value="asc">ID Asc.</option>
                <option value="desc">ID Desc.</option>
              </select>
            </div> */}
            <Button
              text="Limpiar"
              name="clearProdSearchADM"
              onClick={() => {
                setQuery({
                  search: "",
                  status: "",
                  dispatched: "",
                  page: 1,
                  limit: query.limit,
                  order: "",
                  sort: "",
                });
                setSearch("");
              }}
              disabled={false}
              type="button"
              className="justify-center w-32 h-fit"
            />
          </div>
        </form>
        <div className="flex justify-center gap-4 mx-4 text-lg font-bold">
          <div className="flex flex-row gap-2">
            <button
              className="h-fit"
              onClick={handlePag}
              id="-"
              name="-"
            >{`<`}</button>
            <p>{query.page}</p>
            <button
              className="h-fit"
              onClick={handlePag}
              id="+"
              name="+"
            >{`>`}</button>
          </div>
          <select
            className="h-fit"
            id="limit"
            name="limit"
            value={query.limit}
            onChange={handleFilter}
          >
            <option value="10" selected>
              10
            </option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
      <div className={`${className}`}>
        <div className="flex items-center justify-between w-full px-4 text-center border-t">
          <p className="w-12 border-r border-black">Id</p>
          <p className="w-40"> Usuario</p>
          <p className="w-40 ">Fecha</p>
          <p className="w-24 ">Status</p>
          <p className="w-28 ">Despachada</p>
        </div>
        {allOrders &&
          allOrders.map((e) => (
            <div
            key={e.id}
              className="flex items-center justify-between w-full px-4 py-2 text-base font-normal text-center border-t cursor-pointer"
              onClick={() => {
                setId(e.id);
                setSelected("details");
              }}
            >
              <p className="w-12 border-r border-black">{e.id}</p>
              <p className="w-40 ">{e.users.email}</p>
              <p className="w-40 ">{e.updatedAt.split("T")[0]}</p>
              <p className="w-24 ">{e.status}</p>
              <p className="w-28 ">{e.dispatched ? "Si" : "No"}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListOrders;

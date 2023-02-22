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

const ListProducts = ({
  className,
  setSelected,
  setId,
}: Props): JSX.Element => {
  const { allProducts, productCount } = useSelector(
    (state: State) => state.admin
  );
  const dispatch = useDispatch();
  const { ADMfetch_products } = bindActionCreators(adminActions, dispatch);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({
    name: "",
    byShowInShop: "",
    byStock: "",
    page: 1,
    perPage: 10,
  });

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = event.target;
    setQuery({
      ...query,
      [name]: value,
      page: 1,
    });
  };

  const handlePag = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const button: HTMLButtonElement = event.currentTarget;
    if (button.id === "-" && query.page !== 1)
      setQuery({ ...query, page: query.page - 1 });
    if (
      button.id === "+" &&
      Math.ceil(productCount / query.perPage) > query.page
    )
      setQuery({ ...query, page: query.page + 1 });
  };

  useEffect(() => {
    ADMfetch_products(
      `name=${query.name}&filter=${query.byShowInShop}&filter2=${query.byStock}&page=${query.page}&perPage=${query.perPage}`
    );
  }, [query]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setQuery({ ...query, name: search, page: 1 });
  };

  return (
    <div className={`${className} relative`}>
      <div className="flex flex-col justify-center mx-8 mb-2">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-row justify-around">
            <Input
              id="searchProdAdmin"
              type="text"
              onChange={handleChange}
              placeholder="Buscar un producto..."
              name="searchProdAdmin"
              value={search}
              onBlur={() => {}}
              className="my-4 w-60"
            />
            <div className="my-auto">
              <select
                className={`inline-flex items-start p-2 pr-4 mb-2 ml-6 text-base border-b border-black h-fit justify-center`}
                id="byShowInShop"
                name="byShowInShop"
                onChange={handleFilter}
                value={query.byShowInShop}
              >
                <option value="" selected>
                  Todos
                </option>
                <option value="show">Disponibles</option>
                <option value="hidden">Ocultos</option>
              </select>
            </div>
            <div className="my-auto">
              <select
                className={`inline-flex items-start p-2 pr-4 mb-2 ml-6 text-base border-b border-black h-fit justify-center`}
                id="byStock"
                name="byStock"
                value={query.byStock}
                onChange={handleFilter}
              >
                <option value="" selected>
                  Todos
                </option>
                <option value="out">Sin Stock</option>
              </select>
            </div>
            <Button
              text="Limpiar"
              name="clearProdSearchADM"
              onClick={() => {
                setQuery({
                  name: "",
                  byShowInShop: "",
                  byStock: "",
                  page: 1,
                  perPage: 10,
                });
                setSearch("");
              }}
              disabled={false}
              type="button"
              className="justify-center w-32 h-fit"
            />
          </div>
        </form>
        <div className="flex justify-center gap-4 mx-4 mt-4">
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
            id="perPage"
            name="perPage"
            value={query.perPage}
            onChange={handleFilter}
          >
            <option value="10" selected>
              10
            </option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
      <div className="flex items-center justify-between w-full px-4 text-center border-t">
        <p className="w-12 border-r border-black">Id</p>
        <p className="w-40 ">Nombre</p>
        <p className="w-16 ">Precio</p>
        <p className="w-40">Visible en tienda</p>
        <p className="w-8 ">Stock</p>
        <p className="w-20 ">Preview</p>
      </div>
      {allProducts &&
        allProducts.map((e: any) => (
          <div
          key={`${e.id}`}
            className="flex items-center justify-between w-full px-4 text-lg font-normal text-center border-t cursor-pointer"
            onClick={() => {
              setId(e.id);
              setSelected("edit");
            }}
          >
            <p className="w-12 border-r border-black">{e.id}</p>
            <p className="w-40">{e.name}</p>
            <p className="w-16">{"$ " + e.price}</p>
            <p className="w-40">{e.show_in_shop ? "Si" : "No"}</p>
            <p className="w-8">
              {e.S === 0 && e.M === 0 && e.L === 0 ? "No" : "Si"}
            </p>
            <img src={e.image} className="w-20" />
          </div>
        ))}
    </div>
  );
};

export default ListProducts;

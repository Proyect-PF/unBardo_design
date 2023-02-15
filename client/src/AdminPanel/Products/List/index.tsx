import { useEffect, useState } from "react";
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
  const { allProducts } = useSelector((state: State) => state.admin);
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
      Math.ceil(allProducts.length / query.perPage) >= query.page
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
      <div className="flex flex-row justify-between mx-8">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row gap-8 ">
            <Input
              id="searchProdAdmin"
              type="text"
              onChange={handleChange}
              placeholder="Buscar un producto..."
              name="searchProdAdmin"
              value={search}
              onBlur={() => {}}
              className="my-4 w-80"
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
              className="justify-center w-32"
            />
          </div>
        </form>
        <div className="flex justify-center gap-4 mx-4 mt-8">
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
            {/* <option value="2">2</option> */}
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
      <div className="flex items-center justify-around w-full text-center border-t">
        <p className="w-8 border-r border-black">Id</p>
        <p className="w-40 ">Nombre</p>
        <p className="w-16 ">Color</p>
        <p className="w-16 ">Precio</p>
        <p className=" w-28">Mostrar en Web</p>
        <p className="w-8 ">Stock:</p>
        <p className="w-8 ">1</p>
        <p className="w-8 ">2</p>
        <p className="w-8 ">3</p>
        {/* <p className="w-8 ">XL</p> */}
        <p className="w-20 ">Preview</p>
        <p className="w-14"></p>
      </div>
      {allProducts &&
        allProducts.map((e: any) => (
          <div className="flex items-center justify-around w-full text-center border-t">
            <p className="w-8 border-r border-black">{e.id}</p>
            <p className="w-40">{e.name}</p>
            <p className="w-16">{e.color}</p>
            <p className="w-16">{e.price}</p>
            <p className="w-24">{e.show_in_shop ? "Si" : "No"}</p>
            <p className="w-8">
              {e.S === 0 && e.M === 0 && e.L === 0 ? "No" : "Si"}
            </p>
            <p className="w-8">{e.S}</p>
            <p className="w-8">{e.M}</p>
            <p className="w-8">{e.L}</p>
            {/* <p className="w-8">{e.XL}</p> */}
            <img src={e.image} className="w-20" />
            <button
              onClick={() => {
                setId(e.id);
                setSelected("edit");
              }}
              className="py-2 border border-black w-14"
            >
              Edit
            </button>
          </div>
        ))}
    </div>
  );
};

export default ListProducts;

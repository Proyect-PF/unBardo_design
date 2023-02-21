import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import arrow from "../../assets/svg/come-back.svg";
import { actionCreators } from "../../state";
import { fetch_products } from "../../state/action-creators";
import { State } from "../../state/reducers";

const Dropdown = (): JSX.Element => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const { productCount } = useSelector((state: State) => state.products);
  const { fetch_products } = bindActionCreators(actionCreators, dispatch);
  const INITIAL_STATE = {
    byColor: "",
    byOrder: "ASC",
    byPromo: "",
    page: 1,
    perPage: 20,
  };
  const [Query, setQuery] = useState(INITIAL_STATE);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = event.target;
    setQuery({
      ...Query,
      [name]: value,
      page: 1,
    });
  };

  const handleShow = () => {
    show ? setShow(false) : setShow(true);
  };

  const handlePag = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const button: HTMLButtonElement = event.currentTarget;
    if (button.id === "-" && Query.page !== 1)
      setQuery({ ...Query, page: Query.page - 1 });
    if (
      button.id === "+" &&
      Math.ceil(productCount / Query.perPage) > Query.page
    )
      setQuery({ ...Query, page: Query.page + 1 });
  };

  useEffect(() => {
    fetch_products(
      `filter=${Query.byColor}&filter2=${Query.byPromo}&order=${Query.byOrder}&sort=price&page=${Query.page}&perPage=${Query.perPage}`
    );
  }, [Query]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-around">
        <select
          className={`inline-flex items-start p-2 pr-4 mb-2 ml-6 text-base border-b border-black ${
            show ? "visible" : "hidden"
          }`}
          id="byColor"
          name="byColor"
          value={Query.byColor}
          onChange={handleChange}
        >
          <option value="">Todos</option>
          <option value="white">Blanco</option>
          <option value="black">Negro</option>
        </select>
        <select
          className={`inline-flex items-start p-2 pr-4 mb-2 ml-6 text-base border-b border-black ${
            show ? "visible" : "hidden"
          }`}
          id="byPromo"
          name="byPromo"
          value={Query.byPromo}
          onChange={handleChange}
        >
          <option value="">Promos:</option>
          <option value="promo">Activas</option>
        </select>
        <select
          className={`inline-flex items-start p-2 pr-4 mb-2 ml-6 text-base border-b border-black ${
            show ? "visible" : "hidden"
          }`}
          id="byOrder"
          name="byOrder"
          onChange={handleChange}
          value={Query.byOrder}
        >
          <option value="ASC">{"Menor precio"}</option>
          <option value="DESC">{"Mayor precio"}</option>
        </select>
      </div>
      <div
        className={`flex justify-center gap-4 mx-4 mt-4 ${
          show ? "visible" : "hidden"
        }`}
      >
        <div className="flex flex-row gap-2">
          <button
            className="h-fit"
            onClick={handlePag}
            id="-"
            name="-"
          >{`<`}</button>
          <p>{Query.page}</p>
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
          value={Query.perPage}
          onChange={handleChange}
        >
          <option value="10" selected>
            10
          </option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      <img
        src={arrow}
        onClick={handleShow}
        className={`w-3 z-10 ${show ? "rotate-90" : "-rotate-90"}`}
      />
    </div>
  );
};
export default Dropdown;

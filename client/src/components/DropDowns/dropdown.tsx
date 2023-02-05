import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import arrow from "../../assets/svg/come-back.svg";

const Dropdown = (): JSX.Element => {
  const dispatch = useDispatch();
  const { filterProducts, sortProducts } = bindActionCreators(
    actionCreators,
    dispatch
  );
  //AL: states for filter & orders, filter state has to be converted to array when more implemented
  // for combined filters.
  const [filters, setFilters] = useState("");
  const [order, setOrder] = useState("");
  const [show, setShow] = useState(false);

  const handleChangeFilter = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { value } = event.target;
    setFilters(value);
  };

  const handleChangeOrder = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { value } = event.target;
    setOrder(value);
  };

  const handleShow = () => {
    show ? setShow(false) : setShow(true);
  };

  //AL: this useEffect dispatch the actions when detects a change on filters / order
  useEffect(() => {
    if (filters !== "") {
      filterProducts(["filterColor", filters]);
    }
  }, [filters]);

  useEffect(() => {
    if (order !== "") {
      sortProducts(["Price", order]);
    }
  }, [order]);

  return (
    <div className="flex justify-around my-2">
      <select
        className={`inline-flex items-start p-2 pr-4 mb-2 ml-6 text-base border-b border-black ${
          show ? "visible" : "hidden"
        }`}
        id="filt"
        name="filters"
        value={filters}
        onChange={handleChangeFilter}
      >
        <option value="" disabled hidden>
          Color
        </option>
        <option value="all">Todos</option>
        <option value="black">Negro</option>
        <option value="white">Blanco</option>
      </select>
      <select
        className={`inline-flex items-start p-2 pr-4 mb-2 ml-6 text-base border-b border-black ${
          show ? "visible" : "hidden"
        }`}
        id="ord"
        name="order"
        value={order}
        onChange={handleChangeOrder}
      >
        <option value="" disabled hidden>
          Ordenar por
        </option>
        <option value="asc">{"Menor precio"}</option>
        <option value="desc">{"Mayor precio"}</option>
      </select>{" "}
      <img
        src={arrow}
        onClick={handleShow}
        className={`w-3 ${show ? "rotate-90" : "-rotate-90"}`}
      />
    </div>
  );
};

export default Dropdown;

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import arrow from "../../assets/svg/come-back.svg";
import { actionCreators } from "../../state";

interface Query {
  byColor: string,
  byOrder: string,
}

const INITIAL_STATE = {
  byColor: "all",
  byOrder: "DESC",
}

const Dropdown = (): JSX.Element => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [Query, setQuery] = useState(INITIAL_STATE);

  const { action_getFillteredOrderProducts } = bindActionCreators( actionCreators, dispatch)

  const handleChange = ( event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = event.target;
    setQuery({ ...Query, [name]: value });
    action_getFillteredOrderProducts(`byColor=${Query.byColor}&byOrder=${Query.byOrder}`)

  };

  const handleShow = () => {
    show ? setShow(false) : setShow(true);
  };

  //AL: this useEffect dispatch the actions when detects a change on filters / order
  useEffect(() => {
  
  }, []);

  useEffect(() => {
  
  }, []);

  return (
    <div className="flex justify-around my-2">
      <select
        className={`inline-flex items-start p-2 pr-4 mb-2 ml-6 text-base border-b border-black ${
          show ? "visible" : "hidden"
        }`}
        id="filt"
        name="filters"
        value={Query.byColor}
        onChange={handleChange}
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
        value={Query.byOrder}
        onChange={handleChange}
      >
        <option value="all" disabled hidden>
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

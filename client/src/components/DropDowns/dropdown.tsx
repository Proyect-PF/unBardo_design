import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import arrow from "../../assets/svg/come-back.svg";
import { actionCreators } from "../../state";
import { fetch_products } from "../../state/action-creators";

const Dropdown = (): JSX.Element => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const { fetch_products } = bindActionCreators(actionCreators, dispatch);
  const INITIAL_STATE = {
    byColor: "",
    byOrder: "ASC",
  };
  const [Query, setQuery] = useState(INITIAL_STATE);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = event.target;
    setQuery({
      ...Query,
      [name]: value,
    });
  };
  const handleShow = () => {
    show ? setShow(false) : setShow(true);
  };

  useEffect(() => {
    fetch_products(`filter=${Query.byColor}&order=${Query.byOrder}&sort=price`);
  }, [Query]);

  return (
    <div className="flex justify-around my-2">
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
        id="byOrder"
        name="byOrder"
        onChange={handleChange}
        value={Query.byOrder}
      >
        <option value="ASC">{"Menor precio"}</option>
        <option value="DESC">{"Mayor precio"}</option>
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

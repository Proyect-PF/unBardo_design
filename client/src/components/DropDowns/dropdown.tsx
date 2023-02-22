import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import arrow from "../../assets/svg/come-back.svg";
import { actionCreators } from "../../state";
import { State } from "../../state/reducers";
import ButtonSmall from "../Buttons/ButtonSmall/ButtonSmall";

const Dropdown = (): JSX.Element => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const { searchName, byColor, byOrder, byPromo, page, perPage } = useSelector((state: State) => state.products);
  const { fetch_products, fetch_filtered_products, clearFilter} = bindActionCreators(actionCreators, dispatch);


  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = event.target
    fetch_filtered_products({name, value})
  }

  const handleShow = () => {
    show ? setShow(false) : setShow(true);
  };

  useEffect(() => {
    fetch_products(
      `${searchName !== ""? "name=" + searchName: ""}${byColor !== ""? "&filter=" + byColor: ""}${byPromo !== ""? "&filter2=" + byPromo: ""}${byOrder !== ""? "&order=" + byOrder + "&sort=price": ""}&page=${page}&perPage=${perPage}`
    );
  }, [searchName, byColor, byOrder, byPromo, page, perPage]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap gap-2 justify-around">
        <select
          className={`inline-flex items-start p-2 pr-4 mb-2 ml-6 text-base border-b border-black ${
            show ? "visible" : "hidden"
          }`}
          id="byColor"
          name="byColor"
          value={byColor}
          onChange={handleFilter}
        >
          <option value="" hidden>Selecciona color:</option>
          <option value="white">Blanco</option>
          <option value="black">Negro</option>
        </select>
        <select
          className={`inline-flex items-start p-2 pr-4 mb-2 ml-6 text-base border-b border-black ${
            show ? "visible" : "hidden"
          }`}
          id="byPromo"
          name="byPromo"
          value={byPromo}
          onChange={handleFilter}
        >
          <option value="" hidden>Promoción:</option>
          <option value="promo">Activas</option>
        </select>
        <select
          className={`inline-flex items-start p-2 pr-4 mb-2 ml-6 text-base border-b border-black ${
            show ? "visible" : "hidden"
          }`}
          id="byOrder"
          name="byOrder"
          onChange={handleFilter}
          value={byOrder}
        >
          <option value="" hidden>Selecciona precio:</option>
          <option value="ASC">{"Menor precio"}</option>
          <option value="DESC">{"Mayor precio"}</option>
        </select>
      </div>
      <div className={`flex flex-col justify-center gap-4 mx-4 mt-4 ${show? "": "hidden"}`} >
        <ButtonSmall 
        type="button"
        text="Limpiar"
        name="resetfilters"
        onClick={() => {
          clearFilter()
        }}
        disabled={false}
        />
      </div>
      <img
        src={arrow}
        onClick={handleShow}
        className={`w-3 z-10 transition-all duration-300 ease-in-out ${show ? "rotate-90" : "-rotate-90"}`}
        alt="open/close filters"
      />
    </div>
  );
};
export default Dropdown;

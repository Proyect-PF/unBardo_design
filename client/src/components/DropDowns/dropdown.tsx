import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import arrow from "../../assets/svg/come-back.svg";
import { actionCreators } from "../../state";

// interface Query {
//   byColor: string,
//   byOrder: string,
// }



const Dropdown = (): JSX.Element => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  
  
  const { action_getFillteredOrderProducts } = bindActionCreators( actionCreators, dispatch)
      const INITIAL_STATE = {
      byColor: "all",
      byOrder: "asc",
    }
    const [Query, setQuery] = useState(INITIAL_STATE);
  
  const handleChange = ( event: React.ChangeEvent<HTMLSelectElement>): void => {

    const { name, value } = event.target;
    setQuery({ 
        ...Query, 
        [name]: value 
      });
    };
  const handleShow = () => {
    show ? setShow(false) : setShow(true);
  };

  //AL: this useEffect dispatch the actions when detects a change on filters / order
  //Usamos el useeffect para despachar las filtraciones que vienen del estado local desde el handleChange
useEffect(() => {
  action_getFillteredOrderProducts(`byColor=${Query.byColor}&byOrder=${Query.byOrder}`)
}, [Query])


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
        <option value="all">Todos</option>
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
        
        <option value="desc">{"Menor precio"}</option>
        <option value="asc">{"Mayor precio"}</option>
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

import { useEffect, useState } from "react";

interface Props {
  type: string;
}

const Dropdown = ({ type }: Props): JSX.Element => {
  //AL: states for filter & orders, filter state has to be converted to array when more implemented
  // for combined filters.
  const [filters, setFilters] = useState("");
  const [order, setOrder] = useState("");

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

  //AL: this useEffect dispatch the actions when detects a change on filters / order
  useEffect(() => {
    if (filters !== "") {
      console.log(filters);
    }
    if (order !== "") {
      console.log(order);
    }
  }, [order, filters]);

  return (
    <div className="flex-">
      
      <select
            className="inline-flex items-start p-2 pr-4 mb-2 ml-6 text-base "
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
            className="inline-flex items-start p-2 pr-4 mb-2 ml-6 text-base"
            id="ord"
            name="order"
            value={order}
            onChange={handleChangeOrder}
          >
            <option value="" disabled hidden>
              Ordenar por
            </option>
            <option value="priceasc">{"Menor precio"}</option>
            <option value="pricedesc">{"Mayor precio"}</option>
          </select>
       
      
      
         
          
        
      
    </div>
  );
};

export default Dropdown;

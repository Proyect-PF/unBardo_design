import { useState } from "react";

interface Props {
  type: string;
}

const Dropdown = ({ type }: Props): JSX.Element => {
  const [filters, setFilters] = useState([""]);
  const [order, setOrder] = useState("");

  return (
    <div>
      <select></select>
    </div>
  );
};

export default Dropdown;

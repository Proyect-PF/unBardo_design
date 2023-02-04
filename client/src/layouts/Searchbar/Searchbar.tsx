import searchIcon from "../../assets/svg/search.svg";
import comeBack from "../../assets/svg/come-back.svg";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";

interface Props {
  openClose: boolean;
  handleSearch: any;
}

const Searchbar = ({ openClose, handleSearch }: Props) => {
  const dispatch = useDispatch();
  const { searchProducts } = bindActionCreators(actionCreators, dispatch);

  const [input, setInput] = useState("");
  const [output, setOutput] = useState();

  let style: string;
  if (openClose) style = "right-full";
  else {
    style = "";
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    searchProducts(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setInput("");
  };

  return (
    <div className={`flex fixed ${style} bg-white w-full  z-40`}>
      <div className="flex justify-between w-full h-16 border-b border-gray-300">
        <button onClick={handleSearch} className="px-5">
          <img src={comeBack} alt="icono" className="h-5" />
        </button>
        <form onSubmit={handleSubmit} className="flex w-full">
          <input
            onChange={handleChange}
            value={input}
            type="search"
            placeholder="Buscar"
            className="w-full bg-white h-13 focus:outline-0"
          />
          <button type="submit">
            <img src={searchIcon} alt="iconSea" className="h-10 px-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Searchbar;

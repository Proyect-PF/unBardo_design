import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { bindActionCreators } from "redux";
import comeBack from "../../assets/svg/come-back.svg";
import searchIcon from "../../assets/svg/search.svg";
import Dropdown from "../../components/DropDowns/dropdown";
import { actionCreators } from "../../state";

interface Props {
  openClose: boolean;
  handleSearch: any;
}

const Searchbar = ({ openClose, handleSearch }: Props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { fetch_product_byname } = bindActionCreators(actionCreators, dispatch);

  const [input, setInput] = useState("");
  const [showFilter, setShowFilters] = useState(false);

  let style: string;
  if (openClose) style = "right-full";
  else {
    style = "";
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleShowFilters = () => {
    showFilter ? setShowFilters(false) : setShowFilters(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (location.pathname !== "/") navigate("/");
    fetch_product_byname(input);
    handleSearch();
    setInput("");
  };

  return (
    <div
      className={`flex flex-col fixed z-50 top-24 ${style} bg-white w-full  z-40 text-xl border-t`}
    >
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
          <button type="submit" disabled={input === ""}>
            <img src={searchIcon} alt="iconSea" className="h-10 px-5" />
          </button>
          {/*
          <button
            type="button"
            onClick={handleShowFilters}
            className={`px-5 ${!showFilter ? "-rotate-90" : "rotate-90"}`}
          >
            <img src={comeBack} alt="icono" className="h-5" />
        </button>*/}
        </form>
      </div>

      {/*<div
        className={` flex justify-around ${
          !showFilter ? " hidden" : "visible"
        }`}
      >
        <Dropdown type="filter" />
        <Dropdown type="order" />
      </div>*/}
    </div>
  );
};

export default Searchbar;

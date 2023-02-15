import { useState } from "react";
import { getItem } from "../../../utils/localStorage";

interface Props {
  detailId: number;
  selected: string;
  sizes: number[];
  setter: React.Dispatch<React.SetStateAction<string>>;
}

const SizeSelector = ({
  detailId,
  selected,
  sizes,
  setter,
}: Props): JSX.Element => {
  //AL: selected state for visual changes in the component, the value passed
  //to the invoking is manneged by the "setter" function
  const checkoutList = getItem("shoppingBag");

  const sizesStock = (x: number) => {
    if (x === 0) {
      if (checkoutList?.length > 0) {
        let findCard = checkoutList.find((x: any) => x.id === detailId + "-1");
        if (findCard) {
          return sizes[0] - findCard.ammount;
        }
      }
      return sizes[0];
    }
    if (x === 1) {
      if (checkoutList?.length > 0) {
        let findCard = checkoutList.find((x: any) => x.id === detailId + "-2");
        if (findCard) {
          return sizes[1] - findCard.ammount;
        }
      }
      return sizes[1];
    }
    if (x === 2) {
      if (checkoutList?.length > 0) {
        let findCard = checkoutList.find((x: any) => x.id === detailId + "-3");
        if (findCard) {
          return sizes[2] - findCard.ammount;
        }
      }
      return sizes[2];
    }
    if (x === 3) {
      if (checkoutList?.length > 0) {
        let findCard = checkoutList.find((x: any) => x.id === detailId + "-4");
        if (findCard) {
          return sizes[3] - findCard.ammount;
        }
      }
      return sizes[3];
    }
  };

  //AL: this functions manages the selected state & setting the value for the invoking page
  const handleSize = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    setter(button.innerHTML);
  };

  return (
    <div className="flex gap-4 my-4 text-lg font-bold text-center">
      <button
        onClick={handleSize}
        key="sizeS"
        className={`w-8 h-8 border border-black ${
          selected === "1" ? "bg-black text-white" : "bg-white text-black"
        } ${sizesStock(0) === 0 ? " text-gray-400" : ""}`}
        disabled={sizesStock(0) === 0}
      >
        1
      </button>
      <button
        onClick={handleSize}
        key="sizeM"
        className={`w-8 h-8 border border-black ${
          selected === "2" ? "bg-black text-white" : "bg-white text-black"
        } ${sizesStock(1) === 0 ? " text-gray-400" : ""}`}
        disabled={sizesStock(1) === 0}
      >
        2
      </button>
      <button
        onClick={handleSize}
        key="sizeL"
        className={`w-8 h-8 border border-black ${
          selected === "3" ? "bg-black text-white" : "bg-white text-black"
        } ${sizesStock(2) === 0 ? " text-gray-400" : ""}`}
        disabled={sizesStock(2) === 0}
      >
        3
      </button>
      {/* <button
        onClick={handleSize}
        key="sizeXL"
        className={`w-8 h-8 border border-black ${
          selected === "XL" ? "bg-black text-white" : "bg-white text-black"
        } ${sizesStock(3) === 0 ? " text-gray-400" : ""}`}
        disabled={sizesStock(3) === 0}
      >
        XL
      </button> */}
      {/* {sizes &&
        sizes.map((e) => (
          <button
            onClick={handleSize}
            key={sizes.indexOf(e)}
            className={`w-8 h-8 border border-black ${
              selected === e ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            {e}
          </button>
        ))} */}
    </div>
  );
};

export default SizeSelector;

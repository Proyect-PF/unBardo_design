import { useState } from "react";

interface Props {
  sizes: number[];
  setter: React.Dispatch<React.SetStateAction<string>>;
}

const SizeSelector = ({ sizes, setter }: Props): JSX.Element => {
  //AL: selected state for visual changes in the component, the value passed
  //to the invoking is manneged by the "setter" function
  const [selected, setSelected] = useState("");

  //AL: this functions manages the selected state & setting the value for the invoking page
  const handleSize = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    setSelected(button.innerHTML);
    setter(button.innerHTML);
  };

  return (
    <div className="flex gap-4 my-4 text-lg font-bold text-center">
      <button
        onClick={handleSize}
        key="sizeS"
        className={`w-8 h-8 border border-black ${
          selected === "S" ? "bg-black text-white" : "bg-white text-black"
        } ${sizes[0] === 0 ? " text-gray-400" : ""}`}
        disabled={sizes[0] === 0}
      >
        S
      </button>
      <button
        onClick={handleSize}
        key="sizeM"
        className={`w-8 h-8 border border-black ${
          selected === "M" ? "bg-black text-white" : "bg-white text-black"
        } ${sizes[1] === 0 ? " text-gray-400" : ""}`}
        disabled={sizes[1] === 0}
      >
        M
      </button>
      <button
        onClick={handleSize}
        key="sizeL"
        className={`w-8 h-8 border border-black ${
          selected === "L" ? "bg-black text-white" : "bg-white text-black"
        } ${sizes[2] === 0 ? " text-gray-400" : ""}`}
        disabled={sizes[2] === 0}
      >
        L
      </button>
      <button
        onClick={handleSize}
        key="sizeXL"
        className={`w-8 h-8 border border-black ${
          selected === "XL" ? "bg-black text-white" : "bg-white text-black"
        } ${sizes[3] === 0 ? " text-gray-400" : ""}`}
        disabled={sizes[3] === 0}
      >
        XL
      </button>
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

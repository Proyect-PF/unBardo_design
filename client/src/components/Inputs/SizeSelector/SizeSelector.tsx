import { useState } from "react";

interface Props {
  sizes: string[];
}

const SizeSelector = ({ sizes }: Props): JSX.Element => {
  const [selected, setSelected] = useState("");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    setSelected(button.innerHTML);
  };

  return (
    <div className="flex gap-4 my-4 font-mono text-lg font-bold text-center">
      {sizes &&
        sizes.map((e) => (
          <button
            onClick={handleClick}
            className={`w-8 h-8 border border-black ${
              selected === e ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            {e}
          </button>
        ))}
    </div>
  );
};

export default SizeSelector;

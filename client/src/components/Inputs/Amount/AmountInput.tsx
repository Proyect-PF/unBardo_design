import { useEffect } from "react";
import Toast from "../../Toast";

interface Props {
  stock: (size: string) => number;
  size: string;
  amount: number;
  setter: React.Dispatch<React.SetStateAction<number>>;
}

const AmountInput = ({ stock, size, amount, setter }: Props): JSX.Element => {
  //AL: amount state for visual changes in the component, the value passed
  //to the invoking is manneged by the "setter" function

  //AL: this functions manages the amount state & setting the value for the invoking page
  const handleAmount = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    if (button.innerHTML === "+") {
      if(size === "") {
        Toast.fire({
          icon: "info",
          title:
            "<p class='font-bold font-rift text-black'>Selecciona una talla primero</p>",
        });
      }
      if (amount < stock(size)) {
        setter(amount + 1);
      }
    } else {
      if(size === "") {
        Toast.fire({
          icon: "info",
          title:
            "<p class='font-bold font-rift text-black'>Selecciona una talla primero</p>",
        });
      }
      if (amount > 1) setter(amount - 1);
    }
  };

  useEffect(() => {
    setter(1);
  }, [size]);

  return (
    <div className="flex content-center self-center gap-0 px-4 ml-3 ">
      <button
        className="border-t border-b border-l border-black h-7 w-7"
        onClick={handleAmount}
      >
        -
      </button>
      <p className="border border-black h-7 w-9">{amount}</p>
      <button
        className="border-t border-b border-r border-black h-7 w-7"
        onClick={handleAmount}
      >
        +
      </button>
    </div>
  );
};

export default AmountInput;

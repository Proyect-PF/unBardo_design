import { useEffect } from "react";

interface Props {
  stock: (size: string) => number;
  size: string
  amount: number
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
      if (amount < stock(size)) {
        setter(amount + 1);
      }
    } else if (amount > 1) {
      setter(amount - 1);
    }
  };

  useEffect(() => {
    setter(1)
  }, [size])

  return (
    <div className="flex content-center gap-0 self-center px-4 ml-3 font-bold">
      <button className="h-7 w-7 border-t border-l border-b border-black" onClick={handleAmount}>-</button>
      <p className="h-7 w-9 border border-black">{amount}</p>
      <button className="h-7 w-7 border-t border-r border-b border-black" onClick={handleAmount}>+</button>
    </div>
  );
};

export default AmountInput;

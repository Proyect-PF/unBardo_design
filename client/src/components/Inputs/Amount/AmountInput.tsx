import React, { useState } from "react";

interface Props {
  setter: React.Dispatch<React.SetStateAction<number>>;
}

const AmountInput = ({ setter }: Props): JSX.Element => {
  //AL: amount state for visual changes in the component, the value passed
  //to the invoking is manneged by the "setter" function
  const [amount, setAmount] = useState(1);

  //AL: this functions manages the amount state & setting the value for the invoking page
  const handleAmount = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    if (button.innerHTML === "+") {
      if (amount < 10) {
        setter(amount + 1);
        setAmount(amount + 1);
      }
    } else if (amount > 1) {
      setter(amount - 1);
      setAmount(amount - 1);
    }
  };

  return (
    <div className="flex content-center self-center gap-4 px-4 ml-3 font-bold">
      <button onClick={handleAmount}>-</button>
      <p>{amount}</p>
      <button onClick={handleAmount}>+</button>
    </div>
  );
};

export default AmountInput;

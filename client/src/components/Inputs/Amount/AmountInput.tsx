import React, { useState } from "react";

const AmountInput = (): JSX.Element => {
  const [amount, setAmount] = useState(1);

  const handleAmount = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    if (button.innerHTML === "+") {
      if (amount < 10) setAmount(amount + 1);
    } else if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  return (
    <div className="flex content-center self-center gap-4 ml-3 font-bold">
      <button onClick={handleAmount}>-</button>
      <p>{amount}</p>
      <button onClick={handleAmount}>+</button>
    </div>
  );
};

export default AmountInput;

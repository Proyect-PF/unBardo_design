interface Props {
  text: string;
  name: string;
  onClick: any;
  disabled: boolean;
  type: string;
  className: string;
}

const Button = ({
  text,
  name,
  onClick,
  disabled,
  type,
  className,
}: Props): JSX.Element => {
  //AL: consumes all the data from props, the function of this button will be determined
  // by the onCLick prop

  return (
    <div className={`flex ${className}`}>
      <button
        type={type === "submit" ? "submit" : "button"}
        className={`py-2 my-4 text-xl font-semibold text-center border border-black w-72  ${
          disabled ? "opacity-50" : "opacity-100"
        }`}
        name={name}
        disabled={disabled}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;

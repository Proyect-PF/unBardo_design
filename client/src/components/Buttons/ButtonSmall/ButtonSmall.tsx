interface Props {
    text: string;
    name: string;
    onClick: any;
    disabled: boolean;
    type: string;
  }
  
  const ButtonSmall = ({
    text,
    name,
    onClick,
    disabled,
    type,
  }: Props): JSX.Element => {
    //AL: consumes all the data from props, the function of this button will be determined
    // by the onCLick prop
  
    return (
      <div className="flex justify-center">
        <button
          type={type === "submit" ? "submit" : "button"}
          className={`py-1 my-2 bg-white text-sm font-semibold text-center border border-black w-14 ${
            disabled ? "opacity-50" : "opacity-100"
          } duration-300 hover:bg-black hover:text-white`}
          name={name}
          disabled={disabled}
          onClick={onClick}
        >
          {text}
        </button>
      </div>
    );
  };
  
  export default ButtonSmall;
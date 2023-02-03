interface Props {
  text: string;
  name: string;
  onClick: any;
}

const Button = ({ text, name, onClick }: Props): JSX.Element => {
  return (
    <div className="flex justify-center">
      <button
        className="py-2 my-4 text-xl text-center border-2 border-black w-72"
        name={name}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;

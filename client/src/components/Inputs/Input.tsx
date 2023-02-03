import React from "react";

interface Props {
  type: string;
  placeholder: string;
  //   value: string;
  name: string;
  onChange: any;
}

const Input = ({ type, placeholder, name, onChange }: Props) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        // value={value}
        onChange={onChange}
        className="w-full h-12 pl-3 border border-gray-300 rounded-md bg-gray-50"
        name={name}
      />
    </div>
  );
};

export default Input;

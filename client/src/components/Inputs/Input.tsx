import React from "react";


interface Props {
  id: string;
  type: string;
  placeholder: string;
  //   value: string;
  name: string;
  onChange: any;
  value: any;
}

const Input = ({ id, value, type, placeholder, name, onChange }: Props) => {
  return (
    <div>
      <input
        id={id}
        type={type}
        value={value}
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

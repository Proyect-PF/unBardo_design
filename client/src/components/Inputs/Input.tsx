import React from 'react';

interface Props {
  id: string;
  type: string;
  placeholder: string;
  //   value: string;
  name: string;
  onChange: any;
  onBlur: any;
  value: any;
  className: string;
}

const Input = ({
  id,
  value,
  type,
  placeholder,
  name,
  onChange,
  className,
  onBlur,
}: Props) => {
  return (
    <div>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`text-align: first w-full h-12 pl-3 border border-gray-300 rounded-md bg-gray-50 ${className}`}
        name={name}
        onBlur={onBlur}
      />
    </div>
  );
};

export default Input;

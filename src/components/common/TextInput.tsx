import React from "react";

interface ITextInput {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}

const TextInput: React.FC<ITextInput> = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = true,
}) => (
  <div className='mb-4'>
    <label htmlFor={id} className='block text-gray-700 text-sm font-bold mb-2'>
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className='border border-gray-300 shadow-sm rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-2'
      required={required}
    />
  </div>
);

export default TextInput;

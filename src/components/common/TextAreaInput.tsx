import React, { useEffect, useRef } from "react";

interface ITextAreaInput {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  required?: boolean;
}

const TextAreaInput: React.FC<ITextAreaInput> = ({
  id,
  label,
  value,
  onChange,
  rows = 5,
  required = true,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`;
    }
  }, [value]);

  return (
    <div className='mb-4'>
      <label htmlFor={id} className='block text-gray-700 text-sm font-bold mb-2'>
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        onInput={handleInput}
        ref={textareaRef}
        rows={rows}
        className='border border-gray-300 shadow-sm rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-2 resize-none' // Disable manual resizing
        required={required}
      />
    </div>
  );
};

export default TextAreaInput;

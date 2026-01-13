import React from 'react';

/**
 * FormInput Component
 * Reusable input field component with label and error handling
 */
interface FormInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
}) => {
  return (
    <div className="flex flex-col gap-1.5 mb-2.5">
      <label htmlFor={name} className="text-sm font-medium text-[#2d2d2d] tracking-wide">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full py-2 px-3 text-sm text-[#2d2d2d] bg-white border rounded-md outline-none transition-all duration-200 box-border placeholder:text-[#a0a0a0] ${
          error
            ? 'border-[#e74c3c] focus:shadow-[0_0_0_3px_rgba(231,76,60,0.1)]'
            : 'border-[#d4d4d4] focus:border-[#8b7fc8] focus:shadow-[0_0_0_3px_rgba(139,127,200,0.1)]'
        }`}
      />
      {error && <span className="text-[11px] text-[#e74c3c] -mt-0.5 block">{error}</span>}
    </div>
  );
};

export default FormInput;

import React from 'react';
import '../styles/FormInput.css';

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
    <div className="form-input-group">
      <label htmlFor={name} className="form-input-label">
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
        className={`form-input-field ${error ? 'form-input-error' : ''}`}
      />
      {error && <span className="form-input-error-message">{error}</span>}
    </div>
  );
};

export default FormInput;

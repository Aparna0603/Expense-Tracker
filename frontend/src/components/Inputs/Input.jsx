import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <div className="relative flex items-center border rounded-md px-3 py-2 bg-white shadow-sm">
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm text-gray-800"
          value={value}
          onChange={onChange}
        />

        {type === 'password' && (
          <div className="ml-2 cursor-pointer text-gray-500" onClick={toggleShowPassword}>
            {showPassword ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;


import React, { InputHTMLAttributes, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    showToggle?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, type = 'text', showToggle, ...rest }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="mb-4 relative">
            <label htmlFor={rest.id} className="block font-bold text-black mb-1">
                {label}
            </label>
            <div className="relative">
                <input
                    {...rest}
                    type={showPassword ? 'text' : type}
                    className="w-full px-3 py-4 text-[4vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.5vw] xl:text-[1vw]  border border-gray-300 rounded-md focus:outline-none"
                />
                {showToggle && (
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0  flex items-center px-3 focus:outline-none"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? (
                            <FiEyeOff className="h-5 w-5 text-black font-bold" />
                        ) : (
                            <FiEye className="h-5 w-5 text-black font-bold" />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default InputField;

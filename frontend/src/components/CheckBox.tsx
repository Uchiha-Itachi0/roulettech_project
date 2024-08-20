
import React, { InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, ...rest }) => {
    return (
        <div className="flex items-center">
            <input
                {...rest}
                type="checkbox"
                className="h-4 w-4 text-onboarding-yellow text-[3vw] sm:text-[2vw] md:text-[1.5vw] lg:text-[1vw] focus:ring-onboarding-yellow border-gray-300 rounded"
            />
            <label htmlFor={rest.id} className="ml-2 block text-sm text-gray-900">
                {label}
            </label>
        </div>
    );
};

export default Checkbox;

import React from 'react';
import InputField from './InputField';
import { FcGoogle } from "react-icons/fc";
import Checkbox from "../CheckBox";
import { Link } from "react-router-dom";

interface RegisterProps {
    onRegister: (e: any) => void;
    onRegisterWithGoogle: () => void;
    formData: {
        email: string;
        password: string;
        username: string;
        agreeTerms: boolean;
    };
    setFormData: React.Dispatch<React.SetStateAction<{
        email: string;
        password: string;
        username: string;
        agreeTerms: boolean;
    }>>;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onRegisterWithGoogle, formData, setFormData }) => {

    const handleCheckboxChange = () => {
        setFormData((prevData) => ({
            ...prevData,
            agreeTerms: !prevData.agreeTerms
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-screen sm:w-[50vw] md:w-[40vw] lg:w-[30vw] bg-gray-100">
            <div className="w-full min-h-screen bg-white p-4 md:p-8 rounded-lg shadow-lg">
                <h2 className="text-[9vw] sm:text-[4.5vw] md:text-[4vw] lg:text-[3.5vw] xl:text-[3vw] font-semibold">Create your new account</h2>
                <p className="text-[4vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.5vw] xl:text-[1vw] text-gray-600 mb-6">Create an account to start looking for the food you like</p>

                {/* Email field */}
                <InputField
                    type="email"
                    id="email"
                    name="email"
                    label="Email Address"
                    placeholder="Enter your email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                />

                {/* Username field */}
                <InputField
                    type="text"
                    id="username"
                    name="username"
                    label="User Name"
                    placeholder="Enter your User Name"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                />

                {/* Password field */}
                <InputField
                    type="password"
                    id="password"
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    showToggle
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                />

                <div className="mb-6">
                    <Checkbox
                        id="agreeTerms"
                        label="I agree with Terms and Conditions"
                        checked={formData.agreeTerms}
                        onChange={handleCheckboxChange}
                    />
                </div>

                {/* Register button */}
                <button
                    className="w-full bg-onboarding-yellow text-white text-[4vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.5vw] xl:text-[1vw] py-4 px-4 rounded-full focus:outline-none"
                    onClick={onRegister}
                >
                    Register
                </button>

                {/* Or divider */}
                <div className="flex items-center my-4">
                    <div className="border-t border-gray-300 flex-grow"></div>
                    <div className="mx-3 text-gray-600 text-sm">Or sign in with</div>
                    <div className="border-t border-gray-300 flex-grow"></div>
                </div>

                {/* Sign in with Google button */}
                <div className="flex flex-col gap-6 items-center justify-center mt-8">
                    <button
                        className="bg-white text-gray-700 p-2 rounded-full border border-gray-300 hover:bg-gray-100 focus:outline-none"
                        onClick={onRegisterWithGoogle}
                    >
                        <FcGoogle className="text-[6vw] sm:text-[3.5vw] md:text-[3vw] lg:text-[2.5vw] xl:text-[2vw]" />
                    </button>
                    <div className="text-[4vw] sm:text-[2vw] md:text-[1.5vw] lg:text-[1vw] font-semibold">Have an account?{' '}
                        <Link to="/sign-in" className="text-onboarding-yellow">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

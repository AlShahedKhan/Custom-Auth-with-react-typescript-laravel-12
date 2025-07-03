import React, { FormEvent, useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, ArrowRight } from "lucide-react";

interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

interface FromErrors {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
}

interface Props {
    errors?: FromErrors;
    csrfToken: string;
}

const Register: React.FC<Props> = ({ errors = {}, csrfToken }) => {
    const [data, setData] = useState<FormData>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [processing, setProcessing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handelSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setProcessing(true);
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mb-4 transform hover:scale-105 active:scale-95 duration-200">
                        <User className="h-8 w-8 text-white " />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 transform hover:scale-105 active:scale-95 duration-200">
                        Create your account
                    </h2>
                    <p className="text-gray-600 transform hover:scale-105 active:scale-95 duration-200">
                        Join us today and get started
                    </p>
                </div>
                <div className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="first name"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                First Name
                            </label>
                            <div className="relative transform hover:scale-105 active:scale-95 duration-200">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="first_name"
                                    name="first_name"
                                    type="text"
                                    autoComplete="first_name"
                                    placeholder="Enter you first name"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border ${
               errors.first_name ? 'border-red-300' : 'border-gray-300'
               } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                            {/* {errors.name && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.name}
                                </p>
                            )} */}
                        </div>
                        <div>
                            {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div> */}
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Email Address
                            </label>
                            <div className="relative transform hover:scale-105 active:scale-95 duration-200">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className={`block w-full pl-10 pr-3 py-3 border  rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-small font-medium text-gray-700 mb-1"
                            >
                                Password
                            </label>
                            <div className="relative transform hover:scale-105 active:scale-95 duration-200">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="block w-full pl-10 pr-12 py-3 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer hidden" />
                                </button>
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="password_confirmation"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Confirm Password
                            </label>
                            <div className="relative transform hover:scale-105 active:scale-95 duration-200">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="block w-full pl-10 pr-12 py-3 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 "
                                    placeholder="Confirm Password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer hidden" />
                                </button>
                            </div>
                            <div>
                                <button className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105  mt-3">
                                    Create Account
                                </button>
                            </div>
                            <div className="text-center ">
                                <p className="text-sm text-gray-600 transform hover:scale-105 active:scale-95 duration-200">
                                    Already have an account?
                                </p>
                                <div className="transform hover:scale-105 active:scale-95 duration-200">
                                    <a
                                        href="#"
                                        className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                                    >
                                        Sign in here
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Register;

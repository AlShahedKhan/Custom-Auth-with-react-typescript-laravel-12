import React, { FormEvent, useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, ArrowRight } from "lucide-react";

interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

interface FormErrors {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
}

interface Props {
    errors?: FormErrors;
    csrfToken?: string;
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
    const [formErrors, setFormErrors] = useState<FormErrors>(errors);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user starts typing
        if (formErrors[name as keyof FormErrors]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const getCsrfToken = () => {
        // Try multiple ways to get CSRF token
        if (csrfToken) return csrfToken;

        // Try from meta tag
        const metaToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
        if (metaToken) return metaToken;

        // Try from cookie (if using cookie-based CSRF)
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'XSRF-TOKEN') {
                return decodeURIComponent(value);
            }
        }

        return null;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setFormErrors({});

        try {
            const token = getCsrfToken();

            if (!token) {
                throw new Error("CSRF token not found. Please refresh the page and try again.");
            }

            const response = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-CSRF-TOKEN": token,
                    "X-Requested-With": "XMLHttpRequest",
                },
                credentials: 'same-origin',
                body: JSON.stringify(data),
            });

            const text = await response.text();
            let responseData;
            try {
                responseData = JSON.parse(text);
            } catch (jsonError) {
                console.error("Non-JSON response:", text);
                throw new Error("Server returned non-JSON response. See console for details.");
            }

            if (response.ok) {
                // Registration successful
                window.location.href = "/dashboard";
            } else {
                // Handle validation errors
                if (response.status === 422 && responseData.errors) {
                    setFormErrors(responseData.errors);
                } else if (response.status === 419) {
                    // CSRF token mismatch
                    alert("Security token expired. Please refresh the page and try again.");
                    window.location.reload();
                } else {
                    console.error("Registration failed:", responseData);
                    alert("Registration failed. Please try again.");
                }
            }
        } catch (error) {
            console.error("Registration error:", error);
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("Network error. Please check your connection and try again.");
            }
        } finally {
            setProcessing(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mb-4 transform hover:scale-105 transition-transform duration-200">
                        <User className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Create your account
                    </h2>
                    <p className="text-gray-600">
                        Join us today and get started
                    </p>
                </div>

                {/* Form */}
                <div className="mt-8 space-y-6">
                    <div className="space-y-4">
                        {/* First Name Field */}
                        <div>
                            <label
                                htmlFor="first_name"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                First Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="first_name"
                                    name="first_name"
                                    type="text"
                                    autoComplete="given-name"
                                    placeholder="Enter your first name"
                                    required
                                    value={data.first_name}
                                    onChange={handleChange}
                                    className={`block w-full pl-10 pr-3 py-3 border ${
                                        formErrors.first_name
                                            ? "border-red-300 focus:ring-red-500"
                                            : "border-gray-300 focus:ring-blue-500"
                                    } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200`}
                                />
                            </div>
                            {formErrors.first_name && (
                                <p className="mt-1 text-sm text-red-600">
                                    {formErrors.first_name}
                                </p>
                            )}
                        </div>

                        {/* Last Name Field */}
                        <div>
                            <label
                                htmlFor="last_name"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Last Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="last_name"
                                    name="last_name"
                                    type="text"
                                    autoComplete="family-name"
                                    placeholder="Enter your last name"
                                    required
                                    value={data.last_name}
                                    onChange={handleChange}
                                    className={`block w-full pl-10 pr-3 py-3 border ${
                                        formErrors.last_name
                                            ? "border-red-300 focus:ring-red-500"
                                            : "border-gray-300 focus:ring-blue-500"
                                    } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200`}
                                />
                            </div>
                            {formErrors.last_name && (
                                <p className="mt-1 text-sm text-red-600">
                                    {formErrors.last_name}
                                </p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={data.email}
                                    onChange={handleChange}
                                    className={`block w-full pl-10 pr-3 py-3 border ${
                                        formErrors.email
                                            ? "border-red-300 focus:ring-red-500"
                                            : "border-gray-300 focus:ring-blue-500"
                                    } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200`}
                                    placeholder="Enter your email"
                                />
                            </div>
                            {formErrors.email && (
                                <p className="mt-1 text-sm text-red-600">
                                    {formErrors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    value={data.password}
                                    onChange={handleChange}
                                    className={`block w-full pl-10 pr-12 py-3 border ${
                                        formErrors.password
                                            ? "border-red-300 focus:ring-red-500"
                                            : "border-gray-300 focus:ring-blue-500"
                                    } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200`}
                                    placeholder="Create a password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                                    )}
                                </button>
                            </div>
                            {formErrors.password && (
                                <p className="mt-1 text-sm text-red-600">
                                    {formErrors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label
                                htmlFor="password_confirmation"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type={showConfirmPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    value={data.password_confirmation}
                                    onChange={handleChange}
                                    className={`block w-full pl-10 pr-12 py-3 border ${
                                        formErrors.password_confirmation
                                            ? "border-red-300 focus:ring-red-500"
                                            : "border-gray-300 focus:ring-blue-500"
                                    } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200`}
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={toggleConfirmPasswordVisibility}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                                    )}
                                </button>
                            </div>
                            {formErrors.password_confirmation && (
                                <p className="mt-1 text-sm text-red-600">
                                    {formErrors.password_confirmation}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                onClick={handleSubmit}
                                disabled={processing}
                                className={`group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                                    processing
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                }`}
                            >
                                {processing ? (
                                    <div className="flex items-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Creating Account...
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        Create Account
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                )}
                            </button>
                        </div>

                        {/* Login Link */}
                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <a
                                    href="/login"
                                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                                >
                                    Sign in here
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

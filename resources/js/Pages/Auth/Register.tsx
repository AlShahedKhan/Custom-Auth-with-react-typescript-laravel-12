// import React from 'react';
import { Eye, EyeOff, User, Mail, Lock, ArrowRight } from 'lucide-react';

const Register = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mb-4">
                        <User className="h-8 w-8 text-white " />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Create your account
                    </h2>
                    <p className="text-gray-600">
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
                            <div className="relative">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Register;

"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      // Proceed with login logic (e.g., API call)
      console.log(formData); // For demonstration purposes
      router.push("/dashboard"); // Redirect to dashboard after successful login
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">
          Login to CertiResumeGenerator
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 dark:text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 dark:text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <Button
            type="submit"
            className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg transition-all duration-300 hover:bg-gray-800 dark:hover:bg-gray-300 transform hover:scale-105"
          >
            Login
          </Button>
        </form>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          Don't have an account?{' '}
          <Link href="/register" className="text-black dark:text-white font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
import { FormEvent, useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <div className="bg-[#111111] min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl text-white font-bold mb-8">Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Email/Username Input */}
          <div className="mb-4">
            <label htmlFor="email" className="text-white mb-1 block">Email or Username</label>
            <input
              className="bg-gray-700 w-64 py-2 px-3 text-white rounded focus:outline-none"
              type="text"
              id="email"
              placeholder="Enter your email or username"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="text-white mb-1 block">Password</label>
            <div className="relative">
              <input
                className="bg-gray-700 w-64 py-2 px-3 text-white rounded pr-10 focus:outline-none"
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 transform -translate-y-1/2"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
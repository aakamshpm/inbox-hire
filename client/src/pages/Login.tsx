import { useState } from "react";
import { FiUser, FiMail, FiLock, FiLogIn, FiUserPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

type FormData = {
  name: string;
  email: string;
  username: string;
  password: string;
};

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login logic
      console.log("Logging in with:", formData.username, formData.password);
    } else {
      // Handle register logic
      console.log("Registering with:", formData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            {isLogin ? "Login" : "Register"}
          </h2>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="johndoe"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
            >
              {isLogin ? (
                <>
                  <FiLogIn />
                  Login
                </>
              ) : (
                <>
                  <FiUserPlus />
                  Register
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Sonatrach.png";
import sideImg from "../../assets/pic.svg"; // Assuming you have a side image

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (username && password) {
      navigate("/operator-view");
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-48 ">
      <div className="flex flex-row  items-center  justify-center bg-gray-200 rounded-lg p-10">
        <div>
          <img src={sideImg} alt="side image" className="" />
        </div>
        <div className="max-w-md w-full space-y-8 ml-20 ">
          <div>
            <img src={logo} alt="logo" className="mx-auto" />

          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Identifiant
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="identifiant"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enterer votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Se Connecter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default LoginPage;

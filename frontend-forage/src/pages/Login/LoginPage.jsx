import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/Sonatrach.png";
import sideImg from "../../assets/pic.svg"; // Assuming you have a side image

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [motDePasse, setmotDePasse] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const loginData = {
      email,
      motDePasse,
    };

    console.log("Tentative de connexion avec:", loginData);

    try {
      const response = await axios.post("http://localhost:9090/api/users/login", loginData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 5000, // Timeout de 5 secondes
        withCredentials: true // Important pour CORS
      });

      console.log("Réponse du serveur:", response.data);

      if (response.data) {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        navigate("/operator-view");
      }
    } catch (err) {
      console.error("Erreur complète:", err);
      
      if (err.code === 'ERR_NETWORK') {
        setError("Impossible de se connecter au serveur. Veuillez vérifier que le serveur backend est démarré sur le port 9090.");
      } else if (err.response) {
        // Le serveur a répondu avec un code d'erreur
        if (err.response.status === 403) {
          setError("Accès refusé. Vérifiez vos identifiants.");
        } else {
          setError(err.response.data.message || "Erreur de connexion");
        }
      } else if (err.request) {
        // La requête a été faite mais aucune réponse n'a été reçue
        setError("Pas de réponse du serveur. Vérifiez que le serveur est en cours d'exécution.");
      } else {
        // Une erreur s'est produite lors de la configuration de la requête
        setError("Erreur lors de l'envoi de la requête: " + err.message);
      }
    } finally {
      setIsLoading(false);
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
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="motDePasse"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mot de passe
                </label>
                <input
                  id="motDePasse"
                  name="motDePasse"
                  type="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Entrez votre mot de passe"
                  value={motDePasse}
                  onChange={(e) => setmotDePasse(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
              >
                {isLoading ? "Connexion en cours..." : "Se Connecter"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default LoginPage;
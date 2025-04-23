import { useState } from 'react';
import { FiFilePlus, FiX } from 'react-icons/fi';

const Rapports = () => {
  // États initiaux avec données pré-remplies comme dans vos captures
  const [file, setFile] = useState(null);
  const [problems, setProblems] = useState([
    { type: 'technique', description: 'Panne de matériel' },
    { type: 'logistique', description: 'Retard livraison' }
  ]);
  
  const [formData, setFormData] = useState({
    nom: 'Cheref',
    prenom: 'Wassim',
    dateSoumission: '2022-12-22'
  });

  // Gestion du fichier Excel
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Gestion des champs de formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Ajout d'un nouveau problème
  const addProblem = () => {
    setProblems([...problems, { type: '', description: '' }]);
  };

  // Suppression d'un problème
  const removeProblem = (index) => {
    const newProblems = [...problems];
    newProblems.splice(index, 1);
    setProblems(newProblems);
  };

  // Modification d'un problème existant
  const handleProblemChange = (index, field, value) => {
    const newProblems = [...problems];
    newProblems[index][field] = value;
    setProblems(newProblems);
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    const rapportComplet = {
      ...formData,
      fichier: file ? file.name : 'Aucun fichier',
      problemes: problems
    };
    console.log('Rapport soumis:', rapportComplet);
    alert('Rapport soumis avec succès!');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Soumettre le rapport du jour</h1>
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
        {/* Section Fichier Excel */}
        <div className="border-b pb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Ajouter le rapport</h2>
          <div className="flex items-center">
            <label className="cursor-pointer flex items-center text-blue-600 hover:text-blue-800">
              <FiFilePlus className="h-5 w-5 mr-2" />
              <span className="font-medium">Choisir un fichier Excel</span>
              <input 
                type="file" 
                className="hidden" 
                onChange={handleFileChange}
                accept=".xlsx,.xls" 
              />
            </label>
            {file && (
              <span className="ml-4 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
                {file.name}
              </span>
            )}
          </div>
        </div>

        {/* Section Problèmes */}
        <div className="border-b pb-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800">Problèmes rencontrés</h2>
            <button
              type="button"
              onClick={addProblem}
              className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded hover:bg-blue-100"
            >
              + Ajouter problème
            </button>
          </div>

          <div className="space-y-3">
            {problems.map((problem, index) => (
              <div key={index} className="flex items-start gap-3">
                <select
                  value={problem.type}
                  onChange={(e) => handleProblemChange(index, 'type', e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md p-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Sélectionner type</option>
                  <option value="technique">Technique</option>
                  <option value="logistique">Logistique</option>
                  <option value="sécurité">Sécurité</option>
                </select>
                
                <input
                  type="text"
                  value={problem.description}
                  onChange={(e) => handleProblemChange(index, 'description', e.target.value)}
                  placeholder="Description"
                  className="flex-1 border border-gray-300 rounded-md p-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
                
                <button
                  type="button"
                  onClick={() => removeProblem(index)}
                  className="text-red-500 hover:text-red-700 p-2"
                  aria-label="Supprimer"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Informations personnelles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Date de soumission */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Date de soumission</label>
          <input
            type="date"
            name="dateSoumission"
            value={formData.dateSoumission}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-md p-2 text-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => {
              setFormData({ nom: '', prenom: '', dateSoumission: '' });
              setFile(null);
              setProblems([]);
            }}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Réinitialiser
          </button>
          
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Soumettre le rapport
          </button>
        </div>
      </form>
    </div>
  );
};

export default Rapports;
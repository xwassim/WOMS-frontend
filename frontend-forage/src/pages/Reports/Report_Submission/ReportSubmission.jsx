import { useNavigate  } from "react-router-dom";
import axios from "axios";



// Composant pour la soumission de fichier Excel
import React, { useState, useRef ,useEffect} from "react";

const ExcelSubmission = ({ well, onCancel }) => {

  const [file, setFile] = useState(null);
  const [problems, setProblems] = useState([]);
  const [excelProblems, setExcelProblems] = useState([]);
  const [selectedProblemInfo, setSelectedProblemInfo] = useState({
    type: "",
    severity: "",
    description: "",
    isPredefined: false
  });
  const [currentProblem, setCurrentProblem] = useState({
    type: "",
    severity: "",
    description: "",
    solution: "",
    isPredefined: false,
    predefinedId: null,
  });
  const [noProblems, setNoProblems] = useState(false);
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    message: "",
  });

  const fileInputRef = useRef(null);

  // Constants
  const problemTypes = ["Technique", "Logistique", "Sécurité"];
  const severityLevels = ["Mineure", "Moyenne", "Critique"];

  // Derived state
  const isProblemComplete =
    currentProblem.type &&
    currentProblem.severity &&
    currentProblem.description;
  const canSubmit = file && (noProblems || problems.length > 0);

  // Improved file validation
  const isValidExcelFile = (file) => {
    const validTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/octet-stream",
    ];
    const validExtensions = [".xls", ".xlsx"];
    const extension = file.name
      .substring(file.name.lastIndexOf("."))
      .toLowerCase();

    return (
      validTypes.includes(file.type) || validExtensions.includes(extension)
    );
  };

  // Handlers
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      showMessage("Aucun fichier sélectionné", "error");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      // 5MB limit
      showMessage("Le fichier est trop volumineux (max 5MB)", "error");
      return;
    }

    if (isValidExcelFile(selectedFile)) {
      setFile(selectedFile);
      showMessage("Fichier sélectionné avec succès");
    } else {
      showMessage(
        "Veuillez sélectionner un fichier Excel valide (.xls, .xlsx)",
        "error"
      );
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleProblemChange = (field, value) => {
    setCurrentProblem((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddProblem = () => {
    if (!isProblemComplete) {
      showMessage("Veuillez compléter tous les champs du problème", "error");
      return;
    }

    const newProblem = { ...currentProblem, id: Date.now() };
    setProblems((prev) => [...prev, newProblem]);
    
    // Ajouter le problème à la liste des problèmes Excel
    const excelProblem = {
      description: currentProblem.description,
      gravite: currentProblem.severity === "Critique" ? 3 : 
              currentProblem.severity === "Moyenne" ? 2 : 1,
      type: currentProblem.type,
      solutions: currentProblem.solution ? [currentProblem.solution] : []
    };
    setExcelProblems((prev) => [...prev, excelProblem]);

    setCurrentProblem({
      type: "",
      severity: "",
      description: "",
      solution: "",
      isPredefined: false,
      predefinedId: null
    });
    showMessage("Problème ajouté au rapport");
  };

  const handleRemoveProblem = (id) => {
    setProblems((prev) => prev.filter((problem) => problem.id !== id));
    // Supprimer également de la liste des problèmes Excel
    setExcelProblems((prev) => prev.filter((_, index) => problems[index]?.id !== id));
    showMessage("Problème supprimé");
  };

  const handleSubmit = async () => {
    if (!canSubmit) {
      showMessage(
        'Veuillez ajouter un fichier et au moins un problème ou cocher "Aucun problème"',
        "error"
      );
      return;
    }

    setFormStatus({ isSubmitting: true, isSuccess: false, message: "" });

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("drillWellId", well.id);
      const response = await axios.post(
        "http://localhost:9090/api/daily-reports/import",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Réponse complète du serveur:", response);
      console.log("Données du rapport:", response.data);
      const savedReport = response.data;
      console.log("savedReport", savedReport[0]);
      // Vérifier si nous avons un ID valide
      

      // Sauvegarder chaque problème dans la base de données
      for (const problem of excelProblems) {
        try {
          const problemPayload = {
            name: problem.description,
            type: problem.type,
            gravite: problem.gravite,
            solutions: problem.solutions,
            dailyReport: {
              id: savedReport[0].id
            }
          };

          console.log("ID du rapport journalier:", savedReport.id);
          console.log("Problème à envoyer:", JSON.stringify(problemPayload, null, 2));
          console.log("Problème original:", problem);

          const response = await axios.post(
            "http://localhost:9090/api/problemes",
            problemPayload,
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
          console.log("Réponse du serveur:", response.data);
          console.log("Problème ajouté avec succès");
        } catch (error) {
          console.error("Erreur lors de l'ajout du problème:", error);
          console.error("Détails de l'erreur:", {
            status: error.response?.status,
            data: error.response?.data,
            headers: error.response?.headers
          });
          showMessage("Erreur lors de l'ajout d'un problème: " + error.message, "error");
        }
      }

      showMessage("Rapport et problèmes soumis avec succès!", "success");

      // Réinitialiser le formulaire après la soumission réussie
      setTimeout(() => {
        setFile(null);
        setProblems([]);
        setExcelProblems([]);
        setNoProblems(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }, 1500);
    } catch (error) {
      console.error("Submission error:", error);
      showMessage("Erreur lors de la soumission: " + (error.response?.data || error.message), "error");
    }
  };

  // Helpers
  const showMessage = (message, type = "info") => {
    setFormStatus({
      isSubmitting: false,
      isSuccess: type === "success",
      message,
    });
  };


  const predefinedProblems = [
    {
      id: 1,
      type: "Technique",
      severity: "Critique",
      description: "Panne de pompe principale",
      solutions: [
        "Remplacement de la pompe",
        "Réparation temporaire avec pièces de rechange",
        "Utilisation de la pompe de secours",
      ],
    },
    {
      id: 2,
      type: "Logistique",
      severity: "Moyenne",
      description: "Retard de livraison des matériaux",
      solutions: [
        "Utilisation des stocks disponibles",
        "Réorganisation du planning",
        "Commande urgente auprès d'un autre fournisseur",
      ],
    },
    {
      id: 3,
      type: "Sécurité",
      severity: "Critique",
      description: "Fuite de gaz détectée",
      solutions: [
        "Évacuation immédiate de la zone",
        "Intervention de l'équipe HSE",
        "Arrêt des travaux jusqu'à résolution",
      ],
    },
    {
      id: 4,
      type: "Technique",
      severity: "Mineure",
      description: "Problème de communication radio",
      solutions: [
        "Vérification des batteries",
        "Changement de canal radio",
        "Utilisation du système de communication de secours",
      ],
    },
  ];

  const handleProblemSelection = (problemId) => {
    if (problemId === 'other') {
      setSelectedProblemInfo({
        type: "",
        severity: "",
        description: "",
        isPredefined: false
      });
      setCurrentProblem({
        type: "",
        severity: "",
        description: "",
        solution: "",
        isPredefined: false,
        predefinedId: null
      });
    } else if (problemId) {
      const selectedProblem = predefinedProblems.find(p => p.id.toString() === problemId);
      if (selectedProblem) {
        setSelectedProblemInfo({
          type: selectedProblem.type,
          severity: selectedProblem.severity,
          description: selectedProblem.description,
          isPredefined: true
        });
        setCurrentProblem({
          type: selectedProblem.type,
          severity: selectedProblem.severity,
          description: selectedProblem.description,
          solution: selectedProblem.solutions[0] || '',
          isPredefined: true,
          predefinedId: selectedProblem.id
        });
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mx-auto ">
      <h2 className="text-xl  mb-6">Soumettre un rapport Excel</h2>

      {/* Status Message */}
      {formStatus.message && (
        <div
          className={`mb-6 p-3 rounded-md ${
            formStatus.isSuccess
              ? "bg-green-100 text-green-800"
              : formStatus.message.includes("Erreur")
              ? "bg-red-100 text-red-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {formStatus.message}
        </div>
      )}

      {/* File Upload Section */}
      <div className="mb-8">
        <h3 className="text-lg mb-3 text-gray-800">
          <span className="text-red-500">*</span> Fichier Excel du rapport
        </h3>
        {!file ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              Glissez-déposez votre fichier Excel ici, ou
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Parcourir les fichiers
            </button>
            <p className="mt-1 text-xs text-gray-500">
              Formats acceptés: .xlsx, .xls (Taille max: 10MB)
            </p>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              accept=".xlsx,.xls"
            />
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 border border-gray-300 rounded-md bg-gray-50">
            <div className="flex items-center">
              <svg
                className="h-8 w-8 text-blue-500 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={handleRemoveFile}
              className="text-gray-500 hover:text-red-500"
              aria-label="Remove file"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Problems Section */}
      {/* Problems Section */}
      {/* Problems Section */}
<div className="mb-8">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg text-gray-800">Problèmes rencontrés</h3>
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        checked={noProblems}
        onChange={() => {
          setNoProblems(!noProblems);
          if (!noProblems) {
            setProblems([]);
            setCurrentProblem({
              type: '',
              severity: '',
              description: '',
              solution: '',
              isPredefined: false,
              predefinedId: null
            });
            showMessage('Aucun problème signalé');
          }
        }}
        className="form-checkbox h-4 w-4 text-blue-600"
      />
      <span className="ml-2 text-sm text-gray-600">
        Aucun problème à signaler
      </span>
    </label>
  </div>

  {!noProblems && (
    <>
      {/* Predefined Problems Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sélectionner un problème récurrent
        </label>
        <select
          value={currentProblem.predefinedId || ''}
          onChange={(e) => handleProblemSelection(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-sm"
        >
          <option value="">-- Sélectionner un problème --</option>
          {predefinedProblems.map(problem => (
            <option key={problem.id} value={problem.id}>
              {problem.description}
            </option>
          ))}
          <option value="other">Autre problème (à définir manuellement)</option>
        </select>
      </div>

      {/* Problem Form - Only shown if a problem is selected or being created */}
      {(currentProblem.description || currentProblem.predefinedId === null) && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type de problème <span className="text-red-500">*</span>
              </label>
              <select
                value={currentProblem.type}
                onChange={(e) => handleProblemChange('type', e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                required
                disabled={currentProblem.isPredefined}
              >
                <option value="">Sélectionner un type</option>
                {problemTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gravité <span className="text-red-500">*</span>
              </label>
              <select
                value={currentProblem.severity}
                onChange={(e) => handleProblemChange('severity', e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                required
                disabled={currentProblem.isPredefined}
              >
                <option value="">Sélectionner une gravité</option>
                {severityLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={currentProblem.description}
              onChange={(e) => handleProblemChange('description', e.target.value)}
              placeholder="Décrivez le problème rencontré..."
              className="w-full border border-gray-300 rounded-md p-2 text-sm h-20"
              required
              disabled={currentProblem.isPredefined}
            />
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Solution appliquée
              </label>
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={!currentProblem.solution}
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleProblemChange('solution', '');
                    } else {
                      handleProblemChange('solution', currentProblem.isPredefined 
                        ? predefinedProblems.find(p => p.id === currentProblem.predefinedId)?.solutions[0] || ''
                        : '');
                    }
                  }}
                  className="form-checkbox h-4 w-4 text-blue-600 mr-2"
                />
                Aucune solution
              </label>
            </div>
            
            {currentProblem.solution !== '' && (
              <>
                {currentProblem.isPredefined ? (
                  <select
                    value={currentProblem.solution}
                    onChange={(e) => handleProblemChange('solution', e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm mb-2"
                  >
                    {predefinedProblems
                      .find(p => p.id === currentProblem.predefinedId)?.solutions
                      .map((solution, index) => (
                        <option key={index} value={solution}>{solution}</option>
                      ))}
                    <option value="other">Autre solution...</option>
                  </select>
                ) : null}

                {(currentProblem.solution === 'other' || !currentProblem.isPredefined) && (
                  <textarea
                    value={currentProblem.solution === 'other' ? '' : currentProblem.solution}
                    onChange={(e) => handleProblemChange('solution', e.target.value)}
                    placeholder="Décrivez la solution mise en place..."
                    className="w-full border border-gray-300 rounded-md p-2 text-sm h-20"
                  />
                )}
              </>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddProblem}
              disabled={!isProblemComplete}
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${
                isProblemComplete 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {problems.some(p => p.predefinedId === currentProblem.predefinedId) 
                ? 'Mettre à jour' 
                : 'Ajouter ce problème'}
            </button>
          </div>
        </div>
      )}

      {/* Problems List */}
      {problems.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-md font-medium text-gray-700">
            Problèmes ajoutés ({problems.length})
          </h4>
          {problems.map((problem) => (
            <div key={problem.id} className="border border-gray-200 rounded-md p-4 bg-white shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-medium">{problem.description}</h5>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {problem.type}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      problem.severity === 'Critique' ? 'bg-red-100 text-red-800' :
                      problem.severity === 'Moyenne' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {problem.severity}
                    </span>
                    {problem.isPredefined && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        Pré-défini
                      </span>
                    )}
                  </div>
                  {problem.solution && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Solution:</span> {problem.solution}
                      </p>
                    </div>
                  )}
                  {!problem.solution && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 italic">
                        Aucune solution appliquée
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setCurrentProblem({
                        ...problem,
                        isPredefined: problem.isPredefined || false
                      });
                    }}
                    className="text-gray-400 hover:text-blue-500"
                    aria-label="Edit problem"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleRemoveProblem(problem.id)}
                    className="text-gray-400 hover:text-red-500"
                    aria-label="Remove problem"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )}
</div>

      {/* Form Actions */}
      <div className="flex justify-between border-t pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Retour
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit || formStatus.isSubmitting}
          className={`px-6 py-2 rounded-md text-sm font-medium ${
            canSubmit
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {formStatus.isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Envoi en cours...
            </>
          ) : (
            `Soumettre le rapport${noProblems ? " (Aucun problème)" : ""}`
          )}
        </button>
      </div>
    </div>
  );
};
// Composant principal
const ReportSubmission = () => {
  const navigate = useNavigate();
  const [drillWells,setDrillWells] = useState([]);
  const [problems, setProblems] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:9090/api/drillwells")
      .then((response) => {
        setDrillWells(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des forages :", error);
      });
  }, []);

  const [selectedWell, setSelectedWell] = useState(null);
  const [submissionMethod, setSubmissionMethod] = useState(null); // null | 'form' | 'excel'
  const [newReport, setNewReport] = useState(null);

  // Filtrer les puits non complétés


  const handleWellSelection = (wellId) => {
    const well = drillWells.find((w) => w.id === Number(wellId));
    setSelectedWell(well);
  };


  const handleSaveReport = async () => {
    try {
      const formattedProgress = `${newReport.progress} ft en ${newReport.timeSpent} h`;
      const formattedWorkDone = newReport.workDone.map((entry) => {
        const start = entry.startTime || "";
        const end = entry.endTime || "";
        const desc = entry.description || "";
        return `${start} - ${end}: ${desc}`;
      });

      const payload = {
        ...newReport,
        progress: formattedProgress,
        workDone: formattedWorkDone,
      };

      const response = await axios.post(
        `http://localhost:9090/api/daily-reports/well/${selectedWell.id}`,
        payload
      );
      const savedReport = response.data;
      console.log("Rapport ajouté :", savedReport);

      
      for (const problem of problems) {
        try {
          const problemPayload = {
            name: problem.name,
            type: problem.type,
            gravite: problem.severity,
            solutions: problem.solutions,
            dailyReport: {
              id: savedReport.id
            }
          };

          await axios.post(
            "http://localhost:9090/api/problemes",
            problemPayload
          );
          console.log("Problème ajouté avec succès");
        } catch (error) {
          console.error("Erreur lors de l'ajout du problème:", error);
        }
      }

      navigate("/operator-view");
    } catch (error) {
      console.error("Erreur lors de l'envoi du rapport :", error);
      alert("Erreur lors de l'envoi du rapport");
    }
  };


  const initializeNewReport = () => {
    setNewReport({
      id: null,
      reportDate: new Date().toISOString().split("T")[0],
      depth:  "",
      progress: "",
      timeSpent:"",
      workDone: [{ startTime: "", endTime: "", description: "" }],
      dailyCost: 0,
      plannedDay: 0,
      actualDay: 0,
      phaseName:  "",
    });
    setProblems([]);
  };

  if (!selectedWell) {
    return (
      <div className="bg-white rounded-lg shadow p-6  mx-auto">
        <h1 className="text-2xl mb-6">Créer un nouveau rapport journalier</h1>

        <div className="mb-6 w-2/3">
          <h2 className="text-lg  mb-3">Sélectionnez un puit</h2>
          
            <select
              onChange={(e) => handleWellSelection(e.target.value)}
              className="w-full p-3 border rounded-lg"
              value=""
            >
              <option value="">Sélectionner un puits</option>
              {drillWells.map((well) => (
                <option key={well.id} value={well.id}>
                   {well.wellName} - {well.location}
                </option>
              ))}
            </select>
          
        </div>
      </div>
    );
  }

  if (!submissionMethod) {
    return (
      <div className="bg-white rounded-lg shadow p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl  mb-6">Méthode de soumission</h1>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div
            className="border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
            onClick={() => {
              initializeNewReport();
              setSubmissionMethod("form");
            }}
          >
            <div className="flex justify-center mb-4">
              <svg
                className="h-12 w-12 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">
              Rédiger le rapport
            </h3>
            <p className="text-gray-600 text-center">
              Remplissez manuellement le formulaire de rapport journalier
            </p>
          </div>

          <div
            className="border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all"
            onClick={() => setSubmissionMethod("excel")}
          >
            <div className="flex justify-center mb-4">
              <svg
                className="h-12 w-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">
              Importer depuis Excel
            </h3>
            <p className="text-gray-600 text-center">
              Téléversez un fichier Excel qui sera automatiquement traité
            </p>
          </div>
        </div>

        <button
          onClick={() => setSelectedWell(null)}
          className="px-5 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-300  bg-gray-200"
        >
          Retour
        </button>
      </div>
    );
  }

  if (submissionMethod === "excel") {
    return (
      <ExcelSubmission
        well={selectedWell}
        onCancel={() => setSubmissionMethod(null)}
      />
    );
  }

  // Retourner le formulaire de rapport
  // Formulaire de rapport
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl text-gray-800">Nouveau rapport</h1>
        </div>
        <div className="space-x-2">
          <button
            onClick={handleSaveReport}
            className="bg-[#10B981] hover:bg-[#2ea880] text-white px-4 py-1.5 rounded-md"
          >
            Sauvegarder
          </button>
          <button
            onClick={() => setSubmissionMethod(null)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1.5 rounded-md"
          >
            Annuler
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="mt-2 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Nom du puits</p>
            <p className="font-semibold">{selectedWell.wellName}</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Date</p>
            <input
              type="date"
              value={newReport.reportDate}
              onChange={(e) =>
                setNewReport({ ...newReport, reportDate: e.target.value })
              }
              className="font-semibold w-full p-1 border rounded-md"
            />
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Profondeur (ft)</p>
            <input
              type="number"
              value={newReport.depth}
              onChange={(e) =>
                setNewReport({ ...newReport, depth: e.target.value })
              }
              className="font-semibold w-full p-1 border rounded-md"
              placeholder="Profondeur en pieds"
            />
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Progression</p>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newReport.progress}
                onChange={(e) =>
                  setNewReport({ ...newReport, progress: e.target.value })
                }
                className="font-semibold w-1/2 p-1 border rounded-md"
                placeholder="Progression"
              />
              <span className="self-center">ft en</span>
              <input
                type="text"
                value={newReport.timeSpent}
                onChange={(e) =>
                  setNewReport({ ...newReport, timeSpent: e.target.value })
                }
                className="font-semibold w-1/2 p-1 border rounded-md"
                placeholder="Heures"
              />
               <span className="self-center">h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description des opérations */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg ">Description des opérations</h2>
          <button
            onClick={() => {
              setNewReport((prev) => ({
                ...prev,
                workDone: [
                  ...prev.workDone,
                  { startTime: "", endTime: "", description: "" },
                ],
              }));
            }}
            className="bg-[#445aff] hover:bg-[#3C50E0] text-white px-3 py-2 rounded-md text-sm"
          >
            Ajouter une opération
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Début
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Fin
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {newReport.workDone.map((op, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="time"
                      value={op.startTime || ""}
                      onChange={(e) => {
                        const updatedOps = [...newReport.workDone];
                        updatedOps[index].startTime = e.target.value;
                        setNewReport({ ...newReport, workDone: updatedOps });
                      }}
                      className="text-sm w-full p-1 border rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="time"
                      value={op.endTime || ""}
                      onChange={(e) => {
                        const updatedOps = [...newReport.workDone];
                        updatedOps[index].endTime = e.target.value;
                        setNewReport({ ...newReport, workDone: updatedOps });
                      }}
                      className="text-sm w-full p-1 border rounded-md "
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={op.description}
                      onChange={(e) => {
                        const updatedOps = [...newReport.workDone];
                        updatedOps[index].description = e.target.value;
                        setNewReport({ ...newReport, workDone: updatedOps });
                      }}
                      className="text-sm w-full px-1 py-2 border rounded-md  "
                      placeholder="Description de l'opération"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right ">
                    <button
                      onClick={() => {
                        const updatedOps = newReport.workDone.filter(
                          (_, i) => i !== index
                        );
                        setNewReport({ ...newReport, workDone: updatedOps });
                      }}
                      className="text-white hover:bg-red-700 text-sm cursor-pointer ring-2 rounded-sm px-2 py-1 ring-red-500 hover:ring-red-700 bg-red-500"
                      disabled={newReport.workDone.length === 1}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <div className="mt-2">
        <input
          type="text"
          value={newReport.formation}
          onChange={(e) => setNewReport({...newReport, formation: e.target.value})}
          className="text-sm italic w-full p-1 border rounded"
          placeholder="Notes sur la formation géologique"
        />
      </div> */}
      </div>

      {/* Informations supplémentaires */}
      <div className="border-t pt-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Nouveau sélecteur de phase */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Phase</h3>
            <select
              value={newReport.phaseName}
              onChange={(e) =>
                setNewReport({ ...newReport, phaseName: e.target.value })
              }
              className="w-full px-1 py-1.5 border rounded-md text-gray-800"
            >
              <option value="">Sélectionner une phase</option>
              <option value="Phase 26 x 20 ">Phase 26" x 20" inchs</option>
              <option value="Phase 16 x 13">Phase 16" x 13" inchs</option>
              <option value="Phase 12 x 9">Phase 12" x 9" inchs</option>
              <option value="Phase 8 x 7">Phase 8" x 7" inchs</option>
              <option value="Others">Autres</option>
            </select>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">
              Coût journalier ($)
            </h3>
            <input
              type="number"
              value={newReport.dailyCost}
              onChange={(e) =>
                setNewReport({ ...newReport, dailyCost: e.target.value })
              }
              className="w-full px-1  py-1.5 border rounded-md "
              placeholder="Coût en dollars"
            />
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">
              Jour prévu :{" "}
              <input
                type="number"
                value={newReport.plannedDay}
                onChange={(e) =>
                  setNewReport({ ...newReport, plannedDay: e.target.value })
                }
                className="text-gray-800 font-normal text-sm w-16 px-1 py-1.5 border rounded-md ml-1"
              />
            </h3>
            <h3 className="font-semibold text-yellow-800 mb-2">
              Jour réel :{" "}
              <input
                type="number"
                value={newReport.actualDay}
                onChange={(e) =>
                  setNewReport({ ...newReport, actualDay: e.target.value })
                }
                className="text-gray-800 font-normal text-sm w-16 px-1 py-1.5 border rounded-md ml-1"
              />
            </h3>
          </div>
        </div>
      </div>

      {/* Problèmes signalés */}
      <div className="border-t pt-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg ">Problemes signalés</h2>
          <button
            onClick={() => {
              setProblems(prev => [...prev, {
                name: "",
                type: "",
                severity: 1,
                solutions: [""],
              }]);
            }}
            className="bg-[#445aff] hover:bg-[#3C50E0] text-white px-3 py-2 rounded-md text-sm"
          >
            Ajouter un problème
          </button>
        </div>
        <div className="space-y-3">
          {problems.map((problem, index) => (
            <div key={index} className="bg-red-50 p-3 rounded-lg">
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-red-800">
                    Nom du problème
                  </label>
                  <input
                    type="text"
                    value={problem.name}
                    onChange={(e) => {
                      const updatedProblems = [...problems];
                      updatedProblems[index].name = e.target.value;
                      setProblems(updatedProblems);
                    }}
                    className="w-full px-1 py-2 border rounded-md"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm ">Type</label>
                    <input
                      type="text"
                      value={problem.type}
                      onChange={(e) => {
                        const updatedProblems = [...problems];
                        updatedProblems[index].type = e.target.value;
                        setProblems(updatedProblems);
                      }}
                      className="w-full px-1 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm ">Gravité</label>
                    <select
                      value={problem.severity}
                      onChange={(e) => {
                        const updatedProblems = [...problems];
                        updatedProblems[index].severity = e.target.value;
                        setProblems(updatedProblems);
                      }}
                      className="w-full px-1 py-2 border rounded-md"
                    >
                      {[1, 2, 3].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <label className="text-sm ">Solutions</label>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        const updatedProblems = [...problems];
                        updatedProblems[index].solutions.push("");
                        setProblems(updatedProblems);
                      }}
                      className="text-blue-500 hover:text-blue-700 text-sm font-medium underline"
                    >
                      Ajouter une solution
                    </button>
                  </div>
                  {problem.solutions.map((solution, solIndex) => (
                    <div key={solIndex} className="flex items-center mt-1">
                      <input
                        type="text"
                        value={solution}
                        onChange={(e) => {
                          const updatedProblems = [...problems];
                          updatedProblems[index].solutions[solIndex] = e.target.value;
                          setProblems(updatedProblems);
                        }}
                        className="w-full px-1 py-2 border rounded-md"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (problem.solutions.length <= 1) return;
                          const updatedProblems = [...problems];
                          updatedProblems[index].solutions = updatedProblems[index].solutions.filter((_, i) => i !== solIndex);
                          setProblems(updatedProblems);
                        }}
                        className={`ml-2 text-red-500 hover:text-red-700 ${
                          problem.solutions.length === 1 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={problem.solutions.length === 1}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    const updatedProblems = problems.filter((_, i) => i !== index);
                    setProblems(updatedProblems);
                  }}
                  className="text-red-500 hover:text-red-700 text-sm font-medium underline"
                >
                  Supprimer le problème
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportSubmission;

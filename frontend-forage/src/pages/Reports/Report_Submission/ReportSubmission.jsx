import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import data from "../../../data/data";

// Composant pour la soumission de fichier Excel

const ExcelSubmission = ({ well, onCancel }) => {
  const [file, setFile] = useState(null);
  const [problems, setProblems] = useState([]);
  const [currentProblem, setCurrentProblem] = useState({
    type: "",
    severity: "",
    description: "",
    solution: " ", // Initialize with space to keep checkbox unchecked
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

  // Derived state
  const isProblemComplete =
    currentProblem.type &&
    currentProblem.severity &&
    currentProblem.description;
  const canSubmit = file && (noProblems || problems.length > 0);

  // Handlers
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      showMessage("Aucun fichier sélectionné", "error");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      showMessage("Le fichier est trop volumineux (max 10MB)", "error");
      return;
    }

    const validExtensions = [".xls", ".xlsx"];
    const extension = selectedFile.name
      .substring(selectedFile.name.lastIndexOf("."))
      .toLowerCase();

    if (validExtensions.includes(extension)) {
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

  const handleAddProblem = () => {
    if (!isProblemComplete) {
      showMessage("Veuillez compléter tous les champs du problème", "error");
      return;
    }

    const newProblem = {
      ...currentProblem,
      id: Date.now(),
      solution:
        currentProblem.solution.trim() === "" ? "" : currentProblem.solution,
    };

    setProblems((prev) => [...prev, newProblem]);
    setCurrentProblem({
      type: "",
      severity: "",
      description: "",
      solution: " ",
      isPredefined: false,
      predefinedId: null,
    });
    showMessage("Problème ajouté au rapport");
  };

  const handleRemoveProblem = (id) => {
    setProblems((prev) => prev.filter((problem) => problem.id !== id));
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const reportData = {
        wellId: well.id,
        fileName: file.name,
        problems: noProblems ? [] : problems,
        submissionDate: new Date().toISOString(),
      };

      console.log("Report submitted:", reportData);
      showMessage("Rapport soumis avec succès!", "success");

      // Reset form after successful submission
      setTimeout(() => {
        setFile(null);
        setProblems([]);
        setNoProblems(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }, 1500);
    } catch (error) {
      console.error("Submission error:", error);
      showMessage("Erreur lors de la soumission: " + error.message, "error");
    }
  };

  const showMessage = (message, type = "info") => {
    setFormStatus({
      isSubmitting: false,
      isSuccess: type === "success",
      message,
    });
  };

  // Correction 1: Gestion améliorée de la solution
  const [showCustomSolution, setShowCustomSolution] = useState(false);

  const handleProblemChange = (field, value) => {
    if (field === "solution" && value === "other") {
      setShowCustomSolution(true);
      setCurrentProblem((prev) => ({
        ...prev,
        solution: "", // Réinitialise pour la solution personnalisée
      }));
    } else {
      setCurrentProblem((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  // Correction 2: Gestion du checkbox "Aucune solution"
  const handleNoSolutionChange = (e) => {
    const isChecked = e.target.checked;
    setCurrentProblem((prev) => ({
      ...prev,
      solution: isChecked ? "" : " ", // Utilisation d'un espace pour "avoir une solution"
    }));
    setShowCustomSolution(false);
  };

  // Nouvel état pour gérer l'affichage de la solution personnalisée
  const [showCustomSolutionInput, setShowCustomSolutionInput] = useState(false);

  // Gestion améliorée des changements de solution
  const handleSolutionChange = (value) => {
    if (value === "other") {
      setShowCustomSolutionInput(true);
      setCurrentProblem((prev) => ({
        ...prev,
        solution: "", // Réinitialise pour nouvelle solution
      }));
    } else {
      setShowCustomSolutionInput(false);
      setCurrentProblem((prev) => ({
        ...prev,
        solution: value,
      }));
    }
  };

  // Correction définitive du checkbox "Aucune solution"
  const handleNoSolutionToggle = (e) => {
    const isChecked = e.target.checked;
    setShowCustomSolutionInput(false);
    setCurrentProblem((prev) => ({
      ...prev,
      solution: isChecked ? "" : " ", // Espace pour permettre le décochage
    }));
  };

  // Rendu des champs de solution
  const renderSolutionFields = () => {
    // Si "Aucune solution" est coché
    if (currentProblem.solution === "") return null;

    // Pour problème prédéfini
    if (currentProblem.isPredefined) {
      return (
        <div className="mt-2">
          <select
            value={showCustomSolutionInput ? "other" : currentProblem.solution}
            onChange={(e) => handleSolutionChange(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
          >
            {predefinedProblems
              .find((p) => p.id === currentProblem.predefinedId)
              ?.solutions.map((solution, index) => (
                <option key={index} value={solution}>
                  {solution}
                </option>
              ))}
            <option value="other">Autre solution...</option>
          </select>

          {showCustomSolutionInput && (
            <textarea
              value={currentProblem.solution}
              onChange={(e) => handleProblemChange("solution", e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-sm h-20 mt-2"
              placeholder="Décrivez votre solution personnalisée..."
            />
          )}
        </div>
      );
    }

    // Pour problème personnalisé
    return (
      <textarea
        value={currentProblem.solution}
        onChange={(e) => handleProblemChange("solution", e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 text-sm h-20 mt-2"
        placeholder="Décrivez la solution mise en place..."
      />
    );
  };

  // Correction 3: Affichage conditionnel des champs solution
  // const renderSolutionFields = () => {
  //   if (currentProblem.solution === "") {
  //     return null; // Aucune solution sélectionnée
  //   }

  //   // Solution pour problème prédéfini
  //   if (currentProblem.isPredefined) {
  //     return (
  //       <>
  //         <select
  //           value={
  //             currentProblem.solution === "other"
  //               ? "other"
  //               : currentProblem.solution
  //           }
  //           onChange={(e) => {
  //             if (e.target.value === "other") {
  //               setShowCustomSolution(true);
  //               handleProblemChange("solution", "");
  //             } else {
  //               setShowCustomSolution(false);
  //               handleProblemChange("solution", e.target.value);
  //             }
  //           }}
  //           className="w-full border border-gray-300 rounded-md p-2 text-sm mb-2"
  //         >
  //           {predefinedProblems
  //             .find((p) => p.id === currentProblem.predefinedId)
  //             ?.solutions.map((solution, index) => (
  //               <option key={index} value={solution}>
  //                 {solution}
  //               </option>
  //             ))}
  //           <option value="other">Autre solution...</option>
  //         </select>
  //         {showCustomSolution && (
  //           <textarea
  //             value={currentProblem.solution}
  //             onChange={(e) => handleProblemChange("solution", e.target.value)}
  //             className="w-full border border-gray-300 rounded-md p-2 text-sm h-20 mt-2"
  //             placeholder="Décrivez votre solution..."
  //           />
  //         )}
  //       </>
  //     );
  //   }

  //   // Solution pour problème personnalisé
  //   return (
  //     <textarea
  //       value={currentProblem.solution}
  //       onChange={(e) => handleProblemChange("solution", e.target.value)}
  //       className="w-full border border-gray-300 rounded-md p-2 text-sm h-20"
  //       placeholder="Décrivez la solution mise en place..."
  //     />
  //   );
  // };

  return (
    <div className="bg-white rounded-lg shadow p-6 mx-auto ">
      <h2 className="text-xl font-semibold mb-6">Soumettre un rapport Excel</h2>

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
        <h3 className="text-lg font-medium mb-3 text-gray-800">
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
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-800">
            Problèmes rencontrés
          </h3>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={noProblems}
              onChange={() => {
                setNoProblems(!noProblems);
                if (!noProblems) {
                  setProblems([]);
                  setCurrentProblem({
                    type: "",
                    severity: "",
                    description: "",
                    solution: " ",
                    isPredefined: false,
                    predefinedId: null,
                  });
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
            {/* Problem Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sélectionner un problème récurrent
              </label>
              <select
                value={
                  currentProblem.isPredefined === false
                    ? "other"
                    : currentProblem.predefinedId || ""
                }
                onChange={(e) => {
                  const selectedId = e.target.value;
                  if (selectedId === "other") {
                    setCurrentProblem({
                      type: "",
                      severity: "",
                      description: "",
                      solution: " ",
                      isPredefined: false,
                      predefinedId: null,
                    });
                    showMessage(
                      "Veuillez décrire le problème manuellement",
                      "info"
                    );
                  } else if (selectedId) {
                    const selectedProblem = predefinedProblems.find(
                      (p) => p.id.toString() === selectedId
                    );
                    if (selectedProblem) {
                      setCurrentProblem({
                        type: selectedProblem.type,
                        severity: selectedProblem.severity,
                        description: selectedProblem.description,
                        solution: selectedProblem.solutions[0] || " ",
                        isPredefined: true,
                        predefinedId: selectedProblem.id,
                      });
                    }
                  }
                }}
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
              >
                <option value="">-- Sélectionner un problème --</option>
                {predefinedProblems.map((problem) => (
                  <option key={problem.id} value={problem.id}>
                    {problem.description}
                  </option>
                ))}
                <option value="other">
                  Autre problème (à définir manuellement)
                </option>
              </select>
            </div>

            {/* Problem Form */}
            {(currentProblem.description ||
              currentProblem.predefinedId === null) && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type de problème <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={currentProblem.type}
                      onChange={(e) =>
                        handleProblemChange("type", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-md p-2 text-sm"
                      required
                      disabled={currentProblem.isPredefined}
                    >
                      <option value="">Sélectionner un type</option>
                      {problemTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gravité <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={currentProblem.severity}
                      onChange={(e) =>
                        handleProblemChange("severity", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-md p-2 text-sm"
                      required
                      disabled={currentProblem.isPredefined}
                    >
                      <option value="">Sélectionner une gravité</option>
                      {severityLevels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
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
                    onChange={(e) =>
                      handleProblemChange("description", e.target.value)
                    }
                    placeholder="Décrivez le problème rencontré..."
                    className="w-full border border-gray-300 rounded-md p-2 text-sm h-20"
                    required
                    disabled={currentProblem.isPredefined}
                  />
                </div>
                {/* Solution Section - Fixed */}
             
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Solution appliquée
                    </label>
                    <label className="flex items-center text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={currentProblem.solution === ""}
                        onChange={handleNoSolutionToggle}
                        className="form-checkbox h-4 w-4 text-blue-600 mr-2"
                      />
                      Aucune solution
                    </label>
                  </div>
                  {renderSolutionFields()}
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleAddProblem}
                    disabled={!isProblemComplete}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      isProblemComplete
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Ajouter ce problème
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
                  <div
                    key={problem.id}
                    className="border border-gray-200 rounded-md p-4 bg-white shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium">{problem.description}</h5>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {problem.type}
                          </span>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              problem.severity === "Critique"
                                ? "bg-red-100 text-red-800"
                                : problem.severity === "Moyenne"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {problem.severity}
                          </span>
                        </div>
                        {problem.solution ? (
                          <div className="mt-2">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Solution:</span>{" "}
                              {problem.solution}
                            </p>
                          </div>
                        ) : (
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
                              isPredefined: problem.isPredefined || false,
                            });
                          }}
                          className="text-gray-400 hover:text-blue-500"
                          aria-label="Edit problem"
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleRemoveProblem(problem.id)}
                          className="text-gray-400 hover:text-red-500"
                          aria-label="Remove problem"
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
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
  const [selectedWell, setSelectedWell] = useState(null);
  const [submissionMethod, setSubmissionMethod] = useState(null);
  const [newReport, setNewReport] = useState(null);

  // Filter wells - only show those that are not Completed, Delayed or Not Started
  const activeWells = data.drillWells.filter(
    (well) => !["Completed", "Delayed", "Not Started"].includes(well.status)
  );

  const handleWellSelection = (wellId) => {
    const well = data.drillWells.find((w) => w.id === Number(wellId));
    setSelectedWell(well);
  };

  const initializeNewReport = () => {
    setNewReport({
      id: null,
      date: new Date().toISOString().split("T")[0],
      depth: 0,
      progress: 0,
      timeSpent: 0,
      operations: [{ startTime: "", endTime: "", description: "" }],
      formation: "",
      dailyCost: 0,
      equipmentUsed: [],
      planned_day: 1,
      actual_day: 1,
      problems: [],
      phaseId: null, // No phase selection by default
    });
  };

  if (!selectedWell) {
    return (
      <div className="bg-white rounded-lg shadow p-6  mx-auto">
        <h1 className="text-2xl mb-6">Créer un nouveau rapport journalier</h1>

        <div className="mb-6 w-2/3">
          <h2 className="text-lg  mb-3">Sélectionnez un puit</h2>

          {activeWells.length === 0 ? (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-sm text-yellow-700">
                Aucun puits en cours disponible
              </p>
            </div>
          ) : (
            <select
              onChange={(e) => handleWellSelection(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value=""
            >
              <option value="">Selectionnez un puit ...</option>
              {activeWells.map((well) => (
                <option key={well.id} value={well.id}>
                  {well.name} ({well.status})
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    );
  }

  if (!submissionMethod) {
    return (
      <div className="bg-white rounded-lg shadow p-6 max-w-5xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setSelectedWell(null)}
            className="px-5 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-300  bg-gray-200"
          >
            Retour
          </button>
          <h1 className="ml-10 text-2xl font-semibold text-gray-800">
            Méthode de soumission du rapport pour le puit : {selectedWell.name}
          </h1>
        </div>

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

  // report={newReport}
  // well={selectedWell}
  // onCancel={() => setSubmissionMethod(null)}

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
            onClick={() => {
              // Logique de sauvegarde
              console.log("Rapport soumis:", newReport);
              navigate("/");
            }}
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
            <p className="font-semibold">{selectedWell.name}</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Date</p>
            <input
              type="date"
              value={newReport.date}
              onChange={(e) =>
                setNewReport({ ...newReport, date: e.target.value })
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
                type="number"
                value={newReport.progress}
                onChange={(e) =>
                  setNewReport({ ...newReport, progress: e.target.value })
                }
                className="font-semibold w-1/2 p-1 border rounded-md"
                placeholder="Progression"
              />
              <span className="self-center">en</span>
              <input
                type="number"
                value={newReport.timeSpent}
                onChange={(e) =>
                  setNewReport({ ...newReport, timeSpent: e.target.value })
                }
                className="font-semibold w-1/2 p-1 border rounded-md"
                placeholder="Heures"
              />
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
                operations: [
                  ...prev.operations,
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
              {newReport.operations.map((op, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="time"
                      value={op.startTime || ""}
                      onChange={(e) => {
                        const updatedOps = [...newReport.operations];
                        updatedOps[index].startTime = e.target.value;
                        setNewReport({ ...newReport, operations: updatedOps });
                      }}
                      className="text-sm w-full p-1 border rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="time"
                      value={op.endTime || ""}
                      onChange={(e) => {
                        const updatedOps = [...newReport.operations];
                        updatedOps[index].endTime = e.target.value;
                        setNewReport({ ...newReport, operations: updatedOps });
                      }}
                      className="text-sm w-full p-1 border rounded-md "
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={op.description}
                      onChange={(e) => {
                        const updatedOps = [...newReport.operations];
                        updatedOps[index].description = e.target.value;
                        setNewReport({ ...newReport, operations: updatedOps });
                      }}
                      className="text-sm w-full px-1 py-2 border rounded-md  "
                      placeholder="Description de l'opération"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right ">
                    <button
                      onClick={() => {
                        const updatedOps = newReport.operations.filter(
                          (_, i) => i !== index
                        );
                        setNewReport({ ...newReport, operations: updatedOps });
                      }}
                      className="text-white hover:bg-red-700 text-sm cursor-pointer ring-2 rounded-sm px-2 py-1 ring-red-500 hover:ring-red-700 bg-red-500"
                      disabled={newReport.operations.length === 1}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Informations supplémentaires */}
      <div className="border-t pt-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Nouveau sélecteur de phase */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Phase</h3>
            <select
              value={newReport.phase}
              onChange={(e) =>
                setNewReport({ ...newReport, phase: e.target.value })
              }
              className="w-full px-1 py-1.5 border rounded-md text-gray-800"
            >
              <option value="">Sélectionner une phase</option>
              <option value="Phase 26">Phase 26" x 20" inchs</option>
              <option value="Phase 16">Phase 16" x 13" inchs</option>
              <option value="Phase 12">Phase 12" x 9" inchs</option>
              <option value="Phase 8">Phase 8" x 7" inchs</option>
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
                value={newReport.planned_day}
                onChange={(e) =>
                  setNewReport({ ...newReport, planned_day: e.target.value })
                }
                className="text-gray-800 font-normal text-sm w-16 px-1 py-1.5 border rounded-md ml-1"
              />
            </h3>
            <h3 className="font-semibold text-yellow-800 mb-2">
              Jour réel :{" "}
              <input
                type="number"
                value={newReport.actual_day}
                onChange={(e) =>
                  setNewReport({ ...newReport, actual_day: e.target.value })
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
              setNewReport((prev) => ({
                ...prev,
                problems: [
                  ...prev.problems,
                  {
                    name: "",
                    type: "",
                    severity: 1,
                    solutions: [""],
                  },
                ],
              }));
            }}
            className="bg-[#445aff] hover:bg-[#3C50E0] text-white px-3 py-2 rounded-md text-sm"
          >
            Ajouter un problème
          </button>
        </div>
        <div className="space-y-3">
          {newReport.problems.map((problem, index) => (
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
                      const updatedProblems = [...newReport.problems];
                      updatedProblems[index].name = e.target.value;
                      setNewReport({ ...newReport, problems: updatedProblems });
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
                        const updatedProblems = [...newReport.problems];
                        updatedProblems[index].type = e.target.value;
                        setNewReport({
                          ...newReport,
                          problems: updatedProblems,
                        });
                      }}
                      className="w-full px-1 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm ">Gravité</label>
                    <select
                      value={problem.severity}
                      onChange={(e) => {
                        const updatedProblems = [...newReport.problems];
                        updatedProblems[index].severity = e.target.value;
                        setNewReport({
                          ...newReport,
                          problems: updatedProblems,
                        });
                      }}
                      className="w-full px-1 py-2 border rounded-md"
                    >
                      {['Mineure', 'Moyenne', 'Critique'].map((num) => (
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
                        const updatedProblems = [...newReport.problems];
                        updatedProblems[index].solutions.push("");
                        setNewReport({
                          ...newReport,
                          problems: updatedProblems,
                        });
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
                          const updatedProblems = [...newReport.problems];
                          updatedProblems[index].solutions[solIndex] =
                            e.target.value;
                          setNewReport({
                            ...newReport,
                            problems: updatedProblems,
                          });
                        }}
                        className="w-full px-1 py-2 border rounded-md"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (problem.solutions.length <= 1) return;
                          const updatedProblems = [...newReport.problems];
                          updatedProblems[index].solutions = updatedProblems[
                            index
                          ].solutions.filter((_, i) => i !== solIndex);
                          setNewReport({
                            ...newReport,
                            problems: updatedProblems,
                          });
                        }}
                        className={`ml-2 text-red-500 hover:text-red-700 ${
                          problem.solutions.length === 1
                            ? "opacity-50 cursor-not-allowed"
                            : ""
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
                    const updatedProblems = newReport.problems.filter(
                      (_, i) => i !== index
                    );
                    setNewReport({ ...newReport, problems: updatedProblems });
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

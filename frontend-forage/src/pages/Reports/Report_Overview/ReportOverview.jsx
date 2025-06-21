import React, { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ReportOverview = () => {
  const { wellId, reportId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [editedReport, setEditedReport] = useState(null);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  const [problems, setProblems] = useState([]);
  const timePart="" ;
  const description="";
  const endTime="";
  const startTime="";

  useEffect(() => {
    const fetchReportAndProblems = async () => {
      try {
        // Fetch report
        const response = await axios.get(
          `http://localhost:9090/api/daily-reports/well/${wellId}/report/${reportId}`
        );
        setReport(response.data);
        setEditedReport(response.data);

        // Fetch problems
        const problemsResponse = await axios.get(
          `http://localhost:9090/api/problemes/rapport/${reportId}`
        );
        setProblems(problemsResponse.data);
        console.log("Problèmes récupérés:", problemsResponse.data);

      } catch (err) {
        console.error("Erreur lors du chargement:", err);
        setError("Impossible de charger les données.");
      }
    };

    fetchReportAndProblems();
  }, [wellId, reportId]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!report) {
    return <div>Chargement...</div>;
  }  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const handleInputChange = (e, field, subField = null, index = null) => {
    const value = e.target.value;
    setEditedReport((prev) => {
      const newReport = { ...prev };

      if (subField !== null && index !== null) {
        // Pour les champs imbriqués comme operations ou problems
        newReport[field][index][subField] = value;
      } else if (subField !== null) {
        // Pour les sous-champs directs
        newReport[field][subField] = value;
      } else {
        // Pour les champs de premier niveau
        newReport[field] = value;
      }

      return newReport;
    });
  };

  const handleAddOperation = () => {
    setEditedReport((prev) => ({
      ...prev,
      operations: [
        ...prev.operations,
        { startTime: "", endTime: "", description: "" },
      ],
    }));
  };

  const handleRemoveOperation = (index) => {
    setEditedReport((prev) => ({
      ...prev,
      operations: prev.operations.filter((_, i) => i !== index),
    }));
  };

  const handleAddProblem = () => {
    setEditedReport((prev) => ({
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
  };

  const handleRemoveProblem = (index) => {
    setEditedReport((prev) => ({
      ...prev,
      problems: prev.problems.filter((_, i) => i !== index),
    }));
  };

  const handleAddSolution = (problemIndex) => {
    setEditedReport((prev) => {
      const newProblems = [...prev.problems];
      // Vérifier si le dernier élément est vide avant d'en ajouter un nouveau
      if (
        newProblems[problemIndex].solutions.length === 0 ||
        newProblems[problemIndex].solutions[
          newProblems[problemIndex].solutions.length - 1
        ] !== ""
      ) {
        newProblems[problemIndex].solutions.push("");
      }
      return { ...prev, problems: newProblems };
    });
  };

  const handleRemoveSolution = (problemIndex, solutionIndex) => {
    setEditedReport((prev) => {
      const newProblems = [...prev.problems];
      newProblems[problemIndex].solutions = newProblems[
        problemIndex
      ].solutions.filter((_, i) => i !== solutionIndex);
      return { ...prev, problems: newProblems };
    });
  };

  const handleSave = () => {
    // Ici vous enverriez normalement le rapport mis à jour à votre backend
    console.log("Rapport sauvegardé :", editedReport);

    // Pour l'instant, nous sortons simplement du mode édition
    setEditMode(false);

    // Dans une vraie application, vous mettriez à jour votre store de données ici
    // et afficheriez potentiellement un message de succès
  };

  //*******hadi commentitha apr nwelilha******
  /*const handleSave = async () => {
  
    try {
      await axios.put(
        `http://localhost:9090/api/daily-reports/${reportId}`,
        formattedReport
      );
      setEditMode(false);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
      alert("Échec de la sauvegarde.");
    }
  };*/


  const handleCancel = () => {
    setEditedReport(JSON.parse(JSON.stringify(report)));
    setEditMode(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-gray-800">Rapport journalier</h1>
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="bg-[#445aff] hover:bg-[#3C50E0] text-white px-4 py-2 rounded-lg"
          >
            Modifier le Rapport
          </button>
        ) : (
          <div className="space-x-2">
            <button
              onClick={handleSave}
              className="bg-[#10B981] hover:bg-[#2ea880] text-white px-4 py-2 rounded-md"
            >
              Sauvegarder
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
            >
              Annuler
            </button>
          </div>
        )}
      </div>

      <div className="mb-6">
        <div className="mt-2 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Nom du puits</p>
            <p className="font-semibold">{editedReport.drillingWell.wellName}</p>
          </div>
          <div className="bg-gray-100  p-3 rounded-lg">
            <p className="text-sm text-gray-600">Date</p>
            {editMode ? (
              <input
                type="date"
                value={editedReport.reportDate}
                onChange={(e) => handleInputChange(e, "date")}
                className="font-semibold w-full p-1 border rounded"
              />
            ) : (
              <p className="font-semibold">{formatDate(editedReport.reportDate)}</p>
            )}
          </div>
          <div className="bg-gray-100  p-3 rounded-lg">
            <p className="text-sm text-gray-600">Profondeur</p>
            {editMode ? (
              <input
                type="text"
                value={editedReport.depth}
                onChange={(e) => handleInputChange(e, "depth")}
                className="font-semibold w-full p-1 border rounded"
              />
            ) : (
              <p className="font-semibold">{editedReport.depth} ft</p>
            )}
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Progression</p>
            {editMode ? (
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={editedReport.progress}
                  onChange={(e) => handleInputChange(e, "progress")}
                  className="font-semibold w-1/2 p-1 border rounded"
                  placeholder="Progression"
                />
              </div>
            ) : (
              <p className="font-semibold">
                {editedReport.progress} 
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg ">Description des opérations</h2>
          {editMode && (
            <button
              onClick={handleAddOperation}
              className="bg-[#445aff] hover:bg-[#3C50E0] text-white px-3 py-2 rounded-md text-sm"
            >
              Ajouter une opération
            </button>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Début
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Fin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Description
                </th>
                {editMode && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {editedReport.workDone?.map((op, index) => {
                const [timePart = "", description = ""] = op.split(": ");
                const [startTime = "", endTime = ""] = timePart.split(" - ");

                return (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editMode ? (
                        <input
                          type="time"
                          value={startTime}
                          onChange={(e) =>
                            handleInputChange(e, "operations", "startTime", index)
                          }
                          className="text-sm w-full p-1 border rounded"
                        />
                      ) : (
                        <span className="text-sm text-gray-500">
                          {startTime || ""}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editMode ? (
                        <input
                          type="time"
                          value={endTime}
                          onChange={(e) =>
                            handleInputChange(e, "operations", "endTime", index)
                          }
                          className="text-sm w-full p-1 border rounded"
                        />
                      ) : (
                        <span className="text-sm text-gray-500">
                          {endTime || ""}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editMode ? (
                        <input
                          type="text"
                          value={description}
                          onChange={(e) =>
                            handleInputChange(e, "operations", "description", index)
                          }
                          className="text-sm w-full p-1 border rounded"
                        />
                      ) : (
                        <span className="text-sm text-gray-500">
                          {description || "N/A"}
                        </span>
                      )}
                    </td>
                    {editMode && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleRemoveOperation(index)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Supprimer
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="border-t pt-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Phase</h3>
            <p>{editedReport.phaseName}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">
              Coût journalier
            </h3>
            {editMode ? (
              <input
                type="number"
                value={editedReport.dailyCost}
                onChange={(e) => handleInputChange(e, "dailyCost")}
                className="w-full p-1 border rounded"
              />
            ) : (
              <p>{editedReport.dailyCost?.toLocaleString("fr-FR")} US$</p>
            )}
          </div>
          {/* <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">
              Équipement utilisé
            </h3>
            {editMode ? (
              <textarea
                value={editedReport.equipmentUsed?.join(", ")}
                onChange={(e) =>
                  handleInputChange(
                    e,
                    "equipmentUsed",
                    e.target.value.split(", ")
                  )
                }
                className="text-sm w-full p-1 border rounded"
                placeholder="Séparer les éléments par des virgules"
              />
            ) : (
              <div className="text-sm">
                {editedReport.equipmentUsed?.join(", ") || "N/A"}
              </div>
            )}
          </div> */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">
              Jour prévu :{" "}
              {editMode ? (
                <input
                  type="number"
                  value={editedReport.plannedDay}
                  onChange={(e) => handleInputChange(e, "plannedDay")}
                  className="text-gray-800 font-normal text-sm w-16 p-1 border rounded ml-1"
                />
              ) : (
                <span className="text-gray-800 font-normal text-sm">
                  {editedReport.plannedDay}
                </span>
              )}
            </h3>
            <h3 className="font-semibold text-yellow-800 mb-2">
              Jour réel :{" "}
              {editMode ? (
                <input
                  type="number"
                  value={editedReport.actualDay}
                  onChange={(e) => handleInputChange(e, "actual_day")}
                  className="text-gray-800 font-normal text-sm w-16 p-1 border rounded ml-1"
                />
              ) : (
                <span className="text-gray-800 font-normal text-sm">
                  {editedReport.actualDay}
                </span>
              )}
            </h3>
          </div>
        </div>
      </div>

      <div className="border-t pt-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg ">Problemes signalés</h2>
          {editMode && (
            <button
              onClick={handleAddProblem}
              className="bg-[#445aff] hover:bg-[#3C50E0] text-white px-3 py-2 rounded-md text-sm"
            >
              Ajouter un problème
            </button>
          )}
        </div>
        <div className="space-y-3">
          {problems && problems.length > 0 ? (
            problems.map((problem) => (
              <div key={problem.id} className="bg-red-50 p-3 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-red-800">{problem.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {problem.type}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        problem.gravite === 3 ? 'bg-red-100 text-red-800' :
                        problem.gravite === 2 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        Gravité: {problem.gravite}
                      </span>
                    </div>
                    {problem.solutions && problem.solutions.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700">Solutions proposées :</p>
                        <ul className="list-disc pl-5 text-sm text-gray-600">
                          {problem.solutions.map((solution, i) => (
                            <li key={i}>{solution}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">Aucun problème signalé</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportOverview;
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import data from "../../../data/data";

const ReportOverview = () => {
  const { wellId, phaseId, reportId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [editedReport, setEditedReport] = useState(null);

  // Trouver le puits, la phase et le rapport dans les données
  const well = data.drillWells.find((w) => w.id === Number(wellId));
  const phase = well?.phases.find((p) => p.id === Number(phaseId));
  const originalReport = phase?.dailyReports.find(
    (r) => r.id === Number(reportId)
  );

  // Initialiser editedReport quand originalReport est disponible
  React.useEffect(() => {
    if (originalReport && !editedReport) {
      setEditedReport(JSON.parse(JSON.stringify(originalReport)));
    }
  }, [originalReport]);

  if (!phase) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-red-500">
        Phase non trouvée
      </div>
    );
  }

  if (!originalReport || !editedReport) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-red-500">
        Rapport non trouvé
      </div>
    );
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

  const handleCancel = () => {
    setEditedReport(JSON.parse(JSON.stringify(originalReport)));
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
            <p className="font-semibold">{well.name}</p>
          </div>
          <div className="bg-gray-100  p-3 rounded-lg">
            <p className="text-sm text-gray-600">Date</p>
            {editMode ? (
              <input
                type="date"
                value={editedReport.date}
                onChange={(e) => handleInputChange(e, "date")}
                className="font-semibold w-full p-1 border rounded"
              />
            ) : (
              <p className="font-semibold">{formatDate(editedReport.date)}</p>
            )}
          </div>
          <div className="bg-gray-100  p-3 rounded-lg">
            <p className="text-sm text-gray-600">Profondeur</p>
            {editMode ? (
              <input
                type="number"
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
                  type="number"
                  value={editedReport.progress}
                  onChange={(e) => handleInputChange(e, "progress")}
                  className="font-semibold w-1/2 p-1 border rounded"
                  placeholder="Progression"
                />
                <span className="self-center">en</span>
                <input
                  type="number"
                  value={editedReport.timeSpent}
                  onChange={(e) => handleInputChange(e, "timeSpent")}
                  className="font-semibold w-1/2 p-1 border rounded"
                  placeholder="Heures"
                />
              </div>
            ) : (
              <p className="font-semibold">
                {editedReport.progress} ft en {editedReport.timeSpent}h
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
              {editedReport.operations?.map((op, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editMode ? (
                      <input
                        type="time"
                        value={op.startTime || ""}
                        onChange={(e) =>
                          handleInputChange(e, "operations", "startTime", index)
                        }
                        className="text-sm w-full p-1 border rounded"
                      />
                    ) : (
                      <span className="text-sm text-gray-500">
                        {op.startTime || "N/A"}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editMode ? (
                      <input
                        type="time"
                        value={op.endTime || ""}
                        onChange={(e) =>
                          handleInputChange(e, "operations", "endTime", index)
                        }
                        className="text-sm w-full p-1 border rounded"
                      />
                    ) : (
                      <span className="text-sm text-gray-500">
                        {op.endTime || "N/A"}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editMode ? (
                      <input
                        type="text"
                        value={op.description}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            "operations",
                            "description",
                            index
                          )
                        }
                        className="text-sm w-full p-1 border rounded"
                      />
                    ) : (
                      <span className="text-sm text-gray-500">
                        {op.description}
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
              ))}
            </tbody>
          </table>
        </div>
        {editedReport.formation && (
          <div className="mt-2">
            {editMode ? (
              <input
                type="text"
                value={editedReport.formation}
                onChange={(e) => handleInputChange(e, "formation")}
                className="text-sm italic w-full p-1 border rounded"
                placeholder="Notes sur la formation"
              />
            ) : (
              <div className="text-sm italic text-gray-500">
                *{editedReport.formation}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="border-t pt-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Phase</h3>
            <p>{phase.name}</p>
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
                  value={editedReport.planned_day}
                  onChange={(e) => handleInputChange(e, "planned_day")}
                  className="text-gray-800 font-normal text-sm w-16 p-1 border rounded ml-1"
                />
              ) : (
                <span className="text-gray-800 font-normal text-sm">
                  {editedReport.planned_day}
                </span>
              )}
            </h3>
            <h3 className="font-semibold text-yellow-800 mb-2">
              Jour réel :{" "}
              {editMode ? (
                <input
                  type="number"
                  value={editedReport.actual_day}
                  onChange={(e) => handleInputChange(e, "actual_day")}
                  className="text-gray-800 font-normal text-sm w-16 p-1 border rounded ml-1"
                />
              ) : (
                <span className="text-gray-800 font-normal text-sm">
                  {editedReport.actual_day}
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
          {editedReport.problems?.map((problem, index) => (
            <div key={index} className="bg-red-50 p-3 rounded-lg">
              {editMode ? (
                <div className="space-y-2">
                  <div>
                    <label className="text-sm font-medium text-red-800">
                      Nom du problème
                    </label>
                    <input
                      type="text"
                      value={problem.name}
                      onChange={(e) =>
                        handleInputChange(e, "problems", "name", index)
                      }
                      className="w-full p-1 border rounded"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-sm font-medium">Type</label>
                      <input
                        type="text"
                        value={problem.type}
                        onChange={(e) =>
                          handleInputChange(e, "problems", "type", index)
                        }
                        className="w-full p-1 border rounded"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Gravité</label>
                      <select
                        value={problem.severity}
                        onChange={(e) =>
                          handleInputChange(e, "problems", "severity", index)
                        }
                        className="w-full p-1 border rounded"
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
                      <label className="text-sm font-medium">Solutions</label>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddSolution(index);
                        }}
                        className="text-blue-500 font-semibold hover:text-blue-700 text-sm"
                      >
                        Ajouter une solution
                      </button>
                    </div>
                    {problem.solutions?.map((solution, solIndex) => (
                      <div key={solIndex} className="flex items-center mt-1">
                        <input
                          type="text"
                          value={solution}
                          onChange={(e) => {
                            const newProblems = [...editedReport.problems];
                            newProblems[index].solutions[solIndex] =
                              e.target.value;
                            setEditedReport({
                              ...editedReport,
                              problems: newProblems,
                            });
                          }}
                          className="w-full p-1 border rounded"
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemoveSolution(index, solIndex);
                          }}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handleRemoveProblem(index)}
                    className="text-red-500 font-semibold hover:text-red-700 text-sm"
                  >
                    Supprimer le problème
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-medium text-red-800">{problem.name}</h3>
                  <p className="text-gray-700">Type : {problem.type}</p>
                  <p className="text-gray-700">Gravité : {problem.severity}</p>
                  {problem.solutions?.length > 0 && (
                    <div className="mt-1">
                      <p className="text-sm font-medium">Solutions :</p>
                      <ul className="list-disc pl-5 text-sm">
                        {problem.solutions.map((solution, i) => (
                          <li key={i}>{solution}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportOverview;

import React from "react";
import { useParams, Link } from "react-router-dom";
const DrillingPlanning = () => {
  // const { wellId } = useParams();

  // // Find the well in your data
  // const well = data.drillWells.find(w => w.id === Number(wellId));
  const phases = [
    {
      phase: '26" x 20" inchs',
      depth: "3300ft",
      operations: [
        {
          operation: 'Drilling 26" hole into Albian',
          cost: 800000,
          cumulativeCost: 800000,
          duration: "1",
          cumulativeDuration: "1",
        },
        {
          operation: 'POOH. Run & cement 20" casing. Drill out shoe.',
          cost: 225000,
          cumulativeCost: 1025000,
          duration: "1",
          cumulativeDuration: "2",
        },
      ],
    },
    {
      phase: '16" x 13" inchs',
      depth: "3000ft",
      operations: [
        {
          operation: 'Drilling 16" hole to base Dembaba',
          cost: 1200000,
          cumulativeCost: 2225000,
          duration: "10",
          cumulativeDuration: "12",
        },
        {
          operation:
            'Logging. Run & cement 13 3/8" casing. Install wellhead. Test BOP.',
          cost: 555000,
          cumulativeCost: 2780000,
          duration: "3",
          cumulativeDuration: "15",
        },
      ],
    },
    {
      phase: '12" x 9" inchs',
      depth: "2800ft",
      operations: [
        {
          operation: 'Drilling 12 1/4" section to top Tahara',
          cost: 1500000,
          cumulativeCost: 4280000,
          duration: "5",
          cumulativeDuration: "20",
        },
        {
          operation:
            'POOH. Logging. Run & cement 9 5/8" casing. Drill out shoe.',
          cost: 555000,
          cumulativeCost: 4835000,
          duration: "3",
          cumulativeDuration: "23",
        },
      ],
    },
    {
      phase: '8" x 7" inchs',
      depth: "500ft",
      operations: [
        {
          operation: 'Drilling 8 1/2" section',
          cost: 1500000,
          cumulativeCost: 6335000,
          duration: "12",
          cumulativeDuration: "35",
        },
        {
          operation: 'Coring (6 cores) in 8 1/2"',
          cost: 50000,
          cumulativeCost: 6385000,
          duration: "8",
          cumulativeDuration: "43",
        },
        {
          operation: 'POOH. Logging. Run & cement 7" liner.',
          cost: 555000,
          cumulativeCost: 6940000,
          duration: "7",
          cumulativeDuration: "50",
        },
        {
          operation: 'Wiper trip. CBL/VDL on 7" liner.',
          cost: 200000,
          cumulativeCost: 7140000,
          duration: "2",
          cumulativeDuration: "52",
        },
        {
          operation: "Perfs & DST (5 levels)",
          cost: 1100000,
          cumulativeCost: 8240000,
          duration: "15",
          cumulativeDuration: "67",
        },
        {
          operation: "Plug and abandon. Rig release.",
          cost: 700000,
          cumulativeCost: 8240000,
          duration: "2",
          cumulativeDuration: "69",
        },
      ],
    },
    {
      phase: "Others",
      operations: [
        {
          operation:
            "Mud logging, drilling mud, well head, casing accessories, safety, etc.",
          cost: 1060000,
          cumulativeCost: 10000000,
          duration: "-",
          cumulativeDuration: "-",
        },
      ],
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl text-gray-800 mb-6">Planning du forage</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="border-b-2 border-[#e4e4e4] bg-[#ececec] text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
              <th className="px-6 py-3 rounded-tl-lg ">Phase</th>
              <th className="px-6 py-3 ">Profondeur</th>
              <th className="px-6 py-3 ">Operation</th>
              <th className="px-6 py-3 ">Coût (USD)</th>
              <th className="px-6 py-3 ">Coût cummulés</th>
              <th className="px-6 py-3 ">Délais (jours)</th>
              <th className="px-6 py-3 rounded-tr-lg">Délais cummulés</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {phases.map((phase, phaseIndex) => (
              <React.Fragment key={phaseIndex}>
                {phase.operations.map((op, opIndex) => (
                  <tr
                    key={`${phaseIndex}-${opIndex}`}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {opIndex === 0 && (
                      <>
                        <td
                          rowSpan={phase.operations.length}
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 align-top border-r border-gray-100"
                        >
                          {phase.phase}
                        </td>
                        <td
                          rowSpan={phase.operations.length}
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 align-top border-r border-gray-100"
                        >
                          {phase.depth}
                        </td>
                      </>
                    )}
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {op.operation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-left">
                      {new Intl.NumberFormat("en-US").format(op.cost)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-left">
                      {new Intl.NumberFormat("en-US").format(op.cumulativeCost)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                      {op.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                      {op.cumulativeDuration}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
            <tr className="bg-gray-100 font-semibold">
              <td
                colSpan="1"
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
              >
                Total
              </td>
               <td colSpan="2" className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-left">
                9600ft
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-left">
                {new Intl.NumberFormat("en-US").format(10800000)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                69
              </td>
             
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DrillingPlanning;

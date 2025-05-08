import React from 'react';
import { useParams, Link } from 'react-router-dom';
const DrillingPlanning = () => {
    // const { wellId } = useParams();
    
    
    // // Find the well in your data
    // const well = data.drillWells.find(w => w.id === Number(wellId));
  const phases = [
    {
      phase: '26" x 20" inchs',
      operations: [
        {
          operation: 'Drilling 26" hole into Albian',
          cost: '800,000',
          cumulativeCost: '800,000',
          duration: '1',
          cumulativeDuration: '1'
        },
        {
          operation: 'POOH. Run & cement 20" casing. Drill out shoe.',
          cost: '225,000',
          cumulativeCost: '1,025,000',
          duration: '1',
          cumulativeDuration: '2'
        }
      ]
    },
    {
      phase: '16" x 13" inchs',
      operations: [
        {
          operation: 'Drilling 16" hole to base Dembaba',
          cost: '1,200,000',
          cumulativeCost: '2,225,000',
          duration: '10',
          cumulativeDuration: '12'
        },
        {
          operation: 'Logging. Run & cement 13 3/8" casing. Install wellhead. Test BOP.',
          cost: '555,000',
          cumulativeCost: '2,780,000',
          duration: '3',
          cumulativeDuration: '15'
        }
      ]
    },
    {
      phase: '12" x 9" inchs',
      operations: [
        {
          operation: 'Drilling 12 1/4" section to top Tahara',
          cost: '1,500,000',
          cumulativeCost: '4,280,000',
          duration: '5',
          cumulativeDuration: '20'
        },
        {
          operation: 'POOH. Logging. Run & cement 9 5/8" casing. Drill out shoe.',
          cost: '555,000',
          cumulativeCost: '4,835,000',
          duration: '3',
          cumulativeDuration: '23'
        }
      ]
    },
    {
      phase: '8" x 7" inchs',
      operations: [
        {
          operation: 'Drilling 8 1/2" section',
          cost: '1,500,000',
          cumulativeCost: '6,335,000',
          duration: '12',
          cumulativeDuration: '35'
        },
        {
          operation: 'Coring (6 cores) in 8 1/2"',
          cost: '50,000',
          cumulativeCost: '6,385,000',
          duration: '8',
          cumulativeDuration: '43'
        },
        {
          operation: 'POOH. Logging. Run & cement 7" liner.',
          cost: '555,000',
          cumulativeCost: '6,940,000',
          duration: '7',
          cumulativeDuration: '50'
        },
        {
          operation: 'Wiper trip. CBL/VDL on 7" liner.',
          cost: '200,000',
          cumulativeCost: '7,140,000',
          duration: '2',
          cumulativeDuration: '52'
        },
        {
          operation: 'Perfs & DST (5 levels)',
          cost: '1,100,000',
          cumulativeCost: '8,240,000',
          duration: '15',
          cumulativeDuration: '67'
        },
        {
          operation: 'Plug and abandon. Rig release.',
          cost: '700,000',
          cumulativeCost: '8,240,000',
          duration: '2',
          cumulativeDuration: '69'
        }
      ]
    },
    {
      phase: 'Others',
      operations: [
        {
          operation: 'Mud logging, drilling mud, well head, casing accessories, safety, etc.',
          cost: '1,060,000',
          cumulativeCost: '10,000,000',
          duration: '-',
          cumulativeDuration: '-'
        }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Planning du forage</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phase</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coût (USD)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coût cummulés</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Délais (jours)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Délais cummulés</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {phases.map((phase, phaseIndex) => (
              <React.Fragment key={phaseIndex}>
                {phase.operations.map((op, opIndex) => (
                  <tr key={`${phaseIndex}-${opIndex}`}>
                    {opIndex === 0 ? (
                      <td rowSpan={phase.operations.length} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 align-top">
                        {phase.phase}
                      </td>
                    ) : null}
                    <td className="px-6 py-4 text-sm text-gray-500">{op.operation}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{op.cost}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{op.cumulativeCost}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{op.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{op.cumulativeDuration}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
            <tr className="bg-gray-50">
              <td colSpan="2" className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10,000,000</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">69</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mr-2">
          Exporter en PDF
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          Imprimer
        </button>
      </div>
    </div>
  );
};

export default DrillingPlanning;
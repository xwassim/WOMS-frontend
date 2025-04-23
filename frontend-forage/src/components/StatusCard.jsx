const StatusCard = ({ title, value, status, date }) => {
    const getStatusColor = () => {
      switch(status.toLowerCase()) {
        case 'dangerous': return 'bg-red-500';
        case 'excellent': return 'bg-green-500';
        default: return 'bg-blue-500';
      }
    };
  
    return (
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-medium mb-2">{title}</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-3xl font-bold">{value}</span>
          <span className={`${getStatusColor()} text-white px-2 py-1 rounded text-sm`}>
            {status}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`${getStatusColor()} h-2 rounded-full`}
            style={{ width: `${value}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">Mis à jour le {date}</p>
      </div>
    );
  };
  
  export default StatusCard;
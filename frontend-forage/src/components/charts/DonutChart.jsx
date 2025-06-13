import React from 'react';

const DonutChart = ({ data, size = 200 }) => {
  const viewBoxSize = 100;
  const radius = 40;
  const innerRadius = 25; // for donut hole
  const center = viewBoxSize / 2;
  
  // Calculate total for percentages
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // If no data or total is 0, show empty chart
  if (total === 0) {
    return (
      <div className="flex items-center justify-center" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} width={size} height={size}>
          <circle 
            cx={center} 
            cy={center} 
            r={radius} 
            fill="none" 
            stroke="#e0e0e0" 
            strokeWidth="15"
          />
        </svg>
        <div className="absolute">
          <span className="text-sm text-gray-400">No data</span>
        </div>
      </div>
    );
  }
  
  // Generate slices
  let accumulatedPercentage = 0;
  
  const slices = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const startPercentage = accumulatedPercentage;
    accumulatedPercentage += percentage;
    
    return {
      ...item,
      percentage,
      startPercentage,
      endPercentage: accumulatedPercentage,
    };
  });
  
  // Convert percentage to coordinates on the circle
  const percentageToCoordinates = (percentage, radius) => {
    const angle = (percentage / 100) * 360;
    const angleInRadians = ((angle - 90) * Math.PI) / 180;
    const x = center + radius * Math.cos(angleInRadians);
    const y = center + radius * Math.sin(angleInRadians);
    return { x, y };
  };
  
  // Generate SVG path for each slice
  const createSlicePath = (slice) => {
    // If it's 100%, create a complete circle
    if (slice.percentage >= 100) {
      return `M ${center} ${center - radius} 
              A ${radius} ${radius} 0 1 1 ${center - 0.001} ${center - radius} 
              Z`;
    }
    
    // For other percentages
    const start = percentageToCoordinates(slice.startPercentage, radius);
    const end = percentageToCoordinates(slice.endPercentage, radius);
    
    // Determine if the arc should be the large arc (more than 180 degrees)
    const largeArcFlag = slice.percentage > 50 ? 1 : 0;
    
    // Create the outer arc
    const outerPath = `M ${center} ${center} 
                      L ${start.x} ${start.y} 
                      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y} 
                      Z`;
                      
    return outerPath;
  };
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} width={size} height={size}>
        {/* Background circle (when no data) */}
        {total === 0 && (
          <circle 
            cx={center} 
            cy={center} 
            r={radius} 
            fill="none" 
            stroke="#e0e0e0" 
            strokeWidth="15"
          />
        )}
        
        {/* Slices */}
        {slices.map((slice, index) => (
          <path
            key={index}
            d={createSlicePath(slice)}
            fill={slice.color}
            className="transition-all duration-500 hover:opacity-90"
          />
        ))}
        
        {/* Inner circle for donut hole */}
        <circle cx={center} cy={center} r={innerRadius} fill="white" />
      </svg>
      
      {/* Total in the center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold">{total}</span>
      </div>
    </div>
  );
};

export default DonutChart;
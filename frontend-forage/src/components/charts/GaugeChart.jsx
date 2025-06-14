import React from 'react';

const GaugeChart = ({ value, color, size = 200 }) => {
  // Calculate the SVG parameters
  const viewBoxSize = 100;
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const startAngle = 0;
  const endAngle = 180;
  const angleRange = endAngle - startAngle;
  const svgProgress = (value / 100) * angleRange;
  const progressAngle = startAngle + svgProgress;
  
  // Calculate the SVG arc path
  const createArc = (startAngleValue, endAngleValue) => {
    const start = polarToCartesian(50, 50, radius, endAngleValue);
    const end = polarToCartesian(50, 50, radius, startAngleValue);
    const largeArcFlag = endAngleValue - startAngleValue <= 180 ? '0' : '1';
    
    return [
      'M', start.x, start.y, 
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ');
  };
  
  // Convert polar coordinates to Cartesian
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };
  
  // Background arc (gray)
  const backgroundArc = createArc(startAngle, endAngle);
  
const cappedProgressAngle = Math.min(progressAngle, 180);
const progressArc = createArc(startAngle, cappedProgressAngle);
  return (
    <div className="relative " style={{ width: size, height: 130 }}>
      <svg 
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background Arc */}
        <path
          d={backgroundArc}
          fill="none"
          stroke="#e0e0e0"
          strokeWidth="8"
          strokeLinecap="round"
        />
        
        {/* Progress Arc */}
        <path
          d={progressArc}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      
      {/* Percentage Text */}
      <div className="absolute top-10 inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold">{value}%</span>
      </div>
    </div>
  );
};

export default GaugeChart;
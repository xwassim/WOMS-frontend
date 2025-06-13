import React, { createContext, useContext, useState } from 'react';
import data from './data';

const WellDataContext = createContext();

export const useWellData = () => {
  const context = useContext(WellDataContext);
  if (!context) {
    throw new Error('useWellData must be used within a WellDataProvider');
  }
  return context;
};

export const WellDataProvider = ({ children }) => {
  const [selectedWellId, setSelectedWellId] = useState(1); // Default to first well
  
  const selectedWell = data.drillWells.find(well => well.id === selectedWellId);

  return (
    <WellDataContext.Provider value={{ selectedWellId, setSelectedWellId, selectedWell }}>
      {children}
    </WellDataContext.Provider>
  );
};
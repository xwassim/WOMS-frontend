import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Divider,
  LinearProgress,
  CircularProgress
} from '@mui/material';
import { PieChart, BarChart } from '@mui/x-charts';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import data from '../../data/data';

const PhaseDashboard = () => {
  const { wellId } = useParams();
  const [selectedPhase, setSelectedPhase] = useState(null);
  
  // Find the well in your data
  const well = data.drillWells.find(w => w.id === Number(wellId));

  if (!well) {
    return (
      <Box p={4} color="error.main">
        Well not found
      </Box>
    );
  }

  // Format cost for display
  const formatCost = (cost) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(cost);
  };

  // Calculate phase metrics
  const calculatePhaseMetrics = (phase) => {
    const totalCost = phase.totalCost;
    const plannedCost = well.planning?.phases?.find(p => p.id === phase.id)?.totalCost || totalCost;
    const costPercentage = Math.min(100, Math.round((totalCost / plannedCost) * 100));
    
    const totalDuration = phase.dailyReports.reduce((sum, report) => sum + report.timeSpent, 0) / 24;
    const plannedDuration = well.planning?.phases?.find(p => p.id === phase.id)?.totalDuration || totalDuration;
    const delayPercentage = Math.min(100, Math.round((totalDuration / plannedDuration) * 100));
    
    const problems = phase.dailyReports.flatMap(report => 
      report.problems?.map(problem => ({
        ...problem,
        date: report.date,
        phaseName: phase.name
      })) || []
    );

    // Calculate problem distribution by severity
    const severityCounts = [0, 0, 0];
    problems.forEach(problem => {
      if (problem.severity >= 1 && problem.severity <= 3) {
        severityCounts[problem.severity - 1]++;
      }
    });

    return {
      costPercentage,
      delayPercentage,
      totalCost,
      plannedCost,
      totalDuration: Math.round(totalDuration),
      plannedDuration: Math.round(plannedDuration),
      problems,
      problemDistribution: {
        data: [
          { id: 0, value: severityCounts[0], label: 'Critique (1)', color: '#ef4444' },
          { id: 1, value: severityCounts[1], label: 'Moyen (2)', color: '#eab308' },
          { id: 2, value: severityCounts[2], label: 'Mineur (3)', color: '#22c55e' }
        ],
        total: severityCounts.reduce((sum, count) => sum + count, 0)
      }
    };
  };

  // Get all problems from all phases
  const allProblems = well.phases.flatMap(phase => 
    phase.dailyReports.flatMap(report => 
      report.problems?.map(problem => ({
        ...problem,
        date: report.date,
        phaseName: phase.name
      })) || []
    )
  );

  // Handle phase selection
  const handlePhaseSelect = (phase) => {
    setSelectedPhase({
      ...phase,
      metrics: calculatePhaseMetrics(phase)
    });
  };

  return (
    <Box sx={{ p: 0 }}>
      {/* Header with Back button */}
      

      {/* Phase Selection */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Sélectionnez une phase</Typography>
        <Grid container spacing={2}>
          {well.phases.map((phase) => (
            <Grid item xs={12} sm={6} md={3} key={phase.id}>
              <Button
                fullWidth
                onClick={() => handlePhaseSelect(phase)}
                sx={{
                  p: 3,
                  height: '100%',
                  border: selectedPhase?.id === phase.id ? '2px solid #1976d2' : '1px solid #e0e0e0',
                  backgroundColor: selectedPhase?.id === phase.id ? '#f0f7ff' : 'background.paper',
                  '&:hover': {
                    backgroundColor: selectedPhase?.id === phase.id ? '#e0f0ff' : '#f5f5f5'
                  },
                  textTransform: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}
              >
                <Typography fontWeight="medium">{phase.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {phase.dailyReports.length} rapports
                </Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Selected Phase Dashboard */}
      {selectedPhase && (
        <>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
              {selectedPhase.name}
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 2 }}>
              {/* Cost Status - Gauge Chart */}
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                  État des Coûts
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">
                    Réel: {formatCost(selectedPhase.metrics.totalCost)}
                  </Typography>
                  <Typography variant="body2">
                    Prévu: {formatCost(selectedPhase.metrics.plannedCost)}
                  </Typography>
                </Box>
                
                <Box sx={{ height: 200, display: 'flex', justifyContent: 'center' }}>
                  <Gauge
                    width={300}
                    height={200}
                    value={selectedPhase.metrics.costPercentage}
                    valueMin={0}
                    valueMax={100}
                    startAngle={-110}
                    endAngle={110}
                    text={({ value, valueMax }) => `${value}%`}
                    cornerRadius="50%"
                    sx={{
                      [`& .${gaugeClasses.valueArc}`]: {
                        fill: selectedPhase.metrics.costPercentage >= 90 ? '#ef4444' : 
                              selectedPhase.metrics.costPercentage >= 80 ? '#eab308' : '#3b82f6'
                      },
                      [`& .${gaugeClasses.referenceArc}`]: {
                        fill: '#e0e0e0'
                      }
                    }}
                  />
                </Box>
                
                <Typography 
                  variant="body2" 
                  color={selectedPhase.metrics.costPercentage >= 100 ? 'error.main' : 'success.main'}
                  sx={{ textAlign: 'center' }}
                >
                  {selectedPhase.metrics.costPercentage >= 100 ? 
                    'Dépassement de budget' : 'Dans le budget'}
                </Typography>
              </Grid>

              {/* Delay Status - Gauge Chart */}
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                  État des Délais
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">
                    Réel: {selectedPhase.metrics.totalDuration} jours
                  </Typography>
                  <Typography variant="body2">
                    Prévu: {selectedPhase.metrics.plannedDuration} jours
                  </Typography>
                </Box>
                
                <Box sx={{ height: 200, display: 'flex', justifyContent: 'center' }}>
                  <Gauge
                    width={300}
                    height={200}
                    value={selectedPhase.metrics.delayPercentage}
                    valueMin={0}
                    valueMax={100}
                    startAngle={-110}
                    endAngle={110}
                    text={({ value, valueMax }) => `${value}%`}
                    cornerRadius="50%"
                    sx={{
                      [`& .${gaugeClasses.valueArc}`]: {
                        fill: selectedPhase.metrics.delayPercentage >= 90 ? '#ef4444' : 
                              selectedPhase.metrics.delayPercentage >= 80 ? '#eab308' : '#22c55e'
                      },
                      [`& .${gaugeClasses.referenceArc}`]: {
                        fill: '#e0e0e0'
                      }
                    }}
                  />
                </Box>
                
                <Typography 
                  variant="body2" 
                  color={selectedPhase.metrics.totalDuration > selectedPhase.metrics.plannedDuration ? 'error.main' : 'success.main'}
                  sx={{ textAlign: 'center' }}
                >
                  {selectedPhase.metrics.totalDuration > selectedPhase.metrics.plannedDuration ? 
                    `Retard: +${selectedPhase.metrics.totalDuration - selectedPhase.metrics.plannedDuration} jours` : 
                    'Dans les délais'}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
              Description
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {selectedPhase.description}
            </Typography>
          </Paper>

          {/* Problems and Solutions */}
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
              Problèmes rencontrés ({selectedPhase.metrics.problems.length})
            </Typography>
            
            {selectedPhase.metrics.problems.length > 0 ? (
              <>
                {/* Problem Distribution Pie Chart */}
                {selectedPhase.metrics.problemDistribution.total > 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Répartition par gravité</Typography>
                    <Box sx={{ height: 300 }}>
                      <PieChart
                        series={[
                          {
                            data: selectedPhase.metrics.problemDistribution.data,
                            innerRadius: 30,
                            outerRadius: 100,
                            paddingAngle: 5,
                            cornerRadius: 5,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                          }
                        ]}
                        slotProps={{
                          legend: {
                            direction: 'row',
                            position: { vertical: 'bottom', horizontal: 'middle' },
                            padding: 0,
                          },
                        }}
                      />
                    </Box>
                  </Box>
                )}

                {/* Problems Table */}
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: 'grey.100' }}>
                        <TableCell>Date</TableCell>
                        <TableCell>Problème</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Solutions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedPhase.metrics.problems.slice(0, 5).map((problem, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Typography variant="body2">
                              {new Date(problem.date).toLocaleDateString('fr-FR')}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography fontWeight="medium">{problem.name}</Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={`${problem.type} (Niv. ${problem.severity})`}
                              size="small"
                              sx={{
                                backgroundColor: 
                                  problem.severity === 3 ? 'error.light' :
                                  problem.severity === 2 ? 'warning.light' : 'success.light',
                                color: 
                                  problem.severity === 3 ? 'error.dark' :
                                  problem.severity === 2 ? 'warning.dark' : 'success.dark'
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            {problem.solutions?.length > 0 ? (
                              <ul style={{ margin: 0, paddingLeft: 20 }}>
                                {problem.solutions.map((solution, i) => (
                                  <li key={i}>
                                    <Typography variant="body2">{solution}</Typography>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <Typography variant="body2" color="text.secondary">
                                Aucune solution proposée
                              </Typography>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                
                {selectedPhase.metrics.problems.length > 5 && (
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      Affichage des 5 premiers problèmes -{' '}
                      <Button 
                        size="small"
                        onClick={() => {/* Implement view all functionality */}}
                      >
                        Voir tous les problèmes
                      </Button>
                    </Typography>
                  </Box>
                )}
              </>
            ) : (
              <Typography color="text.secondary">Aucun problème rapporté dans cette phase</Typography>
            )}
          </Paper>
        </>
      )}

      {/* All Problems Summary (when no phase selected) */}
      {!selectedPhase && allProblems.length > 0 && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
            Problèmes récents sur tous les phases ({allProblems.length})
          </Typography>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.100' }}>
                  <TableCell>Phase</TableCell>
                  <TableCell>Problème</TableCell>
                  <TableCell>Statut</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allProblems.slice(0, 5).map((problem, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <Typography variant="body2">{problem.phaseName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight="medium">{problem.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={problem.status || 'Open'}
                        size="small"
                        sx={{
                          backgroundColor: 
                            problem.status === 'Resolved' ? 'success.light' :
                            problem.status === 'In Progress' ? 'warning.light' : 'error.light',
                          color: 
                            problem.status === 'Resolved' ? 'success.dark' :
                            problem.status === 'In Progress' ? 'warning.dark' : 'error.dark'
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Button 
              variant="outlined"
              onClick={() => handlePhaseSelect(well.phases[0])}
            >
              Voir les détails par phase
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default PhaseDashboard;
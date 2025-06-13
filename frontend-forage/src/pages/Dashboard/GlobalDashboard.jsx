import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Chip,
  CircularProgress
} from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { Gauge } from '@mui/x-charts/Gauge';
import data from '../../data/data';

const GlobalDashboard = () => {
  const { wellId } = useParams();
  const well = data.drillWells.find(w => w.id === Number(wellId));

  if (!well) {
    return (
      <Box p={4} color="error.main">
        Well not found
      </Box>
    );
  }

  // Calculate cost and delay metrics
  const calculateMetrics = () => {
    const totalCost = well.totalCost;
    const plannedCost = well.planning?.totalCost || totalCost;
    const costPercentage = Math.min(100, Math.round((totalCost / plannedCost) * 100));
    
    const totalDuration = well.totalDuration;
    const plannedDuration = well.planning?.totalDuration || totalDuration;
    const delayPercentage = Math.min(100, Math.round((totalDuration / plannedDuration) * 100));
    
    const delayDays = well.delay || 0;
    
    // Find critical problems (severity 3)
    const criticalProblems = well.phases.flatMap(phase => 
      phase.dailyReports.flatMap(report => 
        report.problems?.filter(problem => problem.severity === 3) || []
      )
    );
    
    return {
      costPercentage,
      delayPercentage,
      delayDays,
      criticalProblems,
      totalCost,
      plannedCost,
      totalDuration,
      plannedDuration
    };
  };

  const metrics = calculateMetrics();

  // Calculate problem distribution by severity
  const calculateProblemDistribution = () => {
    const allProblems = well.phases.flatMap(phase => 
      phase.dailyReports.flatMap(report => report.problems || [])
    );
    
    const severityCounts = [0, 0, 0];
    allProblems.forEach(problem => {
      if (problem.severity >= 1 && problem.severity <= 3) {
        severityCounts[problem.severity - 1]++;
      }
    });
    
    const totalProblems = severityCounts.reduce((sum, count) => sum + count, 0);
    
    return {
      data: [
        { id: 0, value: severityCounts[0], label: 'Critique (1)', color: '#ef4444' },
        { id: 1, value: severityCounts[1], label: 'Moyen (2)', color: '#eab308' },
        { id: 2, value: severityCounts[2], label: 'Mineur (3)', color: '#22c55e' }
      ],
      total: totalProblems
    };
  };

  const problemDistribution = calculateProblemDistribution();

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Box sx={{ p: 0 }}>
      {/* Header with Back button */}
      

      {/* Main Grid Layout */}
      <Grid container spacing={3}>
        {/* Global Cost Status - Gauge Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                État des Coûts Globaux
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Mis à jour le {new Date().toLocaleDateString('fr-FR')}
              </Typography>
            </Box>
            
            <Typography color={metrics.totalCost >= metrics.plannedCost ? 'error.main' : 'success.main'} sx={{ mb: 2 }}>
              {metrics.totalCost >= metrics.plannedCost ? 'Dépassement du budget prévu' : 'Dans les limites du budget'}
            </Typography>
            
            <Box sx={{ height: 250, display: 'flex', justifyContent: 'center' }}>
              <Gauge
                width={300}
                height={200}
                value={metrics.costPercentage}
                valueMin={0}
                valueMax={100}
                startAngle={-110}
                endAngle={110}
                text={({ value, valueMax }) => `${value}%`}
                cornerRadius="50%"
                sx={{
                  [`& .MuiGauge-valueArc`]: {
                    fill: metrics.costPercentage >= 90 ? '#ef4444' : 
                          metrics.costPercentage >= 80 ? '#eab308' : '#3b82f6'
                  },
                  [`& .MuiGauge-referenceArc`]: {
                    fill: '#e0e0e0'
                  }
                }}
              />
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              {[0, 0.4, 0.6, 0.8, 1].map((value, index) => (
                <Typography key={index} variant="caption" color="text.secondary">
                  {index === 0 ? '0' : formatCurrency(metrics.plannedCost * value)}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Global Delay Status - Gauge Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                État des Délais Globaux
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Mis à jour le {new Date().toLocaleDateString('fr-FR')}
              </Typography>
            </Box>
            
            <Typography color={metrics.delayDays > 0 ? 'error.main' : 'success.main'} sx={{ mb: 2 }}>
              {metrics.delayDays > 0 ? 'Retard dans le planning' : 'Dans les délais prévus'}
            </Typography>
            
            <Box sx={{ height: 250, display: 'flex', justifyContent: 'center' }}>
              <Gauge
                width={300}
                height={200}
                value={metrics.delayPercentage}
                valueMin={0}
                valueMax={100}
                startAngle={-110}
                endAngle={110}
                text={({ value, valueMax }) => `${value}%`}
                cornerRadius="50%"
                sx={{
                  [`& .MuiGauge-valueArc`]: {
                    fill: metrics.delayPercentage >= 90 ? '#ef4444' : 
                          metrics.delayPercentage >= 80 ? '#eab308' : '#22c55e'
                  },
                  [`& .MuiGauge-referenceArc`]: {
                    fill: '#e0e0e0'
                  }
                }}
              />
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              {[0, 0.4, 0.6, 0.8, 1].map((value, index) => (
                <Typography key={index} variant="caption" color="text.secondary">
                  {index === 0 ? '0j' : `${Math.round(metrics.plannedDuration * value)}j`}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Critical Problems */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
              Problèmes Critiques (Gravité 3)
            </Typography>
            
            {metrics.criticalProblems.length > 0 ? (
              <>
                <Typography color="error.main" fontWeight="medium" sx={{ mb: 2 }}>
                  {metrics.criticalProblems.length} problème(s) sans solution
                </Typography>
                
                {metrics.criticalProblems.slice(0, 3).map((problem, index) => (
                  <Box key={index} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #e0e0e0' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography fontWeight="medium">{problem.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(problem.dateReported).toLocaleDateString('fr-FR')}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">{problem.type}</Typography>
                    {problem.impact?.delay > 0 && (
                      <Typography color="error.main">
                        Retard: +{problem.impact.delay} jours
                      </Typography>
                    )}
                  </Box>
                ))}
                
                {metrics.criticalProblems.length > 3 && (
                  <Typography variant="caption" color="text.secondary">
                    +{metrics.criticalProblems.length - 3} autres problèmes...
                  </Typography>
                )}
              </>
            ) : (
              <Typography color="text.secondary">Aucun problème critique</Typography>
            )}
          </Paper>
        </Grid>

        {/* Problem Distribution - Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
              Répartition des Problèmes
            </Typography>
            
            {problemDistribution.total > 0 ? (
              <Box sx={{ height: 300 }}>
                <PieChart
                  
                  height={200}
                  series={[
                    {
                      data: problemDistribution.data,
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
            ) : (
              <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography color="text.secondary">Aucun problème à afficher</Typography>
              </Box>
            )}
            
            <Box sx={{ mt: 2 }}>
              {problemDistribution.data.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ width: 12, height: 12, bgcolor: item.color, mr: 1, borderRadius: '50%' }} />
                  <Typography variant="body2">
                    {item.label}: {item.value} ({Math.round((item.value / problemDistribution.total) * 100)}%)
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Global Overview */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
              Vue Globale
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight="bold">
                    {formatCurrency(metrics.totalCost)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Coûts actuels
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight="bold" color={metrics.delayDays > 0 ? 'error.main' : 'success.main'}>
                    {metrics.delayDays > 0 ? `+${metrics.delayDays}j` : 'Dans les temps'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Retard
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight="bold">
                    {formatCurrency(metrics.plannedCost)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Budget prévisionnel
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
              {well.phases.map((phase, index) => (
                <Chip key={index} label={phase.name} sx={{ bgcolor: '#f5f5f5' }} />
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GlobalDashboard;
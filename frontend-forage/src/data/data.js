const data = {
  // Liste des puits de forage
    drillWells: [
      // Puit A - Onshore standard
      {
        id: 1,
        name: "Puit A",
        siteName: "Hassi Messaoud",
        location: "17 Patrick Street, Algérie",
        coordinates: { lat: 31.6801, lng: 6.0729 },
        creationDate: "2022-07-31",
        startDate: "2022-08-01",
        endDate: "2023-10-09",
        status: "On going",
        progress: 40,
        delay: 1,
        actualGlobalCost: 3905000,
        actualGlobalDuration: 16,
        actualGlobalDepth: 9600,
        planning: {
          plannedGlobalCost: 10800000,
          plannedGlobalDuration: 69,
          plannedGlobalDepth: 9600,
          phases: [
            {
              id: 1,
              name: "Phase 26\" x 20\" inchs",
              plannedPhaseDepth: 3300,
              plannedPhaseDuration: 2,
              plannedPhaseCost: 1025000,
              cumulativeDuration: 2,
              cumulativeCost: 1025000,
              cumulativeDepth: 300,
             
            },
            {
              id: 2,
              name: "Phase 16\" x 13\" inchs",
              plannedPhaseDepth: 3000,
              plannedPhaseDuration: 13,
              plannedPhaseCost: 2780000,
              cumulativeDuration: 15,
              cumulativeCost: 3805000,
              cumulativeDepth: 1000,
            },
            {
              id: 3,
              name: "Phase 12\" x 9\" inchs",
              plannedPhaseDepth: 2800,
              plannedPhaseDuration: 8,
              plannedPhaseCost: 2055000,
              cumulativeDuration: 23,
              cumulativeDuration: 5860000,
              cumulativeDuration: 1500,
            },
            {
              id: 4,
              name: "Phase 8\" x 7\" inchs",
              plannedPhaseDepth: 500,
              plannedPhaseDuration: 34,
              plannedPhaseCost: 3405000,
              cumulativeDuration: 57,
              cumulativeDuration: 9260000,
              cumulativeDuration: 2500,
            },
          ]
        },
        phases: [
          {
            id: 1,
            name: "Phase 26\" x 20\" inchs",
            status: "completed-good",
            progress: 100,
            startDate: "2022-08-01",
            endDate: "2022-08-02",
            actualPhaseCost: 1025000,
            actualPhaseDuration: 2,
            actualPhaseDepth: 3300,
            description: "Phase initiale de forage",
            dailyReports: [
              {
                id: 1,
                date: "2022-03-01",
                depth: 59,
                progress: 17,
                timeSpent: 19,
                planned_day : 0,
                actual_day : 3,
                dailyCost: 55664.54,
                hasProblem: true,
                problems: [
                    {
                      id: 1,
                      name: "Casse outil de forage",
                      type: "Technique",
                      severity: 'Moyenne',
        
                      phase: "Phase 26\" x 20\" inchs",
                      hasSolution: true,
                      solutions: [
                        "Remplacement immédiat de l'outil",
                      ],
                      status: "Résolu",
                      impact: { cost: 15000, delay: 1 }
                    }, {
                      id: 2,
                      name: "Casse outil de forage",
                      type: "Technique",
                      severity: 'Moyenne',
        
                      phase: "Phase 26\" x 20\" inchs",
                      hasSolution: false,
                      solutions: [
                        "aucune solution",
                      ],
                      status: "Résolu",
                      impact: { cost: 15000, delay: 1 }
                    }
                  ],
                operations: [
                    {
                      startTime: "00:00",
                      endTime: "03:00",
                      description: "Cont picked up 5\" DP and racked in the mast, total stand 5\" DP =31"
                    },
                    {
                      startTime: "03:00",
                      endTime: "05:00",
                      description: "Maked up bit + bit sub + shock absorber + SDC 9 1/2 + DC91/2"
                    },
                ],
                formation: "Very hard formation",
                equipmentUsed: ["Drill bit 26\" Tricone", "20\" Casing"],
                incidents: []
              },
              {
                id: 2,
                date: "2022-08-02",
                depth: 59,
                progress: 17,
                timeSpent: 19,
                dailyCost: 55664.54,
                planned_day : 2,
                actual_day : 2,
                hasProblem: true,
                problems: [
                    {
                      id: 1,
                      name: "Retard livraison tubulaires",
                      type: "Logistique",
                      severity: 'Mineure',
                      phase: "Phase 20\" x 16\" inchs",
                      hasSolution: false,
                      status: "Résolu",
                      impact: { cost: 2000, delay: 0 }
                    },
                    {
                      id: 2,
                      name: "Conditions météo défavorables",
                      type: "Environnement",
                      severity: 'Critique',
                      phase: "Phase 26\" x 20\" inchs",
                      hasSolution: true,
                      solutions: ["Arrêt temporaire des opérations"],
                      status: "Résolu",
                      impact: { cost: 1000, delay: 0 }
                    }
                  ],
                operations: [
                    {
                      startTime: "00:00",
                      endTime: "03:00",
                      description: "Cont picked up 5\" DP and racked in the mast, total stand 5\" DP =31"
                    },
                    {
                      startTime: "03:00",
                      endTime: "05:00",
                      description: "Maked up bit + bit sub + shock absorber + SDC 9 1/2 + DC91/2"
                    },
                ],
                formation: "Very hard formation",
                equipmentUsed: ["Drill bit 26\" Tricone", "20\" Casing"],
                incidents: []
              },
               
            ]
          },
          {
            id: 2,
            name: "Phase 16\" x 13\" inchs",
            status: "completed-bad",
            progress: 100,
            actualPhaseCost: 2800000,
            actualPhaseDuration: 14,
            actualPhaseDepth: 3100,
            startDate: "2022-08-04",
            endDate: "2022-08-16",
            description: "Forage intermédiaire",
            dailyReports: [
              {
                id: 1,
                date: "2022-08-04",
                depth: 59,
                progress: 17,
                timeSpent: 19,
                dailyCost: 55664.54,
                planned_day : 3,
                actual_day : 4,
                hasProblem: true,
                problems: [
                    {
                      id: 1,
                      name: "Casse outil de forage",
                      type: "Technique",
                      severity: 'Moyenne',
                      phase: "Phase 16\" x 13\" inchs",
                      hasSolution: true,
                      solutions: [
                        "Remplacement immédiat de l'outil",
                      ],
                      status: "Résolu",
                      impact: { cost: 15000, delay: 1 }
                    }
                  ],
                operations: [
                    {
                      startTime: "00:00",
                      endTime: "03:00",
                      description: "Cont picked up 5\" DP and racked in the mast, total stand 5\" DP =31"
                    },
                    {
                      startTime: "03:00",
                      endTime: "05:00",
                      description: "Maked up bit + bit sub + shock absorber + SDC 9 1/2 + DC91/2"
                    },
                ],
                formation: "Very hard formation",
                equipmentUsed: ["Drill bit 26\" Tricone", "20\" Casing"],
                incidents: []
              },
              {
                id: 2,
                date: "2022-08-05",
                depth: 59,
                progress: 17,
                timeSpent: 19,
                dailyCost: 55664.54,
                planned_day : 4,
                actual_day : 5,
                hasproblems: false,
                problems: [],
                operations: [
                    {
                      startTime: "00:00",
                      endTime: "03:00",
                      description: "Cont picked up 5\" DP and racked in the mast, total stand 5\" DP =31"
                    },
                    {
                      startTime: "03:00",
                      endTime: "05:00",
                      description: "Maked up bit + bit sub + shock absorber + SDC 9 1/2 + DC91/2"
                    },
                ],
                formation: "Very hard formation",
                equipmentUsed: ["Drill bit 26\" Tricone", "20\" Casing"],
                incidents: []
              },
              
            ]
          },
          {
            id: 3,
            name: "Phase 12\" x 9\" inchs",
            status: "not-completed",
            progress: 0,
            actualPhaseCost: 0,
            actualPhaseDuration: 0,
            actualPhaseDepth: 0,
            startDate: "2022-08-18",
            endDate: "",
            description: "Forage profond",
            dailyReports: [
              {
                id: 1,
                date: "2022-02-15",
                depth: 59,
                progress: 17,
                timeSpent: 19,
                dailyCost: 55664.54,
                planned_day : 15,
                actual_day : 18,
                hasProblem: true,
                problems: [
                    {
                        id: 1,
                        name: "Retard livraison tubulaires",
                        type: "Logistique",
                        severity: 'Mineure',
                        phase: "Phase 12\" x 9\" inchs",
                        hasSolution: false,
                        status: "Résolu",
                        impact: { cost: 0, delay: 7 }
                      },
                      {
                        id: 2,
                        name: "Conditions météo défavorables",
                        type: "Environnement",
                        severity: 'Critique',
                        phase: "Phase 13 3/8\" casing",
                        hasSolution: true,
                        solutions: ["Arrêt temporaire des opérations"],
                        status: "Résolu",
                        impact: { cost: 250000, delay: 8 }
                      }
                  ],
                operations: [
                    {
                      startTime: "00:00",
                      endTime: "03:00",
                      description: "Cont picked up 5\" DP and racked in the mast, total stand 5\" DP =31"
                    },
                    {
                      startTime: "03:00",
                      endTime: "05:00",
                      description: "Maked up bit + bit sub + shock absorber + SDC 9 1/2 + DC91/2"
                    },
                ],
                formation: "Very hard formation",
                equipmentUsed: ["Drill bit 26\" Tricone", "20\" Casing"],
                incidents: []
              },
              
            ]
          },
          {
            id: 4,
            name: "Phase 8\" x 7\" inchs",
            status: "not-completed",
            progress: 0,
            actualPhaseCost: 0,
            actualPhaseDuration: 0,
            actualPhaseDepth: 0,
            startDate: "",
            endDate: "",
            description: "Forage final et complétion",
            dailyReports: [
                
            ]
          },
          // ... autres phases
        ],
      },
  
        // Puit B - Terminé
        {
          id: 2,
          name: "Puit B",
          siteName: "Champ Rhourde Nouss",
          location: "Zone Sud-Est, Algérie",
          coordinates: { lat: 32.4567, lng: 5.6789 },
          creationDate: "2022-06-15",
          startDate: "2022-07-01",
          endDate: "2023-04-20",
          status: "At Risk",
          progress: 85,
          delay : 8,
          actualGlobalCost: 8950000,
          actualGlobalDuration: 60,
          actualGlobalDepth: 4100,
          planning: {
            plannedGlobalCost: 10800000,
            plannedGlobalDuration: 69,
            plannedGlobalDepth: 9600,
            phases: [
              {
                id: 1,
                name: "Phase 26\" x 20\" inchs",
                plannedPhaseDepth: 3300,
                plannedPhaseDuration: 2,
                plannedPhaseCost: 1025000,
                cumulativeDuration: 2,
                cumulativeCost: 1025000,
                cumulativeDepth: 300,
             
              },
              {
                id: 2,
                name: "Phase 16\" x 13\" inchs",
                plannedPhaseDepth: 3000,
                plannedPhaseDuration: 13,
                plannedPhaseCost: 2780000,
                cumulativeDuration: 15,
                cumulativeCost: 3805000,
                cumulativeDepth: 1000,
              },
              {
                id: 3,
                name: "Phase 12\" x 9\" inchs",
                plannedPhaseDepth: 2800,
                plannedPhaseDuration: 8,
                plannedPhaseCost: 2055000,
                cumulativeDuration: 23,
                cumulativeDuration: 5860000,
                cumulativeDuration: 1500,
              },
              {
                id: 4,
                name: "Phase 8\" x 7\" inchs",
                plannedPhaseDepth: 500,
                plannedPhaseDuration: 34,
                plannedPhaseCost: 3405000,
                cumulativeDuration: 57,
                cumulativeDuration: 9260000,
                cumulativeDuration: 2500,
              },
            ]
          },
         
          phases: [
            {
              id: 1,
              name: "Phase 26\" x 20\" inchs",
              status: "completed-bad",
              progress: 100,
              startDate: "2022-07-01",
              endDate: "2022-07-03",
              actualPhaseCost: 1050000,
              actualPhaseDepth: 3300,
              actualPhaseDuration: 2,
              description: "Phase initiale de forage",
              dailyReports: [
                {
                  id: 1,
                  date: "2022-07-01",
                  depth: 62,
                  progress: 20,
                  timeSpent: 22,
                  dailyCost: 58000,
                  planned_day : 0,
                  actual_day : 1,
                  hasProblem: false,
                  problems: [],
                  operations: [
                    {
                      startTime: "06:00",
                      endTime: "10:00",
                      description: "Préparation site et assemblage équipement"
                    },
                    {
                      startTime: "10:00",
                      endTime: "18:00",
                      description: "Début forage 26\" section"
                    }
                  ],
                  formation: "Formation sableuse",
                  equipmentUsed: ["Trépan 26\" IADC 517", "Tiges lourdes 8\""],
                  incidents: []
                },
                {
                  id: 2,
                  date: "2022-07-02",
                  depth: 85,
                  progress: 23,
                  timeSpent: 24,
                  dailyCost: 59500,
                  planned_day : 2,
                actual_day : 3,
                  hasProblem: true,
                  problems: [
                    {
                      id: 1,
                      name: "Problème de circulation boue",
                      type: "Technique",
                      severity: 'Moyenne',
                      phase: "Phase 26\" x 20\" inchs",
                      hasSolution: true,
                      solutions: ["Augmentation densité boue", "Nettoyage puits"],
                      status: "Résolu",
                      impact: { cost: 12000, delay: 0.5 }
                    }
                  ],
                  operations: [
                    {
                      startTime: "00:00",
                      endTime: "12:00",
                      description: "Forage continu 26\" section"
                    },
                    {
                      startTime: "12:00",
                      endTime: "18:00",
                      description: "Cimentation 20\" casing"
                    }
                  ],
                  formation: "Grès compacts",
                  equipmentUsed: ["Casing 20\"", "Ciment classe G"],
                  incidents: []
                }
              ]
            },
            {
              id: 2,
              name: "Phase 16\" x 13\" inchs",
              status: "completed-bad",
              progress: 100,
              startDate: "2022-07-05",
              endDate: "2022-07-18",
              actualPhaseCost: 2800000,
              actualPhaseDepth: 3000,
              actualPhaseDuration: 13,
              description: "Forage intermédiaire",
              dailyReports: [
                {
                  id: 3,
                  date: "2022-07-05",
                  depth: 120,
                  progress: 15,
                  timeSpent: 18,
                  dailyCost: 61000,
                  planned_day : 4,
                actual_day : 5,
                  hasProblem: false,
                  problems: [],
                  operations: [
                    {
                      startTime: "06:00",
                      endTime: "24:00",
                      description: "Début forage 16\" section"
                    }
                  ],
                  formation: "Argile compacte",
                  equipmentUsed: ["Trépan 16\" PDC"],
                  incidents: []
                },
                // ... 10 autres rapports journaliers pour cette phase
                {
                  id: 13,
                  date: "2022-07-18",
                  depth: 650,
                  progress: 100,
                  timeSpent: 12,
                  dailyCost: 62500,
                  planned_day : 13,
                actual_day : 15,
                  hasProblem: true,
                  problems: [
                    {
                      id: 2,
                      name: "Déviation puits",
                      type: "Technique",
                      severity: 'Critique',
                      phase: "Phase 16\" x 13\" inchs",
                      hasSolution: true,
                      solutions: ["Correction trajectoire", "Utilisation stabilisateurs"],
                      status: "Résolu",
                      impact: { cost: 45000, delay: 2 }
                    }
                  ],
                  operations: [
                    {
                      startTime: "00:00",
                      endTime: "12:00",
                      description: "Installation wellhead et test BOP"
                    }
                  ],
                  formation: "Calcaire fracturé",
                  equipmentUsed: ["Casing 13 3/8\"", "Wellhead"],
                  incidents: []
                }
              ]
            },
            {
              id: 3,
              name: "Phase 12\" x 9\" inchs",
              status: "completed-bad",
              progress: 100,
              startDate: "2022-07-20",
              endDate: "2022-08-05",
              actualPhaseCost: 2500000,
              actualPhaseDepth: 2800,
              actualPhaseDuration: 16,
              description: "Forage profond",
              dailyReports: [
                // 16 rapports journaliers détaillés
                {
                  id: 14,
                  date: "2022-07-20",
                  depth: 670,
                  progress: 10,
                  timeSpent: 24,
                  dailyCost: 63000,
                  hasProblem: false,
                  planned_day : 45,
                actual_day : 48,
                  problems: [],
                  operations: [
                    {
                      startTime: "00:00",
                      endTime: "24:00",
                      description: "Début forage 12 1/4\" section"
                    }
                  ],
                  formation: "Dolomie",
                  equipmentUsed: ["Trépan 12 1/4\" PDC"],
                  incidents: []
                },
                // ... autres jours
                {
                  id: 29,
                  date: "2022-08-05",
                  depth: 1250,
                  progress: 100,
                  timeSpent: 8,
                  dailyCost: 64000,
                  planned_day : 55,
                actual_day : 61,
                  hasProblem: true,
                  problems: [
                    {
                      id: 3,
                      name: "Perte circulation",
                      type: "Technique",
                      severity: 'Moyenne',
                      phase: "Phase 12\" x 9\" inchs",
                      hasSolution: true,
                      solutions: ["Mise en place bouchons LCM"],
                      status: "Résolu",
                      impact: { cost: 28000, delay: 1 }
                    }
                  ],
                  operations: [
                    {
                      startTime: "00:00",
                      endTime: "08:00",
                      description: "Cimentation 9 5/8\" casing"
                    }
                  ],
                  formation: "Grès poreux",
                  equipmentUsed: ["Casing 9 5/8\"", "Ciment classe H"],
                  incidents: []
                }
              ]
            },
            {
              id: 4,
              name: "Phase 8\" x 7\" inchs",
              status: "not-completed",
              progress: 0,
              startDate: "2022-08-07",
              endDate: "2022-09-10",
              actualPhaseCost: 2600000,
              actualPhaseDepth: 0,
              actualPhaseDuration: 24,
              description: "Forage final et complétion",
              dailyReports: [
                // 34 rapports journaliers détaillés
                {
                  id: 30,
                  date: "2022-08-07",
                  depth: 1260,
                  progress: 5,
                  timeSpent: 24,
                  dailyCost: 65000,
                  hasProblem: false,
                  planned_day : 69,
                actual_day : 75,
                  problems: [],
                  operations: [
                    {
                      startTime: "00:00",
                      endTime: "24:00",
                      description: "Début forage 8 1/2\" section"
                    }
                  ],
                  formation: "Grès réservoir",
                  equipmentUsed: ["Trépan 8 1/2\" PDC"],
                  incidents: []
                },
                // ... autres jours
                {
                  id: 63,
                  date: "2022-09-10",
                  depth: 2350,
                  progress: 100,
                  timeSpent: 12,
                  dailyCost: 68000,
                  hasProblem: false,
                  planned_day : 77,
                actual_day : 84,
                  problems: [],
                  operations: [
                    {
                      startTime: "00:00",
                      endTime: "12:00",
                      description: "Démobilisation équipement"
                    }
                  ],
                  formation: "Réservoir productif",
                  equipmentUsed: [],
                  incidents: []
                }
              ]
            }
          ],
          problems: [
            {
              id: 1,
              name: "Problème de circulation boue",
              type: "Technique",
              severity: 'Moyenne',
              dateReported: "2022-07-02",
              phase: "Phase 26\" x 20\" inchs",
              hasSolution: true,
              solutions: ["Augmentation densité boue", "Nettoyage puits"],
              status: "Résolu",
              impact: { cost: 12000, delay: 0.5 }
            },
            {
              id: 2,
              name: "Déviation puits",
              type: "Technique",
              severity: 'Critique',
              dateReported: "2022-07-17",
              phase: "Phase 16\" x 13\" inchs",
              hasSolution: true,
              solutions: ["Correction trajectoire", "Utilisation stabilisateurs"],
              status: "Résolu",
              impact: { cost: 45000, delay: 2 }
            },
            {
              id: 3,
              name: "Perte circulation",
              type: "Technique",
              severity: 'Moyenne',
              dateReported: "2022-08-04",
              phase: "Phase 12\" x 9\" inchs",
              hasSolution: true,
              solutions: ["Mise en place bouchons LCM"],
              status: "Résolu",
              impact: { cost: 28000, delay: 1 }
            }
          ]
        },
      

        {
          // Puit D
          id: 3,
          name: "Puit D",
          siteName: "Champ Rhourde Nouss",
          location: "Zone Sud-Est, Algérie",
          coordinates: { lat: 32.4567, lng: 5.6789 },
          creationDate: "2022-06-15",
          startDate: "2022-07-01",
          endDate: "2023-04-20",
          status: "Delayed",
          progress: 100,
          delay: 19,
          actualGlobalCost: 14950000,
          actualGlobalDuration: 89,
          actualGlobalDepth: 9800,
          planning: {
            plannedGlobalCost: 10800000,
            plannedGlobalDuration: 69,
            plannedGlobalDepth: 9600,
            phases: [
              {
                id: 1,
                name: "Phase 26\" x 20\" inchs",
                plannedPhaseDepth: 3300,
                plannedPhaseDuration: 2,
                plannedPhaseCost: 1025000,
                cumulativeDuration: 2,
                cumulativeCost: 1025000,
                cumulativeDepth: 3300,
             
              },
              {
                id: 2,
                name: "Phase 16\" x 13\" inchs",
                plannedPhaseDepth: 3000,
                plannedPhaseDuration: 13,
                plannedPhaseCost: 2780000,
                cumulativeDuration: 15,
                cumulativeCost: 3805000,
                cumulativeDepth: 6300,
              },
              {
                id: 3,
                name: "Phase 12\" x 9\" inchs",
                plannedPhaseDepth: 2800,
                plannedPhaseDuration: 18,
                plannedPhaseCost: 2055000,
                cumulativeDuration: 23,
                cumulativeDuration: 5860000,
                cumulativeDuration: 1500,
              },
              {
                id: 4,
                name: "Phase 8\" x 7\" inchs",
                plannedPhaseDepth: 500,
                plannedPhaseDuration: 36,
                plannedPhaseCost: 3405000,
                cumulativeDuration: 69,
                cumulativeDuration: 9260000,
                cumulativeDuration: 2500,
              },
            ]
          },
        
          phases: [
            {
              id: 1,
              name: "Phase 26\" x 20\" inchs",
              status: "completed-bad",
              progress: 100,
              startDate: "2022-07-01",
              endDate: "2022-07-03",
              actualPhaseCost: 2050000,
              actualPhaseDepth: 3300,
              actualPhaseDuration: 4,
              description: "Phase initiale de forage",
              dailyReports: [
                {
                  id: 1,
                  date: "2022-07-01",
                  depth: 62,
                  progress: 20,
                  timeSpent: 22,
                  dailyCost: 58000,
                  planned_day : 0,
                actual_day : 3,
                  hasProblem: false,
                  problems: [],
                  operations: [
                    {
                      startTime: "06:00",
                      endTime: "10:00",
                      description: "Préparation site et assemblage équipement"
                    },
                    {
                      startTime: "10:00",
                      endTime: "18:00",
                      description: "Début forage 26\" section"
                    }
                  ],
                  formation: "Formation sableuse",
                  equipmentUsed: ["Trépan 26\" IADC 517", "Tiges lourdes 8\""],
                  incidents: []
                },
                {
                  id: 2,
                  date: "2022-07-02",
                  depth: 85,
                  progress: 23,
                  timeSpent: 24,
                  dailyCost: 59500,
                  planned_day : 3,
                actual_day : 5,
                  hasProblem: true,
                  problems: [
                    {
                      id: 1,
                      name: "Problème de circulation boue",
                      type: "Technique",
                      severity: 'Moyenne',
                      phase: "Phase 26\" x 20\" inchs",
                      hasSolution: true,
                      solutions: ["Augmentation densité boue", "Nettoyage puits"],
                      status: "Résolu",
                      impact: { cost: 12000, delay: 0.5 }
                    }
                  ],
                  operations: [
                    {
                      startTime: "00:00",
                      endTime: "12:00",
                      description: "Forage continu 26\" section"
                    },
                    {
                      startTime: "12:00",
                      endTime: "18:00",
                      description: "Cimentation 20\" casing"
                    }
                  ],
                  formation: "Grès compacts",
                  equipmentUsed: ["Casing 20\"", "Ciment classe G"],
                  incidents: []
                },
                {
                  id: 3,
                  date: "2022-07-03",
                  depth: 62,
                  progress: 20,
                  timeSpent: 22,
                  dailyCost: 58000,
                  planned_day : 6,
                actual_day : 8,
                  hasProblem: false,
                  problems: [],
                  operations: [
                    {
                      startTime: "06:00",
                      endTime: "10:00",
                      description: "Préparation site et assemblage équipement"
                    },
                    {
                      startTime: "10:00",
                      endTime: "18:00",
                      description: "Début forage 26\" section"
                    }
                  ],
                  formation: "Formation sableuse",
                  equipmentUsed: ["Trépan 26\" IADC 517", "Tiges lourdes 8\""],
                  incidents: []
                },
              ]
            },
            {
              id: 2,
              name: "Phase 16\" x 13\" inchs",
              status: "completed-bad",
              progress: 100,
              startDate: "2022-07-05",
              endDate: "2022-07-18",
              actualPhaseCost: 4823500,
              actualPhaseDepth: 3000,
              actualPhaseDuration: 23,
              description: "Forage intermédiaire",
              dailyReports: [
                {
                  id: 1,
                  date: "2022-07-01",
                  depth: 62,
                  progress: 20,
                  timeSpent: 22,
                  dailyCost: 58000,
                  planned_day : 9,
                actual_day : 10,
                  hasProblem: false,
                  problems: [],
                  operations: [
                    {
                      startTime: "06:00",
                      endTime: "10:00",
                      description: "Préparation site et assemblage équipement"
                    },
                    {
                      startTime: "10:00",
                      endTime: "18:00",
                      description: "Début forage 26\" section"
                    }
                  ],
                  formation: "Formation sableuse",
                  equipmentUsed: ["Trépan 26\" IADC 517", "Tiges lourdes 8\""],
                  incidents: []
                },
                {
                  id: 3,
                  date: "2022-07-05",
                  depth: 120,
                  progress: 15,
                  timeSpent: 18,
                  dailyCost: 61000,
                  planned_day : 11,
                actual_day : 13,
                  hasProblem: false,
                  problems: [],
                  operations: [
                    {
                      startTime: "06:00",
                      endTime: "24:00",
                      description: "Début forage 16\" section"
                    }
                  ],
                  formation: "Argile compacte",
                  equipmentUsed: ["Trépan 16\" PDC"],
                  incidents: []
                },
                // ... 10 autres rapports journaliers pour cette phase
                {
                  id: 13,
                  date: "2022-07-18",
                  depth: 650,
                  progress: 100,
                  timeSpent: 12,
                  dailyCost: 62500,
                  planned_day : 15,
                actual_day : 16,
                  hasProblem: true,
                  problems: [
                    {
                      id: 2,
                      name: "Déviation puits",
                      type: "Technique",
                      severity: 'Critique',
                      phase: "Phase 16\" x 13\" inchs",
                      hasSolution: true,
                      solutions: ["Correction trajectoire", "Utilisation stabilisateurs"],
                      status: "Résolu",
                      impact: { cost: 45000, delay: 2 }
                    }
                  ],
                  operations: [
                    {
                      startTime: "00:00",
                      endTime: "12:00",
                      description: "Installation wellhead et test BOP"
                    }
                  ],
                  formation: "Calcaire fracturé",
                  equipmentUsed: ["Casing 13 3/8\"", "Wellhead"],
                  incidents: []
                }
              ]
            },
            {
              id: 3,
              name: "Phase 12\" x 9\" inchs",
              status: "completed-bad",
              progress: 100,
              startDate: "2022-07-20",
              endDate: "2022-08-05",
              actualPhaseCost: 5500000,
              actualPhaseDepth: 2800,
              actualPhaseDuration: 55,
              description: "Forage profond",
              dailyReports: [
                // 16 rapports journaliers détaillés
                {
                  id: 1,
                  date: "2022-07-01",
                  depth: 62,
                  progress: 20,
                  timeSpent: 22,
                  dailyCost: 58000,
                  planned_day : 55,
                actual_day : 57,
                  hasProblem: false,
                  problems: [],
                  operations: [
                    {
                      startTime: "06:00",
                      endTime: "10:00",
                      description: "Préparation site et assemblage équipement"
                    },
                    {
                      startTime: "10:00",
                      endTime: "18:00",
                      description: "Début forage 26\" section"
                    }
                  ],
                  formation: "Formation sableuse",
                  equipmentUsed: ["Trépan 26\" IADC 517", "Tiges lourdes 8\""],
                  incidents: []
                },
                {
                  id: 14,
                  date: "2022-07-20",
                  depth: 670,
                  progress: 10,
                  timeSpent: 24,
                  dailyCost: 63000,
                  hasProblem: false,
                  problems: [],
                  operations: [
                    {
                      startTime: "00:00",
                      endTime: "24:00",
                      description: "Début forage 12 1/4\" section"
                    }
                  ],
                  formation: "Dolomie",
                  equipmentUsed: ["Trépan 12 1/4\" PDC"],
                  incidents: []
                },
                // ... autres jours
                {
                  id: 29,
                  date: "2022-08-05",
                  depth: 1250,
                  progress: 100,
                  timeSpent: 8,
                  dailyCost: 64000,
                  hasProblem: true,
                  planned_day : 49,
                 actual_day : 52,
                  problems: [
                    {
                      id: 3,
                      name: "Perte circulation",
                      type: "Technique",
                      severity: 'Moyenne',
                      phase: "Phase 12\" x 9\" inchs",
                      hasSolution: true,
                      solutions: ["Mise en place bouchons LCM"],
                      status: "Résolu",
                      impact: { cost: 28000, delay: 1 }
                    }
                  ],
                  operations: [
                    {
                      startTime: "00:00",
                      endTime: "08:00",
                      description: "Cimentation 9 5/8\" casing"
                    }
                  ],
                  formation: "Grès poreux",
                  equipmentUsed: ["Casing 9 5/8\"", "Ciment classe H"],
                  incidents: []
                }
              ]
            },
            {
              id: 4,
              name: "Phase 8\" x 7\" inchs",
              status: "completed-bad",
              progress: 100,
              startDate: "2022-08-07",
              endDate: "2022-09-10",
              actualPhaseCost: 5600000,
              actualPhaseDepth: 900,
              actualPhaseDuration: 40,
              description: "Forage final et complétion",
              dailyReports: [
                // 34 rapports journaliers détaillés
                {
                  id: 30,
                  date: "2022-08-07",
                  depth: 1260,
                  progress: 5,
                  timeSpent: 24,
                  dailyCost: 65000,
                  planned_day : 65,
                actual_day : 68,
                  hasProblem: false,
                  problems: [],
                  operations: [
                    {
                      startTime: "00:00",
                      endTime: "24:00",
                      description: "Début forage 8 1/2\" section"
                    }
                  ],
                  formation: "Grès réservoir",
                  equipmentUsed: ["Trépan 8 1/2\" PDC"],
                  incidents: []
                },
                // ... autres jours
                {
                  id: 63,
                  date: "2022-09-10",
                  depth: 2350,
                  progress: 100,
                  timeSpent: 12,
                  dailyCost: 68000,
                  hasProblem: false,
                  planned_day : 88,
                actual_day : 90,
                  problems: [],
                  operations: [
                    {
                      startTime: "00:00",
                      endTime: "12:00",
                      description: "Démobilisation équipement"
                    }
                  ],
                  formation: "Réservoir productif",
                  equipmentUsed: [],
                  incidents: []
                }
              ]
            }
          ],
          problems: [
            {
              id: 1,
              name: "Problème de circulation boue",
              type: "Technique",
              severity: 'Moyenne',
              dateReported: "2022-07-02",
              phase: "Phase 26\" x 20\" inchs",
              hasSolution: true,
              solutions: ["Augmentation densité boue", "Nettoyage puits"],
              status: "Résolu",
              impact: { cost: 12000, delay: 0.5 }
            },
            {
              id: 2,
              name: "Déviation puits",
              type: "Technique",
              severity: 'Critique',
              dateReported: "2022-07-17",
              phase: "Phase 16\" x 13\" inchs",
              hasSolution: true,
              solutions: ["Correction trajectoire", "Utilisation stabilisateurs"],
              status: "Résolu",
              impact: { cost: 45000, delay: 2 }
            },
            {
              id: 3,
              name: "Perte circulation",
              type: "Technique",
              severity: 'Moyenne',
              dateReported: "2022-08-04",
              phase: "Phase 12\" x 9\" inchs",
              hasSolution: true,
              solutions: ["Mise en place bouchons LCM"],
              status: "Résolu",
              impact: { cost: 28000, delay: 1 }
            }
          ]
        },
          // Puit E - Terminé
          {
            id: 4,
            name: "Puit E",
            siteName: "Hassi Messaoud",
            location: "Zone Sud-Est, Algérie",
            coordinates: { lat: 32.4567, lng: 5.6789 },
            creationDate: "2022-06-15",
            startDate: "2022-07-01",
            endDate: "2023-04-20",
            status: "Completed",
            progress: 100,
            delay: 0,
            actualGlobalCost: 10800000,
            actualGlobalDuration: 69,
            actualGlobalDepth: 9700,
            planning: {
              plannedGlobalCost: 10800000,
              plannedGlobalDuration: 69,
              plannedGlobalDepth: 9600,
              phases: [
                {
                  id: 1,
                  name: "Phase 26\" x 20\" inchs",
                  plannedPhaseDepth: 3300,
                  plannedPhaseDuration: 2,
                  plannedPhaseCost: 2780000,
                  cumulativeDuration: 2,
                  cumulativeCost: 1025000,
                  cumulativeDepth: 3300,
                },
                {
                  id: 2,
                  name: "Phase 16\" x 13\" inchs",
                  plannedPhaseDepth: 3000,
                  plannedPhaseDuration: 13,
                  plannedPhaseCost: 2780000,
                  cumulativeDuration: 15,
                  cumulativeCost: 3805000,
                  cumulativeDepth: 6300,
                },
                {
                  id: 3,
                  name: "Phase 12\" x 9\" inchs",
                  plannedPhaseDepth: 2800,
                  plannedPhaseDuration: 18,
                  plannedPhaseCost: 2055000,
                  cumulativeDuration: 23,
                  cumulativeCost: 5860000,
                  cumulativeDepth: 1500,
                },
                {
                  id: 4,
                  name: "Phase 8\" x 7\" inchs",
                  plannedPhaseDepth: 500,
                  plannedPhaseDuration: 36,
                  plannedPhaseCost: 3405000,
                  cumulativeDuration: 57,
                  cumulativeDuration: 9260000,
                  cumulativeDuration: 2500,
                },
              ]
            },

            phases: [
              {
                id: 1,
                name: "Phase 26\" x 20\" inchs",
                status: "completed-good",
                progress: 100,
                startDate: "2022-07-01",
                endDate: "2022-07-03",
                actualPhaseCost: 2780000,
                actualPhaseDepth: 3300,

                actualPhaseDuration: 2,
                description: "Phase initiale de forage",
                dailyReports: [
                  {
                    id: 1,
                    date: "2022-07-01",
                    depth: 62,
                    progress: 20,
                    timeSpent: 22,
                    dailyCost: 58000,
                    planned_day : 0,
                actual_day : 2,
                    hasProblem: false,
                    problems: [],
                    operations: [
                      {
                        startTime: "06:00",
                        endTime: "10:00",
                        description: "Préparation site et assemblage équipement"
                      },
                      {
                        startTime: "10:00",
                        endTime: "18:00",
                        description: "Début forage 26\" section"
                      }
                    ],
                    formation: "Formation sableuse",
                    equipmentUsed: ["Trépan 26\" IADC 517", "Tiges lourdes 8\""],
                    incidents: []
                  },
                  {
                    id: 2,
                    date: "2022-07-02",
                    depth: 85,
                    progress: 23,
                    timeSpent: 24,
                    dailyCost: 59500,
                    planned_day : 2,
                actual_day : 4,
                    hasProblem: true,
                    problems: [
                      {
                        id: 1,
                        name: "Problème de circulation boue",
                        type: "Technique",
                        severity: 'Moyenne',
                        phase: "Phase 26\" x 20\" inchs",
                        hasSolution: true,
                        solutions: ["Augmentation densité boue", "Nettoyage puits"],
                        status: "Résolu",
                        impact: { cost: 12000, delay: 0.5 }
                      }
                    ],
                    operations: [
                      {
                        startTime: "00:00",
                        endTime: "12:00",
                        description: "Forage continu 26\" section"
                      },
                      {
                        startTime: "12:00",
                        endTime: "18:00",
                        description: "Cimentation 20\" casing"
                      }
                    ],
                    formation: "Grès compacts",
                    equipmentUsed: ["Casing 20\"", "Ciment classe G"],
                    incidents: []
                  }
                ]
              },
              {
                id: 2,
                name: "Phase 16\" x 13\" inchs",
                status: "completed-good",
                progress: 100,
                startDate: "2022-07-05",
                endDate: "2022-07-18",
                actualPhaseCost: 2780000,
                actualPhaseDepth: 3000,
                actualPhaseDuration: 13,
                description: "Forage intermédiaire",
                dailyReports: [
                  {
                    id: 3,
                    date: "2022-07-05",
                    depth: 120,
                    progress: 15,
                    timeSpent: 18,
                    dailyCost: 61000,
                    planned_day : 4,
                actual_day : 5,
                    hasProblem: false,
                    problems: [],
                    operations: [
                      {
                        startTime: "06:00",
                        endTime: "24:00",
                        description: "Début forage 16\" section"
                      }
                    ],
                    formation: "Argile compacte",
                    equipmentUsed: ["Trépan 16\" PDC"],
                    incidents: []
                  },
                  // ... 10 autres rapports journaliers pour cette phase
                  {
                    id: 13,
                    date: "2022-07-18",
                    depth: 650,
                    progress: 100,
                    timeSpent: 12,
                    dailyCost: 62500,
                    planned_day : 15,
                actual_day : 16,
                    hasProblem: true,
                    problems: [
                      {
                        id: 2,
                        name: "Déviation puits",
                        type: "Technique",
                        severity: 'Critique',
                        phase: "Phase 16\" x 13\" inchs",
                        hasSolution: true,
                        solutions: ["Correction trajectoire", "Utilisation stabilisateurs"],
                        status: "Résolu",
                        impact: { cost: 45000, delay: 2 }
                      }
                    ],
                    operations: [
                      {
                        startTime: "00:00",
                        endTime: "12:00",
                        description: "Installation wellhead et test BOP"
                      }
                    ],
                    formation: "Calcaire fracturé",
                    equipmentUsed: ["Casing 13 3/8\"", "Wellhead"],
                    incidents: []
                  }
                ]
              },
              {
                id: 3,
                name: "Phase 12\" x 9\" inchs",
                status: "completed-good",
                progress: 100,
                startDate: "2022-07-20",
                endDate: "2022-08-05",
                actualPhaseCost: 2055000,
                actualPhaseDepth: 2800,
                actualPhaseDuration: 18,
                description: "Forage profond",
                dailyReports: [
                  // 16 rapports journaliers détaillés
                  {
                    id: 14,
                    date: "2022-07-20",
                    depth: 670,
                    progress: 10,
                    timeSpent: 24,
                    dailyCost: 63000,
                    planned_day : 16,
                actual_day : 17,
                    hasProblem: false,
                    problems: [],
                    operations: [
                      {
                        startTime: "00:00",
                        endTime: "24:00",
                        description: "Début forage 12 1/4\" section"
                      }
                    ],
                    formation: "Dolomie",
                    equipmentUsed: ["Trépan 12 1/4\" PDC"],
                    incidents: []
                  },
                  // ... autres jours
                  {
                    id: 29,
                    date: "2022-08-05",
                    depth: 1250,
                    progress: 100,
                    timeSpent: 8,
                    dailyCost: 64000,
                    planned_day : 29,
                actual_day : 30,
                    hasProblem: true,
                    problems: [
                      {
                        id: 3,
                        name: "Perte circulation",
                        type: "Technique",
                        severity: 'Moyenne',
                        phase: "Phase 12\" x 9\" inchs",
                        hasSolution: true,
                        solutions: ["Mise en place bouchons LCM"],
                        status: "Résolu",
                        impact: { cost: 28000, delay: 1 }
                      }
                    ],
                    operations: [
                      {
                        startTime: "00:00",
                        endTime: "08:00",
                        description: "Cimentation 9 5/8\" casing"
                      }
                    ],
                    formation: "Grès poreux",
                    equipmentUsed: ["Casing 9 5/8\"", "Ciment classe H"],
                    incidents: []
                  }
                ]
              },
              {
                id: 4,
                name: "Phase 8\" x 7\" inchs",
                status: "completed-bad",
                progress: 100,
                startDate: "2022-08-07",
                endDate: "2022-09-10",
                actualPhaseCost: 3405000,
                actualPhaseDepth: 600,
                actualPhaseDuration: 36,
                description: "Forage final et complétion",
                dailyReports: [
                  // 34 rapports journaliers détaillés
                  {
                    id: 30,
                    date: "2022-08-07",
                    depth: 1260,
                    progress: 5,
                    timeSpent: 24,
                    dailyCost: 65000,
                    planned_day : 30,
                actual_day : 32,
                    hasProblem: false,
                    problems: [],
                    operations: [
                      {
                        startTime: "00:00",
                        endTime: "24:00",
                        description: "Début forage 8 1/2\" section"
                      }
                    ],
                    formation: "Grès réservoir",
                    equipmentUsed: ["Trépan 8 1/2\" PDC"],
                    incidents: []
                  },
                  // ... autres jours
                  {
                    id: 63,
                    date: "2022-09-10",
                    depth: 2350,
                    progress: 100,
                    timeSpent: 12,
                    dailyCost: 68000,
                    planned_day : 63,
                actual_day : 66,
                    hasProblem: false,
                    problems: [],
                    operations: [
                      {
                        startTime: "00:00",
                        endTime: "12:00",
                        description: "Démobilisation équipement"
                      }
                    ],
                    formation: "Réservoir productif",
                    equipmentUsed: [],
                    incidents: []
                  }
                ]
              }
            ],
            problems: [
              {
                id: 1,
                name: "Problème de circulation boue",
                type: "Technique",
                severity: 'Moyenne',
                dateReported: "2022-07-02",
                phase: "Phase 26\" x 20\" inchs",
                hasSolution: true,
                solutions: ["Augmentation densité boue", "Nettoyage puits"],
                status: "Résolu",
                impact: { cost: 12000, delay: 0.5 }
              },
              {
                id: 2,
                name: "Déviation puits",
                type: "Technique",
                severity: 'Critique',
                dateReported: "2022-07-17",
                phase: "Phase 16\" x 13\" inchs",
                hasSolution: true,
                solutions: ["Correction trajectoire", "Utilisation stabilisateurs"],
                status: "Résolu",
                impact: { cost: 45000, delay: 2 }
              },
              {
                id: 3,
                name: "Perte circulation",
                type: "Technique",
                severity: 'Moyenne',
                dateReported: "2022-08-04",
                phase: "Phase 12\" x 9\" inchs",
                hasSolution: true,
                solutions: ["Mise en place bouchons LCM"],
                status: "Résolu",
                impact: { cost: 28000, delay: 1 }
              }
            ]
          },
          {
          id: 5,
          name: "Puit C",
          siteName: "Champ Ouest",
          location: "Désert Occidental, Algérie",
          coordinates: { lat: 30.1234, lng: 4.5678 },
          creationDate: "2022-09-01",
          startDate: "2022-09-15",
          endDate: "2023-06-30",
          status: "Completed",
          progress: 100,
          delay: 0,
          actualGlobalCost: 9250000,
          actualGlobalDuration: 72,
          actualGlobalDepth: 8555,
          planning: {
            plannedGlobalCost: 10800000,
            plannedGlobalDuration: 69,
            plannedGlobalDepth: 9600,
            phases: [
              {
                id: 1,
                name: "Phase 26\" x 20\" inchs",
                plannedPhaseDepth: 3300,
                plannedPhaseDuration: 2,
                plannedPhaseCost: 1025000,
                cumulativeDuration: 2,
                cumulativeCost: 1025000,
                cumulativeDepth: 300,
             
              },
              {
                id: 2,
                name: "Phase 16\" x 13\" inchs",
                plannedPhaseDepth: 3000,
                plannedPhaseDuration: 13,
                plannedPhaseCost: 2780000,
                cumulativeDuration: 15,
                cumulativeCost: 3805000,
                cumulativeDepth: 1000,
              },
              {
                id: 3,
                name: "Phase 12\" x 9\" inchs",
                plannedPhaseDepth: 2800,
                plannedPhaseDuration: 8,
                plannedPhaseCost: 2055000,
                cumulativeDuration: 23,
                cumulativeDuration: 5860000,
                cumulativeDuration: 1500,
              },
              {
                id: 4,
                name: "Phase 8\" x 7\" inchs",
                plannedPhaseDepth: 500,
                plannedPhaseDuration: 34,
                plannedPhaseCost: 3405000,
                cumulativeDuration: 57,
                cumulativeDuration: 9260000,
                cumulativeDuration: 2500,
              },
            ]
          },
       
          phases: [
            {
              id: 1,
              name: "Phase 26\" x 20\" inchs",
              status: "completed-good",
              progress: 100,
              startDate: "2022-09-15",
              endDate: "2022-09-17",
              actualPhaseCost: 980000,
              actualPhaseDepth: 0,
              actualPhaseDuration: 2,
              description: "Phase initiale de forage",
              dailyReports: [
                // 2 rapports journaliers détaillés
              ]
            },
            {
              id: 2,
              name: "Phase 16\" x 13\" inchs",
              status: "completed-good",
              progress: 100,
              startDate: "2022-09-19",
              endDate: "2022-10-02",
              actualPhaseCost: 2650000,
              actualPhaseDepth: 0,
              actualPhaseDuration: 13,
              description: "Forage intermédiaire",
              dailyReports: [
                // 13 rapports journaliers détaillés
              ]
            },
            {
              id: 3,
              name: "Phase 12\" x 9\" inchs",
              status: "completed-good",
              progress: 100,
              startDate: "2022-10-04",
              endDate: "2022-10-20",
              actualPhaseCost: 2400000,
              actualPhaseDepth: 0,
              actualPhaseDuration: 16,
              description: "Forage profond",
              dailyReports: [
                // 16 rapports journaliers détaillés
              ]
            },
            {
              id: 4,
              name: "Phase 8\" x 7\" inchs",
              status: "completed-bad",
              progress: 100,
              startDate: "2022-10-22",
              endDate: "2022-12-05",
              actualPhaseCost: 3220000,
              actualPhaseDepth: 0,
              actualPhaseDuration: 44,
              description: "Forage final et complétion",
              dailyReports: [
                // 44 rapports journaliers détaillés
              ]
            }
          ],
          problems: [
            {
              id: 1,
              name: "Retard livraison ciment",
              type: "Logistique",
              severity: 'Mineure',
              dateReported: "2022-09-16",
              phase: "Phase 26\" x 20\" inchs",
              hasSolution: true,
              solutions: ["Utilisation stock d'urgence"],
              status: "Resolved",
              impact: { cost: 5000, delay: 0.5 }
            },
            {
              id: 2,
              name: "Panne générateur",
              type: "Technique",
              severity: 'Critique',
              dateReported: "2022-10-15",
              phase: "Phase 12\" x 9\" inchs",
              hasSolution: true,
              solutions: ["Réparation sur site", "Utilisation groupe électrogène de secours"],
              status: "Resolved",
              impact: { cost: 75000, delay: 2 }
            }
          ]
        },
        

    ],
  
    metadata: {
        problemTypes: ["Technique", "Logistique", "Sécurité", "Personnel", "Environnement"],
        severityLevels: [
          { id: 1, label: "Mineure" },
          { id: 2, label: "Moyenne" },
          { id: 3, label: "Critique" }
        ],
        phaseTypes: [
          "26\" x 20\" inchs",
          "16\" x 13\" inchs",
          "12\" x 9\" inchs",
          "8\" x 7\" inchs"
        ],
        well_status_types: ["Not Started", "In Progress", "On going", "Delayed", "At Risk"],
        phase_status_types: ["not-completed", "not-started", "completed-good", "completed-bad"]
      }
    };
  
  export default data;
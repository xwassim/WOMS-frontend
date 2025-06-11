const data = {
    standardPlannings: {
        standardDrillingPlan: {
          id: 1,
          name: "Plan de forage standard",
          description: "Planning type pour les puits conventionnels",
          totalDuration: 69,
          totalCost: 10000000,
          phases: [
            {
              id: 1,
              name: "Phase 26\" x 20\" inchs",
              totalDuration: 2,
              totalCost: 1025000,
              operations: [
                { operation: "Drilling 26\" hole into Albian", cost: 800000, duration: 1 },
                { operation: "POOH. Run & cement 20\" casing. Drill out shoe.", cost: 225000, duration: 1 }
              ]
            },
            {
              id: 2,
              name: "Phase 16\" x 13\" inchs",
              totalDuration: 13, // 12 + 1 jour de correction
              totalCost: 2780000,
              operations: [
                { operation: "Drilling 16\" hole to base Dembaba", cost: 1200000, duration: 10 },
                { operation: "Logging. Run & cement 13 3/8\" casing. Install wellhead. Test BOP.", cost: 555000, duration: 3 }
              ]
            },
            {
              id: 3,
              name: "Phase 12\" x 9\" inchs",
              totalDuration: 8, // 5 + 3 jours
              totalCost: 2055000,
              operations: [
                { operation: "Drilling 12 1/4\" section to top Tahara", cost: 1500000, duration: 5 },
                { operation: "POOH. Logging. Run & cement 9 5/8\" casing. Drill out shoe.", cost: 555000, duration: 3 }
              ]
            },
            {
              id: 4,
              name: "Phase 8\" x 7\" inchs",
              totalDuration: 34,
              totalCost: 3405000,
              operations: [
                { operation: "Drilling 8 1/2\" section", cost: 1500000, duration: 12 },
                { operation: "Coring (6 cores) in 8 1/2\"", cost: 50000, duration: 8 },
                { operation: "POOH. Logging. Run & cement 7\" liner.", cost: 555000, duration: 7 },
                { operation: "Wiper trip. CBL/VDL on 7\" liner.", cost: 200000, duration: 2 },
                { operation: "Perfs & DST (5 levels)", cost: 1100000, duration: 15 }
              ]
            },
            {
              id: 5,
              name: "Plug and abandon",
              totalDuration: 2,
              totalCost: 700000,
              operations: [
                { operation: "Plug and abandon. Rig release.", cost: 700000, duration: 2 }
              ]
            },
            {
              id: 6,
              name: "Others",
              totalDuration: 0,
              totalCost: 1060000,
              operations: [
                { operation: "Mud logging, drilling mud, well head, casing accessories, safety, etc.", cost: 1060000, duration: 0 }
              ]
            }
          ]
        }
    },
    
    
  
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
        progress: 67,
        totalCost: 3885000,
        // plannedCost: 1000000,
        totalDuration: 25,
        delay: 0,
        totalDepth: 5555,
        planning: {
          totalCost: 10800000,
          totalDuration: 69,
          phases: [
            {
              id: 1,
              name: "Phase 26\" x 20\" inchs",
              depth: 300,
              totalDuration: 2,
              cumulativeDuration: 2,
              cumulativeCost: 1025000,
              cumulativeDepth: 300,
              totalCost: 1025000
            },
            {
              id: 2,
              name: "Phase 16\" x 13\" inchs",
               depth: 700,
              totalDuration: 13,
              totalCost: 2780000,
              cumulativeDuration: 15,
              cumulativeCost: 3805000,
              cumulativeDepth: 1000,
            },
            {
              id: 3,
              name: "Phase 12\" x 9\" inchs",
               depth: 1500,
              totalDuration: 8,
              totalCost: 2055000,
              cumulativeDuration: 23,
              cumulativeDuration: 5860000,
              cumulativeDuration: 1500,
            },
            {
              id: 4,
              name: "Phase 8\" x 7\" inchs",
               depth: 1000,
              totalDuration: 34,
              totalCost: 3405000,
              cumulativeDuration: 57,
              cumulativeDuration: 9260000,
              cumulativeDuration: 2500,
            },
            {
              id: 5,
              name: "Plug and abandon and Others",
              depth: 300,
              totalDuration: 2,
              totalCost: 700000,
              cumulativeDuration: 59,
              cumulativeDuration: 9960000,
              cumulativeDuration: 2800,
            },
          ]
        },
        team: {
          supervisor: "Mohamed Khemissi",
          drillingEngineer: "Ali Benmoussa",
          crewMembers: 12
        },
        phases: [
          {
            id: 1,
            name: "Phase 26\" x 20\" inchs",
            status: "completed-good",
            progress: 100,
            startDate: "2022-08-01",
            endDate: "2022-08-02",
            totalCost: 1025000,
            totalDuration: 2,
            totalDepth: 300,
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
                      severity: 2,
        
                      phase: "Phase 26\" x 20\" inchs",
                      hasSolution: true,
                      solutions: [
                        "Remplacement immédiat de l'outil",
                      ],
                      status: "Resolved",
                      impact: { cost: 15000, delay: 1 }
                    }, {
                      id: 1,
                      name: "Casse outil de forage",
                      type: "Technique",
                      severity: 2,
        
                      phase: "Phase 26\" x 20\" inchs",
                      hasSolution: false,
                      solutions: [
                        "aucune solution",
                      ],
                      status: "Resolved",
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
                      severity: 1,
                      phase: "Phase 20\" x 16\" inchs",
                      hasSolution: false,
                      status: "Open",
                      impact: { cost: 2000, delay: 0 }
                    },
                    {
                      id: 2,
                      name: "Conditions météo défavorables",
                      type: "Environnement",
                      severity: 3,
                      phase: "Phase 26\" x 20\" inchs",
                      hasSolution: true,
                      solutions: ["Arrêt temporaire des opérations"],
                      status: "Resolved",
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
            status: "completed-good",
            progress: 100,
            totalCost: 2780000,
            totalDuration: 13,
            totalDepth: 700,
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
                      severity: 2,
                      phase: "Phase 16\" x 13\" inchs",
                      hasSolution: true,
                      solutions: [
                        "Remplacement immédiat de l'outil",
                      ],
                      status: "Resolved",
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
                problems: ['pas de problèmes'],
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
            status: "completed-bad",
            progress: 100,
            totalCost: 0,
            totalDuration: 0,
            totalDepth: 0,
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
                        severity: 1,
                        phase: "Phase 12\" x 9\" inchs",
                        hasSolution: false,
                        status: "Open",
                        impact: { cost: 0, delay: 7 }
                      },
                      {
                        id: 2,
                        name: "Conditions météo défavorables",
                        type: "Environnement",
                        severity: 3,
                        phase: "Phase 13 3/8\" casing",
                        hasSolution: true,
                        solutions: ["Arrêt temporaire des opérations"],
                        status: "Resolved",
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
            status: "Not Started",
            progress: 0,
            totalCost: 0,
            totalDuration: 0,
            totalDepth: 0,
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
          status: "On going",
          progress: 50,
          totalCost: 8950000,
          totalDuration: 65,
          delay: 3,
          totalDepth: 5555,
           planning: {
          totalCost: 10800000,
          totalDuration: 69,
          phases: [
            {
              id: 1,
              name: "Phase 26\" x 20\" inchs",
              depth: 300,
              totalDuration: 2,
              cumulativeDuration: 2,
              cumulativeCost: 1025000,
              cumulativeDepth: 300,
              totalCost: 1025000
            },
            {
              id: 2,
              name: "Phase 16\" x 13\" inchs",
               depth: 700,
              totalDuration: 13,
              totalCost: 2780000,
              cumulativeDuration: 15,
              cumulativeCost: 3805000,
              cumulativeDepth: 1000,
            },
            {
              id: 3,
              name: "Phase 12\" x 9\" inchs",
               depth: 1500,
              totalDuration: 8,
              totalCost: 2055000,
              cumulativeDuration: 23,
              cumulativeDuration: 5860000,
              cumulativeDuration: 1500,
            },
            {
              id: 4,
              name: "Phase 8\" x 7\" inchs",
               depth: 1000,
              totalDuration: 34,
              totalCost: 3405000,
              cumulativeDuration: 57,
              cumulativeDuration: 9260000,
              cumulativeDuration: 2500,
            },
            {
              id: 5,
              name: "Plug and abandon and Others",
              depth: 300,
              totalDuration: 2,
              totalCost: 700000,
              cumulativeDuration: 59,
              cumulativeDuration: 9960000,
              cumulativeDuration: 2800,
            },
          ]
        },
          team: {
            supervisor: "Karim Belkacem",
            drillingEngineer: "Nadia Zeroual",
            crewMembers: 14
          },
          phases: [
            {
              id: 1,
              name: "Phase 26\" x 20\" inchs",
              status: "Completed",
              progress: 100,
              startDate: "2022-07-01",
              endDate: "2022-07-03",
              totalCost: 1050000,
              totalDuration: 2,
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
                      severity: 2,
                      phase: "Phase 26\" x 20\" inchs",
                      hasSolution: true,
                      solutions: ["Augmentation densité boue", "Nettoyage puits"],
                      status: "Resolved",
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
              status: "Completed",
              progress: 100,
              startDate: "2022-07-05",
              endDate: "2022-07-18",
              totalCost: 2800000,
              totalDuration: 13,
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
                      severity: 3,
                      phase: "Phase 16\" x 13\" inchs",
                      hasSolution: true,
                      solutions: ["Correction trajectoire", "Utilisation stabilisateurs"],
                      status: "Resolved",
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
              status: "Completed",
              progress: 100,
              startDate: "2022-07-20",
              endDate: "2022-08-05",
              totalCost: 2500000,
              totalDuration: 16,
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
                      severity: 2,
                      phase: "Phase 12\" x 9\" inchs",
                      hasSolution: true,
                      solutions: ["Mise en place bouchons LCM"],
                      status: "Resolved",
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
              status: "Completed",
              progress: 100,
              startDate: "2022-08-07",
              endDate: "2022-09-10",
              totalCost: 2600000,
              totalDuration: 34,
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
              severity: 2,
              dateReported: "2022-07-02",
              phase: "Phase 26\" x 20\" inchs",
              hasSolution: true,
              solutions: ["Augmentation densité boue", "Nettoyage puits"],
              status: "Resolved",
              impact: { cost: 12000, delay: 0.5 }
            },
            {
              id: 2,
              name: "Déviation puits",
              type: "Technique",
              severity: 3,
              dateReported: "2022-07-17",
              phase: "Phase 16\" x 13\" inchs",
              hasSolution: true,
              solutions: ["Correction trajectoire", "Utilisation stabilisateurs"],
              status: "Resolved",
              impact: { cost: 45000, delay: 2 }
            },
            {
              id: 3,
              name: "Perte circulation",
              type: "Technique",
              severity: 2,
              dateReported: "2022-08-04",
              phase: "Phase 12\" x 9\" inchs",
              hasSolution: true,
              solutions: ["Mise en place bouchons LCM"],
              status: "Resolved",
              impact: { cost: 28000, delay: 1 }
            }
          ]
        },
      
        // Puit C - Terminé
        {
          id: 3,
          name: "Puit C",
          siteName: "Champ Ouest",
          location: "Désert Occidental, Algérie",
          coordinates: { lat: 30.1234, lng: 4.5678 },
          creationDate: "2022-09-01",
          startDate: "2022-09-15",
          endDate: "2023-06-30",
          status: "At Risk",
          progress: 70,
          totalCost: 9250000,
          totalDuration: 72,
          delay: 0,
          totalDepth: 5555,
          planning: {
          totalCost: 10800000,
          totalDuration: 69,
          phases: [
            {
              id: 1,
              name: "Phase 26\" x 20\" inchs",
              depth: 300,
              totalDuration: 2,
              cumulativeDuration: 2,
              cumulativeCost: 1025000,
              cumulativeDepth: 300,
              totalCost: 1025000
            },
            {
              id: 2,
              name: "Phase 16\" x 13\" inchs",
               depth: 700,
              totalDuration: 13,
              totalCost: 2780000,
              cumulativeDuration: 15,
              cumulativeCost: 3805000,
              cumulativeDepth: 1000,
            },
            {
              id: 3,
              name: "Phase 12\" x 9\" inchs",
               depth: 1500,
              totalDuration: 8,
              totalCost: 2055000,
              cumulativeDuration: 23,
              cumulativeDuration: 5860000,
              cumulativeDuration: 1500,
            },
            {
              id: 4,
              name: "Phase 8\" x 7\" inchs",
               depth: 1000,
              totalDuration: 34,
              totalCost: 3405000,
              cumulativeDuration: 57,
              cumulativeDuration: 9260000,
              cumulativeDuration: 2500,
            },
            {
              id: 5,
              name: "Plug and abandon and Others",
              depth: 300,
              totalDuration: 2,
              totalCost: 700000,
              cumulativeDuration: 59,
              cumulativeDuration: 9960000,
              cumulativeDuration: 2800,
            },
          ]
        },
          team: {
            supervisor: "Rachid Boukherroub",
            drillingEngineer: "Samira Hadjadj",
            crewMembers: 13
          },
          phases: [
            {
              id: 1,
              name: "Phase 26\" x 20\" inchs",
              status: "Completed",
              progress: 100,
              startDate: "2022-09-15",
              endDate: "2022-09-17",
              totalCost: 980000,
              totalDuration: 2,
              description: "Phase initiale de forage",
              dailyReports: [
                // 2 rapports journaliers détaillés
              ]
            },
            {
              id: 2,
              name: "Phase 16\" x 13\" inchs",
              status: "Completed",
              progress: 100,
              startDate: "2022-09-19",
              endDate: "2022-10-02",
              totalCost: 2650000,
              totalDuration: 13,
              description: "Forage intermédiaire",
              dailyReports: [
                // 13 rapports journaliers détaillés
              ]
            },
            {
              id: 3,
              name: "Phase 12\" x 9\" inchs",
              status: "Completed",
              progress: 100,
              startDate: "2022-10-04",
              endDate: "2022-10-20",
              totalCost: 2400000,
              totalDuration: 16,
              description: "Forage profond",
              dailyReports: [
                // 16 rapports journaliers détaillés
              ]
            },
            {
              id: 4,
              name: "Phase 8\" x 7\" inchs",
              status: "Completed",
              progress: 100,
              startDate: "2022-10-22",
              endDate: "2022-12-05",
              totalCost: 3220000,
              totalDuration: 44,
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
              severity: 1,
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
              severity: 3,
              dateReported: "2022-10-15",
              phase: "Phase 12\" x 9\" inchs",
              hasSolution: true,
              solutions: ["Réparation sur site", "Utilisation groupe électrogène de secours"],
              status: "Resolved",
              impact: { cost: 75000, delay: 2 }
            }
          ]
        },
        {
          // Puit D
          id: 4,
          name: "Puit D",
          siteName: "Champ Rhourde Nouss",
          location: "Zone Sud-Est, Algérie",
          coordinates: { lat: 32.4567, lng: 5.6789 },
          creationDate: "2022-06-15",
          startDate: "2022-07-01",
          endDate: "2023-04-20",
          status: "Delayed",
          progress: 90,
          totalCost: 8950000,
          totalDuration: 55,
          delay: 3,
          totalDepth: 5555,
          planning: {
          totalCost: 10800000,
          totalDuration: 69,
          phases: [
            {
              id: 1,
              name: "Phase 26\" x 20\" inchs",
              depth: 300,
              totalDuration: 2,
              cumulativeDuration: 2,
              cumulativeCost: 1025000,
              cumulativeDepth: 300,
              totalCost: 1025000
            },
            {
              id: 2,
              name: "Phase 16\" x 13\" inchs",
               depth: 700,
              totalDuration: 13,
              totalCost: 2780000,
              cumulativeDuration: 15,
              cumulativeCost: 3805000,
              cumulativeDepth: 1000,
            },
            {
              id: 3,
              name: "Phase 12\" x 9\" inchs",
               depth: 1500,
              totalDuration: 8,
              totalCost: 2055000,
              cumulativeDuration: 23,
              cumulativeDuration: 5860000,
              cumulativeDuration: 1500,
            },
            {
              id: 4,
              name: "Phase 8\" x 7\" inchs",
               depth: 1000,
              totalDuration: 34,
              totalCost: 3405000,
              cumulativeDuration: 57,
              cumulativeDuration: 9260000,
              cumulativeDuration: 2500,
            },
            {
              id: 5,
              name: "Plug and abandon and Others",
              depth: 300,
              totalDuration: 2,
              totalCost: 700000,
              cumulativeDuration: 59,
              cumulativeDuration: 9960000,
              cumulativeDuration: 2800,
            },
          ]
        },
          team: {
            supervisor: "Karim Belkacem",
            drillingEngineer: "Nadia Zeroual",
            crewMembers: 14
          },
          phases: [
            {
              id: 1,
              name: "Phase 26\" x 20\" inchs",
              status: "Completed",
              progress: 100,
              startDate: "2022-07-01",
              endDate: "2022-07-03",
              totalCost: 1050000,
              totalDuration: 2,
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
                      severity: 2,
                      phase: "Phase 26\" x 20\" inchs",
                      hasSolution: true,
                      solutions: ["Augmentation densité boue", "Nettoyage puits"],
                      status: "Resolved",
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
              status: "Completed",
              progress: 100,
              startDate: "2022-07-05",
              endDate: "2022-07-18",
              totalCost: 2800000,
              totalDuration: 13,
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
                      severity: 3,
                      phase: "Phase 16\" x 13\" inchs",
                      hasSolution: true,
                      solutions: ["Correction trajectoire", "Utilisation stabilisateurs"],
                      status: "Resolved",
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
              status: "Completed",
              progress: 100,
              startDate: "2022-07-20",
              endDate: "2022-08-05",
              totalCost: 2500000,
              totalDuration: 16,
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
                      severity: 2,
                      phase: "Phase 12\" x 9\" inchs",
                      hasSolution: true,
                      solutions: ["Mise en place bouchons LCM"],
                      status: "Resolved",
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
              status: "Completed",
              progress: 100,
              startDate: "2022-08-07",
              endDate: "2022-09-10",
              totalCost: 2600000,
              totalDuration: 34,
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
              severity: 2,
              dateReported: "2022-07-02",
              phase: "Phase 26\" x 20\" inchs",
              hasSolution: true,
              solutions: ["Augmentation densité boue", "Nettoyage puits"],
              status: "Resolved",
              impact: { cost: 12000, delay: 0.5 }
            },
            {
              id: 2,
              name: "Déviation puits",
              type: "Technique",
              severity: 3,
              dateReported: "2022-07-17",
              phase: "Phase 16\" x 13\" inchs",
              hasSolution: true,
              solutions: ["Correction trajectoire", "Utilisation stabilisateurs"],
              status: "Resolved",
              impact: { cost: 45000, delay: 2 }
            },
            {
              id: 3,
              name: "Perte circulation",
              type: "Technique",
              severity: 2,
              dateReported: "2022-08-04",
              phase: "Phase 12\" x 9\" inchs",
              hasSolution: true,
              solutions: ["Mise en place bouchons LCM"],
              status: "Resolved",
              impact: { cost: 28000, delay: 1 }
            }
          ]
        },
          // Puit E - Terminé
          {
            id: 5,
            name: "Puit E",
            siteName: "Hassi Messaoud",
            location: "Zone Sud-Est, Algérie",
            coordinates: { lat: 32.4567, lng: 5.6789 },
            creationDate: "2022-06-15",
            startDate: "2022-07-01",
            endDate: "2023-04-20",
            status: "Completed",
            progress: 100,
            totalCost: 8950000,
            totalDuration: 65,
            delay: 3,
            totalDepth: 5555,
            planning: {
          totalCost: 10800000,
          totalDuration: 69,
          phases: [
            {
              id: 1,
              name: "Phase 26\" x 20\" inchs",
              depth: 300,
              totalDuration: 2,
              cumulativeDuration: 2,
              cumulativeCost: 1025000,
              cumulativeDepth: 300,
              totalCost: 1025000
            },
            {
              id: 2,
              name: "Phase 16\" x 13\" inchs",
               depth: 700,
              totalDuration: 13,
              totalCost: 2780000,
              cumulativeDuration: 15,
              cumulativeCost: 3805000,
              cumulativeDepth: 1000,
            },
            {
              id: 3,
              name: "Phase 12\" x 9\" inchs",
               depth: 1500,
              totalDuration: 8,
              totalCost: 2055000,
              cumulativeDuration: 23,
              cumulativeDuration: 5860000,
              cumulativeDuration: 1500,
            },
            {
              id: 4,
              name: "Phase 8\" x 7\" inchs",
               depth: 1000,
              totalDuration: 34,
              totalCost: 3405000,
              cumulativeDuration: 57,
              cumulativeDuration: 9260000,
              cumulativeDuration: 2500,
            },
            {
              id: 5,
              name: "Plug and abandon and Others",
              depth: 300,
              totalDuration: 2,
              totalCost: 700000,
              cumulativeDuration: 59,
              cumulativeDuration: 9960000,
              cumulativeDuration: 2800,
            },
          ]
        },
            team: {
              supervisor: "Karim Belkacem",
              drillingEngineer: "Nadia Zeroual",
              crewMembers: 14
            },
            phases: [
              {
                id: 1,
                name: "Phase 26\" x 20\" inchs",
                status: "Completed",
                progress: 100,
                startDate: "2022-07-01",
                endDate: "2022-07-03",
                totalCost: 1050000,
                totalDuration: 2,
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
                        severity: 2,
                        phase: "Phase 26\" x 20\" inchs",
                        hasSolution: true,
                        solutions: ["Augmentation densité boue", "Nettoyage puits"],
                        status: "Resolved",
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
                status: "Completed",
                progress: 100,
                startDate: "2022-07-05",
                endDate: "2022-07-18",
                totalCost: 2800000,
                totalDuration: 13,
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
                        severity: 3,
                        phase: "Phase 16\" x 13\" inchs",
                        hasSolution: true,
                        solutions: ["Correction trajectoire", "Utilisation stabilisateurs"],
                        status: "Resolved",
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
                status: "Completed",
                progress: 100,
                startDate: "2022-07-20",
                endDate: "2022-08-05",
                totalCost: 2500000,
                totalDuration: 16,
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
                        severity: 2,
                        phase: "Phase 12\" x 9\" inchs",
                        hasSolution: true,
                        solutions: ["Mise en place bouchons LCM"],
                        status: "Resolved",
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
                status: "Completed",
                progress: 100,
                startDate: "2022-08-07",
                endDate: "2022-09-10",
                totalCost: 2600000,
                totalDuration: 34,
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
                severity: 2,
                dateReported: "2022-07-02",
                phase: "Phase 26\" x 20\" inchs",
                hasSolution: true,
                solutions: ["Augmentation densité boue", "Nettoyage puits"],
                status: "Resolved",
                impact: { cost: 12000, delay: 0.5 }
              },
              {
                id: 2,
                name: "Déviation puits",
                type: "Technique",
                severity: 3,
                dateReported: "2022-07-17",
                phase: "Phase 16\" x 13\" inchs",
                hasSolution: true,
                solutions: ["Correction trajectoire", "Utilisation stabilisateurs"],
                status: "Resolved",
                impact: { cost: 45000, delay: 2 }
              },
              {
                id: 3,
                name: "Perte circulation",
                type: "Technique",
                severity: 2,
                dateReported: "2022-08-04",
                phase: "Phase 12\" x 9\" inchs",
                hasSolution: true,
                solutions: ["Mise en place bouchons LCM"],
                status: "Resolved",
                impact: { cost: 28000, delay: 1 }
              }
            ]
          },
        //     // Puit E - Terminé
        // {
        //   id: 6,
        //   name: "Puit F",
        //   siteName: "Champ Rhourde Nouss",
        //   location: "Zone Sud-Est, Algérie",
        //   coordinates: { lat: 32.4567, lng: 5.6789 },
        //   creationDate: "2022-06-15",
        //   startDate: "2022-07-01",
        //   endDate: "2023-04-20",
        //   status: "Completed",
        //   progress: 100,
        //   totalCost: 8950000,
        //   totalDuration: 65,
        //   delay: 3,
        // totalDepth: 5555,
        //    planning: {
        //   totalCost: 10800000,
        //   totalDuration: 69,
        //   phases: [
        //     {
        //       id: 1,
        //       name: "Phase 26\" x 20\" inchs",
        //       depth: 300,
        //       totalDuration: 2,
        //       cumulativeDuration: 2,
        //       cumulativeCost: 1025000,
        //       cumulativeDepth: 300,
        //       totalCost: 1025000
        //     },
        //     {
        //       id: 2,
        //       name: "Phase 16\" x 13\" inchs",
        //        depth: 700,
        //       totalDuration: 13,
        //       totalCost: 2780000,
        //       cumulativeDuration: 15,
        //       cumulativeCost: 3805000,
        //       cumulativeDepth: 1000,
        //     },
        //     {
        //       id: 3,
        //       name: "Phase 12\" x 9\" inchs",
        //        depth: 1500,
        //       totalDuration: 8,
        //       totalCost: 2055000,
        //       cumulativeDuration: 23,
        //       cumulativeDuration: 5860000,
        //       cumulativeDuration: 1500,
        //     },
        //     {
        //       id: 4,
        //       name: "Phase 8\" x 7\" inchs",
        //        depth: 1000,
        //       totalDuration: 34,
        //       totalCost: 3405000,
        //       cumulativeDuration: 57,
        //       cumulativeDuration: 9260000,
        //       cumulativeDuration: 2500,
        //     },
        //     {
        //       id: 5,
        //       name: "Plug and abandon and Others",
        //       depth: 300,
        //       totalDuration: 2,
        //       totalCost: 700000,
        //       cumulativeDuration: 59,
        //       cumulativeDuration: 9960000,
        //       cumulativeDuration: 2800,
        //     },
        //   ]
        // },
        //   team: {
        //     supervisor: "Karim Belkacem",
        //     drillingEngineer: "Nadia Zeroual",
        //     crewMembers: 14
        //   },
        //   phases: [
        //     {
        //       id: 1,
        //       name: "Phase 26\" x 20\" inchs",
        //       status: "Completed",
        //       progress: 100,
        //       startDate: "2022-07-01",
        //       endDate: "2022-07-03",
        //       totalCost: 1050000,
        //       totalDuration: 2,
        //       description: "Phase initiale de forage",
        //       dailyReports: [
        //         {
        //           id: 1,
        //           date: "2022-07-01",
        //           depth: 62,
        //           progress: 20,
        //           timeSpent: 22,
        //           dailyCost: 58000,
        //           hasProblem: false,
        //           problems: [],
        //           operations: [
        //             {
        //               startTime: "06:00",
        //               endTime: "10:00",
        //               description: "Préparation site et assemblage équipement"
        //             },
        //             {
        //               startTime: "10:00",
        //               endTime: "18:00",
        //               description: "Début forage 26\" section"
        //             }
        //           ],
        //           formation: "Formation sableuse",
        //           equipmentUsed: ["Trépan 26\" IADC 517", "Tiges lourdes 8\""],
        //           incidents: []
        //         },
        //         {
        //           id: 2,
        //           date: "2022-07-02",
        //           depth: 85,
        //           progress: 23,
        //           timeSpent: 24,
        //           dailyCost: 59500,
        //           hasProblem: true,
        //           problems: [
        //             {
        //               id: 1,
        //               name: "Problème de circulation boue",
        //               type: "Technique",
        //               severity: 2,
        //               phase: "Phase 26\" x 20\" inchs",
        //               hasSolution: true,
        //               solutions: ["Augmentation densité boue", "Nettoyage puits"],
        //               status: "Resolved",
        //               impact: { cost: 12000, delay: 0.5 }
        //             }
        //           ],
        //           operations: [
        //             {
        //               startTime: "00:00",
        //               endTime: "12:00",
        //               description: "Forage continu 26\" section"
        //             },
        //             {
        //               startTime: "12:00",
        //               endTime: "18:00",
        //               description: "Cimentation 20\" casing"
        //             }
        //           ],
        //           formation: "Grès compacts",
        //           equipmentUsed: ["Casing 20\"", "Ciment classe G"],
        //           incidents: []
        //         }
        //       ]
        //     },
        //     {
        //       id: 2,
        //       name: "Phase 16\" x 13\" inchs",
        //       status: "Completed",
        //       progress: 100,
        //       startDate: "2022-07-05",
        //       endDate: "2022-07-18",
        //       totalCost: 2800000,
        //       totalDuration: 13,
        //       description: "Forage intermédiaire",
        //       dailyReports: [
        //         {
        //           id: 3,
        //           date: "2022-07-05",
        //           depth: 120,
        //           progress: 15,
        //           timeSpent: 18,
        //           dailyCost: 61000,
        //           hasProblem: false,
        //           problems: [],
        //           operations: [
        //             {
        //               startTime: "06:00",
        //               endTime: "24:00",
        //               description: "Début forage 16\" section"
        //             }
        //           ],
        //           formation: "Argile compacte",
        //           equipmentUsed: ["Trépan 16\" PDC"],
        //           incidents: []
        //         },
        //         // ... 10 autres rapports journaliers pour cette phase
        //         {
        //           id: 13,
        //           date: "2022-07-18",
        //           depth: 650,
        //           progress: 100,
        //           timeSpent: 12,
        //           dailyCost: 62500,
        //           hasProblem: true,
        //           problems: [
        //             {
        //               id: 2,
        //               name: "Déviation puits",
        //               type: "Technique",
        //               severity: 3,
        //               phase: "Phase 16\" x 13\" inchs",
        //               hasSolution: true,
        //               solutions: ["Correction trajectoire", "Utilisation stabilisateurs"],
        //               status: "Resolved",
        //               impact: { cost: 45000, delay: 2 }
        //             }
        //           ],
        //           operations: [
        //             {
        //               startTime: "00:00",
        //               endTime: "12:00",
        //               description: "Installation wellhead et test BOP"
        //             }
        //           ],
        //           formation: "Calcaire fracturé",
        //           equipmentUsed: ["Casing 13 3/8\"", "Wellhead"],
        //           incidents: []
        //         }
        //       ]
        //     },
        //     {
        //       id: 3,
        //       name: "Phase 12\" x 9\" inchs",
        //       status: "Completed",
        //       progress: 100,
        //       startDate: "2022-07-20",
        //       endDate: "2022-08-05",
        //       totalCost: 2500000,
        //       totalDuration: 16,
        //       description: "Forage profond",
        //       dailyReports: [
        //         // 16 rapports journaliers détaillés
        //         {
        //           id: 14,
        //           date: "2022-07-20",
        //           depth: 670,
        //           progress: 10,
        //           timeSpent: 24,
        //           dailyCost: 63000,
        //           hasProblem: false,
        //           problems: [],
        //           operations: [
        //             {
        //               startTime: "00:00",
        //               endTime: "24:00",
        //               description: "Début forage 12 1/4\" section"
        //             }
        //           ],
        //           formation: "Dolomie",
        //           equipmentUsed: ["Trépan 12 1/4\" PDC"],
        //           incidents: []
        //         },
        //         // ... autres jours
        //         {
        //           id: 29,
        //           date: "2022-08-05",
        //           depth: 1250,
        //           progress: 100,
        //           timeSpent: 8,
        //           dailyCost: 64000,
        //           hasProblem: true,
        //           problems: [
        //             {
        //               id: 3,
        //               name: "Perte circulation",
        //               type: "Technique",
        //               severity: 2,
        //               phase: "Phase 12\" x 9\" inchs",
        //               hasSolution: true,
        //               solutions: ["Mise en place bouchons LCM"],
        //               status: "Resolved",
        //               impact: { cost: 28000, delay: 1 }
        //             }
        //           ],
        //           operations: [
        //             {
        //               startTime: "00:00",
        //               endTime: "08:00",
        //               description: "Cimentation 9 5/8\" casing"
        //             }
        //           ],
        //           formation: "Grès poreux",
        //           equipmentUsed: ["Casing 9 5/8\"", "Ciment classe H"],
        //           incidents: []
        //         }
        //       ]
        //     },
        //     {
        //       id: 4,
        //       name: "Phase 8\" x 7\" inchs",
        //       status: "Completed",
        //       progress: 100,
        //       startDate: "2022-08-07",
        //       endDate: "2022-09-10",
        //       totalCost: 2600000,
        //       totalDuration: 34,
        //       description: "Forage final et complétion",
        //       dailyReports: [
        //         // 34 rapports journaliers détaillés
        //         {
        //           id: 30,
        //           date: "2022-08-07",
        //           depth: 1260,
        //           progress: 5,
        //           timeSpent: 24,
        //           dailyCost: 65000,
        //           hasProblem: false,
        //           problems: [],
        //           operations: [
        //             {
        //               startTime: "00:00",
        //               endTime: "24:00",
        //               description: "Début forage 8 1/2\" section"
        //             }
        //           ],
        //           formation: "Grès réservoir",
        //           equipmentUsed: ["Trépan 8 1/2\" PDC"],
        //           incidents: []
        //         },
        //         // ... autres jours
        //         {
        //           id: 63,
        //           date: "2022-09-10",
        //           depth: 2350,
        //           progress: 100,
        //           timeSpent: 12,
        //           dailyCost: 68000,
        //           hasProblem: false,
        //           problems: [],
        //           operations: [
        //             {
        //               startTime: "00:00",
        //               endTime: "12:00",
        //               description: "Démobilisation équipement"
        //             }
        //           ],
        //           formation: "Réservoir productif",
        //           equipmentUsed: [],
        //           incidents: []
        //         }
        //       ]
        //     }
        //   ],
        //   problems: [
        //     {
        //       id: 1,
        //       name: "Problème de circulation boue",
        //       type: "Technique",
        //       severity: 2,
        //       dateReported: "2022-07-02",
        //       phase: "Phase 26\" x 20\" inchs",
        //       hasSolution: true,
        //       solutions: ["Augmentation densité boue", "Nettoyage puits"],
        //       status: "Resolved",
        //       impact: { cost: 12000, delay: 0.5 }
        //     },
        //     {
        //       id: 2,
        //       name: "Déviation puits",
        //       type: "Technique",
        //       severity: 3,
        //       dateReported: "2022-07-17",
        //       phase: "Phase 16\" x 13\" inchs",
        //       hasSolution: true,
        //       solutions: ["Correction trajectoire", "Utilisation stabilisateurs"],
        //       status: "Resolved",
        //       impact: { cost: 45000, delay: 2 }
        //     },
        //     {
        //       id: 3,
        //       name: "Perte circulation",
        //       type: "Technique",
        //       severity: 2,
        //       dateReported: "2022-08-04",
        //       phase: "Phase 12\" x 9\" inchs",
        //       hasSolution: true,
        //       solutions: ["Mise en place bouchons LCM"],
        //       status: "Resolved",
        //       impact: { cost: 28000, delay: 1 }
        //     }
        //   ]
        // },
      
        
      
    ],
  
    metadata: {
        problemTypes: ["Technique", "Logistique", "Sécurité", "Personnel", "Environnement"],
        severityLevels: [
          { id: 1, label: "Faible" },
          { id: 2, label: "Moyenne" },
          { id: 3, label: "Élevée" }
        ],
        phaseTypes: [
          "26\" x 20\" inchs",
          "16\" x 13\" inchs",
          "12\" x 9\" inchs",
          "8\" x 7\" inchs"
        ],
        statusTypes: ["Not Started", "In Progress", "completed-good", "completed-bad", "At Risk"]
      }
    };
  
  export default data;
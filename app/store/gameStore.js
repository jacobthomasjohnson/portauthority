import { create } from "zustand";
import { destinations } from "../data/destinations";

const useGameStore = create((set, get) => ({
      ///////////////////////// Imported Items /////////////////////////

      destinations,

      ///////////////////////// Offered Route /////////////////////////

      offeredRoute: {},
      setOfferedRoute: (details) => {
            set((state) => {
                  return {
                        ...state,
                        offeredRoute: {
                              ...state.offeredRoute,
                              details,
                        },
                  };
            });
      },
      updateOfferedRoute: (key, value) => {
            set((state) => {
                  return {
                        ...state,
                        offeredRoute: {
                              ...state.offeredRoute,
                              [key]: value,
                        },
                  };
            });
      },
      clearOfferedRoute: () => {
            set((state) => {
                  return {
                        ...state,
                        offeredRoute: {},
                  };
            });
      },

      ///////////////////////// Player Stats /////////////////////////

      playerStats: {
            cash: 0,
            karma: 100,
            level: 1,
      },
      updatePlayerStats: (key, value) => {
            set((state) => {
                  return {
                        ...state,
                        playerStats: {
                              ...state.playerStats,
                              [key]: value,
                        },
                  };
            });
      },

      ///////////////////////// Prompt System /////////////////////////

      currentPrompt: null,
      setCurrentPrompt: (type) => {
            set((state) => {
                  return {
                        ...state,
                        currentPrompt: type,
                  };
            });
      },

      ///////////////////////// Upgrades System /////////////////////////

      upgrades: [],
      management: [{}],

      ///////////////////////// Logging System /////////////////////////

      log: [],

      ///////////////////////// ID System /////////////////////////

      usedIDs: [],
      generateId: () => {
            const characters = "ABCDEFGHIJKLMNOPQRSTUVWYX123456789";
            let id;
            do {
                  id = Array.from({ length: 5 }, () =>
                        characters.charAt(
                              Math.floor(Math.random() * characters.length)
                        )
                  ).join("");
            } while (get().usedIDs.includes(id));
            get().usedIDs.push(id);
            return id;
      },

      ///////////////////////// Ship System /////////////////////////

      ships: [
            {
                  id: 1,
                  name: "Bohemouth",
                  available: true,
                  damaged: false,
                  durability: 100,
                  maxLoad: 10000,
                  speed: 1,
                  isRemote: false,
            },
            // {
            //       id: 2,
            //       name: "Exitor",
            //       available: true,
            //       damaged: false,
            //       durability: 38,
            //       maxLoad: 65000,
            //       speed: 3,
            //       isRemote: true,
            // },
            // {
            //       id: 3,
            //       name: "Ceram",
            //       available: true,
            //       damaged: false,
            //       durability: 90,
            //       maxLoad: 92000,
            //       speed: 1,
            //       isRemote: false,
            // },
            // {
            //       id: 4,
            //       name: "Dooba",
            //       available: true,
            //       damaged: false,
            //       durability: 38,
            //       maxLoad: 65000,
            //       speed: 3,
            //       isRemote: true,
            // },
      ],
      findShipById: (id) => {
            return get().ships.find((ship) => ship.shipId === id); // Returns the object from Ships that corresponds to the ID entered
      },
      updateShip: (shipId, key, value) => {
            set((state) => ({
                  ...state,
                  ships: state.ships.map((ship) =>
                        ship.id === shipId ? { ...ship, [key]: value } : ship
                  ),
            }));
      },

      ///////////////////////// Docks System /////////////////////////

      docks: [
            {
                  id: 1,
                  available: true,
                  damaged: false,
                  employees: 1,
            },
      ],
      updateDocks: (dockId, key, value) => {
            set((state) => {
                  return {
                        docks: state.docks.map((d) =>
                              d.dockId === dockId
                                    ? {
                                            ...d,
                                            [key]: value,
                                      }
                                    : d
                        ),
                  };
            });
      },

      ///////////////////////// Routes System /////////////////////////

      routes: [
            {
                  id: "XXXXX", // Randomly generated string ID.
                  ship: 1, // Which ship (by ID) is in use for this route.
                  from: "PORT",
                  to: "CHI",
                  load: 1000, // Value of route when completed, cut if issue occurs.
                  value: 10000,
                  distance: 100,
                  progress: 100, // Actively updates throughout the course of the route.
                  status: "received",
            },
            {
                  id: "XX2XX", // Randomly generated string ID.
                  ship: 2, // Which ship (by ID) is in use for this route.
                  from: "PORT",
                  to: "CHI",
                  load: 1000, // Value of route when completed, cut if issue occurs.
                  value: 10000,
                  distance: 100,
                  progress: 100, // Actively updates throughout the course of the route.
                  status: "received",
            },
            {
                  id: "XX3XX", // Randomly generated string ID.
                  ship: 3, // Which ship (by ID) is in use for this route.
                  from: "PORT",
                  to: "CHI",
                  load: 1000, // Value of route when completed, cut if issue occurs.
                  value: 10000,
                  distance: 100,
                  progress: 100, // Actively updates throughout the course of the route.
                  status: "received",
            },
            {
                  id: "XX4XX", // Randomly generated string ID.
                  ship: 4, // Which ship (by ID) is in use for this route.
                  from: "PORT",
                  to: "CHI",
                  load: 1000, // Value of route when completed, cut if issue occurs.
                  value: 10000,
                  distance: 100,
                  progress: 100, // Actively updates throughout the course of the route.
                  status: "received",
            },
            {
                  id: "XX5XX", // Randomly generated string ID.
                  ship: 5, // Which ship (by ID) is in use for this route.
                  from: "PORT",
                  to: "CHI",
                  load: 1000, // Value of route when completed, cut if issue occurs.
                  value: 10000,
                  distance: 100,
                  progress: 100, // Actively updates throughout the course of the route.
                  status: "received",
            },
      ],
      findRouteById: (id) => get().routes.find((route) => route.id === id),
      deleteRoute: (routeId) => {
            set((state) => ({
                  routes: state.routes.filter((route) => route.id !== routeId),
            }));
      },
      createRoute: (details) => {
            get().updateShip(details.shipId, "available", false);
            set((state) => ({
                  ...state,
                  log: [
                        `New route created: ${details.routeId} traveling from ${
                              details.routeDirection === "inbound"
                                    ? details.routeDirection
                                    : "PORT"
                        } to ${
                              details.routeDirection === "inbound"
                                    ? "PORT"
                                    : details.routeDestination.name
                        }`,
                        ...state.log,
                  ],
                  routes: [
                        ...state.routes,
                        {
                              id: details.routeId,
                              ship: details.shipId,
                              from:
                                    details.routeDirection === "inbound"
                                          ? details.routeDestination.name
                                          : "PORT",
                              to:
                                    details.routeDirection === "inbound"
                                          ? "PORT"
                                          : details.routeDestination.name,
                              load: details.routeLoad,
                              value: details.routeValue,
                              distance: details.routeDistance,
                              progress: 0,
                              status: "stable",
                        },
                  ],
            }));
      },

      updateRoute: (routeId, key, value) => {
            set((state) => {
                  return {
                        ...state,
                        routes: state.routes.map((route) =>
                              route.routeId === routeId
                                    ? { ...route, [key]: value }
                                    : route
                        ),
                  };
            });
      },
      loadValueMultiplier: 2,
      determineValueBasedOnLoad: (routeLoad) => {
            return routeLoad * get().loadValueMultiplier;
      },
      generateRoute: () => {
            const ships = get().ships;
            const generatedRouteId = get().generateId();
            const generatedRouteDestination = get().getRandomDestination();
            const generatedRouteLoad = get().getRandomLoad(
                  generatedRouteDestination.value
            );
            const determinedLoadValue =
                  get().determineValueBasedOnLoad(generatedRouteLoad);
            const availableShips = ships.filter((ship) => ship.available);

            const remoteShips = availableShips.filter((ship) => ship.isRemote);

            const localShips = availableShips.filter((ship) => !ship.isRemote);

            const remoteShipsAvailable = remoteShips.length > 0;
            const localShipsAvailable = localShips.length > 0;
            if (availableShips.length === 0) {
                  return;
            }
            if (remoteShipsAvailable) {
                  set((state) => ({
                        ...state,
                        currentPrompt: "chooseShip",
                        offeredRoute: {
                              routeId: generatedRouteId,
                              routeDestination: generatedRouteDestination,
                              routeDistance: generatedRouteDestination.distance,
                              routeDirection: "inbound",
                              routeLoad: generatedRouteLoad,
                              routeValue: determinedLoadValue,
                              routeShipChoices: remoteShips,
                        },
                  }));
            } else if (localShipsAvailable) {
                  set((state) => ({
                        ...state,
                        currentPrompt: "chooseShip",
                        offeredRoute: {
                              routeId: generatedRouteId,
                              routeDestination: generatedRouteDestination,
                              routeDistance: generatedRouteDestination.distance,
                              routeDirection: "outbound",
                              routeLoad: generatedRouteLoad,
                              routeValue: determinedLoadValue,
                              routeShipChoices: localShips,
                        },
                  }));
            }
      },
      startProgressUpdates: () => {
            if (get().progressInterval) return; // Prevent duplicate intervals

            const interval = setInterval(() => {
                  set((state) => {
                        return {
                              routes: state.routes.map((route) => {
                                    // Skip progress update if route is not "stable"
                                    if (
                                          route.status !== "stable" ||
                                          route.progress >= 100
                                    ) {
                                          if (
                                                route.progress >= 100 &&
                                                route.status === "stable"
                                          ) {
                                                return {
                                                      ...route,
                                                      status: "waiting",
                                                }; // Move to "waiting" when complete
                                          }
                                          return route; // No changes if not "stable"
                                    }

                                    // Progress increment based on ship speed
                                    const ship = state.ships.find(
                                          (ship) => ship.id === route.shipId
                                    );
                                    const progressIncrement = ship?.speed || 1;

                                    return {
                                          ...route,
                                          progress: Math.min(
                                                route.progress +
                                                      progressIncrement * 0.1,
                                                100
                                          ),
                                    };
                              }),
                        };
                  });
            }, 100); // Adjust interval timing as needed

            set({ progressInterval: interval });
      },
      stopProgressUpdates: () => {
            clearInterval(get().progressInterval);
            set({ progressInterval: null });
      },
      progressInterval: null,

      ///////////////////////// Generation System /////////////////////////

      getRandomDestination: () => {
            const destinations = get().destinations;
            return destinations[
                  Math.floor(Math.random() * destinations.length)
            ];
      },
      getRandomDirection: () => {
            const directions = ["inbound", "outbound"];
            return directions[Math.floor(Math.random() * directions.length)];
      },
      getRandomInteger: (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      getRandomLoad: (value) => {
            const mult = get().getRandomInteger;
            const load = Math.floor(Math.random() * value) * 100;
            return load;
      },
}));

export default useGameStore;

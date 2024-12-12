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
                    [key]: [value],
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
            id = "";
            for (let i = 0; i < 5; i++) {
                id += characters.charAt(
                    Math.floor(Math.random() * characters.length)
                );
            }
        } while (get().usedIDs.includes(id));
        return id;
    },

    ///////////////////////// Ship System /////////////////////////

    ships: [
        {
            id: 1,
            name: "Bohemouth",
            available: true,
            damaged: false,
            durability: 90,
            maxLoad: 92000,
            speed: 1,
            isRemote: true,
        },
        {
            id: 2,
            name: "Exitor",
            available: true,
            damaged: false,
            durability: 38,
            maxLoad: 65000,
            speed: 3,
            isRemote: true,
        },
    ],
    findShipById: (id) => {
        return get().ships.find((ship) => ship.id === id); // Returns the object from Ships that corresponds to the ID entered
    },
    updateShip: (shipId, key, value) => {
        set((state) => {
            return {
                ...state,
                ships: state.ships.map(
                    (ship) =>
                        ship.id === shipId
                            ? { ...ship, [key]: value } // Update the specified key
                            : ship // Keep other ships unchanged
                ),
            };
        });
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
                    d.id === dockId
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
            id: "JDXSM", // Randomly generated string ID.
            ship: 2, // Which ship (by ID) is in use for this route.
            from: "PORT",
            to: "CHI",
            load: 847, // Value of route when completed, cut if issue occurs.
            progress: 0, // Actively updates throughout the course of the route.
            status: "stable",
        },
    ],
    findRouteById: (id) => {
        return get().routes.find((route) => route.id === id); // Returns the object from Routes that corresponds to the ID entered
    },
    updateRoute: (routeId, key, value) => {
        set((state) => {
            return {
                ...state,
                routes: state.routes.map(
                    (route) =>
                        route.id === routeId
                            ? { ...route, [key]: value } // Update the specified key
                            : route // Keep other routes unchanged
                ),
            };
        });
    },
    loadValueMultiplier: 2,
    determineValueBasedOnLoad: (routeLoad) => {
      return routeLoad * get().loadValueMultiplier;
    },
    generateRoute: () => {
        const ships = get().ships; // Fetches all available ships
        const generatedRouteId = get().generateId(); // Generates a unique route ID
        const generatedRouteDestination = get().getRandomDestination(); // Fetches a random destination
        const generatedRouteLoad = get().getRandomLoad(
            generatedRouteDestination.value
        ); // Fetches random load value based on destination
        const determinedLoadValue = get().determineValueBasedOnLoad(generatedRouteLoad);

        /* 
        
        1. Determine whether any ships are available.
        2. Prioritize sending isRemote ships back first, so find if there are any isRemote ships and offer an inbound route.
        
        */

        const availableShips = ships.filter((ship) => ship.available);

        const remoteShips = availableShips.filter((ship) => ship.isRemote);
        const localShips = availableShips.filter((ship) => !ship.isRemote);

        const remoteShipsAvailable = remoteShips.length > 0;
        const localShipsAvailable = localShips.length > 0;

        if (availableShips.length === 0) {
            console.log(`There are no ships available either remote or locally.`)
            return;
        }

        console.log(remoteShips)

        if (remoteShipsAvailable) {
            // Create route using remote ships, then return.
            console.log(`Remote ships are available, create an inbound route.`)
            set((state) => {
                return {
                    ...state,
                    currentPrompt: "chooseShip",
                    offeredRoute: {
                        routeId: generatedRouteId,
                        routeDestination: generatedRouteDestination,
                        routeDirection: "inbound",
                        routeLoad: generatedRouteLoad,
                        routeValue: determinedLoadValue,
                        routeShipChoices: remoteShips,
                    },
                };
            });
        }
        if (localShipsAvailable) {
            // Create route using local ships, then return.
            console.log(`Remote ships are NOT available, create an outbound route.`)
            set((state) => {
                return {
                    ...state,
                    currentPrompt: "chooseShip",
                    offeredRoute: {
                        routeId: generatedRouteId,
                        routeDestination: generatedRouteDestination,
                        routeDirection: "outbound",
                        routeLoad: generatedRouteLoad,
                        routeValue: determinedLoadValue,
                        routeShipChoices: localShips,
                    },
                };
            });
        }
    },

    increaseRouteProgress: (routeId) => {
        const { findRouteById } = get(); // Assuming findRouteById is part of the store
        const route = findRouteById(routeId);
        const ships = get().ships;
        const ship = ships.find((ship) => ship.id === route.ship);
        if (!route) return; // Exit if route not found
        const shipSpeed = ship.speed; // Adjust based on how ship speed is defined
        set((state) => {
            return {
                routes: state.routes.map(
                    (r) =>
                        r.id === routeId
                            ? {
                                  ...r,
                                  progress: r.progress + 0.01 * shipSpeed,
                              } // Update progress
                            : r // Keep other routes unchanged
                ),
            };
        });
    },

    ///////////////////////// Generation System /////////////////////////

    getRandomDestination: () => {
        const destinations = get().destinations;
        return destinations[Math.floor(Math.random() * destinations.length)];
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

import { create } from "zustand";
import { destinations } from "../data/destinations";

const useGameStore = create((set, get) => {
      // Utility to update array objects
      const updateItemInArray = (array, idKey, idValue, updates) =>
            array.map((item) =>
                  item[idKey] === idValue ? { ...item, ...updates } : item
            );

      // Utility to generate random IDs
      const generateId = () => {
            const characters = "ABCDEFGHIJKLMNOPQRSTUVWYX123456789";
            let id;
            do {
                  id = Array.from({ length: 5 }, () =>
                        characters.charAt(
                              Math.floor(Math.random() * characters.length)
                        )
                  ).join("");
            } while (get().usedIDs.includes(id));
            set((state) => ({ usedIDs: [...state.usedIDs, id] }));
            return id;
      };

      // State and Actions
      return {
            ///////////////////////// Imported Items /////////////////////////
            destinations,

            ///////////////////////// Player Stats /////////////////////////
            playerStats: {
                  cash: 0,
                  karma: 100,
                  level: 1,
            },
            updatePlayerStats: (key, value) =>
                  set((state) => ({
                        playerStats: { ...state.playerStats, [key]: value },
                  })),

            ///////////////////////// Prompt System /////////////////////////
            currentPrompt: null,
            setCurrentPrompt: (type) => set({ currentPrompt: type }),

            ///////////////////////// Offered Route /////////////////////////
            offeredRoute: {},
            setOfferedRoute: (details) => set({ offeredRoute: details }),
            updateOfferedRoute: (key, value) =>
                  set((state) => ({
                        offeredRoute: { ...state.offeredRoute, [key]: value },
                  })),
            clearOfferedRoute: () => set({ offeredRoute: {} }),

            ///////////////////////// Logging System /////////////////////////
            log: [],
            addLog: (message) =>
                  set((state) => ({ log: [message, ...state.log] })),

            ///////////////////////// ID System /////////////////////////
            usedIDs: [],
            generateId,

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
            ],
            findShipById: (id) => get().ships.find((ship) => ship.id === id),
            updateShip: (id, updates) =>
                  set((state) => ({
                        ships: updateItemInArray(
                              state.ships,
                              "id",
                              id,
                              updates
                        ),
                  })),

            ///////////////////////// Docks System /////////////////////////
            docks: [{ id: 1, available: true, damaged: false, employees: 1 }],
            updateDocks: (id, updates) =>
                  set((state) => ({
                        docks: updateItemInArray(
                              state.docks,
                              "id",
                              id,
                              updates
                        ),
                  })),

            ///////////////////////// Routes System /////////////////////////
            routes: [],
            findRouteById: (id) =>
                  get().routes.find((route) => route.id === id),
            createRoute: (details) => {
                  get().updateShip(details.shipId, { available: false });
                  set((state) => ({
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
                  get().addLog(`Route created: ${details.routeId}`);
            },
            deleteRoute: (id) =>
                  set((state) => ({
                        routes: state.routes.filter((route) => route.id !== id),
                  })),
            updateRoute: (id, updates) =>
                  set((state) => ({
                        routes: updateItemInArray(
                              state.routes,
                              "id",
                              id,
                              updates
                        ),
                  })),

            ///////////////////////// Generation System /////////////////////////
            getRandomDestination: () => {
                  const dests = get().destinations;
                  return dests[Math.floor(Math.random() * dests.length)];
            },
            getRandomDirection: () =>
                  ["inbound", "outbound"][Math.floor(Math.random() * 2)],
            getRandomInteger: (min, max) =>
                  Math.floor(Math.random() * (max - min + 1)) + min,
            getRandomLoad: (value) => Math.floor(Math.random() * value * 100),

            generateRoute: () => {
                  const ships = get().ships.filter((ship) => ship.available);
                  if (ships.length === 0) return;

                  const remoteShips = ships.filter((ship) => ship.isRemote);
                  const localShips = ships.filter((ship) => !ship.isRemote);

                  const destination = get().getRandomDestination();
                  const load = get().getRandomLoad(destination.value);
                  const value = load * 2; // Adjust as needed

                  set({
                        currentPrompt: "chooseShip",
                        offeredRoute: {
                              routeId: generateId(),
                              routeDestination: destination,
                              routeLoad: load,
                              routeValue: value,
                              routeShipChoices: remoteShips.length
                                    ? remoteShips
                                    : localShips,
                              routeDirection: remoteShips.length
                                    ? "inbound"
                                    : "outbound",
                        },
                  });
            },

            ///////////////////////// Progress Management /////////////////////////
            progressInterval: null,
            startProgressUpdates: () => {
                  if (get().progressInterval) return;

                  const interval = setInterval(() => {
                        set((state) => ({
                              routes: state.routes.map((route) => {
                                    if (
                                          route.status !== "stable" ||
                                          route.progress >= 100
                                    ) {
                                          if (route.progress >= 100) {
                                                return {
                                                      ...route,
                                                      status: "waiting",
                                                };
                                          }
                                          return route;
                                    }
                                    const ship = state.ships.find(
                                          (s) => s.id === route.ship
                                    );
                                    return {
                                          ...route,
                                          progress: Math.min(
                                                route.progress +
                                                      (ship?.speed || 1) * 0.1,
                                                100
                                          ),
                                    };
                              }),
                        }));
                  }, 100);
                  set({ progressInterval: interval });
            },
            stopProgressUpdates: () => {
                  clearInterval(get().progressInterval);
                  set({ progressInterval: null });
            },
      };
});

export default useGameStore;

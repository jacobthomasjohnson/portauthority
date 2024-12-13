"use client";

import useGameStore from "../store/gameStore";

export const useUnloadRoute = () => {
      const findRouteById = useGameStore((state) => state.findRouteById);
      const updatePlayerStats = useGameStore(
            (state) => state.updatePlayerStats
      );
      const updateShip = useGameStore((state) => state.updateShip);
      const deleteRoute = useGameStore((state) => state.deleteRoute);

      const unloadRoute = (routeId) => {
            const route = findRouteById(routeId);

            if (!route) {
                  console.warn(`Route with ID ${routeId} not found.`);
                  return;
            }

            // Update cash safely
            console.log(`Increasing cash by ${route.value}`);
            updatePlayerStats("cash", (prevCash) => prevCash + route.value);

            // Mark ship as available
            console.log(`Marking ship ${route.ship} as available.`);
            updateShip(route.ship, "available", true);

            // Delete the route
            console.log(`Deleting route ${route.id}`);
            deleteRoute(route.id);
      };

      return unloadRoute;
};

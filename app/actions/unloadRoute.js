import useGameStore from "../store/gameStore";

export const useUnloadRoute = () => {
      const findRouteById = useGameStore((state) => state.findRouteById);
      const updatePlayerStats = useGameStore(
            (state) => state.updatePlayerStats
      );
      const updateShip = useGameStore((state) => state.updateShip);
      const deleteRoute = useGameStore((state) => state.deleteRoute);
      const playerStats = useGameStore((state) => state.playerStats);

      const unloadRoute = (routeId) => {
            const route = findRouteById(routeId);
            if (!route) return;

            console.log(`Increase cash by ${route.value}`);
            updatePlayerStats("cash", playerStats.cash = (playerStats.cash + route.value));

            console.log(
                  `Reduce durability of ship ${route.ship} by ${route.distance}`
            );
            updateShip(route.ship, "available", true);

            console.log(`Delete route ${route.id}`);
            deleteRoute(route.id);
      };

      return unloadRoute;
};

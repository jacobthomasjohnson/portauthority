"use client";

import useGameStore from "../store/gameStore";
import { useUnloadRoute } from "../actions/unloadRoute";

export const Route = ({ routeId }) => {
      const findRouteById = useGameStore((state) => state.findRouteById);
      const updatePlayerStats = useGameStore(
            (state) => state.updatePlayerStats
      );
      const updateShip = useGameStore((state) => state.updateShip);
      const deleteRoute = useGameStore((state) => state.deleteRoute);
      const unloadRoute = useUnloadRoute();
      const route = findRouteById(routeId);

      // Handle click actions for different statuses
      const handleRouteClick = (status) => {
            switch (status) {
                  case "received":
                        console.log("Unload shipment");
                        unloadRoute(routeId);
                        break;
                  case "damaged":
                        console.log("Repair logic goes here.");
                        break;
                  case "stable":
                        console.log("Show route details.");
                        break;
                  case "stolen":
                        console.log("Handle stolen route (insurance).");
                        break;
                  default:
                        console.warn("Unhandled route status:", status);
            }
      };

      // Early return if route is not found
      if (!route) return null;

      // Ensure route.progress is within a valid range
      const progress = Math.max(0, Math.min(route.progress || 0, 100));

      // Dynamic CSS classes
      const getBorderClass = (status) => {
            switch (status) {
                  case "received":
                        return "border-portgreen";
                  case "damaged":
                        return "border-portred";
                  case "waiting":
                        return "border-portgray";
                  default:
                        return "";
            }
      };

      const getProgressBarClass = (status) => {
            switch (status) {
                  case "stable":
                        return "bg-portblue";
                  case "issue":
                        return "bg-portyellow";
                  case "damaged":
                        return "bg-portred";
                  case "received":
                        return "bg-portgreen";
                  default:
                        return "";
            }
      };

      return (
            <div
                  className={`segment group ${getBorderClass(route.status)}`}
                  onClick={() => handleRouteClick(route.status)}
            >
                  <div className={`segment-top ${route.statusClass || ""}`}>
                        <span className="font-semibold">{route.id}</span>
                        <span className="font-extralight">|</span>
                        <span className="font-light">
                              {route.from} to {route.to}
                        </span>
                        <span className="font-extralight">|</span>
                        <span className="font-light">
                              {Math.floor(progress)}%
                        </span>
                        {route.status === "damaged" && (
                              <>
                                    <span className="font-extralight">|</span>
                                    <span className="font-light">
                                          FLEET DAMAGED
                                    </span>
                              </>
                        )}
                        {route.status === "waiting" && (
                              <>
                                    {/* Check to see if there is an open dock. If there is, move this route to "received". If not, continue checking until there is an available dock. */}
                                    <span className="font-extralight">|</span>
                                    <span className="font-light">
                                          AWAITING DOCK
                                    </span>
                              </>
                        )}
                  </div>
                  <div
                        style={{ width: `${progress}%` }}
                        className={`progress-bar ${getProgressBarClass(
                              route.status
                        )}`}
                  ></div>
                  {route.status === "received" && (
                        <div className="segment-bottom">
                              <div className="segment-link">
                                    UNLOAD SHIPMENT
                              </div>
                        </div>
                  )}
            </div>
      );
};

export default Route;

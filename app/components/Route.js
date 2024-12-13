"use client";

import useGameStore from "../store/gameStore";
import { useUnloadRoute } from "../actions/unloadRoute";

export const Route = ({ routeId }) => {
      const findRouteById = useGameStore((state) => state.findRouteById);
      const unloadRoute = useUnloadRoute();
      const route = findRouteById(routeId);

      // Early return if route is not found
      if (!route) return null;

      // Dynamic class getters
      const getClassNames = {
            border: {
                  received: "border-portgreen",
                  damaged: "border-portred",
                  waiting: "border-portgray",
                  default: "",
            },
            progressBar: {
                  stable: "bg-portblue",
                  issue: "bg-portyellow",
                  damaged: "bg-portred",
                  received: "bg-portgreen",
                  default: "",
            },
      };

      const getBorderClass = (status) =>
            getClassNames.border[status] || getClassNames.border.default;

      const getProgressBarClass = (status) =>
            getClassNames.progressBar[status] ||
            getClassNames.progressBar.default;

      // Handle route actions based on status
      const handleRouteClick = (status) => {
            const actions = {
                  received: () => setTimeout(() => unloadRoute(routeId), 0), // Offload to idle time
                  damaged: () => console.log("Repair logic goes here."),
                  stable: () => console.log("Show route details."),
                  stolen: () => console.log("Handle stolen route (insurance)."),
                  default: () =>
                        console.warn("Unhandled route status:", status),
            };

            (actions[status] || actions.default)();
      };

      // Progress bar clamping
      const progress = Math.max(0, Math.min(route.progress || 0, 100));

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

                        {/* Conditional Status Indicators */}
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
                                    <span className="font-extralight">|</span>
                                    <span className="font-light">
                                          AWAITING DOCK
                                    </span>
                              </>
                        )}
                  </div>

                  {/* Progress Bar */}
                  <div
                        style={{ width: `${progress}%` }}
                        className={`progress-bar ${getProgressBarClass(
                              route.status
                        )}`}
                  ></div>

                  {/* Received Status Action */}
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

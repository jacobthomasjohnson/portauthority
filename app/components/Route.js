// Route.js
"use client";

import useGameStore from "../store/gameStore";

export const Route = ({ routeID }) => {
      const findRouteById = useGameStore((state) => state.findRouteById);
      const route = findRouteById(routeID);

      if (!route) return null;

      return (
            <div
                  className={`segment group ${
                        route.status === "received"
                              ? "border-portgreen"
                              : route.status === "damaged"
                              ? "border-portred"
                              : route.status === "waiting"
                              ? "border-portgray"
                              : ""
                  }`}
            >
                  <div className={`segment-top ${route.statusClass}`}>
                        <span className="font-semibold">{route.id}</span>
                        <span className="font-extralight">|</span>
                        <span className="font-light">
                              {route.from} to {route.to}

                              
                        </span>
                        <span className="font-extralight">|</span>
                        <span className="font-light">
                              {Math.floor(route.progress)}%
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
                                    <span className="font-extralight">|</span>
                                    <span className="font-light">
                                          AWAITING DOCK
                                    </span>
                              </>
                        )}
                  </div>
                  <div
                        style={{ width: `${route.progress}%` }}
                        className={`progress-bar ${
                              route.status === "stable"
                                    ? "bg-portblue"
                                    : route.status === "issue"
                                    ? "bg-portyellow"
                                    : route.status === "damaged"
                                    ? "bg-portred"
                                    : route.status === "received"
                                    ? "bg-portgreen"
                                    : ""
                        }`}
                  ></div>
            </div>
      );
};

export default Route;

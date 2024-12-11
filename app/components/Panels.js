"use client";

import { Route } from "./Route";
import { Upgrade } from "./Upgrade";
import useGameStore from "./gameStore";
import { useEffect } from "react";

export const Panels = () => {
      const routes = useGameStore((state) => state.routes);
      const promptActive = useGameStore((state) => state.promptActive);
      const availableShips = useGameStore((state) => state.availableShips);
      const clearPrompt = useGameStore((state) => state.clearPrompt);
      const currentRequestedRoute = useGameStore((state) => state.currentRequestedRoute);

      const selectShip = (ship) => {
            console.log(ship);
            clearPrompt();
      };

      const closeModal = () => {
            clearPrompt();
      };

      useEffect(() => {
            if (promptActive) {
                  // Example side effect: focus on the modal or log
                  console.log("Prompt is active. Displaying modal...");
            }
      }, [promptActive]);

      return (
            <div className="panels">
                  {promptActive && (
                        <div
                              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 min-w-[700px] min-h-[300px] bg-background border rounded-xl flex items-center justify-center flex-col gap-4"
                              onClick={(e) => e.stopPropagation()} // Prevent click propagation to `generateRoute`
                        >
                              <div className="text-lg">
                                    Which ship would you like to use for the following
                                    route?
                              </div>
                              <div className="">
                                    {currentRequestedRoute}
                              </div>
                              {availableShips.map((ship) => (
                                    <div
                                          onClick={() => selectShip(ship)}
                                          className="text-base hover:underline hover:cursor-pointer"
                                          key={ship.id} // Use `id` for unique keys
                                    >
                                          {ship.name} (speed: {ship.speed}, durability: {ship.durability}, max load: {ship.maxLoad})
                                    </div>
                              ))}
                              <button
                                    className="px-6 py-4 bg-red-600 text-white rounded text-sm"
                                    onClick={closeModal}
                              >
                                    Cancel Route
                              </button>
                        </div>
                  )}
                  <div className="panel-container">
                        <div className="panel-title panel-title-first">
                              ROUTES
                        </div>
                        <div className="panel">
                              {routes.map((route) =>
                                    route.status === "stable" ? (
                                          <Route
                                                key={route.id}
                                                routeID={route.id}
                                          />
                                    ) : null
                              )}
                        </div>
                  </div>
                  <div className="panel-container">
                        <div className="panel-title">OPERATIONS</div>
                        <div className="panel">
                              {routes.map((route) =>
                                    route.status === "waiting" ||
                                    route.status === "received" ? (
                                          <Route
                                                key={route.id}
                                                routeID={route.id}
                                          />
                                    ) : null
                              )}
                        </div>
                  </div>
                  <div className="panel-container">
                        <div className="panel-title">MANAGEMENT</div>
                        <div className="panel">
                              <div className="panel-section-title">
                                    AVAILABLE UPGRADES
                              </div>
                              <Upgrade
                                    upgradeID={1}
                                    upgradeDesc={`Add a Port for Receiving`}
                                    upgradeCost={12000}
                              />
                              <div className="panel-section-title border-t">
                                    INCIDENT MANAGEMENT
                              </div>
                              {routes.map((route) =>
                                    route.status === "damaged" ||
                                    route.status === "stolen" ? (
                                          <Route
                                                key={route.id}
                                                routeID={route.id}
                                          />
                                    ) : null
                              )}
                        </div>
                  </div>
            </div>
      );
};

export default Panels;

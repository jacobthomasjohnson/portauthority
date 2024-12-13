"use client";

import { Route } from "../components/Route";
import { Upgrade } from "../components/Upgrade";
import Modal from "../components/Modal";
import useGameStore from "../store/gameStore";
import { useEffect, useState } from "react";

export const Panels = () => {
      const routes = useGameStore((state) => state.routes);
      const currentPrompt = useGameStore((state) => state.currentPrompt);
      const setCurrentPrompt = useGameStore((state) => state.setCurrentPrompt);
      const offeredRoute = useGameStore((state) => state.offeredRoute);
      const startProgressUpdates = useGameStore(
            (state) => state.startProgressUpdates
      );
      const stopProgressUpdates = useGameStore(
            (state) => state.stopProgressUpdates
      );
      const createRoute = useGameStore((state) => state.createRoute);
      const [shipChoice, setShipChoice] = useState(null);
      const [noShipSelected, setNoShipSelected] = useState(false);

      // Start progress updates on mount
      useEffect(() => {
            startProgressUpdates();
            return stopProgressUpdates; // Cleanup on unmount
      }, [startProgressUpdates, stopProgressUpdates]);

      // Handlers
      const handleSelectShip = (ship) => {
            setShipChoice(ship);
            setNoShipSelected(false); // Reset error when a ship is selected
      };

      const handleConfirmRoute = () => {
            if (!shipChoice) {
                  setNoShipSelected(true);
                  return;
            }
            createRoute({ ...offeredRoute, shipId: shipChoice.id });
            setCurrentPrompt(null); // Close modal
            setShipChoice(null); // Clear selection
      };

      const handleCancelRoute = () => {
            setCurrentPrompt(null);
            setShipChoice(null);
            setNoShipSelected(false);
      };

      // Filtering Routes
      const getRoutesByStatus = (status) =>
            routes.filter((route) => route.status === status);

      return (
            <div className="panels">
                  {/* Modal for Ship Selection */}
                  {currentPrompt === "chooseShip" && (
                        <Modal
                              title="New Route Proposed"
                              onClose={handleCancelRoute}
                              onConfirm={handleConfirmRoute}
                        >
                              {/* Modal Content */}
                              <div className="flex gap-4 items-center justify-center px-4 w-full">
                                    <div className="text-2xl flex items-center justify-center gap-4">
                                          <span className="proposed-route-id">
                                                {offeredRoute.routeId}
                                          </span>
                                          <span className="text-sm">
                                                {offeredRoute.routeDirection ===
                                                "inbound"
                                                      ? `FROM ${offeredRoute.routeDestination.name}`
                                                      : `TO ${offeredRoute.routeDestination.name}`}
                                          </span>
                                    </div>
                                    <div className="text-portgray">|</div>
                                    <div className="text-sm">
                                          carrying {offeredRoute.routeLoad}lbs
                                          worth{" "}
                                          <span className="text-portgreen">
                                                ${offeredRoute.routeValue}
                                          </span>
                                    </div>
                              </div>
                              <div className="px-4 text-sm text-center w-full">
                                    If you would like to accept this offer,
                                    please select an available ship from the
                                    following choices:
                              </div>
                              <div className="text-base w-full px-4">
                                    {offeredRoute.routeShipChoices.map(
                                          (ship) => (
                                                <div
                                                      key={ship.id}
                                                      onClick={() =>
                                                            handleSelectShip(
                                                                  ship
                                                            )
                                                      }
                                                      className={`my-2 p-4 border border-portgray rounded hover:cursor-pointer hover:text-white ${
                                                            shipChoice?.id ===
                                                            ship.id
                                                                  ? "border-portgreen"
                                                                  : ""
                                                      }`}
                                                >
                                                      <span>{ship.name}</span>{" "}
                                                      Speed: {ship.speed * 100}
                                                      mph Durability:{" "}
                                                      {ship.durability}
                                                </div>
                                          )
                                    )}
                              </div>
                              {noShipSelected && (
                                    <div className="text-base text-portred px-4">
                                          YOU MUST CHOOSE A SHIP FOR THE ROUTE
                                          FIRST!
                                    </div>
                              )}
                        </Modal>
                  )}

                  {/* Routes Section */}
                  <div className="panel-container">
                        <div className="panel-title panel-title-first">
                              ROUTES
                        </div>
                        <div className="panel">
                              {getRoutesByStatus("stable").map((route) => (
                                    <Route key={route.id} routeID={route.id} />
                              ))}
                        </div>
                  </div>

                  {/* Operations Section */}
                  <div className="panel-container">
                        <div className="panel-title">OPERATIONS</div>
                        <div className="panel">
                              {["waiting", "received"].flatMap((status) =>
                                    getRoutesByStatus(status).map((route) => (
                                          <Route
                                                key={route.id}
                                                routeID={route.id}
                                          />
                                    ))
                              )}
                        </div>
                  </div>

                  {/* Management Section */}
                  <div className="panel-container">
                        <div className="panel-title">MANAGEMENT</div>
                        <div className="panel">
                              <div className="panel-section-title">
                                    AVAILABLE UPGRADES
                              </div>
                              <Upgrade
                                    upgradeID={1}
                                    upgradeDesc="Add a Port for Receiving"
                                    upgradeCost={12000}
                              />
                              <div className="panel-section-title border-t">
                                    INCIDENT MANAGEMENT
                              </div>
                              {["damaged", "stolen"].flatMap((status) =>
                                    getRoutesByStatus(status).map((route) => (
                                          <Route
                                                key={route.id}
                                                routeID={route.id}
                                          />
                                    ))
                              )}
                        </div>
                  </div>
            </div>
      );
};

export default Panels;

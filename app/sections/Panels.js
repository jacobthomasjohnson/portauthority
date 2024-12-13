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

      // Start and stop progress updates
      useEffect(() => {
            startProgressUpdates();
            return stopProgressUpdates; // Cleanup
      }, [startProgressUpdates, stopProgressUpdates]);

      // Handlers
      const handleSelectShip = (ship) => {
            setShipChoice(ship);
            setNoShipSelected(false); // Reset error state
      };

      const handleConfirmRoute = () => {
            if (!shipChoice) {
                  setNoShipSelected(true);
                  return;
            }
            createRoute({ ...offeredRoute, shipId: shipChoice.id });
            resetModalState();
      };

      const handleCancelRoute = () => resetModalState();

      const resetModalState = () => {
            setCurrentPrompt(null);
            setShipChoice(null);
            setNoShipSelected(false);
      };

      const renderRoutes = (statuses) =>
            statuses.flatMap((status) =>
                  routes
                        .filter((route) => route.status === status)
                        .map((route) => (
                              <Route key={route.id} routeId={route.id} />
                        ))
            );

      return (
            <div className="panels">
                  {/* Ship Selection Modal */}
                  {currentPrompt === "chooseShip" && (
                        <Modal
                              title="New Route Proposed"
                              onClose={handleCancelRoute}
                              onConfirm={handleConfirmRoute}
                        >
                              <div className="flex flex-col gap-4">
                                    <div className="text-center">
                                          <span className="proposed-route-id font-semibold">
                                                {offeredRoute.routeId}
                                          </span>{" "}
                                          <span>
                                                {offeredRoute.routeDirection ===
                                                "inbound"
                                                      ? `FROM ${offeredRoute.routeDestination.name}`
                                                      : `TO ${offeredRoute.routeDestination.name}`}
                                          </span>
                                    </div>
                                    <div className="text-center text-portgray">
                                          carrying {offeredRoute.routeLoad}lbs
                                          worth{" "}
                                          <span className="text-portgreen">
                                                ${offeredRoute.routeValue}
                                          </span>
                                    </div>
                                    <div className="text-sm text-center">
                                          Select an available ship for the
                                          route:
                                    </div>
                                    <div className="flex flex-col px-4">
                                          {offeredRoute.routeShipChoices.map(
                                                (ship) => (
                                                      <div
                                                            key={ship.id}
                                                            onClick={() =>
                                                                  handleSelectShip(
                                                                        ship
                                                                  )
                                                            }
                                                            className={`my-2 p-4 border rounded cursor-pointer ${
                                                                  shipChoice?.id ===
                                                                  ship.id
                                                                        ? "border-portgreen"
                                                                        : "border-portgray"
                                                            }`}
                                                      >
                                                            <span>
                                                                  {ship.name}
                                                            </span>{" "}
                                                            <span>
                                                                  Speed:{" "}
                                                                  {ship.speed *
                                                                        100}
                                                                  mph
                                                            </span>{" "}
                                                            <span>
                                                                  Durability:{" "}
                                                                  {
                                                                        ship.durability
                                                                  }
                                                            </span>
                                                      </div>
                                                )
                                          )}
                                    </div>
                                    {noShipSelected && (
                                          <div className="text-base text-portred text-center">
                                                YOU MUST CHOOSE A SHIP FOR THE
                                                ROUTE FIRST!
                                          </div>
                                    )}
                              </div>
                        </Modal>
                  )}

                  {/* Routes Section */}
                  <div className="panel-container">
                        <div className="panel-title panel-title-first">
                              ROUTES
                        </div>
                        <div className="panel">{renderRoutes(["stable"])}</div>
                  </div>

                  {/* Operations Section */}
                  <div className="panel-container">
                        <div className="panel-title">OPERATIONS</div>
                        <div className="panel">
                              {renderRoutes(["waiting", "received"])}
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
                              {renderRoutes(["damaged", "stolen"])}
                        </div>
                  </div>
            </div>
      );
};

export default Panels;

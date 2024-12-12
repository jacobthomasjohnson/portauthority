"use client";

import { Route } from "../components/Route";
import { Upgrade } from "../components/Upgrade";
import useGameStore from "../store/gameStore";
import { useEffect, useState } from "react";

export const Panels = () => {
      const routes = useGameStore((state) => state.routes);
      const currentPrompt = useGameStore((state) => state.currentPrompt);
      const setCurrentPrompt = useGameStore((state) => state.setCurrentPrompt);
      const routeDetails = useGameStore((state) => state.routeDetails);
      const startRoute = useGameStore((state) => state.startRoute);
      const offeredRoute = useGameStore((state) => state.offeredRoute);

      const [noShipSelected, setNoShipSelected] = useState(false);

      useEffect(() => {
            console.log(offeredRoute);
      }, [offeredRoute]);

      const [shipChoice, setShipChoice] = useState({});

      const selectShip = (ship) => {
            console.log(`Set ship choice to: ${ship.name}`);
            setShipChoice(ship);
      };

      const closeModal = () => {
            setCurrentPrompt(null);
            setShipChoice({});
      };

      const confirmShip = () => {
            // Generate route using selected ship (shipChoice)
            if (Object.keys(shipChoice).length === 0) {
                  setNoShipSelected(true);
                  console.log(
                        `You must select a ship before proceeding with the route!`
                        // Add a feature to pop up a small hud indicator to show this text on screen temporarily.
                  );
            } else {
                  console.log(
                        `${shipChoice.name} has been confirmed! Starting route...`
                  );
                  startRoute(shipChoice);
                  closeModal();
            }
      };

      useEffect(() => {
            if (currentPrompt === "chooseShip") {
                  // Example side effect: focus on the modal or log
                  console.log(
                        "Prompt is active for choosing ship. Displaying modal..."
                  );
            }
      }, [currentPrompt]);

      return (
            <div className="panels">
                  {currentPrompt === "chooseShip" && (
                        <>
                              <div className="z-40 bg-black opacity-70 w-full h-full top-0 left-0 fixed transition-all"></div>
                              <div
                                    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-background border rounded-xl flex  justify-center items-center flex-col gap-5 p-12 min-w-[800px] min-h-[500px]"
                                    onClick={(e) => e.stopPropagation()} // Prevent click propagation to `generateRoute`
                              >
                                    <div className="text-2xl text-portblue">
                                          New Route Proposed!
                                    </div>
                                    <div className="text-base">
                                          <span className="proposed-route-id">{offeredRoute.routeId}</span> {offeredRoute.routeDirection === "inbound" ? `FROM ${offeredRoute.routeDestination.name}` : `TO ${offeredRoute.routeDestination.name}`}
                                    </div>
                                    <div className="text-base">
                                          CARRYING {offeredRoute.routeLoad}lbs worth <span className="text-portgreen">${offeredRoute.routeValue}</span>
                                    </div>
                                    <div className="text-base">
                                          Choose a Ship for this Route:
                                          {offeredRoute.routeShipChoices.map((ship) => (
                                                <div onClick={() => selectShip(ship)} key={ship.id} className={`my-2 p-4 border rounded hover:cursor-pointer hover:text-white ${shipChoice === ship ? "bg-portgreen text-background hover:text-background" : ""}`}>
                                                      <span className="">{ship.name}</span> Speed: {ship.speed * 100}mph Durability: {ship.durability}
                                                </div>
                                          ))}
                                    </div>
                                    {noShipSelected && (
                                          <div className="text-base text-portred font-bold">
                                                YOU MUST CHOOSE A SHIP FOR THE ROUTE FIRST!
                                          </div>
                                    )}
                                    {/* {availableShips.map((ship) => (
                                          <div
                                                onClick={() => selectShip(ship)}
                                                className={`text-base transition-all hover:underline hover:cursor-pointer text-portblue rounded-lg border-dashed p-4 border border-transparent ${
                                                      shipChoice === ship
                                                            ? "border border-foreground"
                                                            : ""
                                                }`}
                                                key={ship.id} // Use `id` for unique keys
                                          >
                                                {ship.name} (speed: {ship.speed}
                                                ,{" "}
                                                <span
                                                      className={
                                                            ship.durability < 50
                                                                  ? "text-portred font-bold"
                                                                  : ""
                                                      }
                                                >
                                                      durability:{" "}
                                                      {ship.durability}
                                                </span>
                                                ,{" "}
                                                <span>
                                                      max load: {ship.maxLoad}
                                                </span>
                                                )
                                          </div>
                                    ))} */}
                                    <div className="flex gap-4">
                                          <button
                                                className="px-4 py-2 bg-portgray text-white rounded text-sm hover:bg-red-500"
                                                onClick={closeModal}
                                          >
                                                CANCEL ROUTE
                                          </button>
                                          <button
                                                className="px-4 py-2 bg-portgreen text-background rounded text-sm hover:bg-white"
                                                onClick={confirmShip}
                                          >
                                                CONFIRM
                                          </button>
                                    </div>
                              </div>
                        </>
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

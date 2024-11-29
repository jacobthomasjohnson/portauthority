"use client";

import { Route } from "./Route";
import { Operation } from "./Operation";
import { Upgrade } from "./Upgrade";
import { Incident } from "./Incident";

import useGameStore from "./gameStore";

export const Panels = () => {
      const routes = useGameStore((state) => state.routes);
      const operations = useGameStore((state) => state.operations);
      const upgrades = useGameStore((state) => state.upgrades);
      const incidents = useGameStore((state) => state.upgrades);
      const generateID = useGameStore((state) => state.generateID);
      const generateRoute = useGameStore((state) => state.generateRoute);
      return (
            <div className="panels" onClick={generateRoute}>
                  <div className="panel-container">
                        <div className="panel-title panel-title-first">
                              ROUTES
                        </div>
                        <div className="panel">
                              {routes.map((route, index) =>
                                    route.status === "stable" ? (
                                          <Route
                                                key={route.id}
                                                routeID={route.id}
                                          />
                                    ) : (
                                          null
                                    )
                              )}
                        </div>
                  </div>
                  <div className="panel-container">
                        {" "}
                        {/* Needs custom -m where the first does not need. */}
                        <div className="panel-title">OPERATIONS</div>
                        <div className="panel">
                              {routes.map((route, index) =>
                                    route.status === "waiting" ||
                                    route.status === "received" ? (
                                          <Route
                                                key={route.id}
                                                routeID={route.id}
                                          />
                                    ) : (
                                          null
                                    )
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
                              {routes.map((route, index) =>
                                    route.status === "damaged" ||
                                    route.status === "stolen" ? (
                                          <Route
                                                key={route.id}
                                                routeID={route.id}
                                          />
                                    ) : (
                                          null
                                    )
                              )}
                        </div>
                  </div>
            </div>
      );
};

export default Panels;

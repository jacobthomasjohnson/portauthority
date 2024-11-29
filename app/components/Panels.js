"use client";

import { Route } from "./Route";
import { Operation } from "./Operation";
import { Upgrade } from "./Upgrade";
import { Incident } from "./Incident";

import useGameStore from "./gameStore";

export const Panels = () => {
      const routes = useGameStore((state) => state.routes);
      return (
            <div className="panels">
                  <div className="panel-container">
                        <div className="panel-title panel-title-first">ROUTES</div>
                        <div className="panel">
                              {routes.map((route, index) => (
                                    <Route
                                          key={index}
                                          routeID={route.id}
                                          routeFrom={route.from}
                                          routeTo={route.to}
                                          routeProgress={route.progress}
                                          routeStatus={route.status}
                                    />
                              ))}
                        </div>
                  </div>
                  <div className="panel-container"> {/* Needs custom -m where the first does not need. */}
                        <div className="panel-title">OPERATIONS</div>
                        <div className="panel">
                              <Operation
                                    routeID={`TS48X`}
                                    routeFrom={`MEX`}
                                    routeTo={`PORT`}
                                    opType={`received`}
                              />
                              <Operation
                                    routeID={`KXLE2`}
                                    routeFrom={`PORT`}
                                    routeTo={`SPN`}
                                    opType={`outgoing`}
                              />
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
                              <Incident
                                    incidentType={`FLEET DAMAGED`}
                                    affectedID={4}
                                    incidentCost={4700}
                              />
                        </div>
                  </div>
            </div>
      );
};

export default Panels;

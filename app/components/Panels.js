"use client";

import { Route } from "./Route";
import { Operation } from "./Operation";
import { Upgrade } from "./Upgrade";
import { Incident } from "./Incident";

import useGameStore from "./gameStore";

export const Panels = () => {
      const routes = useGameStore((state) => state.routes);
      return (
            <div className="flex flex-col xl:flex-row w-full grow p-0 xl:p-4 gap-4 xl:gap-8">
                  <div className="flex flex-col basis-1/3">
                        <div className="p-4 text-[#646464] text-xs xl:text-sm">ROUTES</div>
                        <div className=" xl:border border-[#292929] grow font-sm xl:font-lg">
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
                  <div className="flex flex-col basis-1/3 -mt-4 xl:mt-0">
                        <div className="p-4 text-[#646464] text-xs xl:text-sm">OPERATIONS</div>
                        <div className="border border-[#292929] grow">
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
                  <div className="flex flex-col basis-1/3 -mt-4 xl:mt-0">
                        <div className="p-4 text-[#646464] text-xs xl:text-sm">MANAGEMENT</div>
                        <div className="border border-[#292929] grow">
                              <div className="p-4 xl:p-6 text-xs xl:text-md border-b border-[#292929]">
                                    AVAILABLE UPGRADES
                              </div>
                              <Upgrade
                                    upgradeID={1}
                                    upgradeDesc={`Add a Port for Receiving`}
                                    upgradeCost={12000}
                              />
                              <div className="p-6 border-b border-t border-[#292929] text-xs xl:text-md">
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

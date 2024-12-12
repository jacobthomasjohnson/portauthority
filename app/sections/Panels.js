"use client";

import { Route } from "../components/Route";
import { Upgrade } from "../components/Upgrade";
import useGameStore from "../store/gameStore";
import { useEffect, useState } from "react";

export const Panels = () => {
    const routes = useGameStore((state) => state.routes);
    const currentPrompt = useGameStore((state) => state.currentPrompt);
    const setCurrentPrompt = useGameStore((state) => state.setCurrentPrompt);
    const offeredRoute = useGameStore((state) => state.offeredRoute);
    const updateOfferedRoute = useGameStore((state) => state.updateOfferedRoute);
    const createRoute = useGameStore((state) => state.createRoute);

    const [noShipSelected, setNoShipSelected] = useState(false);

    // useEffect(() => {
    //     console.log(offeredRoute);
    // }, [offeredRoute]);

    const [shipChoice, setShipChoice] = useState({});

    const selectShip = (ship) => {
        setShipChoice(ship);
    };

    const closeModal = () => {
        setCurrentPrompt(null);
        setShipChoice({});
    };

    const confirmRoute = (shipChoice) => {
        updateOfferedRoute("ship", shipChoice.shipId);
        createRoute(offeredRoute);
        closeModal();
    };

    const confirmShip = () => {
        Object.keys(shipChoice).length === 0
            ? () => setNoShipSelected(true)
            : confirmRoute(shipChoice);
    };

    useEffect(() => {
        if (currentPrompt !== null) {
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
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-background border rounded-xl flex  justify-start items-start flex-col min-w-[800px] min-h-[500px] overflow-hidden gap-4"
                        onClick={(e) => e.stopPropagation()} // Prevent click propagation to `generateRoute`
                    >
                        <div className="text-sm text-background bg-portblue relative top-0 p-4 border-b w-full">
                            New Route Proposed
                        </div>
                        <div className="flex gap-4 items-center justify-center px-4 w-full">
                            <div className="text-2xl flex items-center justify-center gap-4">
                                <span className="proposed-route-id">
                                    {offeredRoute.routeId}
                                </span>
                                <span className="text-sm">
                                    {offeredRoute.routeDirection === "inbound"
                                        ? `FROM ${offeredRoute.routeDestination.name}`
                                        : `TO ${offeredRoute.routeDestination.name}`}
                                </span>
                            </div>
                            <div className="text-portgray">|</div>
                            <div className="text-sm">
                                carrying {offeredRoute.routeLoad}lbs worth{" "}
                                <span className="text-portgreen">
                                    ${offeredRoute.routeValue}
                                </span>
                            </div>
                        </div>
                        <div className="px-4 text-sm text-center w-full">
                            If you would like to accept this offer, please
                            select an available ship from the following choices:
                        </div>
                        <div className="text-base w-full px-4">
                            {offeredRoute.routeShipChoices.map((ship) => (
                                <div
                                    onClick={() => selectShip(ship)}
                                    key={ship.id}
                                    className={`my-2 p-4 border border-portgray rounded hover:cursor-pointer hover:text-white ${
                                        shipChoice === ship
                                            ? "border-portgreen"
                                            : ""
                                    }`}
                                >
                                    <span className="">{ship.name}</span> Speed:{" "}
                                    {ship.speed * 100}mph Durability:{" "}
                                    {ship.durability}
                                </div>
                            ))}
                        </div>
                        {noShipSelected && (
                            <div className="text-base text-portred px-4">
                                YOU MUST CHOOSE A SHIP FOR THE ROUTE FIRST!
                            </div>
                        )}
                        <div className="grow"></div>
                        <div className="flex gap-2 px-4 mb-4">
                            <button
                                className="px-4 py-2 bg-portgray text-white rounded text-sm hover:bg-red-500"
                                onClick={closeModal}
                            >
                                CANCEL ROUTE
                            </button>
                            <button
                                className="px-4 py-2 bg-portblue text-background rounded text-sm hover:bg-white"
                                onClick={confirmShip}
                            >
                                CONFIRM
                            </button>
                        </div>
                    </div>
                </>
            )}
            <div className="panel-container">
                <div className="panel-title panel-title-first">ROUTES</div>
                <div className="panel">
                    {routes.map((route) =>
                        route.status === "stable" ? (
                            <Route key={route.id} routeID={route.routeId} />
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
                            <Route key={route.id} routeID={route.id} />
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
                            <Route key={route.id} routeID={route.id} />
                        ) : null
                    )}
                </div>
            </div>
        </div>
    );
};

export default Panels;

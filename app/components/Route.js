"use client";

import useGameStore from "../store/gameStore";

export const Route = ({ routeID }) => {
    const findRouteById = useGameStore((state) => state.findRouteById);
    const route = findRouteById(routeID);
    if (!route) return null;

    return (
        <div
            key={route.id}
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
            {" "}
            {/* Segment (full) */}
            <div
                className={`segment-top ${
                    route.status === "received"
                        ? "text-portgreen"
                        : route.status === "damaged"
                        ? "text-portred"
                        : route.status === "active"
                        ? "text-foreground"
                        : route.status === "waiting"
                        ? "text-portgray"
                        : ""
                }`}
            >
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
                        <span className="font-light">FLEET DAMAGED</span>
                    </>
                )}
                {route.status === "waiting" && (
                    <>
                        <span className="font-extralight">|</span>
                        <span className="font-light">AWAITING DOCK</span>
                    </>
                )}
                {route.status === "received" && (
                    <>
                        <span className="font-extralight">|</span>
                        <span className="font-light">RECEIVED</span>
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
            <div className="segment-bottom">
                <div className="segment-link">
                    {route.status === "stable" && "VIEW DETAILS"}
                    {route.status === "received" && "UNLOAD"}
                    {route.status === "issue" && "INVESTIGATE"}{" "}
                    {route.status === "damaged" && "REPAIR"}{" "}
                </div>
            </div>
        </div>
    );
};

export default Route;

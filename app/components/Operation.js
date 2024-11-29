export const Operation = ({ routeID, routeFrom, routeTo, opType }) => {
    return (
        <div
            className={`segment group ${
                opType === "received"
                    ? "border-portgreen"
                    : opType === "outgoing"
                    ? "border-portgray"
                    : ""
            }`}
        >
            {/* Segment (full) */}
            <div
                className={`segment-top ${
                    opType === "received"
                        ? "text-portgreen"
                        : opType === "outgoing"
                        ? "text-portgray"
                        : ""
                }`}
            >
                <span className="font-semibold">{routeID}</span>
                <span className="font-extralight">|</span>
                <span className="font-light">
                    {routeFrom} to {routeTo}
                </span>
                <span className="font-extralight">|</span>
                <span className="font-light">
                    {opType === "received" && "IN PORT"}
                    {opType === "outgoing" && "AWAITING LOAD"}
                </span>
            </div>
            <div
                className={`progress-bar h-2 w-[0%] rounded-full ${
                    opType === "received"
                        ? "bg-portgreen"
                        : opType === "outgoing"
                        ? "bg-portgray"
                        : ""
                }`}
            ></div>
            <div className="segment-bottom">
                <div className="segment-link">
                    {opType === "received" && "UNLOAD"}
                    {opType === "outgoing" && "LOAD AND SHIP"}
                </div>
            </div>
        </div>
    );
};

export default Operation;

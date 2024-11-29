export const Operation = ({
      operationID,
      operationFrom,
      operationTo,
      operationProgress,
      operationStatus,
      operationType,
}) => {
      return (
            <div
                  className={`segment group ${
                        operationType === "docked"
                              ? "border-portgreen"
                              : operationType === "awaiting"
                              ? "border-portgray"
                              : operationType === "inspection"
                              ? "border-portyellow"
                              : ""
                  }`}
            >
                  {/* Segment (full) */}
                  <div
                        className={`segment-top ${
                              operationType === "docked"
                                    ? "text-portgreen"
                                    : operationType === "awaiting"
                                    ? "text-portgray"
                                    : operationType === "inspection"
                                    ? "text-portyellow"
                                    : ""
                        }`}
                  >
                        <span className="font-semibold">{operationID}</span>
                        <span className="font-extralight">|</span>
                        <span className="font-light">
                              {operationFrom} to {operationTo}
                        </span>
                        <span className="font-extralight">|</span>
                        <span className="font-light">
                              {operationType === "docked" && "IN PORT"}
                              {operationType === "awaiting" && "WAITING FOR DOCK"}
                              {operationType === "inspection" && "AWAITING INSPECTION"}
                        </span>
                  </div>
                  <div
                        className={`progress-bar h-2 w-[0%] rounded-full ${
                              operationType === "docked"
                                    ? "bg-portgreen"
                                    : operationType === "awaiting"
                                    ? "bg-portgray"
                                    : operationType === "inspection"
                                    ? "bg-portyellow"
                                    : ""
                        }`}
                  ></div>
                  <div className="segment-bottom">
                        <div className="segment-link">
                              {operationType === "docked" && "UNLOAD"}
                              {operationType === "awaiting" && ""}
                              {operationType === "inspection" && "INSPECT"}
                        </div>
                  </div>
            </div>
      );
};

export default Operation;

export const Route = ({ routeID, routeFrom, routeTo, routeProgress, routeStatus }) => {
      return (
            <div className={`segment group ${routeStatus === "complete" ? "border-portgreen" : routeStatus === "stalled" ? "border-portred" : routeStatus === "active" ? "border-portgray" : "" }`}>
                  {" "}
                  {/* Segment (full) */}
                  <div className={`segment-top ${routeStatus === "complete" ? "text-portgreen" : routeStatus === "stalled" ? "text-portred" : routeStatus === "active" ? "text-foreground" : "" }`}>
                        <span className="font-semibold">{routeID}</span>
                        <span className="font-extralight">|</span>
                        <span className="font-light">{routeFrom} to {routeTo}</span>
                        <span className="font-extralight">|</span>
                        <span className="font-light">{routeProgress}%</span>
                  </div>
                  <div className={`progress-bar ${routeStatus === "complete" ? "bg-portgreen" : routeStatus === "stalled" ? "bg-portred" : routeStatus === "active" ? "bg-foreground" : "" }`}></div>
                  <div className="segment-bottom">
                        <div className="segment-link">
                              {routeStatus === "complete" && "CONFIRM"}
                              {routeStatus === "stalled" && "CORRECT ISSUE"}
                              {routeStatus === "active" && "VIEW DETAILS"}
                        </div>
                  </div>
            </div>
      );
};

export default Route;

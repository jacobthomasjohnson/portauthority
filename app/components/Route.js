export const Route = ({ routeID, routeFrom, routeTo, routeProgress, routeStatus }) => {
      return (
            <div className={`m-0 xl:m-6 border border-l-0 border-r-0 xl:border-l xl:border-r p-4 xl:p-6 border-dashed group hover:cursor-pointer ${routeStatus === "complete" ? "border-portgreen" : routeStatus === "stalled" ? "border-portred" : routeStatus === "active" ? "border-portgray" : "" }`}>
                  {" "}
                  {/* Segment (full) */}
                  <div className={`segment-top flex gap-4 pb-4 text-sm xl:text-lg ${routeStatus === "complete" ? "text-portgreen" : routeStatus === "stalled" ? "text-portred" : routeStatus === "active" ? "text-foreground" : "" }`}>
                        <span className="font-semibold">{routeID}</span>
                        <span className="font-extralight">|</span>
                        <span className="font-light">{routeFrom} to {routeTo}</span>
                        <span className="font-extralight">|</span>
                        <span className="font-light">{routeProgress}%</span>
                  </div>
                  <div className={`progress-bar h-2 w-[100%] rounded-full ${routeStatus === "complete" ? "bg-portgreen" : routeStatus === "stalled" ? "bg-portred" : routeStatus === "active" ? "bg-foreground" : "" }`}></div>
                  <div className="segment-bottom pt-4">
                        <div className="text-portblue text-sm group-hover:underline p-2 -m-2">
                              {routeStatus === "complete" && "CONFIRM"}
                              {routeStatus === "stalled" && "CORRECT ISSUE"}
                              {routeStatus === "active" && "VIEW DETAILS"}
                        </div>
                  </div>
            </div>
      );
};

export default Route;

export const Operation = ({ routeID, routeFrom, routeTo, opType }) => {
      return (
            <div className={`m-6 border p-6 border-dashed group hover:cursor-pointer ${opType === "received" ? "border-portgreen" : opType === "outgoing" ? "border-portgray" : ""}`}>
                  {" "}
                  {/* Segment (full) */}
                  <div className={`segment-top flex gap-4 pb-4 text-lg ${opType === "received" ? "text-portgreen" : opType === "outgoing" ? "text-portgray" : ""}`}>
                        <span className="font-semibold">{routeID}</span>
                        <span className="font-extralight">|</span>
                        <span className="font-light">{routeFrom} to {routeTo}</span>
                        <span className="font-extralight">|</span>
                        <span className="font-light">
                              {opType === "received" && "IN PORT"}
                              {opType === "outgoing" && "AWAITING LOAD" }
                        </span>
                  </div>
                  <div className={`progress-bar h-2 w-[0%] rounded-full ${opType === "received" ? "bg-portgreen" : opType === "outgoing" ? "bg-portgray" : "" }`}></div>
                  <div className="segment-bottom">
                        <div className="text-portblue text-sm group-hover:underline p-2 pt-6 -m-2">
                              {opType === "received" && "UNLOAD"}
                              {opType === "outgoing" && "LOAD AND SHIP" }
                        </div>
                  </div>
            </div>
      );
};

export default Operation;

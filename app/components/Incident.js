export const Incident = ({ incidentType, affectedID, incidentCost }) => {
      return (
            <div className="m-6 border p-6 border-portred border-dashed group hover:cursor-pointer">
                  {" "}
                  {/* Segment (full) */}
                  <div className="segment-top flex gap-4 pb-4 text-lg text-portred">
                        <span className="font-semibold">{affectedID}</span>
                        <span className="font-extralight">|</span>
                        <span className="font-light">{incidentType}</span>
                        <span className="font-extralight">|</span>
                        <span className="font-light">${incidentCost}</span>
                  </div>
                  <div className="segment-bottom pt-0">
                        <div className="text-portblue text-sm group-hover:underline p-2 -m-2">
                              APPROVE FIX
                        </div>
                  </div>
            </div>
      );
};

export default Incident;

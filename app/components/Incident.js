export const Incident = ({ incidentType, routeId, incidentCost }) => {
      return (
            <div className="group segment">
                  {" "}
                  {/* Segment (full) */}
                  <div className="segment-top text-portred"> {/* Incidents always red text */}
                        <span className="font-semibold">{routeId}</span>
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

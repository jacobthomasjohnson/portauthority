export const Upgrade = ({ upgradeID, upgradeDesc, upgradeCost }) => {
      return (
            <div className="m-6 border p-6 border-foreground border-dashed group hover:cursor-pointer">
                  {" "}
                  {/* Segment (full) */}
                  <div className="segment-top flex gap-4 pb-4 text-lg text-foreground">
                        <span className="font-semibold">{upgradeID}</span>
                        <span className="font-extralight">|</span>
                        <span className="font-light">
                              {upgradeDesc}
                        </span>
                        <span className="font-extralight">|</span>
                        <span className="font-light">${upgradeCost}</span>
                  </div>
                  <div className="segment-bottom pt-0">
                        <div className="text-portblue text-sm group-hover:underline p-2 -m-2">
                              PURCHASE UPGRADE
                        </div>
                  </div>
            </div>
      );
};

export default Upgrade;

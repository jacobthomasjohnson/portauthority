export const Upgrade = ({ upgradeID, upgradeDesc, upgradeCost }) => {
      return (
            <div className="group segment">
                  {" "}
                  {/* Segment (full) */}
                  <div className="segment-top">
                        <span className="font-semibold">{upgradeID}</span>
                        <span className="font-extralight">|</span>
                        <span className="font-light">
                              {upgradeDesc}
                        </span>
                        <span className="font-extralight">|</span>
                        <span className="font-light">${upgradeCost}</span>
                  </div>
                  <div className="segment-bottom">
                        <div className="segment-link">
                              PURCHASE UPGRADE
                        </div>
                  </div>
            </div>
      );
};

export default Upgrade;

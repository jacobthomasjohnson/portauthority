"use client";

import useGameStore from "../store/gameStore";

export const QuickStats = () => {
      const currentKarma = useGameStore((state) => state.playerStats.karma);
      return (
            <div className="quick-stats">
                  <div>
                        <span className="text-portgreen font-thin mr-1">
                              CASH:
                        </span>
                        <span className="text-foreground">$0</span>
                  </div>
                  <div>
                        <span className="text-portgreen font-thin mr-1">
                              KARMA:
                        </span>
                        <span className="text-foreground">{currentKarma}%</span>
                  </div>
                  <div>
                        <span className="text-portgreen font-thin mr-1">
                              LEVEL:
                        </span>
                        <span className="text-foreground">1</span>
                  </div>
            </div>
      );
};

export default QuickStats;

"use client";

import { useEffect, useRef } from "react";
import useGameStore from "../store/gameStore";

export const QuickStats = () => {
      const playerStats = useGameStore((state) => state.playerStats);
      const {
            karma: currentKarma,
            cash: currentCash,
            level: currentLevel,
      } = playerStats;

      const previousStats = useRef({
            karma: currentKarma,
            cash: currentCash,
            level: currentLevel,
      });

      const statRefs = {
            karma: useRef(null),
            cash: useRef(null),
            level: useRef(null),
      };

      const playAnimation = (statRef, animationText, type) => {
            if (!statRef.current) return;

            // Create the animation span
            const animSpan = document.createElement("span");
            animSpan.textContent = animationText;
            animSpan.className = `stat-animation ${type}`; // Add type-specific class

            // Append the animation span to the stat span
            statRef.current.appendChild(animSpan);

            // Remove after animation
            setTimeout(() => {
                  animSpan.remove();
            }, 3000); // Adjust duration as needed
      };

      const checkAndAnimate = (statName, currentStat) => {
            const prevStat = previousStats.current[statName];
            if (currentStat !== prevStat) {
                  const type = currentStat > prevStat ? "gain" : "lose";
                  const diff = Math.abs(currentStat - prevStat);
                  const animationText =
                        statName === "level" && type === "gain"
                              ? "Level Up!"
                              : statName === "level" && type === "lose"
                              ? "Level Lost!"
                              : `${type === "gain" ? "+" : "-"}${
                                      statName === "cash" ? "$" : ""
                                }${diff}${statName === "karma" ? "%" : ""}`;
                  playAnimation(statRefs[statName], animationText, type);
            }
            previousStats.current[statName] = currentStat;
      };

      useEffect(() => {
            checkAndAnimate("cash", currentCash);
      }, [currentCash]);

      useEffect(() => {
            checkAndAnimate("karma", currentKarma);
      }, [currentKarma]);

      useEffect(() => {
            checkAndAnimate("level", currentLevel);
      }, [currentLevel]);

      return (
            <div className="quick-stats relative">
                  <div className="relative" ref={statRefs.cash}>
                        <span className="text-portgreen font-thin mr-1">
                              CASH:
                        </span>
                        <span className="text-foreground relative">
                              ${currentCash}
                        </span>
                  </div>
                  <div className="relative" ref={statRefs.karma}>
                        <span className="text-portgreen font-thin mr-1">
                              KARMA:
                        </span>
                        <span className="text-foreground relative">
                              {currentKarma}%
                        </span>
                  </div>
                  <div className="relative" ref={statRefs.level}>
                        <span className="text-portgreen font-thin mr-1">
                              LEVEL:
                        </span>
                        <span className="text-foreground relative">
                              {currentLevel}
                        </span>
                  </div>
            </div>
      );
};

export default QuickStats;

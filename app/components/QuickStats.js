"use client";

import { useEffect, useRef } from "react";
import useGameStore from "../store/gameStore";

export const QuickStats = () => {
      const currentKarma = useGameStore((state) => state.playerStats.karma);
      const currentCash = useGameStore((state) => state.playerStats.cash);
      const currentLevel = useGameStore((state) => state.playerStats.level);

      const prevKarma = useRef(currentKarma);
      const prevCash = useRef(currentCash);
      const prevLevel = useRef(currentLevel);

      const currentKarmaRef = useRef(null);
      const currentCashRef = useRef(null);
      const currentLevelRef = useRef(null);

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

      useEffect(() => {
            if (currentCash !== prevCash.current) {
                  const type = currentCash > prevCash.current ? "gain" : "lose";
                  const diff = Math.abs(currentCash - prevCash.current);
                  playAnimation(
                        currentCashRef,
                        `${type === "gain" ? "+" : "-"}$${diff}`,
                        type
                  );
            }
            prevCash.current = currentCash;
      }, [currentCash]);

      useEffect(() => {
            if (currentKarma !== prevKarma.current) {
                  const type =
                        currentKarma > prevKarma.current ? "gain" : "lose";
                  const diff = Math.abs(currentKarma - prevKarma.current);
                  playAnimation(
                        currentKarmaRef,
                        `${type === "gain" ? "+" : "-"}${diff}%`,
                        type
                  );
            }
            prevKarma.current = currentKarma;
      }, [currentKarma]);

      useEffect(() => {
            if (currentLevel !== prevLevel.current) {
                  const type =
                        currentLevel > prevLevel.current ? "gain" : "lose";
                  playAnimation(
                        currentLevelRef,
                        type === "gain" ? "Level Up!" : "Level Lost!",
                        type
                  );
            }
            prevLevel.current = currentLevel;
      }, [currentLevel]);

      return (
            <div className="quick-stats relative">
                  <div className="relative" ref={currentCashRef}>
                        <span className="text-portgreen font-thin mr-1">
                              CASH:
                        </span>
                        <span
                              
                              className="text-foreground relative"
                        >
                              ${currentCash}
                        </span>
                  </div>
                  <div>
                        <span className="text-portgreen font-thin mr-1">
                              KARMA:
                        </span>
                        <span
                              ref={currentKarmaRef}
                              className="text-foreground relative"
                        >
                              {currentKarma}%
                        </span>
                  </div>
                  <div>
                        <span className="text-portgreen font-thin mr-1">
                              LEVEL:
                        </span>
                        <span
                              ref={currentLevelRef}
                              className="text-foreground relative"
                        >
                              {currentLevel}
                        </span>
                  </div>
            </div>
      );
};

export default QuickStats;

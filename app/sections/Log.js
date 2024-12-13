"use client";

import { useEffect, useRef } from "react";
import useGameStore from "../store/gameStore";

export const Log = () => {
      const log = useGameStore((state) => state.log);
      const logContainer = useRef(null);
      const createLogItem = (text, color) => {
            let item = document.createElement("div");
            item.className = `text-sm mb-1 text-[#${color}] log-item`
            item.innerHTML = text;
            logContainer.current.prepend(item);
      };
      useEffect(() => {
            if(log.length === 0) {
                  console.log('Log is empty.')
            } else {
                  createLogItem(log[0]);
            }
      }, [log]);

      return <div ref={logContainer} className="log-container"></div>;
};

export default Log;

"use client";

import { useEffect, useRef, useState } from "react";
import useGameStore from "./gameStore";

export const Log = () => {
      const log = useGameStore((state) => state.log);
      const logContainer = useRef(null);
      const createLogItem = (text, color) => {
            let item = document.createElement("div");
            item.classList.add("log-item");
            item.className = `text-sm mb-1 text-[#${color}]`
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

      return <div ref={logContainer} className="pb-8 ml-4 mr-4 max-h-full overflow-auto w-full"></div>;
};

export default Log;

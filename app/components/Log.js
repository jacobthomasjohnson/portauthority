"use client";

import { useEffect, useRef, useState } from "react";
import useGameStore from "./gameStore";

export const Log = ({ text }) => {
      const log = useGameStore((state) => state.log);
      const logContainer = useRef(null);
      const createLogItem = (text) => {
            let item = document.createElement("div");
            item.classList.add("log-item");
            item.textContent = text;
            logContainer.current.appendChild(item);
      };
      useEffect(() => {
            if(log.length === 0) {
                  console.log('Log is empty.')
            } else {
                  createLogItem(log[0]);
            }
      }, [log]);

      return <div ref={logContainer} className="log-container flex w-full overflow-y-auto"></div>;
};

export default Log;

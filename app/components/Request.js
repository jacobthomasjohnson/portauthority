"use client";

import useGameStore from "./gameStore";

export const Request = () => {
      const generateRoute = useGameStore((state) => state.generateRoute);
      return (
            <button className="p-4 border-portgray border rounded-xl text-xs uppercase" onClick={generateRoute}>
                  Request a Route
            </button>
      )
}

export default Request;
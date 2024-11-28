import { create } from "zustand";

const useGameStore = create((set) => ({
      user: {
            money: 0,
            karma: 0,
            level: 1,
      },
      fleets: [
            {
                  id: 1,
                  available: false,
                  damaged: false,
                  durability: 70,
                  maxLoad: 1000,
                  speed: 20,
            },
      ],
      routes: [
            {
                  id: "E6XDN", // Randomly generated string ID.
                  fleet: 1, // Which fleet (by ID) is in use for this route.
                  from: "PORT",
                  to: "CHI",
                  load: 847, // Value of route when completed, cut if issue occurs.
                  stability: 42, // Likelihood of route success without issue.
                  status: "active",
                  progress: 12, // Actively updates throughout the course of the route.
            },
      ],
      ports: [
            {
                  id: 1,
                  available: true,
                  damaged: false,
                  employees: 1, // Based on this, a calculation will run to determine how long unloading takes.
            },
      ],
      upgrades: [
            // Unsure how to implement this yet.
      ],
      management: [
            // Appear under "Fleet & Port Management"
            {
                  type: "fleet-damage", // Also: "port-damage"
                  id: 2, // Which ID selector from either state[fleets] or state[ports]
                  cost: 3000, // How much the fix will cost
            },
      ],
}));

export default useGameStore;

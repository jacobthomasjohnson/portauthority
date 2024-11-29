import { create } from "zustand";

const useGameStore = create((set, get) => ({
      user: {
            money: 0,
            karma: 0,
            level: 1,
      },
      destinations: [
            {
                  id: 1,
                  name: "NYK",
                  value: 85,
                  distance: 8900,
                  danger: 25,
            },
            {
                  id: 2,
                  name: "LAX",
                  value: 78,
                  distance: 8200,
                  danger: 20,
            },
            {
                  id: 3,
                  name: "SIN",
                  value: 92,
                  distance: 6500,
                  danger: 30,
            },
            {
                  id: 4,
                  name: "RTD",
                  value: 88,
                  distance: 10200,
                  danger: 40,
            },
            {
                  id: 5,
                  name: "SHA",
                  value: 90,
                  distance: 7000,
                  danger: 35,
            },
            {
                  id: 6,
                  name: "SYD",
                  value: 75,
                  distance: 3800,
                  danger: 15,
            },
            {
                  id: 7,
                  name: "DXB",
                  value: 85,
                  distance: 8100,
                  danger: 45,
            },
            {
                  id: 8,
                  name: "CPT",
                  value: 65,
                  distance: 4000,
                  danger: 20,
            },
            {
                  id: 9,
                  name: "TYO",
                  value: 88,
                  distance: 7500,
                  danger: 30,
            },
            {
                  id: 10,
                  name: "HAM",
                  value: 82,
                  distance: 10300,
                  danger: 40,
            },
            {
                  id: 11,
                  name: "BUE",
                  value: 50,
                  distance: 2900,
                  danger: 10,
            },
            {
                  id: 12,
                  name: "RIO",
                  value: 60,
                  distance: 4500,
                  danger: 15,
            },
            {
                  id: 13,
                  name: "PCY",
                  value: 70,
                  distance: 7900,
                  danger: 25,
            },
            {
                  id: 14,
                  name: "MUM",
                  value: 80,
                  distance: 6900,
                  danger: 35,
            },
            {
                  id: 15,
                  name: "HKG",
                  value: 85,
                  distance: 6800,
                  danger: 30,
            },
            {
                  id: 16,
                  name: "AKL",
                  value: 68,
                  distance: 4100,
                  danger: 12,
            },
            {
                  id: 17,
                  name: "MNL",
                  value: 76,
                  distance: 6300,
                  danger: 28,
            },
            {
                  id: 18,
                  name: "POM",
                  value: 62,
                  distance: 4500,
                  danger: 18,
            },
            {
                  id: 19,
                  name: "LIS",
                  value: 80,
                  distance: 9800,
                  danger: 38,
            },
            {
                  id: 20,
                  name: "IST",
                  value: 85,
                  distance: 8500,
                  danger: 45,
            },
            {
                  id: 21,
                  name: "SFO",
                  value: 75,
                  distance: 8100,
                  danger: 22,
            },
            {
                  id: 22,
                  name: "VAL",
                  value: 58,
                  distance: 2800,
                  danger: 12,
            },
            {
                  id: 23,
                  name: "MEL",
                  value: 73,
                  distance: 3900,
                  danger: 14,
            },
            {
                  id: 24,
                  name: "HFX",
                  value: 70,
                  distance: 9000,
                  danger: 30,
            },
            {
                  id: 25,
                  name: "KHI",
                  value: 78,
                  distance: 7000,
                  danger: 37,
            },
      ],
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
                  progress: 12, // Actively updates throughout the course of the route.
                  status: "stable",
            },
            {
                  id: "JDXSM", // Randomly generated string ID.
                  fleet: 2, // Which fleet (by ID) is in use for this route.
                  from: "PORT",
                  to: "CHI",
                  load: 847, // Value of route when completed, cut if issue occurs.
                  stability: 42, // Likelihood of route success without issue.
                  progress: 44, // Actively updates throughout the course of the route.
                  status: "damaged",
            },
            {
                  id: "IDNWU", // Randomly generated string ID.
                  fleet: 3, // Which fleet (by ID) is in use for this route.
                  from: "MEX",
                  to: "PORT",
                  load: 2000, // Value of route when completed, cut if issue occurs.
                  stability: 93, // Likelihood of route success without issue.
                  progress: 100, // Actively updates throughout the course of the route.
                  status: "waiting",
            },
            {
                  id: "I832H", // Randomly generated string ID.
                  fleet: 4, // Which fleet (by ID) is in use for this route.
                  from: "IMA",
                  to: "PORT",
                  load: 5000, // Value of route when completed, cut if issue occurs.
                  stability: 98, // Likelihood of route success without issue.
                  progress: 100, // Actively updates throughout the course of the route.
                  status: "received",
            },
            {
                  id: "NDUW8", // Randomly generated string ID.
                  fleet: 5, // Which fleet (by ID) is in use for this route.
                  from: "XMS",
                  to: "PORT",
                  load: 1000, // Value of route when completed, cut if issue occurs.
                  stability: 83, // Likelihood of route success without issue.
                  progress: 0, // Actively updates throughout the course of the route.
                  status: "remote",
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
      log: [],
      usedIDs: [],
      addToLog: (text) => {
            set((state) => {
                  if (state.log != []) {
                        console.log("not empty");
                        return {
                              log: [text, ...state.log],
                        };
                  }
            });
      },
      generateID: () => {
            const characters = "ABCDEFGHIJKLMNOPQRSTUVWYX123456789";
            let usedIDs = get().usedIDs;
            let log = get().log;
            let id;
            do {
                  id = "";
                  for (let i = 0; i < 5; i++) {
                        id += characters.charAt(
                              Math.floor(Math.random() * characters.length)
                        );
                  }
            } while (usedIDs.includes(id));
            return id;
      },
      getRandomDestination: () => {
            const destinations = get().destinations;
            return destinations[
                  Math.floor(Math.random() * destinations.length)
            ];
      },
      getRandomDirection: () => {
            const directions = ["inbound", "outbound"];
            return directions[Math.floor(Math.random() * directions.length)];
      },
      getRandomInteger: (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      getRandomLoad: (value) => {
            const mult = get().getRandomInteger;
            const load =
                  Math.floor(Math.random() * 1000) * value;
            return load;
      },
      generateRoute: () => {
            const id = get().generateID(); // Generates a unique ID for the route
            const destination = get().getRandomDestination(); // Grabs a completely random destination
            // const direction = get().getRandomDirection(); // Returns either "inbound" or "outbound"
            // Check if any fleets are "available"
            // Grab the first available fleet
            const load = get().getRandomLoad(destination.value);
            // Check if any fleets are "remote"
            console.log(id, destination.name, load);
      },
}));

export default useGameStore;

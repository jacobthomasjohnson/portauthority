import { create } from "zustand";
import { destinations } from "./destinations";

const useGameStore = create((set, get) => ({
      destinations,
      stats: {
            cash: 0,
            karma: 10,
            level: 1,
      },
      promptActive: false,
      upgrades: [],
      management: [{}],
      log: [],
      usedIDs: [],
      ships: [
            {
                  id: 1,
                  name: "Titanic",
                  available: true,
                  damaged: false,
                  durability: 20,
                  maxLoad: 25000,
                  speed: 20,
            },
            {
                  id: 2,
                  name: "Beast",
                  available: false,
                  damaged: false,
                  durability: 70,
                  maxLoad: 55000,
                  speed: 20,
            },
            {
                  id: 3,
                  name: "Quardic",
                  available: true,
                  damaged: false,
                  durability: 70,
                  maxLoad: 92500,
                  speed: 20,
            },
      ],
      ports: [
            {
                  id: 1,
                  available: true,
                  damaged: false,
                  employees: 1,
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
            const load = Math.floor(Math.random() * value) * 100;
            return load;
      },
      availableShips: [],
      clearPrompt: () => {
            set((state) => {
                  return {
                        ...state,
                        promptActive: false,
                        availableShips: [],
                  };
            });
      },
      routeDetails: null,
      generateRoute: () => {
            const oddsOfRouteCreation = get().getRandomInteger(0, 100);
            const canGenerateRoute = oddsOfRouteCreation <= get().stats.karma;
            const destination = get().getRandomDestination();
            const load = get().getRandomLoad(destination.value);

            if (canGenerateRoute) {
                  const id = get().generateID();
                  const ships = get().ships;
                  let availableShips = [];

                  ships.forEach((ship) => {
                        if (ship.available) {
                              availableShips.push(ship);
                        }
                  });

                  if (availableShips.length === 0) {
                        console.log("Ships Empty.");
                  } else {
                        const routeDetails = `Destination: ${destination.name}, Load: ${load}`;

                        set((state) => ({
                              ...state,
                              routeDetails,
                              availableShips,
                              promptActive: true,
                        }));
                  }
            } else {
                  console.log(
                        `Cannot generate route, karma is: ${
                              get().stats.karma
                        } and rolled value is ${oddsOfRouteCreation}`
                  );
                  set((state) => ({
                        ...state,
                        log: [
                              `Cannot generate route due to low karma. Request to/from: ${destination.name} carrying ${load}lbs`,
                              ...state.log,
                        ], // Use state.log
                  }));
            }
      },
}));

export default useGameStore;

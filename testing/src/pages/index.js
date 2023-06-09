import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { useEffect, useState } from "react";
import * as Icon from "lucide-react";
import { useQRCode } from "next-qrcode";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Buddy from "./utils/Buddy";

const Home = () => {
  const { Canvas } = useQRCode();
  const [data, setData] = useState("No result");
  const [buddy, setBuddy] = useState('');

  const [currentTab, setCurrentTab] = useState("Dashboard");
  const [online, setOnline] = useState(1);
  const [planning, setPlanning] = useState(0);
  const [routeSelection, setRouteSelection] = useState(1);
  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  const [guests, setGuests] = useState([]);
  const [latestName, setLatestName] = useState("");

  const [started, setStarted] = useState(false);

  const [routes, setRoutes] = useState([
    {
      name: "Blue Cliff",
      distance: "1.5 km from the dive base",
      image: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a",
      suitability: 80,
    },
    {
      name: "Red Cliff",
      distance: "6 km from the dive base",
      image: "https://images.unsplash.com/photo-1559494007-9f5847c49d94",
      suitability: 64,
    },
    {
      name: "Brown Cliff",
      distance: "12 km from the dive base",
      image: "https://images.unsplash.com/photo-1593892370074-ec754b1ac563",
      suitability: 42,
    },
  ]);

  useEffect(() => {
    let fetchNameInterval = setInterval(() => {
      if (planning === 0) {
        fetch("/api/latestData")
          .then((res) => res.json())
          .then((data) => {
            if (data.name !== latestName) {
              console.log(data.name);
              setLatestName(data.name);
              setGuests([]);
              setGuests((guests) => [
                ...guests,
                {
                  name: data.name,
                  padi: data.star,
                  image:
                    "https://uploads-ssl.webflow.com/646b8238ccbfdf0cd7f59ae7/648c9cb5851c80e470063c8d_1661160141860.webp",
                },
              ]);
              if (data.star === "3 Star") {
                setRoutes([
                  {
                    name: "Elegant Bay",
                    distance: "12 km from the dive base",
                    image:
                      "https://images.unsplash.com/photo-1593892370074-ec754b1ac563",
                    suitability: 96,
                  },
                  {
                    name: "Techno Reef",
                    distance: "6 km from the dive base",
                    image:
                      "https://images.unsplash.com/photo-1559494007-9f5847c49d94",
                    suitability: 72,
                  },
                  {
                    name: "Blue Cliff",
                    distance: "1.5 km from the dive base",
                    image:
                      "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a",
                    suitability: 24,
                  },
                ]);
              }
            }
          });
      }
    }, 2000);
    return () => {
      clearInterval(fetchNameInterval);
    };
  }, []);

  return (
    <main className="h-screen w-screen flex flex-col items-start justify-start">
      {online && <Navigation online={online} />}
      {online && online === 1 && (
        <div className="w-full h-full flex">
          <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
          <div className="h-full w-full bg-zinc-50 p-8">
            {currentTab === "Dashboard" &&
              date !==
                new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }) && (
                <div className="h-full w-full flex items-center justify-center font-medium text-lg">
                  No dives for this date yet.
                </div>
              )}
            {currentTab === "Dashboard" && planning === 1 && (
              <div className="h-full w-full flex items-start flex-col justify-between pb-8 px-24">
                <div className="pt-4">
                  <h1 className="text-2xl font-semibold mb-6">
                    Matching Routes for {latestName}
                  </h1>
                  <div className="w-full flex items-start gap-6 justify-between"></div>
                  <div className="w-full flex items-start gap-6 justify-between">
                    {routes.map((route) => (
                      <div
                        key={route.name}
                        onClick={() =>
                          setRouteSelection(routes.indexOf(route) + 1)
                        }
                        className={
                          "relative flex items-start flex-col gap-5 cursor-pointer transition-all p-4 rounded-3xl bg-white shadow-lg shadow-zinc-100 border border-zinc-300 border-opacity-40 " +
                          (routeSelection === routes.indexOf(route) + 1 &&
                            "ring-4 ring-green-500")
                        }
                      >
                        {routeSelection === routes.indexOf(route) + 1 && (
                          <div className="absolute px-3 py-1 top-4 left-4 rounded-br-xl rounded-tl-2xl bg-green-500 text-white z-10 flex gap-1.5 items-center">
                            <Icon.Check size={20} />
                            Selected
                          </div>
                        )}
                        <Image
                          src={route.image}
                          width={500}
                          height={500}
                          className="rounded-2xl object-cover h-96 w-88"
                        />
                        <div className="pl-4 flex flex-col items-start">
                          <h2 className="text-lg font-medium">{route.name}</h2>
                          <p className="text-zinc-500 mb-4">{route.distance}</p>
                          <p className="mb-1.5 text-sm text-zinc-500">
                            Diver suitability
                          </p>
                          <div
                            className={
                              "flex items-center gap-2 px-2 py-1 " +
                              (route.suitability >= 80
                                ? "bg-green-100 rounded-full text-green-500"
                                : route.suitability <= 72 &&
                                  route.suitability >= 43
                                ? "bg-orange-100 rounded-full text-orange-500"
                                : "bg-red-100 rounded-full text-red-500")
                            }
                          >
                            <Icon.Percent strokeWidth={2.5} size={16} />
                            <p className="font-medium">{route.suitability}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-12 flex gap-4 justify-between w-full">
                  <button
                    onClick={() => {
                      setPlanning(0);
                    }}
                    className="bg-transparent border border-black rounded-xl text-black font-medium py-4 px-5 transition-all"
                  >
                    <Icon.ArrowLeft size={20} strokeWidth={2.5} />
                  </button>
                  <button
                    onClick={() => {
                      setPlanning(2);
                    }}
                    className="bg-black rounded-xl text-white font-medium px-8 py-4 transition-all hover:bg-zinc-900"
                  >
                    Proceed with buddy
                  </button>
                </div>
              </div>
            )}

            {currentTab === "Dashboard" && planning === 2 && (
              <div className="h-full w-full flex items-start flex-col justify-between pb-8 px-24">
                <div className="pt-4 w-full">
                  <h1 className="text-2xl font-semibold mb-6">
                    Choose a buddy for {latestName}
                  </h1>
                  <div className="w-full gap-6">
                    <DndProvider backend={HTML5Backend} className="w-full">
                      <Buddy className="w-full" buddy={buddy} setBuddy={setBuddy} latestName={latestName} />
                    </DndProvider>
                  </div>
                </div>
                <div className="mt-12 flex gap-4 justify-between w-full">
                  <button
                    onClick={() => {
                      setPlanning(1);
                    }}
                    className="bg-transparent border border-black rounded-xl text-black font-medium py-4 px-5 transition-all"
                  >
                    <Icon.ArrowLeft size={20} strokeWidth={2.5} />
                  </button>
                  <button
                    onClick={() => {
                      setPlanning(3);
                    }}
                    className="bg-black rounded-xl text-white font-medium px-8 py-4 transition-all hover:bg-zinc-900"
                  >
                    Proceed with equipment 
                  </button>
                </div>
              </div>
            )}

            {currentTab === "Dashboard" && planning === 3 && (
              <div className="h-full w-full flex items-start flex-col justify-between pb-8 px-24">
                <div className="pt-4 w-full">
                  <h1 className="text-2xl font-semibold mb-6">
                    Choose equipment for {latestName}
                  </h1>
                </div>
                <div className="h-full w-full overflow-y-hidden">
                  <Image 
                    src="./images/equipment.svg"
                    width={1500}
                    height={1000}
                    className="rounded-2xl object-cover object-top w-full"
                  />
                </div>
                <div className="mt-12 flex gap-4 justify-between w-full">
                  <button
                    onClick={() => {
                      setPlanning(2);
                    }}
                    className="bg-transparent border border-black rounded-xl text-black font-medium py-4 px-5 transition-all"
                  >
                    <Icon.ArrowLeft size={20} strokeWidth={2.5} />
                  </button>
                  <button
                    onClick={() => {
                      setPlanning(4);

                      // post request to backend
                      fetch("/api/latestData", {
                        method: "POST",
                        body: JSON.stringify({ onboarding: 1 }),
                        headers: {
                          "Content-Type": "application/json",
                        },
                      });
                    }}
                    className="bg-black rounded-xl text-white font-medium px-8 py-4 transition-all hover:bg-zinc-900"
                  >
                    Finish planning
                  </button>
                </div>
              </div>
            )}

            {currentTab === "Dashboard" && planning === 4 && (
              <div className="h-full w-full flex items-start flex-col justify-between pb-8 px-24">
                <div className="pt-4 w-full">
                  <h1 className="text-2xl font-semibold mb-6">
                  You've finished checking in {latestName}
                  </h1>
                </div>
                <div className="h-full w-full">
                  <p className="text-zinc-500 mb-8">Here is a summary:</p>
                  <div className="grid grid-cols-3 w-full gap-8">
                    <div className="flex flex-col gap-8 border rounded-3xl border-zinc-200 bg-white p-6 h-full">
                      <p className="text-zinc-500 font-medium">Selected route</p>
                      <Image 
                        src={routes[routeSelection].image}
                        width={500}
                        height={500}
                        className="rounded-2xl object-cover h-96 w-88"
                      />
                      <p className="text-black font-medium text-lg">{routes[routeSelection].name}</p>
                    </div>
                    <div className="flex flex-col gap-8 border rounded-3xl border-zinc-200 bg-white p-6 h-full">
                      <p className="text-zinc-500 font-medium">Selected Buddy</p>
                      {/* <Image 
                        src={routes[routeSelection].image}
                        width={500}
                        height={500}
                        className="rounded-2xl object-cover h-96 w-88"
                      /> */}
                      <p className="h-96 w-full flex items-center justify-center font-medium text-2xl opacity-30">{buddy}</p>
                      <p className="text-black font-medium text-lg">{buddy}</p>
                    </div>
                    <div className="flex flex-col gap-8 border rounded-3xl border-zinc-200 bg-white p-6 h-full">
                      <p className="text-zinc-500 font-medium">Selected Equipment</p>
                      <Image 
                        src="./images/equipment.svg"
                        width={500}
                        height={500}
                        className="rounded-2xl object-cover h-96 w-88"
                      />
                      <p className="text-black font-medium text-lg">Scuba Tank XL</p>
                    </div>
                  </div>
                </div>
                <div className="mt-12 flex gap-4 justify-between w-full">
                  <button
                    onClick={() => {
                      setPlanning(3);
                    }}
                    className="bg-transparent border border-black rounded-xl text-black font-medium py-4 px-5 transition-all"
                  >
                    <Icon.ArrowLeft size={20} strokeWidth={2.5} />
                  </button>
                  <button
                    onClick={() => {
                      setPlanning(4);
                    }}
                    className="bg-black opacity-0 pointer-events-none rounded-xl text-white font-medium px-8 py-4 transition-all hover:bg-zinc-900"
                  >
                    Continue to dashboard
                  </button>
                </div>
              </div>
            )}

            {currentTab === "Dashboard" &&
              planning < 1 &&
              date ===
                new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }) && (
                <div className="grid grid-cols-3 gap-8 h-full grid-rows-3">
                  <div className="col-span-2 bg-white border border-zinc-100 p-8 rounded-3xl row-span-2 flex flex-col justify-between">
                    <p className="text-zinc-400">Diving tours</p>
                    <div className="w-full">
                      <svg
                        width="auto"
                        height="auto"
                        viewBox="0 0 1500 500"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_466_674)">
                          <rect width="1500" height="500" fill="white" />
                          <path
                            d="M238.582 390.877C79.5292 390.877 7.25536 195.989 -9 58V500H1508V58L1390.21 136.589H1309.93L1199.65 210.172H1131.38L986.578 306.781H850.033L723.992 390.877H238.582Z"
                            fill="url(#paint0_linear_466_674)"
                          />
                          <path
                            d="M-9 58C7.25536 196.041 79.5292 391 238.582 391C397.634 391 628.46 391 723.992 391L850.033 306.874H986.578L1131.38 210.229H1199.65L1309.93 136.618H1390.21L1508 58"
                            stroke="#0EA5E9"
                            stroke-width="4"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M849.056 171.567C849.955 171.061 850.969 170.795 852 170.795C853.031 170.795 854.045 171.061 854.944 171.567C855.842 172.073 856.595 172.801 857.13 173.683L857.136 173.693L874.076 201.973L874.092 202C874.616 202.908 874.893 203.936 874.896 204.984C874.899 206.032 874.628 207.062 874.109 207.972C873.59 208.882 872.842 209.641 871.939 210.172C871.036 210.703 870.01 210.989 868.962 211L868.94 211.001L835.038 211C833.99 210.989 832.964 210.703 832.061 210.172C831.158 209.641 830.41 208.882 829.891 207.972C829.373 207.062 829.101 206.032 829.104 204.984C829.107 203.936 829.384 202.908 829.908 202L829.924 201.973L846.864 173.693L848.58 174.72L846.87 173.683C847.405 172.801 848.158 172.073 849.056 171.567ZM850.292 175.754L833.365 204.012C833.195 204.312 833.105 204.65 833.104 204.995C833.103 205.344 833.194 205.688 833.366 205.991C833.539 206.294 833.789 206.547 834.09 206.724C834.388 206.9 834.727 206.995 835.073 207H868.927C869.273 206.995 869.612 206.9 869.91 206.724C870.211 206.547 870.461 206.294 870.634 205.991C870.807 205.688 870.897 205.344 870.896 204.995C870.895 204.65 870.805 204.312 870.635 204.012L853.71 175.758C853.709 175.756 853.708 175.755 853.708 175.754C853.53 175.462 853.279 175.22 852.981 175.052C852.682 174.884 852.344 174.795 852 174.795C851.656 174.795 851.318 174.884 851.019 175.052C850.721 175.22 850.471 175.462 850.292 175.754Z"
                            fill="#F59E0B"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M852 183C853.105 183 854 183.895 854 185V193C854 194.105 853.105 195 852 195C850.895 195 850 194.105 850 193V185C850 183.895 850.895 183 852 183Z"
                            fill="#F59E0B"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M850 201C850 199.895 850.895 199 852 199H852.02C853.125 199 854.02 199.895 854.02 201C854.02 202.105 853.125 203 852.02 203H852C850.895 203 850 202.105 850 201Z"
                            fill="#F59E0B"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M1132.06 62.5666C1132.96 62.0607 1133.97 61.7949 1135 61.7949C1136.03 61.7949 1137.05 62.0607 1137.94 62.5666C1138.84 63.0725 1139.6 63.8015 1140.13 64.6832L1140.14 64.6927L1157.08 92.9727L1157.09 93.0003C1157.62 93.9076 1157.89 94.9362 1157.9 95.9838C1157.9 97.0315 1157.63 98.0617 1157.11 98.9719C1156.59 99.8821 1155.84 100.641 1154.94 101.172C1154.04 101.703 1153.01 101.989 1151.96 102L1151.94 102.001L1118.04 102C1116.99 101.989 1115.96 101.703 1115.06 101.172C1114.16 100.641 1113.41 99.8821 1112.89 98.9719C1112.37 98.0617 1112.1 97.0315 1112.1 95.9838C1112.11 94.9362 1112.38 93.9076 1112.91 93.0003L1112.92 92.9727L1129.86 64.6927L1131.58 65.7204L1129.87 64.6832C1130.4 63.8015 1131.16 63.0725 1132.06 62.5666ZM1133.29 66.7537L1116.37 95.0121C1116.2 95.3117 1116.1 95.6503 1116.1 95.995C1116.1 96.3443 1116.19 96.6877 1116.37 96.9911C1116.54 97.2945 1116.79 97.5473 1117.09 97.7244C1117.39 97.8999 1117.73 97.995 1118.07 98.0004H1151.93C1152.27 97.995 1152.61 97.8999 1152.91 97.7244C1153.21 97.5473 1153.46 97.2944 1153.63 96.9911C1153.81 96.6877 1153.9 96.3443 1153.9 95.995C1153.9 95.6503 1153.81 95.3117 1153.63 95.0122L1136.71 66.7577C1136.71 66.7563 1136.71 66.755 1136.71 66.7537C1136.53 66.4616 1136.28 66.22 1135.98 66.0521C1135.68 65.8835 1135.34 65.7949 1135 65.7949C1134.66 65.7949 1134.32 65.8835 1134.02 66.0521C1133.72 66.22 1133.47 66.4616 1133.29 66.7537Z"
                            fill="#F59E0B"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M1135 74C1136.1 74 1137 74.8954 1137 76V84C1137 85.1046 1136.1 86 1135 86C1133.9 86 1133 85.1046 1133 84V76C1133 74.8954 1133.9 74 1135 74Z"
                            fill="#F59E0B"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M1133 92C1133 90.8954 1133.9 90 1135 90H1135.02C1136.12 90 1137.02 90.8954 1137.02 92C1137.02 93.1046 1136.12 94 1135.02 94H1135C1133.9 94 1133 93.1046 1133 92Z"
                            fill="#F59E0B"
                          />
                          <path
                            d="M851.5 229V287.5"
                            stroke="#CFCFCF"
                            stroke-width="4"
                            stroke-linejoin="round"
                            stroke-dasharray="18 18"
                          />
                          <path
                            d="M1133 126V184.5"
                            stroke="#CFCFCF"
                            stroke-width="4"
                            stroke-linejoin="round"
                            stroke-dasharray="18 18"
                          />
                        </g>
                        <defs>
                          <linearGradient
                            id="paint0_linear_466_674"
                            x1="749.5"
                            y1="186.646"
                            x2="749.5"
                            y2="500"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#BAE6FD" />
                            <stop
                              offset="1"
                              stop-color="white"
                              stop-opacity="0"
                            />
                          </linearGradient>
                          <clipPath id="clip0_466_674">
                            <rect width="1500" height="500" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="mb-6 h-[1px] bg-zinc-100 w-full" />
                    <div className="flex gap-4 justify-between w-full items-center">
                      <div className="flex gap-8 items-center">
                        <div className="flex flex-col gap-1">
                          <p className="text-zinc-400 text-sm">Total dives</p>
                          <p className="text-zinc-900 font-medium">1.234</p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-zinc-400 text-sm">Location</p>
                          <p className="text-zinc-900 font-medium">
                            Red Cliff Reef
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-8 items-center">
                        <div className="flex flex-col gap-1">
                          <p className="text-zinc-400 text-sm">Guests</p>
                          <p className="text-zinc-900 font-medium">8</p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-zinc-400 text-sm">Max depth</p>
                          <p className="text-zinc-900 font-medium">32 m</p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-zinc-400 text-sm">Equipment</p>
                          <p className="text-zinc-900 font-medium">12</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border border-zinc-100 p-8 rounded-3xl row-span-3">
                    {guests.length === 0 && (
                      <div className="flex flex-col gap-4 h-full justify-between bg-zinc-100 animate-pulse rounded-2xl" />
                    )}
                    {guests.length > 0 && (
                      <p className="text-zinc-400 mb-8">Guest list</p>
                    )}
                    <div className="flex flex-col gap-3 h-full justify-between">
                      {guests.length > 0 &&
                        guests.map((guest) => (
                          <div className="flex justify-between items-center px-2.5 py-2 rounded-md cursor-pointer transition-all hover:bg-zinc-100 max-xl:flex-col max-xl:gap-4 max-xl:items-start">
                            <div className="flex items-center gap-3 font-medium">
                              {/* <Image
                                src={guest.image}
                                width={40}
                                height={40}
                                className="rounded-full h-8 w-8 object-cover object-top"
                              /> */}
                              <div className="h-10 flex items-center justify-center rounded-full bg-zinc-300 w-10 relative overflow-hidden">
                                <div className="h-3.5 w-3.5 rounded-full bg-zinc-500 ring-4 relative z-10 ring-zinc-300" />
                                <div className="h-8 w-8 top-7 absolute rounded-full bg-zinc-500" />
                              </div>
                              {guest.name}
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-xs text-zinc-400">
                                Diver Level:
                              </p>
                              <div
                                className={
                                  "flex items-center gap-2 " +
                                  (guest.padi === "1 Star"
                                    ? "text-red-500"
                                    : guest.padi === "2 Star"
                                    ? "text-yellow-500"
                                    : "text-green-500")
                                }
                              >
                                <Icon.Ticket size={20} />
                                {guest.padi} PADI
                              </div>
                            </div>
                          </div>
                        ))}
                      {guests.length > 0 && (
                        <button
                          onClick={() => {
                            setPlanning(1);
                            setStarted(true);
                          }}
                          className="bg-black rounded-xl text-white font-medium w-full py-4 transition-all hover:bg-zinc-900 mt-8 mb-14"
                        >
                          Start the Planning
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="bg-white border border-zinc-100 p-8 rounded-3xl grid">
                    <p className="text-zinc-400 mb-4">Matching routes</p>
                    <div className="flex flex-col gap-4 h-full">
                      {routes.map((route) => (
                        <div className="w-full flex justify-between gap-3 items-center">
                          <div className="flex items-center gap-3">
                            <div
                              className={
                                "flex items-center gap-2 px-2 py-1 " +
                                (route.suitability >= 80
                                  ? "bg-green-100 rounded-full text-green-500"
                                  : route.suitability <= 72 &&
                                    route.suitability >= 43
                                  ? "bg-orange-100 rounded-full text-orange-500"
                                  : "bg-red-100 rounded-full text-red-500")
                              }
                            >
                              <Icon.Percent strokeWidth={2.5} size={16} />
                              <p className="font-medium">{route.suitability}</p>
                            </div>
                            <p className="font-medium">{route.name}</p>
                          </div>
                          <div className="flex gap-1 items-center">
                            <Icon.Check
                              size={28}
                              className="p-1 rounded-md transition-all hover:bg-zinc-100 cursor-pointer"
                            />
                            <Icon.X
                              size={28}
                              className="p-1 rounded-md transition-all hover:bg-zinc-100 cursor-pointer"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white border border-zinc-100 p-8 rounded-3xl min-h-[128px]">
                    <div className="w-full flex justify-between items-center mb-8">
                      <p className="text-zinc-400">Dive side Statistics</p>
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-green-500 animate-ping" />
                        <p className="text-green-500">Live</p>
                      </div>
                    </div>
                    <div className="h-full w-full flex items-center justify-start flex-col">
                      <p className="text-4xl font-medium mb-3">24°C</p>
                      <p className="text-zinc-500 text-xs">
                        Water temparature: 8°C
                      </p>
                      <div className="mt-6 flex items-center gap-8">
                        <div className="flex items-center justify-between w-full font-medium gap-2 truncate text-sky-500">
                          <Icon.Waves size={20} />
                          Water flow
                        </div>
                        <div className="flex items-center justify-between w-full font-medium gap-2 text-amber-500">
                          <Icon.Sun size={20} />
                          UV Index
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>
          {online && online === 1 && currentTab === "Dashboard" && (
            <div
              className={
                "absolute top-6 shadow-lg shadow-zinc-100 py-2.5 flex items-center px-5 font-medium bg-white bg-opacity-80 backdrop-blur-md border border-opacity-5 border-black left-[50%] translate-x-[-50%] rounded-full " +
                (planning > 0 && "cursor-not-allowed")
              }
            >
              <div
                className={
                  "flex items-center gap-2 " +
                  (planning > 0 && "pointer-events-none")
                }
              >
                <Icon.ArrowLeft
                  size={30}
                  className="cursor-pointer transition-all hover:bg-zinc-100 p-1 rounded-md"
                  onClick={() => {
                    setDate(
                      new Date(
                        new Date(date).getTime() - 86400000
                      ).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    );
                  }}
                />
                <p className="font-medium mx-2 truncate w-56 text-center selection:bg-transparent">
                  {date}
                </p>
                <Icon.ArrowRight
                  size={30}
                  className="cursor-pointer transition-all hover:bg-zinc-100 p-1 rounded-md"
                  onClick={() => {
                    setDate(
                      new Date(
                        new Date(date).getTime() + 86400000
                      ).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    );
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Home;

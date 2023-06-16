import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import io from "socket.io-client";
let socket;

const Home = () => {
  const [currentTab, setCurrentTab] = useState("Dashboard");
  // useEffect(() => socketInitializer(), []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  };

  return (
    <main className="h-screen w-screen flex flex-col items-start justify-start">
      <Navigation />
      <div className="w-full h-full flex">
        <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <div className="h-full w-full bg-zinc-50 p-16">
          {currentTab === "Dashboard" && (
            <div className="grid grid-cols-3">
              <div className="col-span-2 bg-white border border-zinc-100 p-8 rounded-3xl min-h-[128px]">
                <p className="text-zinc-400 text-lg font-medium">
                  Diving tours
                </p>
                <div className="w-full object-fill">
                  <svg
                    width="auto"
                    height="auto"
                    viewBox="0 0 1000 500"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_466_674)">
                      <rect width="1000" height="500" fill="white" />
                      <path
                        d="M159 391C53 391 4.83333 196.333 -6 58.5V500H1005V58.5L926.5 137H873L799.5 210.5H754L657.5 307H566.5L482.5 391H159Z"
                        fill="url(#paint0_linear_466_674)"
                      />
                      <path
                        d="M-6 58.5C4.83333 196.333 53 391 159 391C265 391 418.833 391 482.5 391L566.5 307H657.5L754 210.5H799.5L873 137H926.5L1005 58.5"
                        stroke="#0EA5E9"
                        stroke-width="4"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M562.056 171.567C562.955 171.061 563.969 170.795 565 170.795C566.031 170.795 567.045 171.061 567.944 171.567C568.842 172.073 569.595 172.801 570.13 173.683L570.136 173.693L587.076 201.973L587.092 202C587.616 202.908 587.893 203.936 587.896 204.984C587.899 206.032 587.628 207.062 587.109 207.972C586.59 208.882 585.842 209.641 584.939 210.172C584.036 210.703 583.01 210.989 581.962 211L581.94 211.001L548.038 211C546.99 210.989 545.964 210.703 545.061 210.172C544.158 209.641 543.41 208.882 542.891 207.972C542.373 207.062 542.101 206.032 542.104 204.984C542.107 203.936 542.384 202.908 542.908 202L542.924 201.973L559.864 173.693L561.58 174.72L559.87 173.683C560.405 172.801 561.158 172.073 562.056 171.567ZM563.292 175.754L546.365 204.012C546.195 204.312 546.105 204.65 546.104 204.995C546.103 205.344 546.194 205.688 546.366 205.991C546.539 206.294 546.789 206.547 547.09 206.724C547.388 206.9 547.727 206.995 548.073 207H581.927C582.273 206.995 582.612 206.9 582.91 206.724C583.211 206.547 583.461 206.294 583.634 205.991C583.807 205.688 583.897 205.344 583.896 204.995C583.895 204.65 583.805 204.312 583.635 204.012L566.71 175.758C566.709 175.756 566.708 175.755 566.708 175.754C566.53 175.462 566.279 175.22 565.981 175.052C565.682 174.884 565.344 174.795 565 174.795C564.656 174.795 564.318 174.884 564.019 175.052C563.721 175.22 563.471 175.462 563.292 175.754Z"
                        fill="#F59E0B"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M565 183C566.105 183 567 183.895 567 185V193C567 194.105 566.105 195 565 195C563.895 195 563 194.105 563 193V185C563 183.895 563.895 183 565 183Z"
                        fill="#F59E0B"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M563 201C563 199.895 563.895 199 565 199H565.02C566.125 199 567.02 199.895 567.02 201C567.02 202.105 566.125 203 565.02 203H565C563.895 203 563 202.105 563 201Z"
                        fill="#F59E0B"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M754.056 62.5666C754.955 62.0607 755.969 61.7949 757 61.7949C758.031 61.7949 759.045 62.0607 759.944 62.5666C760.842 63.0725 761.595 63.8015 762.13 64.6832L762.136 64.6927L779.076 92.9727L779.092 93.0003C779.616 93.9076 779.893 94.9362 779.896 95.9838C779.899 97.0315 779.628 98.0617 779.109 98.9719C778.59 99.8821 777.842 100.641 776.939 101.172C776.036 101.703 775.01 101.989 773.962 102L773.94 102.001L740.038 102C738.99 101.989 737.964 101.703 737.061 101.172C736.158 100.641 735.41 99.8821 734.891 98.9719C734.373 98.0617 734.101 97.0315 734.104 95.9838C734.107 94.9362 734.384 93.9076 734.908 93.0003L734.924 92.9727L751.864 64.6927L753.58 65.7204L751.87 64.6832C752.405 63.8015 753.158 63.0725 754.056 62.5666ZM755.292 66.7537L738.365 95.0121C738.195 95.3117 738.105 95.6503 738.104 95.995C738.103 96.3443 738.194 96.6877 738.366 96.9911C738.539 97.2945 738.789 97.5473 739.09 97.7244C739.388 97.8999 739.727 97.995 740.073 98.0004H773.927C774.273 97.995 774.612 97.8999 774.91 97.7244C775.211 97.5473 775.461 97.2944 775.634 96.9911C775.807 96.6877 775.897 96.3443 775.896 95.995C775.895 95.6503 775.805 95.3117 775.635 95.0122L758.71 66.7577C758.709 66.7563 758.708 66.755 758.708 66.7537C758.53 66.4616 758.279 66.22 757.981 66.0521C757.682 65.8835 757.344 65.7949 757 65.7949C756.656 65.7949 756.318 65.8835 756.019 66.0521C755.721 66.22 755.471 66.4616 755.292 66.7537Z"
                        fill="#F59E0B"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M757 74C758.105 74 759 74.8954 759 76V84C759 85.1046 758.105 86 757 86C755.895 86 755 85.1046 755 84V76C755 74.8954 755.895 74 757 74Z"
                        fill="#F59E0B"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M755 92C755 90.8954 755.895 90 757 90H757.02C758.125 90 759.02 90.8954 759.02 92C759.02 93.1046 758.125 94 757.02 94H757C755.895 94 755 93.1046 755 92Z"
                        fill="#F59E0B"
                      />
                      <path
                        d="M564.5 229V287.5"
                        stroke="#CFCFCF"
                        stroke-width="4"
                        stroke-linejoin="round"
                        stroke-dasharray="18 18"
                      />
                      <path
                        d="M755 126V184.5"
                        stroke="#CFCFCF"
                        stroke-width="4"
                        stroke-linejoin="round"
                        stroke-dasharray="18 18"
                      />
                    </g>
                    <defs>
                      <linearGradient
                        id="paint0_linear_466_674"
                        x1="499.5"
                        y1="187"
                        x2="499.5"
                        y2="500"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#BAE6FD" />
                        <stop offset="1" stop-color="white" stop-opacity="0" />
                      </linearGradient>
                      <clipPath id="clip0_466_674">
                        <rect width="1000" height="500" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="mb-4 h-[1px] bg-zinc-200 w-full" />
                <div className="flex gap-4 justify-between w-full items-center">
                  <div className="flex gap-2">
                  <div className="flex flex-col gap-2">
                    <p className="text-zinc-400 text-sm">Total dives</p>
                    <p className="text-zinc-500 text-2xl font-semibold">
                      1.234
                    </p>
                  </div>
                  <p className="text-zinc-500 text-2xl font-semibold">
                      Red Cliff Reef
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;

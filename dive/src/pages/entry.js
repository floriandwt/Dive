import * as Icon from "lucide-react";
import { useState, useRef, useEffect } from "react";

function entry() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const name = useRef("");

  const submitData = () => {
    setLoading(true);

    if (name.current.value === "") {
      alert("Please enter a name!");
      setLoading(false);
      return;
    }

    fetch("/api/latestData", {
      method: "POST",
      body: JSON.stringify({ name: name.current.value }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (submitted) {
        fetch("/api/latestData?onboarding=true")
          .then((res) => res.json())
          .then((data) => {
            if (data.onboarding === 1) {
              window.location.href = "/dive";
            }
          });
        }
    }, 1000);

    return () => clearInterval(interval);
  }, [submitted]);

  return (
    <div className="bg-[url('/images/dive.jpg')] bg-cover bg-center h-screen w-screen flex items-end justify-center">
      {!loading && !submitted && (
        <div className="px-[5%] pt-6 pb-16 bg-white rounded-t-3xl backdrop-blur-lg w-full h-[500px]">
          <div className="max-w-[280px] flex flex-col gap-8 mx-auto">
            <div className="w-full flex justify-between items-center mb-8">
              <h1 className="text-lg font-semibold text-black leading-tight">
                Enter dive base
              </h1>
              <button className="text-[#007AFF]">Cancel</button>
            </div>
            <div className="p-2 rounded-[14px] bg-gradient-to-tr from-blue-400 to-purple-500 mx-auto">
              <Icon.Waves className="text-white w-8 h-8" />
            </div>
            <div className="flex-col flex gap-1">
              <label htmlFor="name" className="text-zinc-500 text-sm">
                Name
              </label>
              <input
                type="text"
                id="name"
                ref={name}
                className="border border-zinc-500 border-opacity-40 text-black bg-transparent rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            {/* <div className="my-1 h-[1px] bg-zinc-500 bg-opacity-30" /> */}
            <button
              onClick={submitData}
              className="bg-[#007AFF] text-white px-6 py-2 rounded-xl mx-auto"
            >
              Submit
            </button>
          </div>
        </div>
      )}
      {loading && !submitted && (
        <div className="px-[5%] pt-6 pb-16 bg-white rounded-t-3xl backdrop-blur-lg w-full h-[500px]">
          <div className="animate-pulse flex flex-col gap-12">
            <div className="h-16 bg-zinc-500 bg-opacity-30 rounded-md"></div>
            <div className="h-16 bg-zinc-500 bg-opacity-30 rounded-md"></div>
            <div className="h-16 bg-zinc-500 bg-opacity-30 rounded-md"></div>
            <div className="h-16 bg-zinc-500 bg-opacity-30 rounded-md"></div>
          </div>
        </div>
      )}
      {!loading && submitted && (
        <div className="px-[5%] pt-6 pb-16 bg-white rounded-t-3xl backdrop-blur-lg w-full h-[500px]">
          <div className="max-w-[280px] flex flex-col gap-8 mx-auto">
            <div className="p-2 rounded-[14px] bg-gradient-to-tr from-blue-400 to-purple-500 mx-auto mb-4">
              <Icon.Waves className="text-white w-8 h-8" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800 leading-tight">
              Succesfully entered dive base!
            </h1>
            <p className="text-gray-600">
              You can now enter the dive base and wait until the guide finished
              the planning.
              <br />
              Please do not close this tab! <br />
              <br />
              Have fun!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default entry;

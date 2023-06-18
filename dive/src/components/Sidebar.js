import Link from "next/link";
import * as Icon from "lucide-react";

function Sidebar({ currentTab, setCurrentTab }) {
  return (
    <div className="px-8 h-full border-r border-r-zinc-100 py-10 flex flex-col justify-between gap-4 text-zinc-400">
      <div className="flex flex-col gap-4 font-medium">
        <Link
          href="#"
          className={"px-3 py-2 hover:bg-zinc-100 transition-all cursor-pointer rounded-md flex items-center gap-3 " + (currentTab === "Dashboard" && "text-black")}
          onClick={() => setCurrentTab("Dashboard")}
        >
          <Icon.LayoutDashboard size={20} />
          Dashboard
        </Link>
        <Link
          href="#"
          className={"px-3 py-2 hover:bg-zinc-100 transition-all cursor-pointer rounded-md flex items-center gap-3 " + (currentTab === "Routes" && "text-black")}
          onClick={() => setCurrentTab("Routes")}
        >
          <Icon.MapIcon size={20} />
          Routes
        </Link>
        <Link
          href="#"
          className={"px-3 py-2 hover:bg-zinc-100 transition-all cursor-pointer rounded-md flex items-center gap-3 " + (currentTab === "Evaluation" && "text-black")}
          onClick={() => setCurrentTab("Evaluation")}
        >
          <Icon.User size={20} />
          Evaluation
        </Link>
      </div>
      <div className="flex flex-col gap-4 font-medium">
      <Link
          href="#"
          className={"px-3 py-2 hover:bg-zinc-100 transition-all cursor-pointer rounded-md flex items-center gap-3 " + (currentTab === "Statistics" && "text-black")}
          onClick={() => setCurrentTab("Statistics")}
        >
          <Icon.BarChart2 size={20} />
          Statistics
        </Link>
        <Link
          href="#"
          className={"px-3 py-2 hover:bg-zinc-100 transition-all cursor-pointer rounded-md flex items-center gap-3 " + (currentTab === "Settings" && "text-black")}
          onClick={() => setCurrentTab("Settings")}
        >
          <Icon.Settings size={20} />
          Settings
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;

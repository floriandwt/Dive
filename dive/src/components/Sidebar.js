import Link from "next/link"
import * as Icon from "lucide-react"

function Sidebar() {
  return (
    <div className="px-8 h-full border-r border-r-zinc-100 py-10 flex flex-col gap-4">
        <Link href="#" className="px-3 py-2 hover:bg-zinc-100 transition-all cursor-pointer rounded-md flex items-center gap-3">
            <Icon.LayoutDashboard size={20} />
            Dashboard
        </Link>
        <Link href="#" className="px-3 py-2 hover:bg-zinc-100 transition-all cursor-pointer rounded-md flex items-center gap-3">
            <Icon.MapIcon size={20} />
            Routes
        </Link>
        <Link href="#" className="px-3 py-2 hover:bg-zinc-100 transition-all cursor-pointer rounded-md flex items-center gap-3">
            <Icon.User size={20} />
            Evaluation
        </Link>
    </div>
  )
}

export default Sidebar
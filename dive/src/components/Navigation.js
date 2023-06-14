
function Navigation() {
  return (
    <div className="w-screen px-8 py-6 border-b border-b-zinc-100 flex justify-between items-center gap-8">
      <div className="text-lg font-semibold">
        Diving Club Gmuend e.V.
      </div>
      <div className="flex items-center gap-4 text-zinc-500 px-3 py-2 transition-all hover:bg-zinc-100 cursor-pointer rounded-md">
        <div className="h-8 w-8 rounded-full bg-zinc-200" />
        <p>André Jacoby</p>
      </div>
    </div>
  )
}

export default Navigation
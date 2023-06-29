import Image from "next/image";
import * as Icon from "lucide-react";

function Navigation({ online }) {
  return (
    <div className="w-screen px-8 py-6 border-b border-b-zinc-100 flex justify-between items-center gap-8 max-md:flex-col max-md:items-start max-md:gap-4">
      <div className="flex items-center gap-4">
      <div className="p-1.5 rounded-[10px] bg-gradient-to-tr from-blue-400 to-purple-500 mx-auto">
        <Icon.Waves className="text-white w-5 h-5" />
      </div>
      <div className="text-lg font-semibold">Diving Club Gmuend e.V.</div>
      </div>
      <div className="flex items-center gap-2 text-zinc-500 md:px-3 md:py-2 transition-all hover:bg-zinc-100 cursor-pointer rounded-md">
        <Image
          src={
            online === 1
              ? "https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
              : "https://media.licdn.com/dms/image/D4E03AQEYkqLqRwizbA/profile-displayphoto-shrink_800_800/0/1680205902109?e=2147483647&v=beta&t=x1ox08EJVNO9-Lgv4bkJHN3u_E_dpgL0MX0wmYjKPmE"
          }
          width={40}
          height={40}
          className="h-8 w-8 rounded-full bg-zinc-200 object-cover object-top"
        />
        <p className="font-medium">
          {online === 1 ? "Robert Marc Lehman" : "André Jacoby"}
        </p>
      </div>
    </div>
  );
}

export default Navigation;

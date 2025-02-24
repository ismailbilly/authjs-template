import { signOut } from "@/auth";

export default function Logout() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-4 flex flex-col justify-between gap-6 border-4 rounded-lg">
        <h1 className="text-xl">Are you sure you want to logout?</h1>
              <button className="w-full bg-blue-700 py-2 text-white rounded-lg text-xl">
          Logout
        </button>
      </div>
    </div>
  );
}

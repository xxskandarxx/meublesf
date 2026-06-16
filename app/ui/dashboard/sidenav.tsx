import NavLinks from "./nav-links";
import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="h-full flex flex-col p-2">
      {/* NAV LINKS */}
      <div className="flex flex-col gap-1">
        <NavLinks />
      </div>

      {/* PUSH BUTTON TO BOTTOM */}
      <div className="flex-1" />

      <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
      <button className="h-10 rounded-md bg-gray-100 text-xs font-medium hover:bg-gray-200">
        Out
      </button>
       </form>
    </div>
  );
}
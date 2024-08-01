import { supabase } from "@/supabase";
import { User } from "@supabase/supabase-js";

export const SignOutButton = ({
  currentUser,
}: {
  currentUser: User | null;
}) => {
  if (!currentUser) {
    return null;
  }

  return (
    <div className="absolute bottom-0 right-0 m-4">
      <button
        className="bg-red-500 text-white rounded-full px-4 py-2 font-bold"
        onClick={async () => {
          await supabase.auth.signOut();
          window.location.reload();
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

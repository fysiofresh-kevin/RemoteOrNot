import { supabase } from "@/supabase";
import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";

export const SignOutButton = ({
  currentUser,
}: {
  currentUser: User | null;
}) => {
  if (!currentUser) {
    return null;
  }

  return (
    <div className="absolute top-0 right-0 m-4">
      <Button
        variant="destructive"
        onClick={async () => {
          await supabase.auth.signOut();
          window.location.reload();
        }}
      >
        Sign Out
      </Button>
    </div>
  );
};

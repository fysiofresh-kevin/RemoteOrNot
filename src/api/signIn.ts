import { supabase } from "@/supabase";
import { toast } from "sonner";

const signIn = async (email: string, password: string) => {
  const { data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (data.user) {
    toast.success("Successfully signed in");
    return data.user;
  } else {
    toast.error("Error signing in");
    return null;
  }
}

export { signIn };

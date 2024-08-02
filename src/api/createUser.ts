import { supabase } from "@/supabase";
import { toast } from "sonner";
import { signIn } from "./signIn";

const createUser = async (email: string, password: string, name: string) => {
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
  });
  if (data.user) {
    toast.success("Successfully signed up");
    await supabase.from("user_profiles").insert({
      user_id: data.user.id,
      name: name,
    });
    return await signIn(email, password);
  } else {
    console.error("error", error);
    toast.error("Error signing up");
    return null;
  }
};

export { createUser };

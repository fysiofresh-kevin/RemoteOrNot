import { supabase } from "@/supabase";
import { User } from "@supabase/supabase-js";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

const createUser = async (
  setIsLoading: (v: boolean) => void,
  setCurrentUser: Dispatch<SetStateAction<User | null>>,
  handleSignIn: () => void,
  email: string,
  password: string,
  name: string,
) => {
  setIsLoading(true);
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    console.error("error", error);
    toast.error("Error signing up");
    setIsLoading(false);
    return;
  }

  if (data.user) {
    toast.success("Successfully signed up");
    await supabase.from("user_profiles").insert({
      user_id: data.user.id,
      name: name,
    });
    handleSignIn();
    setCurrentUser(data.user);
  }
  setIsLoading(false);
};

export { createUser };

import { supabase } from "@/supabase";
import { toast } from "sonner";

const setRemoteDays = async (userId: string, days: number[]) => {
  const { error } = await supabase
    .from("user_profiles")
    .update({ days_remote: days })
    .eq("user_id", userId);
  if (error) {
    toast.error(error.message);
    return false;
  }
  return true;
};

export { setRemoteDays };
